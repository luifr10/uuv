package com.e2etesting.uuv.intellijplugin

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
        return os.indexOf("win") >= 0
    }

    fun getOs(): String {
        return System.getProperty("os.name").lowercase(Locale.getDefault())
    }
}