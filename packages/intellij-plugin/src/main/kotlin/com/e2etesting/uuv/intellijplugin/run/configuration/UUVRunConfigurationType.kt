package com.e2etesting.uuv.intellijplugin.run.configuration

import com.e2etesting.uuv.intellijplugin.UUVIcons
import com.intellij.execution.configurations.ConfigurationFactory
import com.intellij.execution.configurations.ConfigurationType
import javax.swing.Icon

class UUVRunConfigurationType : ConfigurationType {
    private val icon: Icon = UUVIcons.Action

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
