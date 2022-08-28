package org.study.rfeign.factory

import org.springframework.beans.factory.FactoryBean
import org.springframework.http.codec.cbor.Jackson2CborDecoder
import org.springframework.http.codec.cbor.Jackson2CborEncoder
import org.springframework.http.codec.json.Jackson2JsonDecoder
import org.springframework.http.codec.json.Jackson2JsonEncoder
import org.springframework.messaging.rsocket.RSocketStrategies
import org.springframework.security.rsocket.metadata.BearerTokenAuthenticationEncoder

class RSocketStrategiesFactoryBean: FactoryBean<RSocketStrategies> {
    override fun getObject(): RSocketStrategies = RSocketStrategies.builder()
        .encoders {
            it.add(BearerTokenAuthenticationEncoder())
            it.add(Jackson2CborEncoder())
            it.add(Jackson2JsonEncoder())
        }
        .decoders {
            it.add(Jackson2CborDecoder())
            it.add(Jackson2JsonDecoder())
        }
        .build()

    override fun getObjectType(): Class<*> = RSocketStrategies::class.java
}