package org.study.account.service

import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.stereotype.Service
import org.study.account.dao.SchoolmasterDao
import org.study.account.model.Schoolmaster
import org.study.common.config.BusinessException

@Service
class SchoolmasterService(
    val passwordEncoder: PasswordEncoder,
    val dao: SchoolmasterDao,
) {
    suspend fun checkForLogin(dto: Schoolmaster.Login): Schoolmaster.Entity {
        val entity = dao.findByUsername(dto.username)
        if (entity == null || !passwordEncoder.matches(dto.password, entity.password)) {
            throw BusinessException("用户名或密码错误")
        }
        return entity
    }
}