package org.study.account.controller

import kotlinx.coroutines.delay
import org.slf4j.LoggerFactory
import org.springframework.messaging.handler.annotation.MessageMapping
import org.springframework.security.core.annotation.AuthenticationPrincipal
import org.springframework.stereotype.Controller
import org.study.auth.model.Student
import reactor.core.publisher.Mono

@Controller
class HelloController {
    private val log = LoggerFactory.getLogger(this::class.java)

    @MessageMapping("anonymous.greet")
    suspend fun greet(username: String): String {
        delay(1000)
        return "welcome $username"
    }

    fun hello(username: String): Mono<String> {
        return Mono.just("hello $username")
    }

    /**
     * 查看自己的成绩
     */
    @MessageMapping("check.grades")
    suspend fun checkGrades(@AuthenticationPrincipal(expression = "student") student: Student):Int{
        delay(1000)
        log.info("student `${student.username}` checks his/her grades ")
        return 100
    }
}