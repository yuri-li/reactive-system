package org.study.account.controller

import io.kotest.core.spec.style.StringSpec
import io.kotest.matchers.longs.shouldBeBetween
import io.kotest.matchers.shouldBe
import io.kotest.property.Arb
import io.kotest.property.arbitrary.string
import io.kotest.property.forAll
import io.rsocket.metadata.WellKnownMimeType
import kotlinx.coroutines.Job
import kotlinx.coroutines.coroutineScope
import kotlinx.coroutines.joinAll
import kotlinx.coroutines.launch
import kotlinx.coroutines.reactive.awaitFirst
import org.slf4j.LoggerFactory
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.messaging.rsocket.RSocketRequester
import org.springframework.security.rsocket.metadata.BearerTokenMetadata
import org.springframework.util.MimeTypeUtils
import reactor.kotlin.test.test
import kotlin.system.measureTimeMillis


@SpringBootTest
class HelloControllerSpec(val requester: RSocketRequester) : StringSpec({
    "Anonymous access to the `anonymous.greet` API" {
        log.info("hello world -- start")
        greet(requester, "May")
        log.info("hello world -- end")
    }
    "计算`anonymous.greet` API的执行时间" {
        val time = measureTimeMillis {
            greet(requester, "May")
        }
        time.shouldBeBetween(1000, 1500)
    }
    "重复执行10次" {
        times(requester, 10).shouldBeBetween(1000, 1500)
    }

    /**
     * 1. 在使用kotlin coroutines + rsocket之前，每秒最多处理1000个请求；
     * 优化后，预计性能提升100倍，即100_000。
     * 2. 但，测试代码强制等待1秒，与实际接口执行时长100ms相比，慢了10倍
     *
     * 所以，综合1，2，当前系统每秒处理10_000个请求。100万个请求，大约需要10秒。
     */
    "重复执行100_000次" {
        times(requester, 100_000).shouldBeBetween(5000, 10_000)
    }
    "token" {
        requester
            .route("check.grades")
            .metadata(BearerTokenMetadata("f6ed99e2-7db6-4f87-b7b2-2c00bf649edf"), MIME_TYPE)
            .retrieveMono(Int::class.java)
            .test()
            .expectNextMatches {
                it == 100
            }
            .expectComplete()
            .verify()
    }
}) {
    companion object {
        private val log = LoggerFactory.getLogger(this::class.java)
        val MIME_TYPE = MimeTypeUtils.parseMimeType(WellKnownMimeType.MESSAGE_RSOCKET_AUTHENTICATION.string)

        private suspend fun times(requester: RSocketRequester, times: Int): Long = coroutineScope {
            measureTimeMillis {
                val list = mutableListOf<Job>()
                forAll(times, Arb.string(3, 5)) { username ->
                    list.add(
                        launch {
                            greet(requester, username)
                        }
                    )
                    username.isNotBlank()
                }
                list.joinAll()
            }
        }

        private suspend fun greet(requester: RSocketRequester, username: String) = requester
            .route("anonymous.greet")
            .data(username)
            .retrieveMono(String::class.java)
            .awaitFirst().shouldBe("welcome $username")
    }
}

