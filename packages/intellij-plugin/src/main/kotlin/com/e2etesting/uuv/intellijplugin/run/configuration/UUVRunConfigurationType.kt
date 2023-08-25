package com.e2etesting.uuv.intellijplugin.run.configuration

import com.e2etesting.uuv.intellijplugin.UUVIcons
import com.e2etesting.uuv.intellijplugin.message.UiMessage
import com.intellij.execution.configurations.ConfigurationFactory
import com.intellij.execution.configurations.ConfigurationType
import javax.swing.Icon

class UUVRunConfigurationType : ConfigurationType {
    private val icon: Icon = UUVIcons.Action

    override fun getDisplayName(): String = UiMessage.message("runconfiguration.framework.name")

    override fun getConfigurationTypeDescription(): String = UiMessage.message("runconfiguration.framework.description")

    override fun getIcon(): Icon = icon

    override fun getId(): String = ID

    override fun getConfigurationFactories(): Array<ConfigurationFactory> = arrayOf(UUVRunConfigurationFactory(this))

    companion object {
        const val ID = "UUVRunConfiguration"
    }
}
