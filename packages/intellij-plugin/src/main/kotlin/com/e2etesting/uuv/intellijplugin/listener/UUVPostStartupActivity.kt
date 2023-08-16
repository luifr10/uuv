package com.e2etesting.uuv.intellijplugin.listener

import com.e2etesting.uuv.intellijplugin.UUVUtils
import com.e2etesting.uuv.intellijplugin.model.UUVTargetScript
import com.intellij.openapi.project.Project
import com.intellij.openapi.startup.StartupActivity


class UUVPostStartupActivity : StartupActivity {
    override fun runActivity(project: Project) {
        UUVUtils.getAndCreateRunConfigurationIfNotExists(project, "open", UUVTargetScript.open)
        UUVUtils.getAndCreateRunConfigurationIfNotExists(project, "e2e", UUVTargetScript.e2e)
    }

}