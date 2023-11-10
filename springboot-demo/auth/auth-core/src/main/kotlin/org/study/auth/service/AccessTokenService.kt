package org.study.auth.service

import org.springframework.data.redis.core.ReactiveValueOperations
import org.springframework.data.redis.core.deleteAndAwait
import org.springframework.data.redis.core.getAndAwait
import org.springframework.data.redis.core.setIfAbsentAndAwait
import org.springframework.stereotype.Service
import org.study.auth.config.AuthTokenProperties
import org.study.auth.model.CacheKey
import org.study.auth.model.Role
import org.study.auth.model.token.AccessToken
import org.study.auth.model.token.TokenVo
import java.time.LocalDateTime

@Service
class AccessTokenService(
    val accessTokenRedisTemplate: ReactiveValueOperations<String, AccessToken>,
    val properties: AuthTokenProperties,
) {
    suspend fun save(userId: String, role: Role, accessTokenId: String): TokenVo {
        val duration = properties.expiryPolicies[role]!!.accessToken
        val accessToken = AccessToken(
            id = accessTokenId,
            userId = userId,
            role = role,
            createTime = LocalDateTime.now(),
            expiryTime = LocalDateTime.now().plus(duration)
        )
        accessTokenRedisTemplate.setIfAbsentAndAwait(buildKey(accessTokenId), accessToken, duration)

        return accessToken.toVo()
    }

    suspend fun find(id: String): AccessToken? = accessTokenRedisTemplate.getAndAwait(buildKey(id))
    suspend fun delete(id: String) = accessTokenRedisTemplate.deleteAndAwait(buildKey(id))


    private fun buildKey(accessTokenId: String) = CacheKey.accessToken(accessTokenId)
}