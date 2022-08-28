@file:Suppress("unused")

package org.study.common

import org.springframework.boot.autoconfigure.AutoConfigureAfter
import org.springframework.context.ApplicationContext
import org.springframework.context.ApplicationContextAware
import org.springframework.context.support.ResourceBundleMessageSource

@AutoConfigureAfter(ResourceBundleMessageSource::class)
open class SpringContextHolder : ApplicationContextAware {

    override fun setApplicationContext(applicationContext: ApplicationContext) {
        CONTEXT = applicationContext
    }

    companion object {
        private var CONTEXT: ApplicationContext? = null
        fun <T> getBean(beanClass: Class<T>): T {
            return CONTEXT!!.getBean(beanClass)
        }
    }
}