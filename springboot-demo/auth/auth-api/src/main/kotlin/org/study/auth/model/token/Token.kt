@file:Suppress("unused")

package org.study.auth.model.token

import org.springframework.security.core.Authentication
import org.springframework.security.core.GrantedAuthority
import org.springframework.security.oauth2.core.OAuth2AccessToken
import org.springframework.security.oauth2.server.resource.authentication.BearerTokenAuthentication
import org.study.auth.model.AuthUser
import org.study.auth.model.Role
import org.study.auth.model.SecurityUser
import java.time.LocalDateTime
import java.time.ZoneOffset

data class AccessToken(
    val id: String,
    val userId: String,
    val role: Role,
    val createTime: LocalDateTime,
    val expiryTime: LocalDateTime,
) {
    fun toOAuth2AccessToken() = OAuth2AccessToken(
        OAuth2AccessToken.TokenType.BEARER,
        id,
        createTime.toInstant(ZoneOffset.UTC),
        expiryTime.toInstant(ZoneOffset.UTC)
    )

    fun toVo() = TokenVo(id, createTime, expiryTime)
}

data class RefreshToken(
    val id: String,
    val userId: String,
    val role: Role,
    val accessTokenId: String,
    val createTime: LocalDateTime,
    val expiryTime: LocalDateTime,
) {
    fun toVo() = TokenVo(id, createTime, expiryTime)
}

data class TokenVo(
    val id: String,
    val createTime: LocalDateTime,
    val expiryTime: LocalDateTime,
)

data class UserAndToken(
    val user: AuthUser,
    val accessToken: TokenVo,
    val refreshToken: TokenVo,
)

data class SecurityToken(
    val authUser: SecurityUser,
    val accessToken: TokenVo,
) : Authentication {
    override fun getName(): String = accessToken.id

    override fun getAuthorities(): List<GrantedAuthority> = emptyList()
    override fun getCredentials() = OAuth2AccessToken(
        OAuth2AccessToken.TokenType.BEARER,
        accessToken.id,
        accessToken.createTime.toInstant(ZoneOffset.UTC),
        accessToken.expiryTime.toInstant(ZoneOffset.UTC),
    )

    override fun getDetails() = null

    override fun getPrincipal() = authUser

    override fun isAuthenticated(): Boolean = true
    override fun setAuthenticated(isAuthenticated: Boolean) {}

    private fun toOAuth2AccessToken() = OAuth2AccessToken(
        OAuth2AccessToken.TokenType.BEARER,
        accessToken.id,
        accessToken.createTime.toInstant(ZoneOffset.UTC),
        accessToken.expiryTime.toInstant(ZoneOffset.UTC)
    )
    fun toBearerTokenAuthentication() = BearerTokenAuthentication(
        authUser,
        toOAuth2AccessToken(),
        emptyList(),
    )
}