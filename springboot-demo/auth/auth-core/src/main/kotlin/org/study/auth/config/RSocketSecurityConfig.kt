package org.study.auth.config

import kotlinx.coroutines.reactor.mono
import org.springframework.boot.context.properties.ConfigurationProperties
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.messaging.rsocket.RSocketStrategies
import org.springframework.messaging.rsocket.annotation.support.RSocketMessageHandler
import org.springframework.security.config.annotation.method.configuration.EnableReactiveMethodSecurity
import org.springframework.security.config.annotation.rsocket.EnableRSocketSecurity
import org.springframework.security.config.annotation.rsocket.RSocketSecurity
import org.springframework.security.messaging.handler.invocation.reactive.AuthenticationPrincipalArgumentResolver
import org.springframework.security.rsocket.core.PayloadSocketAcceptorInterceptor
import org.springframework.stereotype.Component
import org.study.auth.AuthApi
import org.study.auth.model.AuthClient
import org.study.auth.model.GetAuthentication


@Component
@ConfigurationProperties("security-settings")
data class SecuritySettings(
    var authClient: AuthClient? = null,
    var permitRoutes: Map<String, String>? = null,
)

@Suppress("SpringJavaInjectionPointsAutowiringInspection")
@Configuration
@EnableRSocketSecurity
@EnableReactiveMethodSecurity
class RSocketSecurityConfig(val settings: SecuritySettings, val authApi: AuthApi) {

    /*@Bean
    fun rSocketStrategies(): RSocketStrategies {
        return RSocketStrategies.builder()
            .encoders {
                it.add(BearerTokenAuthenticationEncoder())
                it.add(Jackson2CborEncoder())
                it.add(Jackson2JsonEncoder())
            }.decoders {
                it.add(Jackson2CborDecoder())
                it.add(Jackson2JsonDecoder())
            }.build()
    }*/

    @Bean
    fun messageHandler(strategies: RSocketStrategies) = RSocketMessageHandler().apply {
        argumentResolverConfigurer.addCustomResolver(AuthenticationPrincipalArgumentResolver())
        rSocketStrategies = strategies
    }

    @Bean
    fun authorization(security: RSocketSecurity): PayloadSocketAcceptorInterceptor =
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