package org.study.auth.model

/**
 * 比如account，grade等服务，要访问auth，首先得注册client，拿到id，secret后，再访问
 */
data class AuthClient(
    var name: String = "",
    var id: String = "",
    var secret: String = "",
)
data class GenerateToken(
    val client: AuthClient,
    val user: AuthUser,
)

data class DeleteToken(
    val client: AuthClient,
    val accessToken: String,
)

data class RefreshToken(
    val client: AuthClient,
    val refreshToken: String,
)

data class GetAuthentication(
    val client: AuthClient,
    val accessToken: String,
)

data class UpdateAuthentication(
    val client: AuthClient,
    val user: AuthUser,
)

data class DeleteAuthentication(
    val client: AuthClient,
    val role: Role,
    val userId: String,
)