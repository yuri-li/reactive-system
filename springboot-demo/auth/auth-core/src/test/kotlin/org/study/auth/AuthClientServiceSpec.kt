package org.study.auth

import com.fasterxml.jackson.databind.ObjectMapper
import io.kotest.core.spec.style.StringSpec
import io.kotest.matchers.booleans.shouldBeTrue
import io.kotest.matchers.string.shouldContain
import org.slf4j.LoggerFactory
import org.springframework.boot.test.context.SpringBootTest
import org.study.auth.service.AuthClientService

@SpringBootTest
class AuthClientServiceSpec(val service: AuthClientService, val mapper: ObjectMapper) : StringSpec({
    "register client" {
        //auth-core, account-core
        val clientName = "account-core"
        log.info("注册 client --- 开始")
        service.register(clientName)
        val client = service.findByName(clientName)!!
        log.info(mapper.writeValueAsString(client))
        log.info("注册 client --- 结束")
        client.name.shouldContain(clientName)
    }
    "delete client" {
        service.deleteByName("auth-core").shouldBeTrue()
    }
}) {
    companion object {
        private val log = LoggerFactory.getLogger(this::class.java)
    }
}