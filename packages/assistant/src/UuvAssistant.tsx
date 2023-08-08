/**
* Software Name : UUV
*
* SPDX-FileCopyrightText: Copyright (c) 2022-2023 Orange
* SPDX-License-Identifier: MIT
*
* This software is distributed under the MIT License,
* the text of which is available at https://spdx.org/licenses/MIT.html
* or see the "LICENSE" file for more details.
*
* Authors: NJAKO MOLOM Louis Fredice & SERVICAL Stanley
* Software description: Make test writing fast, understandable by any human
* understanding English or French.
*/

import React, { useEffect, useRef, useState } from "react";
import "./UuvAssistant.css";
import uuvLogoJson from "./assets/uuvLogo.json";
import warningIconJson from "./assets/warningIcon.json";
import moonJson from "./assets/moon.json";
import sunJson from "./assets/sun.json";

import { CheckActionEnum, TranslateHelper } from "./helper/TranslateHelper";
import {
  Avatar,
  Button,
  Col,
  ConfigProvider,
  Divider,
  Drawer,
  Layout,
  notification,
  Row,
  Select,
  theme,
  Tooltip,
  Tour,
  TourProps,
  Typography
} from "antd";
import { CopyOutlined, DoubleLeftOutlined, QuestionCircleOutlined, SelectOutlined } from "@ant-design/icons";
import { CssHelper } from "./helper/CssHelper";

type UuvAssistantProps = {
  translator?: (el: HTMLElement) => string;
}

