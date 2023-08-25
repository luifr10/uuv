package com.e2etesting.uuv.intellijplugin.listener

import com.e2etesting.uuv.intellijplugin.UUVUtils
import com.e2etesting.uuv.intellijplugin.message.UiMessage
import com.e2etesting.uuv.intellijplugin.model.UUVTargetScript
import com.intellij.openapi.project.Project
import com.intellij.openapi.startup.StartupActivity


class UUVPostStartupActivity : StartupActivity {
    override fun runActivity(project: Project) {
        UUVUtils.getAndCreateRunConfigurationIfNotExists(project, UiMessage.message("runconfiguration.action.run.open"), UUVTargetScript.open)
        UUVUtils.getAndCreateRunConfigurationIfNotExists(project, UiMessage.message("runconfiguration.action.run.e2e"), UUVTargetScript.e2e)
    }

}
