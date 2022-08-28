package org.study.rfeign.factory

import io.rsocket.metadata.WellKnownMimeType
import kotlinx.coroutines.reactive.asFlow
import kotlinx.coroutines.reactive.awaitFirstOrNull
import kotlinx.coroutines.reactive.awaitSingle
import kotlinx.coroutines.withContext
import org.springframework.core.ResolvableType
import org.springframework.messaging.handler.annotation.MessageMapping
import org.springframework.messaging.rsocket.RSocketRequester
import org.springframework.security.core.context.ReactiveSecurityContextHolder
import org.springframework.security.oauth2.core.OAuth2AccessToken
import org.springframework.security.rsocket.metadata.BearerTokenMetadata
import org.springframework.util.MimeTypeUtils
import org.study.rfeign.Anonymous
import java.lang.reflect.Method
import kotlin.coroutines.Continuation
import kotlin.reflect.jvm.kotlinFunction

class FeignClientBuilder {
    var anonymous: Boolean? = null
        set(value) {
            field = value!!
        }
    var root: String? = null
        set(value) {
            field = value!!
        }
    var requester: RSocketRequester? = null
        set(value) {
            field = value!!
        }

    /**
     * rsocket发送的数据分为两部分：metadata和data。数据类型都是payload，或者说，就一个参数。
     */
    suspend fun build(method: Method, arguments: List<Any?>): Any? =
        withContext((arguments.last() as Continuation<*>).context) {
            val argumentsWithoutContinuation = arguments.take(arguments.size - 1)
            val annotations = method.declaredAnnotations

            val spec = requester!!.route(buildRoute(method.name, annotations))

            val specWithMetadata = when ((annotations.firstOrNull { it is Anonymous } != null) || anonymous!!) {
                true -> spec
                else -> buildMetadata(fetchTokenFromContext(), spec)
            }

            val specWithData = buildSpecWithData(argumentsWithoutContinuation, specWithMetadata)

            val returnType = method.kotlinFunction!!.returnType
            if (returnType.toString().startsWith("kotlinx.coroutines.flow.Flow")) {
                specWithData.retrieveFlux<Any>(ResolvableType.forMethodReturnType(method).generics[0]).asFlow()
            } else {
                val type = ResolvableType.forMethodReturnType(method)
                val mono = specWithData.retrieveMono<Any>(type)
                if (type.rawClass == null || type.rawClass!! == Unit.javaClass || returnType.isMarkedNullable) {
                    mono.awaitFirstOrNull()
                } else {
                    mono.awaitSingle()
                }
            }
        }

    @Suppress("KotlinConstantConditions")
    private fun buildSpecWithData(
        argumentsWithoutContinuation: List<Any?>,
        specWithMetadata: RSocketRequester.RequestSpec,
    ) = when (argumentsWithoutContinuation.isEmpty()) {
        true -> specWithMetadata
        else -> if (argumentsWithoutContinuation.size == 1) {
            specWithMetadata.data(argumentsWithoutContinuation.first()!!)
        } else {
            specWithMetadata.data(argumentsWithoutContinuation)
        }
    }


    private fun buildRoute(methodName: String, annotations: Array<Annotation>): String {
        val mapping = (annotations.first { it is MessageMapping } as MessageMapping).value.firstOrNull()
            ?: throw IllegalArgumentException("#${methodName}@MessageMapping value must not be empty")

        return when (root!!.isBlank()) {
            true -> mapping
            else -> "${root}.${mapping}"
        }
    }

    private suspend fun fetchTokenFromContext() = ReactiveSecurityContextHolder.getContext().map {
        it.authentication?.credentials as OAuth2AccessToken
    }.awaitFirstOrNull()?.tokenValue

    private fun buildMetadata(
        tokenFromContext: String?,
        spec: RSocketRequester.RequestSpec
    ): RSocketRequester.RequestSpec {
        if (tokenFromContext == null || tokenFromContext.isBlank()) {
            throw SecurityException("Access denied! Invalid token")
        }
        return spec.metadata(
            BearerTokenMetadata(tokenFromContext),
            MimeTypeUtils.parseMimeType(WellKnownMimeType.MESSAGE_RSOCKET_AUTHENTICATION.string)
        )
    }

}
