@file:Suppress("SpellCheckingInspection", "UnstableApiUsage")

import org.jetbrains.kotlin.gradle.tasks.KotlinCompile

plugins {
    idea
    id("org.springframework.boot") version "2.7.3"
    id("io.spring.dependency-management") version "1.0.13.RELEASE"
    kotlin("jvm") version "1.7.10"
    kotlin("plugin.spring") version "1.7.10"
}
idea {
    module {
        isDownloadJavadoc = false
        isDownloadSources = true
    }
}
group = "org.study"
version = "0.0.1"
java.sourceCompatibility = JavaVersion.VERSION_17

val nexus3Url: String by project
val nexus3Username: String by project
val nexus3Password: String by project

repositories {
    rsocketMavenRepository(this)
    mavenCentral()
}

dependencies {
    val kotestVersion = "5.4.2"
    val kotestSpringVersion = "1.1.2"

    implementation("org.study:common:0.0.1")
    implementation("org.study:auth-api:0.0.1"){
        exclude(group = "com.fasterxml.jackson.datatype", module = "jackson-datatype-jsr310")
    }
    implementation("org.study:r-feign:0.0.1")

    annotationProcessor("org.springframework.boot:spring-boot-configuration-processor")

    implementation("org.springframework.boot:spring-boot-starter-rsocket") {
        exclude(group = "com.fasterxml.jackson.datatype", module = "jackson-datatype-jsr310")
    }
    implementation("com.fasterxml.jackson.datatype:jackson-datatype-jsr310:2.13.3-fixed")

    implementation("io.projectreactor.kotlin:reactor-kotlin-extensions")
    implementation("org.jetbrains.kotlin:kotlin-reflect")
    implementation("org.jetbrains.kotlin:kotlin-stdlib-jdk8")
    implementation("org.jetbrains.kotlinx:kotlinx-coroutines-reactor")
    implementation("com.fasterxml.jackson.module:jackson-module-kotlin")

    implementation("org.springframework.security:spring-security-config")
    implementation("org.springframework.security:spring-security-messaging")
    implementation("org.springframework.security:spring-security-rsocket")
    implementation("org.springframework.security:spring-security-oauth2-resource-server") {
        exclude(module = "spring-security-web")
        exclude(module = "spring-web")
    }

    implementation("org.springframework.boot:spring-boot-starter-data-redis-reactive")

    testImplementation("org.springframework.boot:spring-boot-starter-test") {
        exclude(group = "org.junit.vintage", module = "junit-vintage-engine")
        exclude(module = "mockito-core")
    }
    testImplementation("io.projectreactor:reactor-test")
    testImplementation("io.kotest:kotest-runner-junit5-jvm:$kotestVersion")
    testImplementation("io.kotest:kotest-assertions-core-jvm:$kotestVersion")
    testImplementation("io.kotest:kotest-property:$kotestVersion")
    testImplementation("io.kotest.extensions:kotest-extensions-spring:$kotestSpringVersion")
}

tasks {
    withType<KotlinCompile> {
        kotlinOptions {
            freeCompilerArgs = listOf("-Xjsr305=strict")
            jvmTarget = "17"
        }
    }
    withType<Test> {
        useJUnitPlatform()
    }
    withType<Wrapper> {
        distributionType = Wrapper.DistributionType.BIN
        gradleVersion = "7.5.1"
    }

    withType<ProcessResources> {
        filesMatching("**/application*.yml") {
            expand(project.properties)
        }
    }
}
fun rsocketMavenRepository(repositoryHandler: RepositoryHandler) = repositoryHandler.maven {
    setUrl(nexus3Url)
    artifactUrls(nexus3Url)
    isAllowInsecureProtocol = true
    credentials {
        username = nexus3Username
        password = nexus3Password
    }
}