package org.study.account.controller

import org.slf4j.LoggerFactory
import org.springframework.messaging.handler.annotation.MessageMapping
import org.springframework.stereotype.Controller
import org.study.account.service.SchoolmasterService
import org.study.auth.AuthApi
import org.study.auth.model.GenerateToken
import org.study.auth.model.SecuritySettings
import org.study.auth.model.token.UserAndToken

@Controller
class LoginController(
    val settings: SecuritySettings,
    @Suppress("SpringJavaInjectionPointsAutowiringInspection") val authApi: AuthApi,
    val service: SchoolmasterService,
) {
    private val log = LoggerFactory.getLogger(this::class.java)

    @MessageMapping("anonymous.login")
    suspend fun login(request: org.study.account.model.Schoolmaster.Login): UserAndToken {
        val model = service.checkForLogin(request).toAuthUser()
        return authApi.generateToken(GenerateToken(settings.authClient!!, model))
    }
}