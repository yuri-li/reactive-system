package org.study.auth.model

object CacheKey {
    /**
     * key: userId
     * @see org.study.auth.model.AuthUser
     * expiration: refreshToken's timeout
     */
    fun user(userId: String, role: Role) = "auth:user:${role}:${userId}"

    /**
     * key: accessTokenId
     * @see org.study.auth.model.token.AccessToken
     * expiration: accessToken's timeout
     */
    fun accessToken(id: String) = "auth:accessToken:${id}"

    /**
     * key: refreshTokenId
     * @see org.study.auth.model.token.RefreshToken
     * expiration: refreshToken's timeout
     */
    fun refreshToken(id: String) = "auth:refreshToken:${id}"

    /**
     * userId -> refreshTokenId -> org.study.auth.model.token.RefreshToken(accessTokenId)
     * key: role + userId
     * value: refreshTokenId
     * expiration: refreshToken's timeout
     */
    fun userAndRefreshToken(userId: String, role: Role) = "auth:relation:userId:refreshTokenId:${role}:${userId}"

    fun client(name: String) = "auth:client:${name}"
}