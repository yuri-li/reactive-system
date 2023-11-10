package org.study.account.config

import org.springframework.beans.factory.annotation.Value
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.messaging.rsocket.RSocketRequester
import java.net.URI

@Configuration
class RSocketConfig {
    @Bean
    fun requester(
        @Suppress("SpringJavaInjectionPointsAutowiringInspection") builder: RSocketRequester.Builder,
        @Value("\${spring.rsocket.server.port}") port: Int,
        @Value("\${spring.rsocket.server.mapping-path}") mappingPath:String,
    ): RSocketRequester =
//        builder.tcp("localhost", port)
        builder.websocket(URI.create("ws://localhost:${port}/${mappingPath}"))
}