package org.study.rfeign.factory

import org.springframework.beans.factory.FactoryBean
import org.springframework.messaging.rsocket.RSocketRequester
import java.net.URI

class RSocketRequesterFactoryBean(
    private val builder: RSocketRequester.Builder,
    private val transport: String,
    private val host: String,
    private val port: Int,
    private val mappingPath: String
) : FactoryBean<RSocketRequester> {
    override fun getObject(): RSocketRequester = when(transport.lowercase() == "tcp"){
        true -> builder.tcp(host, port)
        else -> builder.websocket(URI.create("ws://${host}:${port}/${mappingPath}"))
    }

    override fun getObjectType(): Class<*> = RSocketRequester::class.java
}