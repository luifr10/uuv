/**
 * Copyright UUV.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import React from "react";
import "./UuvAssistantComponent.css";
import uuvLogoJson from "./assets/uuvLogo.json";
import warningIconJson from "./assets/warningIcon.json";
import moonJson from "./assets/moon.json";
import sunJson from "./assets/sun.json";
import "./UuvAssistantComponent.css";
import "./UuvAssistantComponent.css";
import "./UuvAssistantComponent.css";

import { CheckActionEnum, TranslateHelper } from "./helper/TranslateHelper";
import { Avatar, Button, Col, ConfigProvider, Divider, Drawer, Layout, notification, Row, Select, theme, Tooltip, Typography } from "antd";
import { CopyOutlined, SelectOutlined, DoubleLeftOutlined } from "@ant-design/icons";
import { CssHelper } from "./helper/CssHelper";

const Inspector = require("inspector-dom");

interface UuvAssistantState {
  generatedScript: string[];
  currentAction: "selection" | "none";
  resultCopied: boolean;
  checkAction: string;
  disabledElement: string;
  isExtended: boolean;
  isHide: boolean;
  isDark: boolean;
  resources: UuvResourcesProps[];
}

interface UuvResourcesProps {
  name: Base64Resource,
  data: string
}

enum Base64Resource {
  LIGHT_MODE, UUV_ICON, WARNING_LOGO
}

interface UuvAssistantProps {
  translator?: (el: HTMLElement) => string;
}

class UuvAssistantComponent extends React.Component<UuvAssistantProps, UuvAssistantState> {
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  private inspector: any;

  /* eslint-disable  @typescript-eslint/no-explicit-any */
  constructor(props: any) {
    super(props);
    this.state = {
      generatedScript: [],
      currentAction: "none",
      resultCopied: false,
      checkAction: CheckActionEnum.EXPECT,
      disabledElement: "",
      isExtended: true,
      isDark: true,
      isHide: false,
      resources: []
    };
    this.reset = this.reset.bind(this);
    this.startSelect = this.startSelect.bind(this);
    this.copyResult = this.copyResult.bind(this);
    this.setShowResultCopiedToast = this.setShowResultCopiedToast.bind(this);
  }

  reset() {
    this.inspector.cancel();
    this.setState({
      ...this.state,
      currentAction: "none",
      checkAction: CheckActionEnum.EXPECT,
      disabledElement: "",
      isExtended: false,
      isDark: true
    });
  }

  setShowResultCopiedToast(resultCopied: boolean) {
    this.setState({
      ...this.state,
      resultCopied: resultCopied
    });
  }

  copyResult() {
    if (this.state?.generatedScript?.length > 0) {
      navigator.clipboard.writeText(this.state.generatedScript?.join("\n"));
      this.setShowResultCopiedToast(true);
      notification.success({
        message: "Message",
        description:
          "Result copied to the clipboard"
      });
    }
  }

  startSelect() {
    const removeDisableHandler = this.clickOnDisabledElementFeature();
    document.addEventListener("mouseover", removeDisableHandler);
    this.inspector.enable();
    this.setState({
      ...this.state,
      currentAction: "selection",
      isHide: true
    });
  }

  buildSelector() {
    this.inspector = new Inspector({
      root: "body",
      excluded: ["#uvv-assistant-root"],
      outlineStyle: "2px solid red",
      onClick: (el: HTMLElement) => {
        const sentences = this.translate(el);
        this.setState({
          ...this.state,
          generatedScript: sentences,
          currentAction: "none",
          isHide: false
        });
        this.inspector.cancel();
      }
    });
  }

  private clickOnDisabledElementFeature() {
    const removeDisableHandler = (e: MouseEvent): void => {
      e.preventDefault();
      const element = document.elementFromPoint(e.clientX, e.clientY);
      let disabledElement = this.state.disabledElement;
      console.log("test", disabledElement, element);
      if (this.state.currentAction === "selection" && element && element.hasAttribute("disabled")) {
        disabledElement = TranslateHelper.getSelector(element);
        element.removeAttribute("disabled");
        element.setAttribute("readonly", "true");
        this.setState({
          ...this.state,
          disabledElement: disabledElement
        });
      } else {
        console.log("ce n'est plus deleted");
        if (disabledElement) {
          const querySelector = document.querySelector(disabledElement);
          console.log("querySelector", querySelector);
          querySelector?.setAttribute("disabled", "true");
          querySelector?.removeAttribute("readonly");
          this.setState({
            ...this.state,
            disabledElement: ""
          });
          console.log("querySelector", this.state.disabledElement);
        }
      }
    };
    return removeDisableHandler;
  }

  private translate(el: HTMLElement): string[] {
    console.debug("translator,", this.props.translator);
    return this.props.translator
      ? [this.props.translator(el)]
      : TranslateHelper.translateEngine(el, this.state.checkAction, this.state.disabledElement !== "");
  }

  componentDidMount() {
    this.buildSelector();
  }

  componentWillUnmount() {
    this.reset();
  }

  render() {
    const handleSelectCheckActionChange = (value: string) => {
      this.setState({
        ...this.state,
        checkAction: value
      });
    };

    const handleChangeLightMode = () => {
      this.setState({
        ...this.state,
        isDark: !this.state.isDark
      });
    };

    const handleExpandInspector = () => {
      this.setState({
        ...this.state,
        isExtended: !this.state.isExtended
      });
    };

    const { Content, Sider } = Layout;
    const { Text } = Typography;
    const expander = CssHelper.expanderConfig(this.state.isDark, this.state.isExtended);
    const buttonConfig = CssHelper.buttonConfig(this.state.isDark);
    const lightMode = this.state.isDark ? CssHelper.getBase64File(sunJson) : CssHelper.getBase64File(moonJson);
    const warningIcon = CssHelper.getBase64File(warningIconJson);
    const uuvLogo = CssHelper.getBase64File(uuvLogoJson);
    return (
      <ConfigProvider
        theme={{
          algorithm: this.state.isDark ? theme.darkAlgorithm : theme.defaultAlgorithm,
          token: {
            fontSize: 18,
            zIndexBase: 9999999989,
            zIndexPopupBase: 9999999999
          }
        }}
      >
        <Drawer
          placement='bottom'
          open={!this.state.isHide}
          closable={false}
          className={["uuvAssistant"].join(" ")}
          height={this.state.isExtended ? 300 : 20}
          bodyStyle={{ padding: "0px", overflowY: "hidden" }}
          mask={false}
        >
          <Tooltip placement='top' title='Resize the Uuv assistant' zIndex = {9999999780}>
          <Button
            onClick={handleExpandInspector}
            className='uuvArrowExpander'
            icon={<DoubleLeftOutlined rotate={expander.rotate} spin={true} style={{ color: expander.color }} />}
            style={{
              boxShadow: expander.shadow,
              backgroundColor: expander.background
            }}>
          </Button>
          </Tooltip>
          {!this.state.isExtended ?
            <Row>
                <Button shape='round' className='m-1 pt-0 pb-1 uuvFloatingButton' onClick={this.startSelect}
                        style={{ left: "calc(50% - 400px)", background: buttonConfig.background, color: buttonConfig.color }}
                        disabled={this.state.currentAction === "selection"} icon={<SelectOutlined />}>
                  Select
                </Button>
                <Button shape='round' className='uuvFloatingButton'
                        style={{
                          left: "calc(50% - 270px)",
                          width: "100%",
                          background: this.state.generatedScript.length > 0 ? buttonConfig.background : "grey",
                          color: buttonConfig.color
                        }}
                        onClick={this.copyResult}
                        disabled={this.state.generatedScript.length === 0} icon={<CopyOutlined />}>
                  Copy
                </Button>
                <Select
                  defaultValue={this.state.checkAction}
                  size='middle'
                  onChange={handleSelectCheckActionChange}
                  className='uuvFloatingButton'
                  style={{ left: "calc(50% - 140px)" }}
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
                /></Row> : ""}
          <Layout>
            <Sider width={250} collapsible={true} collapsedWidth={0} theme={this.state.isDark ? "dark" : "light"}>
              <Row align='middle' style={{ marginTop: 10, marginBottom: 20, marginLeft: 10 }}>
                <Col span={6}>
                  <Avatar style={{ backgroundColor: this.state.isDark ? "#073a69" : "#C0C0C0", height: "50px", width: "50px" }} size='large'>
                    <Tooltip placement='top' title='Go to steps definition'>
                      <a href='https://e2e-test-quest.github.io/uuv/docs/category/description-of-sentences'>
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
                  <Button shape='round' className='m-1 pt-0 pb-1 uuvActionAside' onClick={this.startSelect}
                          style={{ background: buttonConfig.background, color: buttonConfig.color }}
                          disabled={this.state.currentAction === "selection"} icon={<SelectOutlined />}>
                    Select
                  </Button>
                </Tooltip>
                <Tooltip placement='left' title='Copy in clipboard'>
                  <Button shape='round' className='uuvActionAside'
                          style={{ marginTop: "10px", background: this.state.generatedScript.length > 0 ? buttonConfig.background : "grey", color: buttonConfig.color }}
                          onClick={this.copyResult}
                          disabled={this.state.generatedScript.length === 0} icon={<CopyOutlined />}>
                    Copy
                  </Button>
                </Tooltip>
                <Tooltip placement='left' title='Choose the generated action'>
                  <Select
                    defaultValue={this.state.checkAction}
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
                </Tooltip>
              </Col>
            </Sider>
            <Layout style={{ padding: "20px 24px 24px", marginLeft: 25 }}>
              <Row>
                <Col span={23}>
                  <Text strong underline type={this.state.isDark ? "warning" : "secondary"}>Result</Text>
                </Col>
                <Col span={1}>
                  <Avatar onClick={handleChangeLightMode} src={<img src={lightMode} alt='Light mode' />} style={{ cursor: "pointer" }} />
                </Col>
              </Row>
              <Content
                style={{
                  padding: 24,
                  margin: 0,
                  minHeight: 280
                }}
              >
                {this.state.generatedScript.map((value, index) =>
                  [<Col key={value.concat(index.toString())}> <Row align='middle'><span
                    style={{ color: this.state.isDark ? "white" : "black" }}>{value}</span> {value.includes("selector") ?
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
    );
  }
}

export default UuvAssistantComponent;
