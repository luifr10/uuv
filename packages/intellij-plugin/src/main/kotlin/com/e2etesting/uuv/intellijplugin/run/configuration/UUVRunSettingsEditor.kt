package com.e2etesting.uuv.intellijplugin.run.configuration

import com.e2etesting.uuv.intellijplugin.model.UUVTargetScript
import com.intellij.openapi.options.SettingsEditor
import com.intellij.openapi.ui.CheckBoxWithDescription
import com.intellij.openapi.ui.LabeledComponent
import com.intellij.util.ui.ComboBoxWithHistory
import java.awt.BorderLayout
import java.awt.FlowLayout
import java.awt.GridLayout
import javax.swing.JCheckBox
import javax.swing.JComponent
import javax.swing.JPanel
import javax.swing.JTextField

class UUVRunSettingsEditor : SettingsEditor<UUVRunConfiguration>() {
    private val mainPanel: JPanel = JPanel()
    private var useLocalScript: LabeledComponent<CheckBoxWithDescription>? = null
    private var targetScript: LabeledComponent<ComboBoxWithHistory>? = null
    private var targetTestFile: LabeledComponent<JTextField>? = null

    override fun resetEditorFrom(uuvRunConfiguration: UUVRunConfiguration) {
        useLocalScript!!.component.checkBox.isSelected = uuvRunConfiguration.useLocalScript
        targetScript!!.component.selectedItem = uuvRunConfiguration.targetScript
        targetTestFile!!.component.text = uuvRunConfiguration.targetTestFile
    }

    override fun applyEditorTo(uuvRunConfiguration: UUVRunConfiguration) {
        uuvRunConfiguration.useLocalScript = useLocalScript!!.component.checkBox.isSelected
        uuvRunConfiguration.targetScript = targetScript!!.component.editor.item as String
        uuvRunConfiguration.targetTestFile = targetTestFile!!.component.text
    }

    override fun createEditor(): JComponent {
        mainPanel.layout = GridLayout(3,1, 0, 5)
        this.createUIComponents()
        return mainPanel
    }

    private fun createUIComponents() {
        val targetScriptPanel = JPanel()
        targetScript = LabeledComponent.create(ComboBoxWithHistory("targetScript", UUVTargetScript.values().map { it.name }.toTypedArray()), "Target script", BorderLayout.WEST)
        targetScriptPanel.layout = FlowLayout(FlowLayout.LEFT)
        targetScriptPanel.add(targetScript)
        mainPanel.add(targetScriptPanel)


        val useLocalScriptPanel = JPanel()
        useLocalScript = LabeledComponent.create(CheckBoxWithDescription(JCheckBox(), null), "Use local npm script", BorderLayout.WEST)
        useLocalScriptPanel.layout = FlowLayout(FlowLayout.LEFT)
        useLocalScriptPanel.add(useLocalScript)
        mainPanel.add(useLocalScriptPanel)

        val targetTestFilePanel = JPanel()
        targetTestFile = LabeledComponent.create(JTextField(50), "Target test file", BorderLayout.WEST)
        targetTestFilePanel.layout = FlowLayout(FlowLayout.LEFT)
        targetTestFilePanel.add(targetTestFile)
        mainPanel.add(targetTestFilePanel)
    }
}
