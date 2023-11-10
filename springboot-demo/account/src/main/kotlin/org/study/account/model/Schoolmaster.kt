package org.study.account.model

import org.springframework.data.annotation.Id
import org.springframework.data.annotation.Version
import org.springframework.data.relational.core.mapping.Column
import org.springframework.data.relational.core.mapping.Table
import org.study.auth.model.Phone
import java.time.LocalDateTime

sealed class Schoolmaster{
    data class Login(
        val username: String,
        val password: String,
    )

    @Table("t_schoolmaster")
    data class Entity(
        @Id val id: String,
        @Column("username") val username: String,
        @Column("country_code") val countryCode: String,
        @Column("phone_no") val phoneNo: String,
        @Column("password") val password: String,
        @Version val version: Long? = null,
        @Column("create_time") val createTime: LocalDateTime? = null,
        @Column("update_time") val updateTime: LocalDateTime? = null,
    ) {
        fun toAuthUser() = org.study.auth.model.Schoolmaster(
            id,
            username,
            Phone(countryCode, phoneNo),
            createTime!!,
            updateTime,
        )
    }
}
