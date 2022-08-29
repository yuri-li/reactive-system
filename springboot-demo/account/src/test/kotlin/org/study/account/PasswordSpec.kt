package org.study.account

import io.kotest.core.spec.style.StringSpec
import io.kotest.matchers.booleans.shouldBeFalse
import io.kotest.matchers.booleans.shouldBeTrue
import io.kotest.matchers.comparables.shouldNotBeEqualComparingTo
import org.slf4j.LoggerFactory
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder
import org.study.common.util.RandomPasswordGenerator

class PasswordSpec : StringSpec({
    "encode" {
        val rawPassword = RandomPasswordGenerator.generate()
        val hash = passwordEncoder.encode(rawPassword)
        log.info(rawPassword)
        log.info(
            """
            加密后的123456与随机密码: 
            1. ${passwordEncoder.encode("123456")}
            2. $hash
        """.trimIndent()
        )
        /**
         * zg(?t;ED<R_WKW~GeX&(xQ2
         * $2a$04$IQye8lEkPEmS8lu4hwCzOeQb.Yw4Wzm9d7LNTGWHv5R3ELp6AtVSW
         */
        hash.shouldNotBeEqualComparingTo(rawPassword)
    }
    "check BCrypt password" {
        val rawPassword = "zg(?t;ED<R_WKW~GeX&(xQ2"
        val hash = "\$2a\$04\$IQye8lEkPEmS8lu4hwCzOeQb.Yw4Wzm9d7LNTGWHv5R3ELp6AtVSW"
        passwordEncoder.matches(rawPassword, hash).shouldBeTrue()
        passwordEncoder.matches("123456", hash).shouldBeFalse()
    }
}) {
    companion object {
        private val log = LoggerFactory.getLogger(this::class.java)
        private val passwordEncoder = BCryptPasswordEncoder(4)
    }
}