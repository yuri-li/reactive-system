package org.study.auth.config

import kotlinx.coroutines.reactor.mono
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.messaging.rsocket.RSocketStrategies
import org.springframework.messaging.rsocket.annotation.support.RSocketMessageHandler
import org.springframework.security.config.annotation.method.configuration.EnableReactiveMethodSecurity
import org.springframework.security.config.annotation.rsocket.EnableRSocketSecurity
import org.springframework.security.config.annotation.rsocket.RSocketSecurity
import org.springframework.security.messaging.handler.invocation.reactive.AuthenticationPrincipalArgumentResolver
import org.springframework.security.rsocket.core.PayloadSocketAcceptorInterceptor
import org.study.auth.AuthApi
import org.study.auth.model.GetAuthentication
import org.study.auth.model.SecuritySettings

@Configuration
@EnableRSocketSecurity
@EnableReactiveMethodSecurity
class RSocketSecurityConfig {

    @Bean
    fun messageHandler(@Suppress("SpringJavaInjectionPointsAutowiringInspection") strategies: RSocketStrategies) = RSocketMessageHandler().apply {
        argumentResolverConfigurer.addCustomResolver(AuthenticationPrincipalArgumentResolver())
        rSocketStrategies = strategies
    }

    @Bean
    fun authorization(
        settings: SecuritySettings,
        @Suppress("SpringJavaInjectionPointsAutowiringInspection") authApi: AuthApi,
        security: RSocketSecurity
    ): PayloadSocketAcceptorInterceptor =
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