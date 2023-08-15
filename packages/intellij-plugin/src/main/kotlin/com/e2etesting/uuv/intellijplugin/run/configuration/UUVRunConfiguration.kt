package com.e2etesting.uuv.intellijplugin.run.configuration

import com.e2etesting.uuv.intellijplugin.UUVUtils
import com.e2etesting.uuv.intellijplugin.run.console.UUVConsoleProperties
import com.intellij.execution.DefaultExecutionResult
import com.intellij.execution.ExecutionException
import com.intellij.execution.ExecutionResult
import com.intellij.execution.Executor
import com.intellij.execution.configurations.*
import com.intellij.execution.process.*
import com.intellij.execution.runners.ExecutionEnvironment
import com.intellij.execution.runners.ProgramRunner
import com.intellij.execution.testframework.sm.SMTestRunnerConnectionUtil
import com.intellij.execution.testframework.sm.runner.*
import com.intellij.openapi.options.SettingsEditor
import com.intellij.openapi.project.Project
import io.ktor.utils.io.charsets.*


class UUVRunConfiguration(project: Project?, factory: ConfigurationFactory?, name: String?) : RunConfigurationBase<UUVRunConfigurationOptions?>(project!!, factory, name) {
    override fun getOptions(): UUVRunConfigurationOptions {
        return super.getOptions() as UUVRunConfigurationOptions
    }

    var useLocalScript: Boolean
        get() = options.useLocalScript
        set(useLocalScript) {
            options.useLocalScript = useLocalScript;
        }

    var targetScript: String?
        get() = options.targetScript
        set(targetScript) {
            options.targetScript = targetScript
        }

    var targetTestFile: String?
        get() = options.targetTestFile
        set(targetTestFile) {
            options.targetTestFile = targetTestFile
        }

    override fun getConfigurationEditor(): SettingsEditor<out UUVRunConfiguration?> {
        return UUVRunSettingsEditor()
    }

    override fun checkConfiguration() {}

    override fun getState(executor: Executor, executionEnvironment: ExecutionEnvironment): RunProfileState? {
        return object : CommandLineState(executionEnvironment) {

            override fun execute(executor: Executor, runner: ProgramRunner<*>): ExecutionResult {
                val properties = UUVConsoleProperties(this@UUVRunConfiguration, "UUV", executor)
                val processHandler: ProcessHandler = startProcess()
                val uuvConsole = SMTestRunnerConnectionUtil.createAndAttachConsole("UUV", processHandler, properties)
                return DefaultExecutionResult(uuvConsole, processHandler)
            }

            @Throws(ExecutionException::class)
            override fun startProcess(): ProcessHandler {
                val commandLine = getCommandLineToExecute()
                        .withEnvironment("PATH", System.getenv("PATH"))
                        .withWorkDirectory(executionEnvironment.project.basePath)
                        .withCharset(Charset.forName("UTF-8"))
                val processHandler = ProcessHandlerFactory.getInstance().createColoredProcessHandler(commandLine)
                ProcessTerminatedListener.attach(processHandler)
                return processHandler
            }

            private fun getCommandLineToExecute(): GeneralCommandLine {
                val envParameter = "--env={'enableTeamcityLogging':true}";

                val parameters: MutableList<String> = arrayOf(envParameter).toMutableList()
                if(this@UUVRunConfiguration.targetTestFile != null) {
                    parameters.add("--targetTestFile=${this@UUVRunConfiguration.targetTestFile}")
                }

                return if (!useLocalScript) {
                    GeneralCommandLine(getNpxCommand(), "uuv", targetScript, *parameters.toTypedArray())
                } else {
                    GeneralCommandLine(getNpmCommand(), "run", "uuv:${targetScript}", "--", *parameters.toTypedArray())
                }
            }

            fun getNpxCommand(): String {
                return if(UUVUtils.isWindows(UUVUtils.getOs())) "npx.cmd" else "npx"
            }

            fun getNpmCommand(): String {
                return if(UUVUtils.isWindows(UUVUtils.getOs())) "npm.cmd" else "npm"
            }
        }
    }
}
