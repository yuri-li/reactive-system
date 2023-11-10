@file:Suppress("SpellCheckingInspection")

import org.jetbrains.kotlin.gradle.tasks.KotlinCompile

plugins {
    idea
    `maven-publish`
    kotlin("jvm") version "1.7.10"
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
    mavenCentral()
    rsocketMavenRepository(this)
}

dependencies {
    implementation("io.projectreactor.kotlin:reactor-kotlin-extensions:1.1.7")
    implementation("org.jetbrains.kotlin:kotlin-reflect")
    implementation("org.jetbrains.kotlin:kotlin-stdlib-jdk8")
    implementation("org.jetbrains.kotlinx:kotlinx-coroutines-reactor:1.6.4")

    compileOnly("org.study:common:0.0.1")
    compileOnly("org.study:r-feign:0.0.1")

    implementation("org.springframework.boot:spring-boot-autoconfigure:2.7.3")
    implementation("org.springframework:spring-messaging:5.3.22"){
        exclude(module = "spring-beans")
        exclude(module = "spring-core")
    }
    implementation("org.springframework.boot:spring-boot:2.7.2")
    implementation("jakarta.validation:jakarta.validation-api:3.0.2")
    implementation("org.springframework.security:spring-security-oauth2-core:5.7.3"){
        exclude(group = "org.springframework")
        exclude(module = "spring-security-crypto")
    }
    implementation("com.fasterxml.jackson.core:jackson-annotations:2.13.3"){
        exclude(module = "jackson-bom")
    }
    implementation("org.springframework.security:spring-security-config:5.7.3")
    implementation("org.springframework.security:spring-security-messaging:5.7.3")
    implementation("org.springframework.security:spring-security-rsocket:5.7.3")
    implementation("org.springframework.security:spring-security-oauth2-resource-server:5.7.3")
}

tasks {
    withType<KotlinCompile> {
        kotlinOptions {
            freeCompilerArgs = listOf("-Xjsr305=strict")
            jvmTarget = "17"
        }
    }
    withType<Wrapper> {
        distributionType = Wrapper.DistributionType.BIN
        gradleVersion = "7.5.1"
    }
}
val sourcesJar by tasks.registering(Jar::class) {
    archiveClassifier.set("sources")
    from(sourceSets.main.get().allSource)
}

publishing {
    repositories {
        rsocketMavenRepository(this)
    }
    publications {
        register("mavenKotlin", MavenPublication::class) {
            from(components["kotlin"])
            artifact(sourcesJar.get())
        }
    }
}

fun rsocketMavenRepository(repositoryHandler: RepositoryHandler) = repositoryHandler.maven {
    setUrl(nexus3Url)
    isAllowInsecureProtocol = true
    credentials {
        username = nexus3Username
        password = nexus3Password
    }
}