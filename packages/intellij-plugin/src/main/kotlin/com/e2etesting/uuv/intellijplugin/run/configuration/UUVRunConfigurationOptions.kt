package com.e2etesting.uuv.intellijplugin.run.configuration

import com.e2etesting.uuv.intellijplugin.model.DEFAULT_TARGET_SCRIPT
import com.e2etesting.uuv.intellijplugin.model.DEFAULT_TARGET_TEST_FILE
import com.intellij.execution.configurations.RunConfigurationOptions
import com.intellij.openapi.components.StoredProperty

class UUVRunConfigurationOptions : RunConfigurationOptions() {
    private val useLocalScriptProperty: StoredProperty<Boolean> = property(false).provideDelegate(this, "useLocalScript")
    private val targetScriptProperty: StoredProperty<String?> = string(DEFAULT_TARGET_SCRIPT.name).provideDelegate(this, "targetScript")
    private val targetTestFileProperty: StoredProperty<String?> = string(DEFAULT_TARGET_TEST_FILE).provideDelegate(this, "targetTestFile")

    var useLocalScript: Boolean
        get() = useLocalScriptProperty.getValue(this)
        set(useLocalScript) {
            useLocalScriptProperty.setValue(this, useLocalScript)
        }

    var targetScript: String?
        get() = targetScriptProperty.getValue(this)
        set(targetScript) {
            targetScriptProperty.setValue(this, targetScript)
        }

    var targetTestFile: String?
        get() = targetTestFileProperty.getValue(this)
        set(targetTestFile) {
            targetTestFileProperty.setValue(this, targetTestFile)
        }
}

