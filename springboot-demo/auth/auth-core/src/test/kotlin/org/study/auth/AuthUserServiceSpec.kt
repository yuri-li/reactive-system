package org.study.auth

import com.fasterxml.jackson.databind.ObjectMapper
import io.kotest.core.spec.style.StringSpec
import io.kotest.matchers.nulls.shouldBeNull
import io.kotest.matchers.shouldBe
import org.slf4j.LoggerFactory
import org.springframework.boot.test.context.SpringBootTest
import org.study.auth.model.Phone
import org.study.auth.model.Role
import org.study.auth.model.Schoolmaster
import org.study.auth.service.AuthUserService
import java.util.*

@SpringBootTest
class AuthUserServiceSpec(val service: AuthUserService, val mapper: ObjectMapper) : StringSpec({
    "save" {
        val id = "0285006e-6444-45aa-97f4-e33be8b5ad8e"//UUID.randomUUID().toString()
        val schoolmaster = Schoolmaster(
            id,
            "张校长",
            Phone(phoneNo = "13753536222"),
        )
        service.save(schoolmaster)
        val model = service.find(id, Role.Schoolmaster)
        log.info(mapper.writeValueAsString(model))

        val security = service.findSecurityUser(id, Role.Schoolmaster)
        log.info(mapper.writeValueAsString(security))
        model!!.id.shouldBe(id)
    }
    "delete"{
        val id = "0285006e-6444-45aa-97f4-e33be8b5ad8e"
        service.delete(id, Role.Schoolmaster)
        val model = service.find(id, Role.Schoolmaster)
        model?.shouldBeNull()
    }
}) {
    companion object {
        private val log = LoggerFactory.getLogger(this::class.java)
    }
}