package com.e2etesting.uuv.intellijplugin.message

import com.intellij.DynamicBundle
import org.jetbrains.annotations.Nls
import org.jetbrains.annotations.NonNls
import org.jetbrains.annotations.PropertyKey
import java.util.function.Supplier

internal object UiMessage {
    private const val FILE: @NonNls String = "messages.uiMessage"
    private val INSTANCE = DynamicBundle(UiMessage::class.java, FILE)
    fun message(key: @PropertyKey(resourceBundle = FILE) String, vararg params: Any): @Nls String {
        return INSTANCE.getMessage(key, *params)
    }

    fun messagePointer(key: @PropertyKey(resourceBundle = FILE) String, vararg params: Any): Supplier<String> {
        return INSTANCE.getLazyMessage(key, *params)
    }
}
