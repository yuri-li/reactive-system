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
    implementation(kotlin("stdlib"))
    implementation("org.springframework:spring-context:5.3.22"){
        exclude(module = "spring-aop")
        exclude(module = "spring-expression")
    }
    implementation("io.rsocket:rsocket-core:1.1.2"){
        exclude(group = "io.netty")
        exclude(group = "io.projectreactor")
    }
    implementation("org.springframework:spring-messaging:5.3.22"){
        exclude(module = "spring-beans")
        exclude(module = "spring-core")
    }

    @Suppress("GradlePackageUpdate")
    implementation("jakarta.validation:jakarta.validation-api:2.0.2")

    implementation("org.springframework.boot:spring-boot-autoconfigure:2.7.3"){
        exclude(group = "org.springframework")
        exclude(module = "spring-boot")
    }
    implementation("org.slf4j:slf4j-api:1.7.36")
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