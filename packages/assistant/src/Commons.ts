import React from "react";

export const UUV_ASSISTANT_BAR_WIDTH = 60;

export type ResultSentence = {
  key: React.Key;
  result: string
}

export class Suggestion {
  constructor(public accessibleAttribute: string = "", public accessibleValue = "", public code = "", public sentenceAfterCorrection: string[] = []) {
  }
}

export enum VisibilityEnum {
  HIDE = "hide", WITH_RESULT = "withResult", WITHOUT_RESULT = "withoutResult"
}

export enum ActionEnum {
  NONE = "No action",
  WITHIN = "Within",
  EXPECT = "Expect",
  CLICK = "Click",
  KEYBOARD_GLOBAL_NAVIGATION = "Keyboard Navigation"
}

export enum KeyboardNavigationModeEnum {
  NONE = "No navigation",
  CURRENT_NAVIGATION = "currentNavigation",
  EXPECTED_NAVIGATION = "expectedNavigation",
}

export enum AdditionalLayerEnum {
  CURRENT_NAVIGATION = "keyboard-layer-current-navigation",
  EXPECTED_NAVIGATION = "keyboard-layer-expected-navigation",
}
