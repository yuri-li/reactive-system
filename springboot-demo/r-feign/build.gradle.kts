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

repositories {
    mavenCentral()
}

dependencies {
    implementation(kotlin("reflect"))
    implementation("org.jetbrains.kotlinx:kotlinx-coroutines-reactor:1.6.4")
    implementation("io.projectreactor.kotlin:reactor-kotlin-extensions:1.1.7")

    implementation("org.springframework.security:spring-security-rsocket:5.7.3")
    implementation("org.springframework:spring-messaging:5.3.22"){
        exclude(module = "spring-beans")
        exclude(module = "spring-core")
    }
    implementation("org.springframework.security:spring-security-oauth2-core:5.7.3"){
        exclude(module = "spring-beans")
        exclude(module = "spring-core")
        exclude(module = "spring-security-core")
    }
    implementation("org.slf4j:slf4j-api:2.0.0")
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

val nexus3Url: String by project
val nexus3Username: String by project
val nexus3Password: String by project

publishing {
    repositories {
        maven {
            setUrl(nexus3Url)
            isAllowInsecureProtocol = true
            credentials {
                username = nexus3Username
                password = nexus3Password
            }
        }
    }
    publications {
        register("mavenKotlin", MavenPublication::class) {
            from(components["kotlin"])
            artifact(sourcesJar.get())
        }
    }
}