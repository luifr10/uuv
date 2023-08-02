package com.e2etesting.uuv.intellijplugin

import com.e2etesting.uuv.intellijplugin.model.DEFAULT_TARGET_SCRIPT
import com.intellij.execution.configurations.RunConfigurationOptions
import com.intellij.openapi.components.StoredProperty

class UUVRunConfigurationOptions : RunConfigurationOptions() {
    private val useLocalScriptProperty: StoredProperty<Boolean> = property(false).provideDelegate(this, "useLocalScript")
    private val targetScriptProperty: StoredProperty<String?> = string(DEFAULT_TARGET_SCRIPT.name).provideDelegate(this, "targetScript")

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
}

