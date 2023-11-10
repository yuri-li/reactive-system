package org.study.account.controller

import io.kotest.core.spec.style.StringSpec
import io.kotest.matchers.longs.shouldBeBetween
import kotlinx.coroutines.*
import kotlinx.coroutines.reactor.awaitSingle
import org.slf4j.LoggerFactory
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.messaging.rsocket.RSocketRequester
import org.study.auth.model.token.UserAndToken
import reactor.core.publisher.Mono
import reactor.kotlin.test.test
import kotlin.system.measureTimeMillis

@SpringBootTest
class LoginControllerSpec(val requester: RSocketRequester) : StringSpec({
    "login once" {
        requester
            .route("anonymous.login")
            .data(
                org.study.account.model.Schoolmaster.Login("user-1", "zg(?t;ED<R_WKW~GeX&(xQ2")
            )
            .retrieveMono(UserAndToken::class.java)
            .test()
            .expectNextMatches {
                log.info(it.accessToken.id)
                (it.user as org.study.auth.model.Schoolmaster).username == "user-1"
            }
            .expectComplete()
            .verify()
    }
    "1百次登录，不同的username" {
        val time = measureTimeMillis {
            val list = mutableListOf<Job>()
            repeat(1_00) { index ->
                list.add(launch {
                    val response = requester
                        .route("anonymous.login")
                        .data(
                            org.study.account.model.Schoolmaster.Login("user-${index + 1}", "zg(?t;ED<R_WKW~GeX&(xQ2")
                        )
                        .retrieveMono(UserAndToken::class.java).awaitSingle()
                    log.info("username `${response.user.username}`, userId `${response.user.id}`, access token `${response.accessToken.id}`, refresh token `${response.refreshToken.id}`")
                })
            }
            log.info("==============================")
            list.joinAll()
        }
        log.info("-------------$time") //24525,24396,24237
        time.shouldBeBetween(1000, 100000)
    }
}) {
    companion object {
        private val log = LoggerFactory.getLogger(this::class.java)
    }
}