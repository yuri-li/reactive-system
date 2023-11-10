package org.study.auth.config

import com.fasterxml.jackson.databind.ObjectMapper
import org.springframework.boot.context.properties.ConfigurationProperties
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.data.redis.connection.ReactiveRedisConnectionFactory
import org.springframework.data.redis.core.ReactiveRedisTemplate
import org.springframework.data.redis.serializer.Jackson2JsonRedisSerializer
import org.springframework.data.redis.serializer.RedisSerializationContext
import org.springframework.data.redis.serializer.StringRedisSerializer
import org.springframework.stereotype.Component
import org.study.auth.model.AuthClient
import org.study.auth.model.Role
import org.study.auth.model.token.AccessToken
import org.study.auth.model.token.RefreshToken
import java.time.Duration

@Component
@ConfigurationProperties("auth-token")
class AuthTokenProperties {
    lateinit var expiryPolicies: Map<Role, ExpiryPolicy>
}

class ExpiryPolicy {
    lateinit var accessToken: Duration
    lateinit var refreshToken: Duration
}

enum class TokenType {
    AccessToken, RefreshToken
}

@Configuration
@Suppress("SpringJavaInjectionPointsAutowiringInspection")
class RedisConfig(val mapper: ObjectMapper, val factory: ReactiveRedisConnectionFactory) {
    @Bean("clientRedisTemplate")
    fun clientRedisTemplate() = redisTemplate<AuthClient>().opsForValue()

    @Bean("accessTokenRedisTemplate")
    fun accessTokenRedisTemplate() = redisTemplate<AccessToken>().opsForValue()

    @Bean("refreshTokenRedisTemplate")
    fun refreshTokenRedisTemplate() = redisTemplate<RefreshToken>().opsForValue()

    private inline fun <reified T> redisTemplate() = ReactiveRedisTemplate(
        factory,
        RedisSerializationContext
            .newSerializationContext<String, T>(StringRedisSerializer()) // keySerializer
            .value(Jackson2JsonRedisSerializer(T::class.java).apply {
                setObjectMapper(mapper)
            }) //valueSerializer
            .build()
    )
}