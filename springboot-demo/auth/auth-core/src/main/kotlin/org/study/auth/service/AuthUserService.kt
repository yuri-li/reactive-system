package org.study.auth.service

import com.fasterxml.jackson.databind.ObjectMapper
import org.springframework.data.redis.core.*
import org.springframework.stereotype.Service
import org.study.auth.config.AuthTokenProperties
import org.study.auth.model.*
import org.study.common.config.ErrorCodeException
import com.fasterxml.jackson.module.kotlin.readValue

@Suppress("LeakingThis", "SpringJavaInjectionPointsAutowiringInspection")
@Service
class AuthUserService(
    val stringRedisTemplate: ReactiveStringRedisTemplate,
    val properties: AuthTokenProperties,
    val objectMapper: ObjectMapper,
) {
    private val redis = stringRedisTemplate.opsForValue()

    suspend fun save(user: AuthUser) {
        val role = user.findRole()
        val key = buildKey(user.id, role)
        val duration = properties.expiryPolicies[role]!!.refreshToken
        redis.setIfAbsentAndAwait(key, objectMapper.writeValueAsString(user), duration)
    }

    suspend fun update(user: AuthUser) {
        val role = user.findRole()
        val key = buildKey(user.id, role)
        redis.setIfPresentAndAwait(key, objectMapper.writeValueAsString(user))
    }

    suspend fun delete(userId: String, role: Role) {
        val key = buildKey(userId, role)
        redis.deleteAndAwait(key)
    }

    suspend fun findSecurityUser(userId: String, role: Role): SecurityUser {
        val entity =
            find(userId, role) ?: throw ErrorCodeException(ErrorCode.Expired_User_Or_RefreshToken, "您的身份已过期，请重新登录")
        return entity.toSecurity()
    }

    suspend fun find(userId: String, role: Role): AuthUser? {
        val key = buildKey(userId, role)
        val value = redis.getAndAwait(key) ?: return null

        return objectMapper.readValue<AuthUser>(value)
    }

    private fun buildKey(userId: String, role: Role) = CacheKey.user(userId, role)
}