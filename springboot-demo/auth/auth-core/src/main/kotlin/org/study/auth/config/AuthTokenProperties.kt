package org.study.auth.config

import org.springframework.boot.context.properties.ConfigurationProperties
import org.springframework.stereotype.Component
import org.study.auth.model.Role
import java.time.Duration

@Component
@ConfigurationProperties("auth-token")
class AuthTokenProperties {
    lateinit var expiryPolicies: Map<Role, ExpiryPolicy>
}

class ExpiryPolicy {
    lateinit var accessToken: Duration
    lateinit var refreshToken: Duration
}

enum class TokenType {
    AccessToken, RefreshToken
}