/* eslint-disable  @typescript-eslint/no-explicit-any */
function UuvAssistant(props: UuvAssistantProps) {
  const [open, setOpen] = useState<boolean>(false);
  const [generatedScript, setGeneratedScript] = useState<string[]>([]);
  const [currentAction, setCurrentAction] = useState("none");
  const [, setResultCopied] = useState(false);
  const [checkAction, setCheckAction] = useState(CheckActionEnum.EXPECT);
  const [disabledElement, setDisabledElement] = useState("");
  const [isExtended, setIsExtended] = useState(false);
  const [isDark, setIsDark] = useState(true);
  const [isHide, setIsHide] = useState(false);

  const Inspector = require("inspector-dom");
  const inspector = new Inspector({
    root: "body",
    excluded: ["#uvv-assistant-root"],
    outlineStyle: "2px solid red",
    onClick: (el: HTMLElement) => {
      const sentences = translate(el);
      setGeneratedScript(sentences);
      setCurrentAction("none");
      setIsHide(false);
      setIsExtended(true);
      inspector.cancel();
    }
  });

  /* eslint-disable */
  useEffect(() => {
    return () => {
      reset();
    };
  }, []);

  const refResize: React.MutableRefObject<any> = useRef(null);
  const refSelectMinimized: React.MutableRefObject<any> = useRef(null);
  const refCopyMinimized: React.MutableRefObject<any> = useRef(null);
  const refActionMinimized: React.MutableRefObject<any> = useRef(null);
  const refSentence: React.MutableRefObject<any> = useRef(null);
  const refSelectExtended: React.MutableRefObject<any> = useRef(null);
  const refCopyExtended: React.MutableRefObject<any> = useRef(null);
  const refActionExtended: React.MutableRefObject<any> = useRef(null);
  const refLightMode: React.MutableRefObject<any> = useRef(null);
  const refDictionnary: React.MutableRefObject<any> = useRef(null);
  const stepsBase: TourProps["steps"] = [
    {
      title: "Resize uuv assistant",
      description: "Change the size of uuv assistant for more comfort",
      target: () => refResize.current
    },
    {
      title: "Select button",
      description: "Selects a dom element and generates a uuv sentence",
      target: () => isExtended ? refSelectExtended.current : refSelectMinimized.current
    },
    {
      title: "Copy button",
      description: "Copies the generated uuv sentence to the clipboard",
      target: () => isExtended ? refCopyExtended.current : refCopyMinimized.current
    },
    {
      title: "Action button",
      description: "Selects a test action that contextualizes the generated uuv sentence, such as verification or click",
      target: () => isExtended ? refActionExtended.current : refActionMinimized.current
    }
  ];
  const stepsExtended: TourProps["steps"] = [
    {
      title: "Generated sentence",
      description: "Displays the generated uuv sentence",
      target: () => refSentence.current
    },
    {
      title: "Dark mode",
      description: "Change the dark mode",
      target: () => refLightMode.current
    },
    {
      title: "Sentences Dictionnary",
      description: "Go to sentences dictionnary",
      target: () => refDictionnary.current
    }
  ];

  function reset() {
    inspector.cancel();
    setCurrentAction("none");
    setCheckAction(CheckActionEnum.EXPECT);
    setDisabledElement("");
    setIsExtended(false);
    setIsDark(true);
  }

  const setShowResultCopiedToast = (resultCopied: boolean) => {
    setResultCopied(resultCopied);
  };

  const copyResult = () => {
    if (generatedScript.length > 0) {
      navigator.clipboard.writeText(generatedScript.join("\n"));
      setShowResultCopiedToast(true);
      notification.success({
        message: "Message",
        description:
          "Result copied to the clipboard"
      });
    }
  };

  function startSelect() {
    const removeDisableHandler = clickOnDisabledElementFeature();
    document.addEventListener("mouseover", removeDisableHandler);
    inspector.enable();
    setCurrentAction("selection");
    setIsHide(true);
  }

  function clickOnDisabledElementFeature() {
    const removeDisableHandler = (e: MouseEvent): void => {
      e.preventDefault();
      const element = document.elementFromPoint(e.clientX, e.clientY);
      let internalDisabledElement = disabledElement;
      if (currentAction === "selection" && element && element.hasAttribute("disabled")) {
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
          console.log("querySelector", disabledElement);
        }
      }
    };
    return removeDisableHandler;
  }

  function translate(el: HTMLElement): string[] {
    console.debug("translator,", props.translator);
    return props.translator
      ? [props.translator(el)]
      : TranslateHelper.translateEngine(el, checkAction, disabledElement !== "");
  }

  const handleSelectCheckActionChange = (newValue: CheckActionEnum) => {
    setCheckAction(() => newValue);
  };

  const handleChangeLightMode = () => {
    setIsDark((isDark) => !isDark);
  };

  const { Content, Sider } = Layout;
  const { Text } = Typography;
  const expander = CssHelper.expanderConfig(isDark, isExtended);
  const buttonConfig = CssHelper.buttonConfig(isDark);
  const lightMode = isDark ? CssHelper.getBase64File(sunJson) : CssHelper.getBase64File(moonJson);
  const warningIcon = CssHelper.getBase64File(warningIconJson);
  const uuvLogo = CssHelper.getBase64File(uuvLogoJson);
  const tourIcon = CssHelper.iconConfig(isDark);

  function handleGetTour() {
    if (isExtended) {
      setGeneratedScript([]);
    }
    setOpen(true);
  }

  return (
    <>
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
        <Drawer
          placement='bottom'
          open={!isHide}
          closable={false}
          className={["uuvAssistant"].join(" ")}
          height={isExtended ? 250 : 50}
          bodyStyle={{ padding: "0px", overflowY: "hidden" }}
          mask={false}
        >
          <Tooltip placement='top' title='Resize the Uuv assistant' zIndex={9999999780}>
            <Button
              ref={refResize}
              data-testid={"expanderButton"}
              onClick={() => {
                setIsExtended((isExtended) => !isExtended);
              }}
              className='uuvArrowExpander'
              icon={<DoubleLeftOutlined aria-label={expander.rotate === 90 ?
                "uvv Assistant not expanded" : "uvv Assistant expanded"}
                                        rotate={expander.rotate} spin={false} style={{ color: expander.color }} />}
              style={{
                boxShadow: expander.shadow,
                backgroundColor: expander.background
              }}>
            </Button>
          </Tooltip>
          {!isExtended ?
            <Row style={{ marginTop: "5px", marginBottom: "5px" }}>
              <Col span={23}>
                <Tooltip placement='top' title='Select an element' zIndex={9999999780}>
                  <Button
                    ref={refSelectMinimized}
                    aria-label='floating select button'
                    className='pt-0 pb-1'
                    onClick={startSelect}
                    style={{
                      background: buttonConfig.background, color: buttonConfig.color,
                      marginRight: "20px", marginLeft: "20px"
                    }}
                    disabled={currentAction === "selection"} icon={<SelectOutlined />}>
                    Select
                  </Button>
                </Tooltip>
                <Tooltip placement='top' title='Copy in clipboard' zIndex={9999999780}>
                  <Button
                    ref={refCopyMinimized}
                    aria-label='floating copy button'
                    style={{
                      background: generatedScript.length > 0 ? buttonConfig.background : "grey",
                      color: buttonConfig.color,
                      cursor: generatedScript.length > 0 ? "pointer" : "not-allowed",
                      marginRight: "20px"
                    }}
                    onClick={copyResult}
                    disabled={generatedScript.length === 0} icon={<CopyOutlined />}>
                    Copy
                  </Button>
                </Tooltip>
                <span style={{ display: "inline block", marginRight: "20px" }} ref={refActionMinimized}>
              <Select
                aria-label={"floating select list"}
                data-testid={"floatingSelectList"}
                defaultValue={checkAction}
                size='middle'
                onChange={handleSelectCheckActionChange}
                style={{
                  width: "120px"
                }}
                options={[
                  {
                    value: CheckActionEnum.EXPECT,
                    label: CheckActionEnum.EXPECT.toString()
                  },
                  {
                    value: CheckActionEnum.WITHIN,
                    label: CheckActionEnum.WITHIN.toString()
                  },
                  {
                    value: CheckActionEnum.CLICK,
                    label: CheckActionEnum.CLICK.toString()
                  }
                ]}
              />
              </span>
              </Col>
              <Col span={1}>
                <Tooltip placement='top' title='Make a tour of Uuv Assistant' zIndex={9999999780}>
                  <Avatar onClick={() => handleGetTour()}
                          icon={<QuestionCircleOutlined />}
                          style={{ cursor: "pointer", color: tourIcon.color, background: tourIcon.background }} />
                </Tooltip>
              </Col>
            </Row> : ""}
          <Layout>
            <Sider width={250} collapsible={true} collapsedWidth={0}
                   theme={isDark ? "dark" : "light"}>
              <Row align='middle' style={{ marginTop: 10, marginBottom: 20, marginLeft: 10 }}>
                <Col span={6}>
                  <Avatar
                    ref={refDictionnary}
                    style={{
                      backgroundColor: isDark ?
                        "#073a69" : "#C0C0C0", height: "50px", width: "50px"
                    }} size='large'>
                    <Tooltip placement='top' title='Go to steps definition'>
                      <a href='https://orange-opensource.github.io/uuv/docs/category/description-of-sentences'>
                        <img
                          src={uuvLogo}
                          width='40'
                          height='40'
                          alt='UUV logo'
                        />
                      </a>
                    </Tooltip>
                  </Avatar>
                </Col>
                <Col span={18}>
                  <Text strong>UUV Assistant</Text>
                </Col>
              </Row>
              <Divider />
              <Col>
                <Tooltip placement='left' title='Select an element'>
                  <Button
                    ref={refSelectExtended}
                    aria-label='select button'
                    className='m-1 pt-0 pb-1 uuvActionAside' onClick={startSelect}
                    style={{ background: buttonConfig.background, color: buttonConfig.color }}
                    disabled={currentAction === "selection"} icon={<SelectOutlined />}>
                    Select
                  </Button>
                </Tooltip>
                <Tooltip placement='left' title='Copy in clipboard'>
                  <Button
                    ref={refCopyExtended}
                    aria-label='copy button' className='uuvActionAside'
                    style={{
                      marginTop: "10px",
                      background: generatedScript.length > 0 ?
                        buttonConfig.background : "grey", color: buttonConfig.color
                    }}
                    onClick={copyResult}
                    disabled={generatedScript.length === 0} icon={<CopyOutlined />}>
                    Copy
                  </Button>
                </Tooltip>
                <Tooltip placement='left' title='Choose the generated action'>
                  <span style={{ display: "inline block", marginRight: "20px" }} ref={refActionExtended}>
                    <Select
                      aria-label='select list expanded'
                      data-testid='selectListExpanded'
                      defaultValue={checkAction}
                      size='large'
                      onChange={handleSelectCheckActionChange}
                      style={{ marginTop: "10px" }}
                      className='uuvActionAside'
                      options={[
                        {
                          value: CheckActionEnum.EXPECT.toString(),
                          label: CheckActionEnum.EXPECT.toString()
                        },
                        {
                          value: CheckActionEnum.WITHIN.toString(),
                          label: CheckActionEnum.WITHIN.toString()
                        },
                        {
                          value: CheckActionEnum.CLICK.toString(),
                          label: CheckActionEnum.CLICK.toString()
                        }
                      ]}
                    />
                  </span>
                </Tooltip>
              </Col>
            </Sider>
            <Layout style={{ padding: "20px 24px 24px", marginLeft: 25 }}>
              <Row>
                <Col span={22}>
                  <Text
                    ref={refSentence}
                    strong underline type={isDark ? "warning" : "secondary"}>Result</Text>
                </Col>
                <Col span={1}>
                  <Avatar
                    ref={refLightMode}
                    onClick={handleChangeLightMode}
                    src={<img src={lightMode} alt='Light mode' />}
                    style={{ cursor: "pointer" }} />
                </Col>
                <Col span={1}>
                  <Tooltip placement='top' title='Make a tour of Uuv Assistant' zIndex={9999999780}>
                    <Avatar onClick={() => handleGetTour()}
                            icon={<QuestionCircleOutlined />}
                            style={{ cursor: "pointer", color: tourIcon.color, background: tourIcon.background }} />
                  </Tooltip>
                </Col>
              </Row>
              <Content
                aria-label={"sentences"}
                style={{
                  padding: 24,
                  margin: 0,
                  minHeight: 280
                }}
              >
                {generatedScript.map((value, index) =>
                  [<Col
                    key={value.concat(index.toString())}> <Row align='middle'><span
                    style={{ color: isDark ? "white" : "black" }}>{value}</span> {value.includes("selector") ?
                    <Tooltip placement='right' title='Accessibility role and name must be defined'><Avatar key={index} style={{
                      marginLeft: "20px",
                      marginTop: 15
                    }}
                                                                                                           src={<img src={warningIcon}
                                                                                                                     alt='logo warning'
                                                                                                                     style={{
                                                                                                                       height: "20px",
                                                                                                                       width: "20px"
                                                                                                                     }} />} />
                    </Tooltip> : ""} </Row></Col>]
                )}
              </Content>
            </Layout>
          </Layout>
        </Drawer>
      </ConfigProvider>
      <Tour zIndex={1000000000000} open={open} onClose={() => setOpen(false)} steps={isExtended ? [...stepsBase, ...stepsExtended] : stepsBase} /></>
  );
}

export default UuvAssistant;
