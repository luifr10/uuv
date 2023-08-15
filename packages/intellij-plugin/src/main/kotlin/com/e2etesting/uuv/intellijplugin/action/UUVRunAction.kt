package com.e2etesting.uuv.intellijplugin.action

import com.e2etesting.uuv.intellijplugin.UUVUtils
import com.e2etesting.uuv.intellijplugin.run.configuration.UUVRunConfiguration
import com.e2etesting.uuv.intellijplugin.run.configuration.UUVRunConfigurationType
import com.intellij.execution.ExecutorRegistry
import com.intellij.execution.ProgramRunnerUtil
import com.intellij.execution.RunManager
import com.intellij.execution.RunnerAndConfigurationSettings
import com.intellij.openapi.actionSystem.AnAction
import com.intellij.openapi.actionSystem.AnActionEvent
import com.intellij.openapi.project.Project
import com.intellij.openapi.util.NlsActions

class UUVRunAction : AnAction {

    private var targetTestFile : String? = null

    constructor() : super()
    constructor(text: @NlsActions.ActionText String?, pTargetTestFile : String?) : super(text) {
        this.targetTestFile = pTargetTestFile
    }

    override fun actionPerformed(e: AnActionEvent) {
        val executor = ExecutorRegistry.getInstance().getExecutorById("Run")
        val localFilePath = UUVUtils.getLocalFilePath(e.project!!, targetTestFile!!)
        val runConfigurationName = UUVUtils.getTestFileRunConfigurationName(localFilePath)
        var runnerAndConfigurationSetting = getRunnerAndConfigurationSettingsFromTestFile(e.project!!, runConfigurationName)

        if(runnerAndConfigurationSetting == null) {
            runnerAndConfigurationSetting = RunManager.getInstance(e.project!!).createConfiguration(runConfigurationName, UUVRunConfigurationType::class.java)
            (runnerAndConfigurationSetting.configuration as UUVRunConfiguration).targetTestFile = localFilePath
            RunManager.getInstance(e.project!!).addConfiguration(runnerAndConfigurationSetting)
        }

        ProgramRunnerUtil.executeConfiguration(runnerAndConfigurationSetting, executor!!)
    }

    private fun getRunnerAndConfigurationSettingsFromTestFile(project: Project, runConfigurationName: String): RunnerAndConfigurationSettings? {
        val runnerAndConfigurationSettings = RunManager.getInstance(project).getConfigurationSettingsList(UUVRunConfigurationType::class.java)
        return runnerAndConfigurationSettings.find { it.configuration.name == runConfigurationName }
    }
}