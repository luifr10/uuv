package com.e2etesting.uuv.intellijplugin

import com.intellij.execution.configurations.ConfigurationFactory
import com.intellij.execution.configurations.ConfigurationType
import com.intellij.openapi.util.IconLoader
import javax.swing.Icon

class UUVRunConfigurationType : ConfigurationType {
    private val icon: Icon = IconLoader.getIcon("META-INF/pluginRunIcon.png", UUVRunConfigurationType::class.java)

    override fun getDisplayName(): String {
        return "UUV"
    }

    override fun getConfigurationTypeDescription(): String {
        return "UUV run configuration type"
    }

    override fun getIcon(): Icon {
        return icon
    }

    override fun getId(): String {
        return ID
    }

    override fun getConfigurationFactories(): Array<ConfigurationFactory> {
        return arrayOf(UUVRunConfigurationFactory(this))
    }

    companion object {
        const val ID = "UUVRunConfiguration"
    }
}
