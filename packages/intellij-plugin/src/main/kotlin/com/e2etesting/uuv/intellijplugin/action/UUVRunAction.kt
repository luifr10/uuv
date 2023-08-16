package com.e2etesting.uuv.intellijplugin.action

import com.e2etesting.uuv.intellijplugin.UUVUtils
import com.intellij.openapi.actionSystem.AnAction
import com.intellij.openapi.actionSystem.AnActionEvent
import com.intellij.openapi.util.NlsActions

class UUVRunAction : AnAction {

    private var targetTestFile : String? = null

    constructor() : super()
    constructor(text: @NlsActions.ActionText String?, pTargetTestFile : String?) : super(text) {
        this.targetTestFile = pTargetTestFile
    }

    override fun actionPerformed(actionEvent: AnActionEvent) {
        val project = actionEvent.project!!
        val localFilePath = UUVUtils.getLocalFilePath(project, targetTestFile!!)
        val runConfigurationName = UUVUtils.getTestFileRunConfigurationName(localFilePath)
        val runnerAndConfigurationSetting = UUVUtils.getAndCreateRunConfigurationIfNotExists(project, runConfigurationName, localFilePath)
        UUVUtils.executeRunnerAndConfigurationThenSelectIt(runnerAndConfigurationSetting, actionEvent)
    }
}