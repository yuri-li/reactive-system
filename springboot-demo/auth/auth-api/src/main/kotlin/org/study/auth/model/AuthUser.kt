@file:Suppress("unused")

package org.study.auth.model

import com.fasterxml.jackson.annotation.JsonIgnore
import com.fasterxml.jackson.annotation.JsonIgnoreProperties
import com.fasterxml.jackson.annotation.JsonTypeInfo
import jakarta.validation.constraints.Pattern
import org.springframework.security.core.GrantedAuthority
import org.springframework.security.oauth2.core.user.OAuth2User
import org.study.common.util.RegexUtil
import java.time.LocalDateTime
import java.time.format.DateTimeFormatter

enum class Role {
    Schoolmaster, Teacher, Student,
}

@Suppress("UNCHECKED_CAST", "MemberVisibilityCanBePrivate")
@JsonIgnoreProperties(value = ["name", "authorities", "role", "model", "schoolmaster", "teacher", "student"])
data class SecurityUser(
    private val attributes: Map<String, Any>
) : OAuth2User {
    override fun getName(): String = attributes["username"] as String

    override fun getAttributes(): Map<String, Any> = attributes

    override fun getAuthorities(): List<GrantedAuthority> = emptyList()

    fun getRole() = attributes["role"] as Role
    fun <T> getModel() = when(getRole()){
        Role.Schoolmaster -> getSchoolmaster()
        Role.Teacher -> getTeacher()
        else -> getStudent()
    }

    fun getSchoolmaster() = Schoolmaster(
        id = attributes["id"] as String,
        username = attributes["username"] as String,
        phone = buildPhoneFromMap(attributes["phone"] as Map<String, String>),
        createTime = LocalDateTime.parse(attributes["createTime"] as String),
        updateTime = attributes["updateTime"]?.let {
            LocalDateTime.parse(it as String)
        }
    )

    fun getTeacher() = Teacher(
        id = attributes["id"] as String,
        schoolmasterId = attributes["schoolmasterId"] as String,
        username = attributes["username"] as String,
        phone = buildPhoneFromMap(attributes["phone"] as Map<String, String>),
        createTime = LocalDateTime.parse(attributes["createTime"] as String),
        updateTime = attributes["updateTime"]?.let {
            LocalDateTime.parse(it as String)
        }
    )
    fun getStudent() = Student(
        id = attributes["id"] as String,
        schoolmasterId = attributes["schoolmasterId"] as String,
        username = attributes["username"] as String,
        createTime = LocalDateTime.parse(attributes["createTime"] as String),
        updateTime = attributes["updateTime"]?.let {
            LocalDateTime.parse(it as String)
        }
    )
    private fun buildPhoneFromMap(map: Map<String, String>): Phone = Phone(
        countryCode = map["countryCode"]!!,
        phoneNo = map["phoneNo"]!!
    )
}

@JsonTypeInfo(use = JsonTypeInfo.Id.NAME, property = "_class")
sealed class AuthUser(
    open val id: String,
    open val username: String,
    open val phone: Phone?,
    open val createTime: LocalDateTime,
    open val updateTime: LocalDateTime?,
    @field:JsonIgnore
    open val _attributes: Map<String, Any>? = null,
) {
    open fun findRole(): Role = Role.valueOf(this.javaClass.simpleName)
    open fun toSecurity(): SecurityUser = SecurityUser(toMap())

    @Suppress("UNCHECKED_CAST")
    private fun toMap(): Map<String, Any> {
        val map = mapOf(
            "id" to id,
            "username" to username,
            "phone" to when(phone){
                null -> null
                else -> mapOf(
                    "countryCode" to phone!!.countryCode,
                    "phoneNo" to phone!!.phoneNo
                )
            },
            "role" to findRole(),
            "createTime" to createTime, //.format(dateTimeFormatter),
            "updateTime" to updateTime, //?.format(dateTimeFormatter),
        )
        return when (_attributes) {
            null -> map
            else -> map.plus(_attributes!!)
        }.filterValues { it != null } as Map<String, Any>
    }
}

data class Schoolmaster(
    override val id: String,
    override val username: String,
    override val phone: Phone,
    override val createTime: LocalDateTime = LocalDateTime.now(),
    override val updateTime: LocalDateTime? = null,
) : AuthUser(id, username, phone, createTime, updateTime)

data class Teacher(
    override val id: String,
    val schoolmasterId: String,
    override val username: String,
    override val phone: Phone,
    override val createTime: LocalDateTime = LocalDateTime.now(),
    override val updateTime: LocalDateTime? = null,
) : AuthUser(id, username, phone, createTime, updateTime, mapOf("schoolmasterId" to schoolmasterId))

data class Student(
    override val id: String,
    val schoolmasterId: String,
    override val username: String,
    override val createTime: LocalDateTime = LocalDateTime.now(),
    override val updateTime: LocalDateTime? = null,
) : AuthUser(id, username, null, createTime, updateTime, mapOf("schoolmasterId" to schoolmasterId))

data class Phone(
    @field:Pattern(regexp = RegexUtil.COUNTRY_CODE, message = "{countryCode.format.error}")
    val countryCode: String = "86",
    @field:Pattern(regexp = RegexUtil.PHONE_NO, message = "{phoneNo.format.error}")
    val phoneNo: String,
) {
    override fun toString() = "+${countryCode} $phoneNo"
}