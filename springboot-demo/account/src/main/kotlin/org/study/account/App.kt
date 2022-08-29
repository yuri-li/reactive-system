package org.study.account

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.autoconfigure.rsocket.RSocketMessagingAutoConfiguration
import org.springframework.boot.autoconfigure.security.reactive.ReactiveUserDetailsServiceAutoConfiguration
import org.springframework.boot.runApplication
import org.study.auth.AuthApi
import org.study.rfeign.EnableRSocketClients
import org.study.rfeign.FeignClientMapping
import reactor.core.publisher.Hooks
import java.util.*

@SpringBootApplication(
    scanBasePackages = ["org.study.account", "org.study.auth.model"],
    exclude = [
        ReactiveUserDetailsServiceAutoConfiguration::class,
    ]
)
@EnableRSocketClients(
    *[
        FeignClientMapping(
            name = "auth-api",
            transport = "ws",
            host = "localhost",
            port = 6001,
            mappingPath = "/auth",
            classes = [AuthApi::class]
        )
    ]
)
class App

fun main(args: Array<String>) {
    TimeZone.setDefault(TimeZone.getTimeZone("UTC"))
    runApplication<App>(*args)
    Hooks.onErrorDropped { }
}