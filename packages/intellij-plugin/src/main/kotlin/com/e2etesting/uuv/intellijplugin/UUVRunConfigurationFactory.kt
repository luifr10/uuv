package com.e2etesting.uuv.intellijplugin

import com.intellij.execution.configurations.ConfigurationFactory
import com.intellij.execution.configurations.ConfigurationType
import com.intellij.execution.configurations.RunConfiguration
import com.intellij.openapi.components.BaseState
import com.intellij.openapi.project.Project

class UUVRunConfigurationFactory(type: ConfigurationType?) : ConfigurationFactory(type!!) {
    override fun getId(): String {
        return UUVRunConfigurationType.ID
    }

    override fun createTemplateConfiguration(project: Project): RunConfiguration {
        return UUVRunConfiguration(project, this, "UUV E2E")
    }

    override fun getOptionsClass(): Class<out BaseState?> {
        return UUVRunConfigurationOptions::class.java
    }
}
