package com.e2etesting.uuv.intellijplugin.run.console

import com.intellij.execution.Executor
import com.intellij.execution.configurations.RunConfiguration
import com.intellij.execution.testframework.TestConsoleProperties
import com.intellij.execution.testframework.sm.runner.SMTRunnerConsoleProperties
import com.intellij.execution.testframework.sm.runner.SMTestLocator
import com.intellij.openapi.util.NlsSafe
import org.jetbrains.annotations.NotNull

class UUVConsoleProperties(@NotNull config: RunConfiguration, @NlsSafe @NotNull testFrameworkName: String, @NotNull executor: Executor) : SMTRunnerConsoleProperties(config, testFrameworkName, executor) {
    init {
        this.setValueOf(TestConsoleProperties.HIDE_PASSED_TESTS, false)
    }
    override fun getTestLocator(): SMTestLocator {
        return UUVTestLocator.INSTANCE
    }
}