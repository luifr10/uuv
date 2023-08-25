package com.e2etesting.uuv.intellijplugin.run.console

import com.e2etesting.uuv.intellijplugin.message.TechMessage
import com.intellij.execution.Location
import com.intellij.execution.PsiLocation
import com.intellij.execution.testframework.sm.runner.SMTestLocator
import com.intellij.openapi.project.Project
import com.intellij.openapi.vfs.VfsUtil
import com.intellij.psi.PsiFile
import com.intellij.psi.PsiManager
import com.intellij.psi.search.GlobalSearchScope
import com.intellij.util.containers.ContainerUtil
import org.jetbrains.annotations.NotNull
import org.jetbrains.annotations.Nullable
import java.io.File

class UUVTestLocator : SMTestLocator {
    override fun getLocation(protocol: String, path: String, project: Project, scope: GlobalSearchScope): MutableList<Location<*>> {
        val location: Location<PsiFile>? = when (protocol) {
            PROTOCOL_ID__CONFIG_FILE -> getConfigLocation(project, path)
            PROTOCOL_ID__TEST_SUITE -> getTestLocation(project, path, true)
            PROTOCOL_ID__TEST -> getTestLocation(project, path, false)
            else -> null
        }
        return ContainerUtil.createMaybeSingletonList(location)
    }

    companion object {
        private val PROTOCOL_ID__CONFIG_FILE = TechMessage.message("protocol.id.configfile")
        private val PROTOCOL_ID__TEST_SUITE = TechMessage.message("protocol.id.testsuite")
        private val PROTOCOL_ID__TEST = TechMessage.message("protocol.id.test")
        val INSTANCE = UUVTestLocator()
        @Nullable
        private fun getConfigLocation(project: Project, @NotNull locationData: String): Location<PsiFile>? {
            val virtualFile = VfsUtil.findFileByIoFile(File(locationData), false)
            if (virtualFile != null && virtualFile.isValid) {
                val psiFile = PsiManager.getInstance(project).findFile(virtualFile)
                if (psiFile != null && psiFile.isValid) {
                    return PsiLocation.fromPsiElement(psiFile)
                }
            }
            return null
        }

        @Nullable
        private fun getTestLocation(project: Project, @NotNull locationData: String, isSuite: Boolean): Location<PsiFile>? {
            project.basePath?.let {
                val virtualFile = VfsUtil.findRelativeFile(locationData, VfsUtil.findFileByIoFile(file(it), true))
                if (virtualFile != null && virtualFile.isValid) {
                    val psiFile = PsiManager.getInstance(project).findFile(virtualFile)
                    if (psiFile != null && psiFile.isValid) {
                        return PsiLocation.fromPsiElement(psiFile)
                    }
                }
            }
            return null
        }

        private fun file(locationData: String) = File(locationData)
    }
}
