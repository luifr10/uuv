package com.e2etesting.uuv.intellijplugin

import com.e2etesting.uuv.intellijplugin.message.UiMessage
import com.intellij.openapi.util.IconLoader

object UUVIcons {
    @JvmField val Action = IconLoader.getIcon(UiMessage.message("icon"), javaClass)
}
