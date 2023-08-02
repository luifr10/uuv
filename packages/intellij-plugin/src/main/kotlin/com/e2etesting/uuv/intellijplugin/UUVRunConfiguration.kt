package com.e2etesting.uuv.intellijplugin

import com.intellij.execution.DefaultExecutionResult
import com.intellij.execution.ExecutionException
import com.intellij.execution.ExecutionResult
import com.intellij.execution.Executor
import com.intellij.execution.configurations.*
import com.intellij.execution.process.*
import com.intellij.execution.runners.ExecutionEnvironment
import com.intellij.execution.runners.ProgramRunner
import com.intellij.execution.testframework.sm.SMTestRunnerConnectionUtil
import com.intellij.execution.testframework.sm.ServiceMessageBuilder
import com.intellij.execution.testframework.sm.runner.*
import com.intellij.openapi.options.SettingsEditor
import com.intellij.openapi.project.Project
import com.intellij.openapi.util.Disposer
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

    override fun getConfigurationEditor(): SettingsEditor<out UUVRunConfiguration?> {
        return UUVRunSettingsEditor()
    }

    override fun checkConfiguration() {}

    override fun getState(executor: Executor, executionEnvironment: ExecutionEnvironment): RunProfileState? {
        return object : CommandLineState(executionEnvironment) {

            override fun execute(executor: Executor, runner: ProgramRunner<*>): ExecutionResult {
                val processHandler: ProcessHandler = startProcess()
                val properties = SMTRunnerConsoleProperties(this@UUVRunConfiguration, "UUV", executor)
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
                // TODO Replace cmd by os
                val envParameter = "--env={'enableTeamcityLogging':true}";
                return if (!useLocalScript) {
                    GeneralCommandLine("npx.cmd", "uuv", targetScript, envParameter)
                } else {
                    GeneralCommandLine("npm.cmd", "run", "uuv:${targetScript}", "--", envParameter)
                }
            }
        }
    }
}
