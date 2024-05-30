/**
 * Software Name : UUV
 *
 * SPDX-FileCopyrightText: Copyright (c) Orange SA
 * SPDX-License-Identifier: MIT
 *
 * This software is distributed under the MIT License,
 * see the "LICENSE" file for more details
 *
 * Authors: NJAKO MOLOM Louis Fredice & SERVICAL Stanley
 * Software description: Make test writing fast, understandable by any human
 * understanding English or French.
 */

import React, { useEffect, useState } from "react";
import uuvLogoJson from "./assets/uuvLogo.json";
import mouseIcon from "./assets/mouse.json";
import keyboardIcon from "./assets/keyboard.json";

import { BaseSentence, StepCaseEnum, TranslateHelper, TranslateSentences } from "./helper/TranslateHelper";
import {
  Avatar,
  Button,
  ConfigProvider,
  Divider,
  Flex,
  Layout,
  Menu,
  MenuProps,
  message,
  RadioChangeEvent,
  Spin,
  theme,
  Tooltip,
  Typography
} from "antd";
import { CloseOutlined, CopyOutlined, DoubleLeftOutlined, DoubleRightOutlined } from "@ant-design/icons";
import { StyleProvider } from "@ant-design/cssinjs";
import { CssHelper } from "./helper/CssHelper";
import { FocusableElement, tabbable } from "tabbable";

import CodeMirror, { EditorView, Extension, gutter } from "@uiw/react-codemirror";
import { StreamLanguage } from "@codemirror/language";
import { gherkin } from "@codemirror/legacy-modes/mode/gherkin";
import { githubDark } from "@uiw/codemirror-theme-github";

import { enSentences } from "@uuv/runner-commons/wording/web/en";
import { KeyboardNavigationHelper } from "./helper/KeyboardNavigationHelper";
import { buildResultingScript, buildUuvGutter } from "./helper/ResultScriptHelper";
import { ActionEnum, AdditionalLayerEnum, KeyboardNavigationModeEnum, ResultSentence, Suggestion, VisibilityEnum } from "./Commons";

const { Sider } = Layout;
const { Text } = Typography;
type MenuItem = Required<MenuProps>["items"][number];

type UuvAssistantProps = {
  translator?: (el: FocusableElement) => string;
  assistantRoot: ShadowRoot;
  assistantAdditionalLayersRoot: ShadowRoot;
}

