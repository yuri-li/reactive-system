package org.study.auth.service

import kotlinx.coroutines.reactor.awaitSingleOrNull
import org.springframework.data.redis.core.ReactiveValueOperations
import org.springframework.data.redis.core.deleteAndAwait
import org.springframework.data.redis.core.setAndAwait
import org.springframework.stereotype.Service
import org.study.auth.model.AuthClient
import org.study.auth.model.CacheKey
import org.study.common.config.BusinessException
import org.study.common.util.RandomPasswordGenerator
import java.util.*

@Service
class AuthClientService(val clientRedis: ReactiveValueOperations<String, AuthClient>) {
    suspend fun register(name: String): AuthClient {
        val clientName = buildKey(name)
        clientRedis.get(clientName).awaitSingleOrNull()?.let {
            throw BusinessException("client `$clientName` 已注册")
        }
        val model = AuthClient(
            clientName,
            UUID.randomUUID().toString(),
            RandomPasswordGenerator.generate()
        )
        clientRedis.setAndAwait(clientName, model)
        return model
    }

    suspend fun findByName(clientName: String): AuthClient? = clientRedis.get(buildKey(clientName)).map {
        AuthClient(removePrefix(it.name), it.id, it.secret)
    }.awaitSingleOrNull()

    suspend fun deleteByName(clientName: String) = clientRedis.deleteAndAwait(buildKey(clientName))

    suspend fun verify(client: AuthClient) {
        val cache =
            findByName(client.name) ?: throw org.springframework.security.access.AccessDeniedException("Access Denied")
        if (!(cache.id == client.id && cache.secret == client.secret)) {
            throw org.springframework.security.access.AccessDeniedException("Access Denied")
        }
    }

    private fun buildKey(clientName: String) = CacheKey.client(clientName)
    private fun removePrefix(clientName: String) = clientName.split(":").last()
}