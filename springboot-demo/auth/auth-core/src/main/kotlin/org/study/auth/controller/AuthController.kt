package org.study.auth.controller

import kotlinx.coroutines.async
import kotlinx.coroutines.coroutineScope
import kotlinx.coroutines.launch
import org.slf4j.LoggerFactory
import org.springframework.messaging.handler.annotation.MessageMapping
import org.springframework.security.core.annotation.AuthenticationPrincipal
import org.springframework.stereotype.Controller
import org.study.auth.model.*
import org.study.auth.model.token.SecurityToken
import org.study.auth.model.token.UserAndToken
import org.study.auth.service.*
import org.study.common.config.ErrorCodeException
import java.util.*

@Controller
class AuthController(
    val clientService: AuthClientService,
    val authUserService: AuthUserService,
    val relationService: RelationService,
    val accessTokenService: AccessTokenService,
    val refreshTokenService: RefreshTokenService,
) {
    private val log = LoggerFactory.getLogger(this::class.java)

    @MessageMapping("anonymous.auth.generate.token")
    suspend fun generateToken(request: GenerateToken): UserAndToken {
        clientService.verify(request.client)
        val role = request.user.findRole()

        val cache = relationService.findUserAndToken(request.user.id, role)
        if (cache != null) {
            return cache
        }

        authUserService.save(request.user)

        val accessTokenId = UUID.randomUUID().toString()
        val refreshTokenId = UUID.randomUUID().toString()

        return coroutineScope {
            val accessToken = async { accessTokenService.save(request.user.id, role, accessTokenId) }
            val refreshToken = async { refreshTokenService.save(request.user.id, role, refreshTokenId, accessTokenId) }
            launch {
                relationService.save(request.user.id, role, refreshTokenId)
            }

            UserAndToken(
                request.user,
                accessToken.await(),
                refreshToken.await(),
            )
        }
    }

    /**
     * 删除accessToken
     */
    @MessageMapping("auth.delete.token")
    suspend fun deleteToken(@AuthenticationPrincipal(expression = "schoolmaster") schoolmaster: Schoolmaster, request: DeleteToken) {
        log.info("deleteToken `{}` by operator `{}`", request, schoolmaster)

        clientService.verify(request.client)

        accessTokenService.delete(request.accessToken)
    }

    /**
     * 这个接口相当于转接头。<br/>
     * 相关服务：resource-consumer,resource-provider,auth-api,auth-core。<br/>
     * 调用链如下：<br/>
     * 1. consumer调用provider的接口，且，必须传token。<br/>
     *   普通的参数放入data中，token放入metadata中。<br/>
     *   consumer可以是前端应用，也可以是与provider一样的后台服务。<br/>
     * 2. provider从上下文获取token<br/>
     * 3. provider调用 <code> auth-api.getAuthentication() </code>，拿token换用户信息。<br/>
     *   auth-api只是接口，不能实例化。看起来像是服务，其实，只是一种约定。r-feign读取到这些约定后，才不会做错事。<br/>
     *   token有两种：操作员的token，与被操作者的token。千万不要搞混乱了，操作员的token只能放入metadata中传递。<br/>
     * 4. provider使用r-feign，将调用auth-api的过程，转成rsocket协议，发送报文到auth-core<br/>
     * 5. auth-core开放服务，处理响应
     */
    @MessageMapping("anonymous.auth.get.authentication")
    suspend fun getAuthentication(request: GetAuthentication): SecurityToken {
        clientService.verify(request.client)

        val accessToken = accessTokenService.find(request.accessToken) ?: throw ErrorCodeException(
            ErrorCode.Expired_AccessToken,
            "accessToken已过期"
        )
        return SecurityToken(
            authUserService.findSecurityUser(accessToken.userId, accessToken.role),
            accessToken.toVo(),
        )
    }

    /**
     * 更新用户身份信息。用户不用重新登录
     */
    @MessageMapping("auth.update.authentication")
    suspend fun updateAuthentication(@AuthenticationPrincipal(expression = "schoolmaster") schoolmaster: Schoolmaster, request: UpdateAuthentication) {
        log.info("updateAuthentication `{}` by operator `{}`", request, schoolmaster)

        clientService.verify(request.client)

        authUserService.update(request.user)
    }

    /**
     * 删除用户的数据，让用户重新登录
     */
    @MessageMapping("auth.delete.authentication")
    suspend fun deleteAuthentication(@AuthenticationPrincipal(expression = "schoolmaster") schoolmaster: Schoolmaster, request: DeleteAuthentication) {
        log.info("deleteAuthentication `{}` by operator `{}`", request, schoolmaster)
        clientService.verify(request.client)

        deleteByUser(request.userId, request.role, true)
    }

    @MessageMapping("anonymous.auth.refresh.token")
    suspend fun refreshToken(request: RefreshToken): UserAndToken{
        clientService.verify(request.client)

        val refreshTokenFromRedis = refreshTokenService.find(request.refreshToken) ?: throw ErrorCodeException(
            ErrorCode.Expired_User_Or_RefreshToken,
            "您的账户已过期，请重新登录"
        )
        accessTokenService.delete(refreshTokenFromRedis.accessTokenId)

        val accessTokenId = UUID.randomUUID().toString()
        return coroutineScope {
            val refreshToken = async { refreshTokenService.update(refreshTokenFromRedis, accessTokenId) }
            val accessToken = async { accessTokenService.save(refreshTokenFromRedis.userId, refreshTokenFromRedis.role, accessTokenId) }
            val user = async { authUserService.find(refreshTokenFromRedis.userId, refreshTokenFromRedis.role) }

            UserAndToken(
                user.await()!!,
                accessToken.await(),
                refreshToken.await(),
            )
        }
    }

    private suspend fun deleteByUser(userId: String, role: Role, throwable: Boolean) {
        val refreshTokenId = relationService.findRefreshTokenIdByUser(userId, role)

        if (refreshTokenId != null) {
            val refreshToken = refreshTokenService.find(refreshTokenId)!!

            authUserService.delete(refreshToken.userId, refreshToken.role)
            accessTokenService.delete(refreshToken.accessTokenId)
            refreshTokenService.delete(refreshTokenId)
            relationService.delete(userId, role)
        } else {
            if (throwable) {
                throw ErrorCodeException(
                    ErrorCode.Expired_User_Or_RefreshToken,
                    "The association between User and RefreshToken expired"
                )
            }
        }
    }
}