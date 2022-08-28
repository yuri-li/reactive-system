package org.study.auth.service

import org.springframework.data.redis.core.*
import org.springframework.stereotype.Service
import org.study.auth.config.AuthTokenProperties
import org.study.auth.model.CacheKey
import org.study.auth.model.Role
import org.study.auth.model.token.RefreshToken
import org.study.auth.model.token.TokenVo
import java.time.LocalDateTime

@Suppress("LeakingThis", "SpringJavaInjectionPointsAutowiringInspection")
@Service
class RefreshTokenService(
    val refreshTokenRedisTemplate: ReactiveValueOperations<String, RefreshToken>,
    val properties: AuthTokenProperties,
) {
    suspend fun save(userId: String, role: Role, refreshTokenId: String, accessTokenId: String): TokenVo {
        val duration = properties.expiryPolicies[role]!!.refreshToken
        val refreshToken = RefreshToken(
            id = refreshTokenId,
            userId = userId,
            role = role,
            accessTokenId = accessTokenId,
            createTime = LocalDateTime.now(),
            expiryTime = LocalDateTime.now().plus(duration)
        )
        refreshTokenRedisTemplate.setIfAbsentAndAwait(buildKey(refreshTokenId), refreshToken, duration)

        return refreshToken.toVo()
    }

    suspend fun delete(id: String) = refreshTokenRedisTemplate.deleteAndAwait(buildKey(id))
    suspend fun find(refreshTokenId: String): RefreshToken? = refreshTokenRedisTemplate.getAndAwait(buildKey(refreshTokenId))

    private fun buildKey(refreshTokenId: String) = CacheKey.refreshToken(refreshTokenId)
    suspend fun update(refreshTokenFromRedis: RefreshToken, accessTokenId: String): TokenVo {
        val refreshToken = refreshTokenFromRedis.copy(accessTokenId = accessTokenId)
        refreshTokenRedisTemplate.setIfPresentAndAwait(buildKey(refreshToken.id), refreshToken)
        return refreshToken.toVo()
    }
}