/* eslint-disable  @typescript-eslint/no-explicit-any */
function UuvAssistant(props: UuvAssistantProps) {
  const [generatedScript, setGeneratedScript] = useState<string>("");
  const [disabledElement, setDisabledElement] = useState("");
  const [selectedAction, setSelectedAction] = useState(ActionEnum.NONE);
  const [displayedResult, setDisplayedResult] = useState(ActionEnum.NONE);
  const [visibility, setVisibility] = useState(VisibilityEnum.WITHOUT_RESULT);
  const [isDark, setIsDark] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [uuvGutter, setUuvGutter] = useState<Extension>(gutter({}));
  const [currentKeyboardNavigation, setCurrentKeyboardNavigation] = useState<FocusableElement[]>([]);
  const [expectedKeyboardNavigation, setExpectedKeyboardNavigation] = useState<FocusableElement[]>([]);
  const [displayedKeyboardNavigation, setDisplayedKeyboardNavigation] = useState<KeyboardNavigationModeEnum>(KeyboardNavigationModeEnum.NONE);

  const jsonBase: BaseSentence[] = enSentences;
  const Inspector = require("inspector-dom");
  const inspector = Inspector({
    root: "body",
    outlineStyle: "2px solid red",
    onClick: (el: HTMLElement) => {
      console.log("value", selectedAction);
      translate(el, selectedAction).then((translateSentences) => {
        setVisibility(VisibilityEnum.WITH_RESULT);
        const data = translateSentences.sentences.map((elem, key) => {
          return {
            key: key as React.Key,
            result: elem
          } as ResultSentence;
        });
        setGeneratedScript(
         buildResultingScript(
          "Your amazing feature name",
          `Action - ${selectedAction}`,
          data.map(sentence => sentence.result)
         )
        );
        inspector.cancel();
        setDisplayedResult(selectedAction);
        setSelectedAction(ActionEnum.NONE);
        endLoading();
      });
    }
  });

  /* eslint-disable */
  useEffect(() => {
    return () => {
      reset();
    };
  }, []);

  useEffect(() => {
    setUuvGutter(
     buildUuvGutter()
    );
  }, [generatedScript]);

  useEffect(() => {
    KeyboardNavigationHelper.removeLayerToShadowDom(props.assistantAdditionalLayersRoot, AdditionalLayerEnum.CURRENT_NAVIGATION);
    KeyboardNavigationHelper.removeLayerToShadowDom(props.assistantAdditionalLayersRoot, AdditionalLayerEnum.EXPECTED_NAVIGATION);
    switch (selectedAction) {
      case ActionEnum.WITHIN:
      case ActionEnum.EXPECT:
      case ActionEnum.CLICK:
        startSelect();
        break;
      case ActionEnum.KEYBOARD_GLOBAL_NAVIGATION:
        setDisplayedKeyboardNavigation(KeyboardNavigationModeEnum.NONE);
        keyboardNavigation().then(currentKeyboardFocusableElements => {
          if (currentKeyboardFocusableElements) {
            setDisplayedKeyboardNavigation(KeyboardNavigationModeEnum.CURRENT_NAVIGATION);
            setVisibility(VisibilityEnum.WITH_RESULT);
            setDisplayedResult(ActionEnum.KEYBOARD_GLOBAL_NAVIGATION);
            setSelectedAction(ActionEnum.NONE);
          }
        });
        break;
      case ActionEnum.NONE:
      default:
        break;
    }
  }, [selectedAction]);

  useEffect(() => {
    if (displayedKeyboardNavigation !== KeyboardNavigationModeEnum.NONE) {
      let keyboardNavigationElement;
      if (displayedKeyboardNavigation === KeyboardNavigationModeEnum.CURRENT_NAVIGATION) {
        KeyboardNavigationHelper.switchKeyboardLayer(props.assistantAdditionalLayersRoot, AdditionalLayerEnum.CURRENT_NAVIGATION, currentKeyboardNavigation);
        keyboardNavigationElement = currentKeyboardNavigation;
      } else {
        KeyboardNavigationHelper.switchKeyboardLayer(props.assistantAdditionalLayersRoot, AdditionalLayerEnum.EXPECTED_NAVIGATION, expectedKeyboardNavigation);
        keyboardNavigationElement = expectedKeyboardNavigation
      }
      buildKeyboardNavigationResultSentence(keyboardNavigationElement).then(resultSentences => {
        setGeneratedScript(
            buildResultingScript(
                "Your amazing feature name",
                "Keyboard Navigation",
                resultSentences.map(sentence => sentence.result)
            )
        );
        endLoading();
      });
    }
  }, [displayedKeyboardNavigation]);

  function reset() {
    inspector.cancel();
    setDisplayedResult(selectedAction);
    setSelectedAction(ActionEnum.NONE);
    setDisabledElement("");
    setIsDark(true);
    setVisibility(VisibilityEnum.WITHOUT_RESULT);
    endLoading();
  }

  const copyResult = () => {
    if (generatedScript.length > 0) {
      navigator.clipboard.writeText(generatedScript);
      message.success({
        content: "Result copied to the clipboard"
      });
    }
  };

  function startSelect() {
    const removeDisableHandler = clickOnDisabledElementFeature();
    document.addEventListener("mouseover", removeDisableHandler);
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        reset();
      }
    });
    inspector.enable();
  }

  function clickOnDisabledElementFeature() {
    return (e: MouseEvent): void => {
      e.preventDefault();
      const element = document.elementFromPoint(e.clientX, e.clientY);
      let internalDisabledElement = disabledElement;
      if (selectedAction !== ActionEnum.NONE && element && element.hasAttribute("disabled")) {
        internalDisabledElement = TranslateHelper.getSelector(element);
        element.removeAttribute("disabled");
        element.setAttribute("readonly", "true");
        setDisabledElement(internalDisabledElement);
      } else {
        if (internalDisabledElement) {
          const querySelector = document.querySelector(internalDisabledElement);
          querySelector?.setAttribute("disabled", "true");
          querySelector?.removeAttribute("readonly");
          setDisabledElement("");
        }
      }
    };
  }

  async function buildKeyboardNavigationResultSentence(focusableElements: FocusableElement[]) {
    const sentences: string[] = [];
    const startKeyboardNavigationSentence = jsonBase.find((el: BaseSentence) => el.key === "key.given.keyboard.startNavigationFromTheTop");
    if (startKeyboardNavigationSentence) {
      sentences.push(StepCaseEnum.AND + startKeyboardNavigationSentence.wording);
    }
    const promises = focusableElements.map(async (node, index, focusableElements) => {
      const focusBySelectorControlSentence = jsonBase
          .find((el: BaseSentence) => el.key === "key.then.element.withSelectorFocused");
      const focusByRoleAndNameControlSentence = jsonBase
          .find((el: BaseSentence) => el.key === "key.then.element.withRoleAndNameFocused");

      if (focusBySelectorControlSentence && focusByRoleAndNameControlSentence) {
        const result = await translate(node, ActionEnum.KEYBOARD_GLOBAL_NAVIGATION);
        result.sentences.forEach((element) => {
          sentences.push(element);
        });
      } else {
        console.error("sentences next focus element or check focused element is undefined");
      }
      return Promise.resolve("");
    });
    await Promise.all(promises);
    return sentences.map((elem, key) => {
      return {
        key: key as React.Key,
        result: elem
      } as ResultSentence;
    });
  }

  function extractExpectedKeyboardNavigation(currentKeyboardFocusableElements: FocusableElement[]) {
    return [...currentKeyboardFocusableElements].sort((a: FocusableElement, b: FocusableElement) => {
      const leftRect = a.getBoundingClientRect();
      const rightRect = b.getBoundingClientRect();
      if (leftRect.y < rightRect.y) {
        return -1;
      }
      if (leftRect.y === rightRect.y && leftRect.x < rightRect.x) {
        return -1;
      }
      return 1;
    });
  }

  async function keyboardNavigation() {
    const currentKeyboardFocusableElements = tabbable(document.body, {});
    setCurrentKeyboardNavigation(currentKeyboardFocusableElements);
    const expectedKeyboardFocusableElements = extractExpectedKeyboardNavigation(currentKeyboardFocusableElements);
    setExpectedKeyboardNavigation(expectedKeyboardFocusableElements);
    return currentKeyboardFocusableElements;
  }

  async function translate(el: FocusableElement, action: string): Promise<TranslateSentences> {
    console.debug("translator,", props.translator);
    if (props.translator) {
      return Promise.resolve({ sentences: [props.translator(el)] } as TranslateSentences);
    }
    const translate = await TranslateHelper.translateEngine(el, action, disabledElement !== "");
    const result: TranslateSentences = { suggestion: new Suggestion() } as TranslateSentences;
    result.sentences = translate.sentences;
    return Promise.resolve(result);
  }

  const handleMouseNavigationChoice = (newValue: ActionEnum) => {
    setVisibility(VisibilityEnum.HIDE);
    setIsLoading(true);
    setSelectedAction(newValue);
  };

  function handleKeyboardNavigationChoice() {
    setIsLoading(true);
    setDisplayedKeyboardNavigation(KeyboardNavigationModeEnum.NONE);
    setSelectedAction(ActionEnum.KEYBOARD_GLOBAL_NAVIGATION);
  }

  function getItem(
   label: React.ReactNode,
   key: React.Key,
   disabled: boolean,
   onClick?: Function,
   icon?: React.ReactNode,
   children?: MenuItem[]
  ): MenuItem {
    return {
      key,
      icon,
      disabled,
      children,
      label,
      onClick
    } as MenuItem;
  }

  function getAsideParentInHierarchy(triggerNode: HTMLElement) {
    let parent = triggerNode.parentElement;
    while (parent !== null) {
      if (parent.id === "uuvAssistantMenu") {
        return parent;
      }
      parent = parent.parentElement;
    }
    return document.body;
  }

  const actionMenuItems: MenuItem[] = [
    getItem(
      "Mouse actions",
      "mouse-actions",
      false,
      () => {},
        <div className={"menu-custom-svg-container"}><img src={CssHelper.getBase64File(mouseIcon)} aria-hidden={true} alt="" className={"menu-custom-svg-from-black-to-white"}/></div>,
      [
        getItem(ActionEnum.EXPECT.toString(), ActionEnum.EXPECT, false, () => {
          handleMouseNavigationChoice(ActionEnum.EXPECT);
        }),
        getItem(ActionEnum.CLICK.toString(), ActionEnum.CLICK, false, () => {
          handleMouseNavigationChoice(ActionEnum.CLICK);
        }),
        getItem(ActionEnum.WITHIN.toString(), ActionEnum.WITHIN, false, () => {
          handleMouseNavigationChoice(ActionEnum.WITHIN);
        })
      ]
    ),
    getItem(
      "Keyboard actions",
      "keyboard-actions",
      false,
      () => {},
      <div className={"menu-custom-svg-container"}><img src={CssHelper.getBase64File(keyboardIcon)} aria-hidden={true} alt="" className={"menu-custom-svg-from-black-to-white"}/></div>,
      [
        getItem("Keyboard navigation", "KeybNav", false, () => {
          handleKeyboardNavigationChoice();
        })
      ]
    )
  ];

  function endLoading() {
    setTimeout(() => setIsLoading(false), 100);
  }

  function switchKeyboardNavigationMode({ target: { value } }: RadioChangeEvent): void {
    setIsLoading(true);
    setGeneratedScript("");
    setTimeout(() => setDisplayedKeyboardNavigation(value as KeyboardNavigationModeEnum));
  }

  function getBottomButtonLabel() {
    return visibility === VisibilityEnum.WITH_RESULT ? "Close result view" : "Open result view";
  }

  return (
   <div id='uuvAssistantMenu'>
     <StyleProvider container={props.assistantRoot}>
       <ConfigProvider
        theme={{
          algorithm: isDark ? theme.darkAlgorithm : theme.defaultAlgorithm,
          token: {
            fontSize: 18,
            zIndexBase: 9999999989,
            zIndexPopupBase: 9999999999
          }
        }}
       >
       {visibility === VisibilityEnum.WITH_RESULT ?
          <Flex id='uuvAssistantResultZone' vertical={true}>
            <header>
              <Flex justify={"space-between"} align={"center"}>
                <Typography.Title level={2}>Result of <span className={"secondary"}>{displayedResult.toString()}</span></Typography.Title>
                <Tooltip placement='bottom' title='Close' getPopupContainer={(triggerNode) => getAsideParentInHierarchy(triggerNode)}>
                  <Button type='link' shape='circle' icon={<CloseOutlined />} className='primary' onClick={() => {
                    KeyboardNavigationHelper.removeLayerToShadowDom(props.assistantAdditionalLayersRoot, AdditionalLayerEnum.CURRENT_NAVIGATION);
                    KeyboardNavigationHelper.removeLayerToShadowDom(props.assistantAdditionalLayersRoot, AdditionalLayerEnum.EXPECTED_NAVIGATION);
                    setVisibility(VisibilityEnum.WITHOUT_RESULT);
                  }} />
                </Tooltip>
              </Flex>
            </header>
            <div id={"toolbar"}>
              <Flex justify={"space-between"} align={"center"}>
                <Tooltip placement='bottom' title='Copy' getPopupContainer={(triggerNode) => getAsideParentInHierarchy(triggerNode)}>
                  <Button type='link' shape='circle' icon={<CopyOutlined />} className='primary' disabled={generatedScript.length === 0} onClick={copyResult} />
                </Tooltip>
                {/*{displayedResult === ActionEnum.KEYBOARD_GLOBAL_NAVIGATION ?*/}
                {/*  <Radio.Group*/}
                {/*     options={[*/}
                {/*       { label: 'Current', title: "Current navigation", value: KeyboardNavigationModeEnum.CURRENT_NAVIGATION },*/}
                {/*       { label: 'Expected', title: "Navigation based on element position", value: KeyboardNavigationModeEnum.EXPECTED_NAVIGATION }*/}
                {/*     ]}*/}
                {/*     optionType="button"*/}
                {/*     buttonStyle="solid"*/}
                {/*     value={displayedKeyboardNavigation}*/}
                {/*     onChange={switchKeyboardNavigationMode}*/}
                {/*  />*/}
                {/*  : ""}*/}
              </Flex>
            </div>
            <CodeMirror
             readOnly={true}
             indentWithTab={true}
             value={generatedScript}
             height='100%'
             extensions={[
               StreamLanguage.define(gherkin),
               EditorView.lineWrapping,
               uuvGutter,
               EditorView.contentAttributes.of({ "aria-label": "Generated UUV Script" })
             ]}
             theme={githubDark}
             aria-label={"tot"}
            />
          </Flex>
          : ""}
         {visibility !== VisibilityEnum.HIDE ?
          <Sider
           reverseArrow={true}
           defaultCollapsed={true}
           id={"uuvAssistantMainBar"}
           onCollapse={(value) => {
             if (value) {
             setVisibility(VisibilityEnum.WITHOUT_RESULT)
             } else {
               setVisibility(VisibilityEnum.WITH_RESULT)
             }
           }}>
            <Flex align={"center"} vertical={true}>
              <Flex align={"center"} vertical={true} className={"uuvAssistantAvatarContainer"}>
                <Avatar className={"uuvAssistantAvatar"} size='large'>
                  <Tooltip placement='top' title='Go to steps definition'
                           getPopupContainer={(triggerNode) => getAsideParentInHierarchy(triggerNode)}>
                    <a href='https://orange-opensource.github.io/uuv/docs/category/description-of-sentences'>
                      <img
                       src={CssHelper.getBase64File(uuvLogoJson)}
                       alt='UUV logo'
                       className={"uuvAssistantIcon"}
                      />
                    </a>
                  </Tooltip>
                </Avatar>
                <Text className='uuvAssistantTitle'>UUV</Text>
              </Flex>
              <Divider />
                {!isLoading ?
                    <React.Fragment>
                      <Menu
                        mode="inline"
                        items={actionMenuItems}
                        getPopupContainer={(triggerNode) => getAsideParentInHierarchy(triggerNode)}
                      />
                      <Divider/>
                      <Tooltip placement="left" title={getBottomButtonLabel()}
                               getPopupContainer={(triggerNode) => getAsideParentInHierarchy(triggerNode)}>
                        <Button
                            size={"large"}
                            type={"link"}
                            block={true}
                            style={{ background: "#001529", bottom: 0 }}
                            icon={
                              visibility === VisibilityEnum.WITH_RESULT
                                ? <DoubleRightOutlined aria-hidden={true}/>
                                : <DoubleLeftOutlined aria-hidden={true}/>
                            }
                            onClick={() => setVisibility(
                                visibility === VisibilityEnum.WITH_RESULT ?
                                    VisibilityEnum.WITHOUT_RESULT :
                                    VisibilityEnum.WITH_RESULT
                            )}
                            aria-label={getBottomButtonLabel()}
                        />
                      </Tooltip>
                    </React.Fragment>
                : <Spin tip='Loading' size='large' spinning={isLoading} /> }
            </Flex>
          </Sider>
          : ""}
       </ConfigProvider>
     </StyleProvider>
   </div>
  );
}

export default UuvAssistant;
