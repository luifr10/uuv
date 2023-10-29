package com.e2etesting.uuv.intellijplugin

import com.e2etesting.uuv.intellijplugin.message.TechMessage
import com.e2etesting.uuv.intellijplugin.model.UUVTargetScript
import com.e2etesting.uuv.intellijplugin.run.configuration.UUVRunConfiguration
import com.e2etesting.uuv.intellijplugin.run.configuration.UUVRunConfigurationType
import com.google.gson.Gson
import com.intellij.execution.ExecutorRegistry
import com.intellij.execution.ProgramRunnerUtil
import com.intellij.execution.RunManager
import com.intellij.execution.RunnerAndConfigurationSettings
import com.intellij.openapi.actionSystem.AnActionEvent
import com.intellij.openapi.project.Project
import java.util.*

object UUVUtils {
    fun getLocalFilePath(project: Project, fileCanonicalPath: String): String {
        return fileCanonicalPath.replace(project.basePath!!, "").substring(1)
    }

    fun getTestFileRunConfigurationName(localFilePath: String): String {
        return localFilePath.replace("/", ".").replace("\\", ".")
    }

    fun isWindows(os: String): Boolean {
        return os.indexOf(TechMessage.message("env.win")) >= 0
    }

    fun getOs(): String {
        return System.getProperty(TechMessage.message("os.name")).lowercase(Locale.getDefault())
    }


    fun getAndCreateRunConfigurationIfNotExists(project: Project, runConfigurationName: String, localFilePath: String): RunnerAndConfigurationSettings {
        var runnerAndConfigurationSetting = getRunnerAndConfigurationSettingsFromName(project, runConfigurationName)
        if(runnerAndConfigurationSetting == null) {
            runnerAndConfigurationSetting = RunManager.getInstance(project).createConfiguration(runConfigurationName, UUVRunConfigurationType::class.java)
            (runnerAndConfigurationSetting.configuration as UUVRunConfiguration).targetTestFile = localFilePath
            RunManager.getInstance(project).addConfiguration(runnerAndConfigurationSetting)
        }
        return runnerAndConfigurationSetting
    }

    fun getAndCreateRunConfigurationIfNotExists(project: Project, runConfigurationName: String, targetScript: UUVTargetScript) {
        var runnerAndConfigurationSetting = getRunnerAndConfigurationSettingsFromName(project, runConfigurationName)
        if(runnerAndConfigurationSetting == null) {
            runnerAndConfigurationSetting = RunManager.getInstance(project).createConfiguration(runConfigurationName, UUVRunConfigurationType::class.java)
            (runnerAndConfigurationSetting.configuration as UUVRunConfiguration).projectHomeDir = project.basePath
            (runnerAndConfigurationSetting.configuration as UUVRunConfiguration).targetScript = targetScript.name
            RunManager.getInstance(project).addConfiguration(runnerAndConfigurationSetting)
        }
    }

    private fun getRunnerAndConfigurationSettingsFromName(project: Project, runConfigurationName: String): RunnerAndConfigurationSettings? {
        val runnerAndConfigurationSettings = RunManager.getInstance(project).getConfigurationSettingsList(UUVRunConfigurationType::class.java)
        return runnerAndConfigurationSettings.find { it.configuration.name == runConfigurationName }
    }

    fun executeRunnerAndConfigurationThenSelectIt(runnerAndConfigurationSetting: RunnerAndConfigurationSettings, actionEvent: AnActionEvent) {
        val executor = ExecutorRegistry.getInstance().getExecutorById(TechMessage.message("executor.id"))
        ProgramRunnerUtil.executeConfiguration(runnerAndConfigurationSetting, executor!!)
        RunManager.getInstance(actionEvent.project!!).selectedConfiguration = runnerAndConfigurationSetting
    }

    fun toJsonString(inputMap: Map<String, String>): String {
        return Gson().toJson(inputMap)
    }

    fun toMap(inputJson: String?): Map<String, String> {
        return if (inputJson.isNullOrBlank())
            emptyMap()
        else
            Gson().fromJson(inputJson, Map::class.java) as Map<String, String>
    }
}
