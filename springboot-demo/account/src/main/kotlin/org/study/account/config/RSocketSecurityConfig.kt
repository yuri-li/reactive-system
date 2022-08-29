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
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder
import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.security.messaging.handler.invocation.reactive.AuthenticationPrincipalArgumentResolver
import org.springframework.security.rsocket.core.PayloadSocketAcceptorInterceptor
import org.springframework.security.rsocket.metadata.BearerTokenAuthenticationEncoder
import org.study.auth.AuthApi
import org.study.auth.model.GetAuthentication
import org.study.auth.model.SecuritySettings

@Configuration
@EnableRSocketSecurity
@EnableReactiveMethodSecurity
class RSocketSecurityConfig {
    @Bean
    fun passwordEncoder(): PasswordEncoder = BCryptPasswordEncoder(4)

    @Bean
    fun messageHandler(@Suppress("SpringJavaInjectionPointsAutowiringInspection") strategies: RSocketStrategies) = RSocketMessageHandler().apply {
        argumentResolverConfigurer.addCustomResolver(AuthenticationPrincipalArgumentResolver())
        rSocketStrategies = strategies
    }

    @Bean
    open fun authorization(settings: SecuritySettings, @Suppress("SpringJavaInjectionPointsAutowiringInspection") authApi: AuthApi, security: RSocketSecurity): PayloadSocketAcceptorInterceptor =
        security.authorizePayload { authorize: RSocketSecurity.AuthorizePayloadsSpec ->
            settings.permitRoutes!!.values.fold(authorize) { spec, item ->
                spec.route(item).permitAll()
            }.anyRequest().authenticated()
                .anyExchange().permitAll()
        }.simpleAuthentication { simple ->
            simple.authenticationManager { authentication ->
                mono {
                    authApi.getAuthentication(
                        GetAuthentication(
                            settings.authClient!!,
                            authentication.name
                        )
                    )
                }.map {
                    it.toBearerTokenAuthentication()
                }
            }
        }.build()
}
