package org.study.account

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.autoconfigure.rsocket.RSocketMessagingAutoConfiguration
import org.springframework.boot.autoconfigure.security.reactive.ReactiveUserDetailsServiceAutoConfiguration
import org.springframework.boot.runApplication
import reactor.core.publisher.Hooks
import java.util.*

@SpringBootApplication(
    exclude = [
        ReactiveUserDetailsServiceAutoConfiguration::class,
    ]
)
class App

fun main(args: Array<String>) {
    TimeZone.setDefault(TimeZone.getTimeZone("UTC"))
    runApplication<App>(*args)
    Hooks.onErrorDropped { }
}