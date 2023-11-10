package org.study.account.dao

import kotlinx.coroutines.reactive.awaitFirstOrNull
import org.springframework.data.r2dbc.core.R2dbcEntityTemplate
import org.springframework.data.relational.core.query.Criteria.where
import org.springframework.data.relational.core.query.Query.query
import org.springframework.stereotype.Repository
import org.study.account.model.Schoolmaster

@Suppress("SpringJavaInjectionPointsAutowiringInspection")
@Repository
class SchoolmasterDao(val template: R2dbcEntityTemplate) {
    suspend fun findByUsername(username: String): Schoolmaster.Entity? = template.select(
        query(where("username").`is`(username)),
        Schoolmaster.Entity::class.java
    ).awaitFirstOrNull()
}