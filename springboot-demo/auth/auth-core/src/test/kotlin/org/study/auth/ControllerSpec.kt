package org.study.auth

import io.kotest.core.spec.style.StringSpec
import io.rsocket.metadata.WellKnownMimeType
import org.slf4j.LoggerFactory
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.messaging.rsocket.RSocketRequester
import org.springframework.security.rsocket.metadata.BearerTokenMetadata
import org.springframework.util.MimeTypeUtils
import org.study.auth.model.*
import org.study.auth.model.token.SecurityToken
import org.study.auth.model.token.UserAndToken
import reactor.kotlin.test.test

@SpringBootTest
class ControllerSpec(val requester: RSocketRequester, val settings: SecuritySettings) : StringSpec({
    "login" {
        requester
            .route("anonymous.auth.generate.token")
            .data(
                GenerateToken(
                    settings.authClient!!,
                    Student(
                        "0295002e-6444-45aa-97f4-e33be8b5ad8e",
                        "0285006e-6444-45aa-97f4-e33be8b5ad8e",
                        "小明",
                    )
                )
            )
            .retrieveMono(UserAndToken::class.java)
            .test()
            .expectNextMatches {
                log.info(it.accessToken.id)
                (it.user as Student).username == "小明"
            }
            .expectComplete()
            .verify()
    }
    "feign" {
        requester
            .route("anonymous.auth.get.authentication")
            .data(
                GetAuthentication(
                    AuthClient(
                        name = "auth-core",
                        id = "43e8334a-b9b5-44bd-92cd-8afefa021bae",
                        secret = "yV!wj?aI.Kc?3BZZd[BJh=Z"
                    ),
                    "bd0e9c21-4522-433e-b281-5f70980d906e",
                    //"a40bf7d5-956e-4048-8f31-d6fc8f8acb6a"
                )
            )
            .retrieveMono(SecurityToken::class.java)
            .test()
            .expectNextMatches {
                log.info(it.accessToken.id)
                log.info("{}", it)
                it.authUser.getSchoolmaster().username == "张校长"
            }
            .expectComplete()
            .verify()
    }
    /**
     * schoolmaster: a40bf7d5-956e-4048-8f31-d6fc8f8acb6a, 0285006e-6444-45aa-97f4-e33be8b5ad8e, 张校长
     * teacher: 235e085f-32c9-404b-8df3-5615e16052df, 0295006e-6444-45aa-97f4-e33be8b5ad8e, 王老师
     */
    "delete" {
        requester
            .route("auth.delete.authentication")
            .metadata(BearerTokenMetadata("a40bf7d5-956e-4048-8f31-d6fc8f8acb6a"), MIME_TYPE)
            .data(
                DeleteAuthentication(
                    AuthClient(
                        name = "auth-core",
                        id = "43e8334a-b9b5-44bd-92cd-8afefa021bae",
                        secret = "yV!wj?aI.Kc?3BZZd[BJh=Z"
                    ),
                    Role.Teacher,
                    "0295006e-6444-45aa-97f4-e33be8b5ad8e",
                )
            )
            .retrieveMono(Void::class.java)
            .test()
            .expectComplete()
            .verify()
    }
}) {
    companion object {
        private val log = LoggerFactory.getLogger(this::class.java)
        val MIME_TYPE = MimeTypeUtils.parseMimeType(WellKnownMimeType.MESSAGE_RSOCKET_AUTHENTICATION.string)
    }
}