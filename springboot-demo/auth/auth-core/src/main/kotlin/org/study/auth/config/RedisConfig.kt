package org.study.auth.config

import com.fasterxml.jackson.databind.ObjectMapper
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.data.redis.connection.ReactiveRedisConnectionFactory
import org.springframework.data.redis.core.ReactiveRedisTemplate
import org.springframework.data.redis.serializer.Jackson2JsonRedisSerializer
import org.springframework.data.redis.serializer.RedisSerializationContext
import org.springframework.data.redis.serializer.StringRedisSerializer
import org.study.auth.model.AuthClient
import org.study.auth.model.Schoolmaster
import org.study.auth.model.Student
import org.study.auth.model.Teacher
import org.study.auth.model.token.AccessToken
import org.study.auth.model.token.RefreshToken


@Configuration
@Suppress("SpringJavaInjectionPointsAutowiringInspection")
class RedisConfig(val mapper: ObjectMapper, val factory: ReactiveRedisConnectionFactory) {
    @Bean("clientRedisTemplate")
    fun clientRedisTemplate() = redisTemplate<AuthClient>().opsForValue()

    @Bean("schoolmasterRedisTemplate")
    fun schoolmasterRedisTemplate() = redisTemplate<Schoolmaster>().opsForValue()

    @Bean("teacherRedisTemplate")
    fun teacherRedisTemplate() = redisTemplate<Teacher>().opsForValue()

    @Bean("studentRedisTemplate")
    fun studentRedisTemplate() = redisTemplate<Student>().opsForValue()

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