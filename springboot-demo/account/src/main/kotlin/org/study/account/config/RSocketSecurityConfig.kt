package org.study.account.config

import kotlinx.coroutines.reactor.mono
import org.springframework.boot.autoconfigure.condition.ConditionalOnMissingBean
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.context.annotation.Primary
import org.springframework.http.codec.cbor.Jackson2CborDecoder
import org.springframework.http.codec.cbor.Jackson2CborEncoder
import org.springframework.http.codec.json.Jackson2JsonDecoder
import org.springframework.http.codec.json.Jackson2JsonEncoder
import org.springframework.messaging.rsocket.RSocketStrategies
import org.springframework.messaging.rsocket.annotation.support.RSocketMessageHandler
import org.springframework.security.config.annotation.method.configuration.EnableReactiveMethodSecurity
import org.springframework.security.config.annotation.rsocket.EnableRSocketSecurity
import org.springframework.security.config.annotation.rsocket.RSocketSecurity
import org.springframework.security.messaging.handler.invocation.reactive.AuthenticationPrincipalArgumentResolver
import org.springframework.security.rsocket.core.PayloadSocketAcceptorInterceptor
import org.springframework.security.rsocket.metadata.BearerTokenAuthenticationEncoder
import org.study.common.SpringContextHolder

@Configuration
@EnableRSocketSecurity
@EnableReactiveMethodSecurity
class RSocketSecurityConfig {
    @ConditionalOnMissingBean(RSocketStrategies::class)
    @Bean
    open fun rSocketStrategies(): RSocketStrategies {
        return RSocketStrategies.builder()
            .encoders {
                it.add(BearerTokenAuthenticationEncoder())
                it.add(Jackson2CborEncoder())
                it.add(Jackson2JsonEncoder())
            }.decoders {
                it.add(Jackson2CborDecoder())
                it.add(Jackson2JsonDecoder())
            }.build()
    }
    @Bean
    fun messageHandler(@Suppress("SpringJavaInjectionPointsAutowiringInspection") strategies: RSocketStrategies) = RSocketMessageHandler().apply {
        argumentResolverConfigurer.addCustomResolver(AuthenticationPrincipalArgumentResolver())
        rSocketStrategies = strategies
    }
    @Bean
    @Primary
    open fun authorization(security: RSocketSecurity): PayloadSocketAcceptorInterceptor = security.authorizePayload { authorize: RSocketSecurity.AuthorizePayloadsSpec ->
        listOf<String>("anonymous.greet").fold(authorize) { spec, item ->
            spec.route(item).permitAll()
        }.anyRequest().authenticated()
            .anyExchange().permitAll()
    }.build()
}
