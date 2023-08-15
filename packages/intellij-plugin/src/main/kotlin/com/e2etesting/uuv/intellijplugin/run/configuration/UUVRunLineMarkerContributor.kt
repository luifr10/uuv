package com.e2etesting.uuv.intellijplugin.run.configuration

import com.e2etesting.uuv.intellijplugin.action.UUVRunAction
import com.intellij.execution.TestStateStorage
import com.intellij.execution.lineMarker.RunLineMarkerContributor
import com.intellij.psi.PsiElement
import com.intellij.psi.impl.source.tree.LeafElement
import com.intellij.psi.tree.TokenSet
import com.intellij.psi.util.PsiUtilCore
import org.jetbrains.plugins.cucumber.psi.GherkinFile
import org.jetbrains.plugins.cucumber.psi.GherkinTokenTypes


class UUVRunLineMarkerContributor: RunLineMarkerContributor() {
    private val RUN_LINE_MARKER_ELEMENTS = TokenSet
            .create(GherkinTokenTypes.FEATURE_KEYWORD)
    override fun getInfo(element: PsiElement): Info? {
        if (element !is LeafElement) {
            return null
        }

        if (element.containingFile !is GherkinFile) return null

        if (!RUN_LINE_MARKER_ELEMENTS.contains(PsiUtilCore.getElementType(element as PsiElement))) {
            return null
        }

        val state = getTestStateStorage(element)
        return getInfo(state, element)
    }

    private fun getTestStateStorage(element: PsiElement): TestStateStorage.Record? {
        val url = element.containingFile.virtualFile.url
        return TestStateStorage.getInstance(element.project).getState('"' + url + '"')
    }

    private fun getInfo(state: TestStateStorage.Record?, element: PsiElement)
            = Info(
                getTestStateIcon(state, false),
                arrayOf(UUVRunAction("Run UUV Tests", element.containingFile.virtualFile.canonicalPath))
            ) { "Run UUV Tests" }
}