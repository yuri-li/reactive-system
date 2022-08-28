package org.study.auth.service

import org.springframework.data.redis.core.*
import org.springframework.stereotype.Service
import org.study.auth.config.AuthTokenProperties
import org.study.auth.model.CacheKey
import org.study.auth.model.Role
import org.study.auth.model.token.UserAndToken

@Suppress("LeakingThis", "SpringJavaInjectionPointsAutowiringInspection")
@Service
class RelationService(
    val stringRedisTemplate: ReactiveStringRedisTemplate,
    val properties: AuthTokenProperties,
    val authUserService: AuthUserService,
    val refreshTokenService:RefreshTokenService,
    val accessTokenService:AccessTokenService,
) {
    private val redis = stringRedisTemplate.opsForValue()

    suspend fun save(userId: String, role: Role, refreshTokenId: String) = redis.setIfAbsentAndAwait(
        buildKey(userId, role),
        refreshTokenId,
        properties.expiryPolicies[role]!!.refreshToken
    )

    suspend fun findRefreshTokenIdByUser(userId: String, role: Role): String? =
        redis.getAndAwait(buildKey(userId, role))

    suspend fun delete(userId: String, role: Role) = redis.deleteAndAwait(buildKey(userId, role))

    private fun buildKey(userId: String, role: Role) = CacheKey.userAndRefreshToken(userId, role)

    suspend fun findUserAndToken(userId: String, role: Role): UserAndToken? {
        val user = authUserService.find(userId, role)
        return user?.let{
            val refreshTokenId = findRefreshTokenIdByUser(userId, role)!!
            val refreshToken = refreshTokenService.find(refreshTokenId)!!
            val accessToken = accessTokenService.find(refreshToken.accessTokenId)!!

            UserAndToken(
                it, accessToken.toVo() , refreshToken.toVo()
            )
        }
    }
}