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
  isElementDisabled: boolean;
  isExtended: boolean;
  isHide: boolean;
  isDark: boolean;
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
      isElementDisabled: false,
      isExtended: false,
      isDark: true,
      isHide: false
    };
    this.reset = this.reset.bind(this);
    this.startSelect = this.startSelect.bind(this);
    this.copyResult = this.copyResult.bind(this);
    this.setShowResultCopiedToast = this.setShowResultCopiedToast.bind(this);
  }

  reset() {
    console.debug("reset");
    this.inspector.cancel();
    this.setState({
      ...this.state,
      currentAction: "none",
      checkAction: CheckActionEnum.EXPECT,
      isElementDisabled: false,
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
      notification.open({
        message: "Message",
        description:
          "Result copied to the clipboard"
      });
    }
  }

  startSelect() {
    console.debug("startSelect");
    this.inspector.enable();
    this.setState({
      ...this.state,
      currentAction: "selection",
      isExtended: false,
      isHide: true
    });
  }

  buildSelector() {
    const disabledElement = "";
    const removeDisableHandler = this.clickOnDisabledElementFeature(disabledElement);
    document.addEventListener("mouseover", removeDisableHandler);
    this.inspector = new Inspector({
      root: "body",
      excluded: ["#uvv-assistant-root"],
      outlineStyle: "2px solid red",
      onClick: (el: HTMLElement) => {
        this.translate(el).then((sentences: string[]) => {
          console.log("sentences:", sentences);
          this.setState({
            ...this.state,
            generatedScript: sentences,
            currentAction: "none",
            isHide: false
          });
          console.log(sentences, this.state);
        });
        this.inspector.cancel();
      }
    });
  }

  private clickOnDisabledElementFeature(disabledElement: string) {
    const removeDisableHandler = (e: MouseEvent): void => {
      e.preventDefault();
      const element = document.elementFromPoint(e.clientX, e.clientY);
      if (this.state.currentAction === "selection" && element && element.hasAttribute("disabled")) {
        disabledElement = TranslateHelper.getSelector(element);
        element.removeAttribute("disabled");
        element.setAttribute("readonly", "true");
        this.setState({
          ...this.state,
          isElementDisabled: true
        });
      } else {
        if (disabledElement) {
          document.querySelector(disabledElement)?.setAttribute("disabled", "true");
          this.setState({
            ...this.state,
            isElementDisabled: false
          });
        }
      }
    };
    return removeDisableHandler;
  }

  private async translate(el: HTMLElement): Promise<string[]> {
    console.debug("translator,", this.props.translator);
    return this.props.translator
      ? Promise.resolve([this.props.translator(el)])
      : TranslateHelper.translateEngine(el, this.state.checkAction, this.state.isElementDisabled);
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
    const lightSunUrl = this.state.isDark ? "/uuv/sun.svg" : "/uuv/moon.svg";
    const expander = CssHelper.expanderConfig(this.state.isDark, this.state.isExtended);
    const buttonConfig = CssHelper.buttonConfig(this.state.isDark);
    return (
      <ConfigProvider
        theme={{
          algorithm: this.state.isDark ? theme.darkAlgorithm : theme.defaultAlgorithm,
          token: {
            fontSize: 18,
            zIndexBase: 50000,
            zIndexPopupBase: 51000
          }
        }}
      >
        <Drawer
          placement="bottom"
          open={!this.state.isHide}
          closable={false}
          className={["uuvAssistant"].join(" ")}
          height={this.state.isExtended ? 300 : 250}
          bodyStyle={{ padding: "0px", overflowY: "hidden" }}
          mask={false}
          zIndex={50000}
        >
          <Button
            onClick={handleExpandInspector}
            className="arrowExpander"
            icon={<DoubleLeftOutlined rotate={ expander.rotate } spin={true} style={{ color: expander.color }}/>}
            style={{
            boxShadow: expander.shadow,
            backgroundColor: expander.background,
          }}>
          </Button>
          <Layout>
          <Sider width={250} collapsible={true} collapsedWidth={0} theme={this.state.isDark ? "dark" : "light"}>
            <Row align="middle" style={{ marginTop: 10, marginBottom: 20, marginLeft: 10 }}>
              <Col span={6}>
                <Avatar style={{ backgroundColor: this.state.isDark ? "#073a69" : "#C0C0C0", height: "50px", width: "50px" }} size="large">
                  <Tooltip placement="top" title="Go to steps definition">
                    <a href="https://e2e-test-quest.github.io/uuv/docs/category/description-of-sentences">
                      <img
                        src="/uuv/uuv_light.png"
                        width="40"
                        height="40"
                        alt="UUV logo"
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
              <Tooltip placement="left" title="Select an element">
                <Button shape="round" className="m-1 pt-0 pb-1 actionAside" onClick={this.startSelect}
                        style={{ background: buttonConfig.background, color: buttonConfig.color }}
                        disabled={this.state.currentAction === "selection"} icon={<SelectOutlined />}>
                  Select
                </Button>
              </Tooltip>
              <Tooltip placement="left" title="Copy in clipboard">
                <Button shape="round" className="actionAside"
                        style={{ background: buttonConfig.background, color: buttonConfig.color }}
                        onClick={this.copyResult}
                        disabled={!this.state.generatedScript} icon={<CopyOutlined />}>
                  Copy
                </Button>
              </Tooltip>
              <Tooltip placement="left" title="Choose the generated action">
                <Select
                  defaultValue={this.state.checkAction}
                  size="large"
                  onChange={handleSelectCheckActionChange}
                  className="actionAside"
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
                <Avatar onClick={handleChangeLightMode} src={<img src={lightSunUrl} alt="Light mode" />} style={{ cursor: "pointer" }}/>
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
                [<Col key={value.concat(index.toString())}> <Row align="middle"><span
                  style={{ color: this.state.isDark ? "white" : "black" }}>{value}</span> {value.includes("selector") ?
                  <Tooltip placement="right" title="Accessibility role and name must be defined"><Avatar key={index} style={{
                    marginLeft: "20px",
                    marginTop: 15
                  }}
                 src={<img src={"/uuv/warning.svg"}
                           alt="a accessibility defect is occured"
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
