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
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Collapse, Container, Form, Navbar, OverlayTrigger, Toast, ToastContainer, Tooltip } from "react-bootstrap";
import { base, Copy, Select } from "grommet-icons";
import deepmerge from "deepmerge";
import { ThemeProvider } from "styled-components";
import { CheckActionEnum, TranslateHelper } from "./helper/TranslateHelper";
import { ArrowDownCircleFill, ArrowUpCircleFill } from "react-bootstrap-icons";

const Inspector = require("inspector-dom");

const theme = deepmerge(base, {
  global: {
    colors: {
      brand: "white"
    }
  },
  icon: {
    size: {
      medium: "16px"
    }
  }
});

interface UuvAssistantState {
  generatedScript: string[];
  currentAction: "selection" | "none";
  resultCopied: boolean;
  checkAction: string;
  isElementDisabled: boolean;
  isExtended: boolean;
  isHide: boolean;
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
      isExtended: false
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
        this.translate(el).then((value: string[]) => {
          console.log("value:", value);
          this.setState({
            ...this.state,
            generatedScript: value,
            currentAction: "none",
            isHide: false
          });
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
    const handleSelectCheckActionChange: React.ChangeEventHandler<HTMLSelectElement> = (event) => {
      this.setState({
        ...this.state,
        checkAction: event.target.value
      });
    };

    const handleExpandInspector = () => {
      this.setState({
        ...this.state,
        isExtended: !this.state.isExtended
      });
    };

    const { checkAction } = this.state;
    return (
      <div className='App'>
        <ThemeProvider theme={theme}>
          <ToastContainer
            className='p-3'
            position='top-end'
            style={{ zIndex: 1 }}
          >
            <Toast onClose={() => this.setShowResultCopiedToast(false)} show={this.state.resultCopied}
                   delay={3000} autohide bg='success'>
              <Toast.Header>
                <strong className='me-auto'>Message</strong>
              </Toast.Header>
              <Toast.Body className='text-white'>Result copied to the clipboard</Toast.Body>
            </Toast>
          </ToastContainer>
          <Navbar className={["uuvAssistant", "pb-0", this.state.isExtended ? "expandHeight" : ""].join(" ")}
                  fixed='bottom' bg='dark' variant='dark' aria-expanded={this.state.isHide}
                  expand={this.state.isHide ? "lg" : false}
          >
            {this.state.isExtended ?
              <ArrowDownCircleFill color='#E5E2E3' size={30} title={"Expand the inspector"} className='arrowExpander'
                                   onClick={handleExpandInspector} />
              :
              <ArrowUpCircleFill color='#E5E2E3' size={30} title={"Expand the inspector"} className='arrowExpander' aria-controls='inspector-content'
                                 onClick={handleExpandInspector} />
            }
            <Collapse in={!this.state.isHide} dimension='height' appear={!this.state.isHide}>
              <div id='inspector-content' className='w-100'>
                <div className='d-flex'>
                  <div className='w-100 d-flex flex-row align-items-stretch gap-3 ps-4 pe-4'>
                    <div className='col-2 d-flex flex-row align-items-stretch'>
                      <Navbar.Brand href='https://e2e-test-quest.github.io/uuv/docs/category/step-definition'>
                        <OverlayTrigger
                          placement={"top"}
                          overlay={
                            <Tooltip>
                              Go to steps definition
                            </Tooltip>
                          }
                        >
                          <img
                            src='/uuv/uuv_light.png'
                            width='50'
                            height='50'
                            className='d-inline-block align-top m-1 ml-2'
                            alt='UUV logo'
                          />
                        </OverlayTrigger>
                      </Navbar.Brand>
                      <Container className='pt-2'>
                        <OverlayTrigger
                          placement={"top"}
                          overlay={
                            <Tooltip>
                              Select an element
                            </Tooltip>
                          }
                        >
                          <Button variant='primary' className='iconBtn m-1 pt-0 pb-1' onClick={this.startSelect}
                                  disabled={this.state.currentAction === "selection"}>
                            <Select color='brand' size='medium' />
                          </Button>
                        </OverlayTrigger>
                      </Container>
                    </div>
                    <div>
                      <div className='vr'></div>
                    </div>
                    <div className='flex-grow-1 d-flex align-items-start flex-column mb-3 mt-1'>
                      <span className='colorWhite col-1'><u>Result</u></span>
                      {this.state.generatedScript.map((value) => <span key={value} className='generatedScript col-11'>{value}</span>)}
                    </div>
                    <div>
                      <div className='vr'></div>
                    </div>
                    <div className='col-1 mt-2'>
                      <OverlayTrigger
                        placement={"top"}
                        overlay={
                          <Tooltip>
                            Choose the generated action
                          </Tooltip>
                        }
                      >
                        <Form.Select size='sm' aria-label='generated action' value={checkAction} onChange={handleSelectCheckActionChange}>
                          <option value={CheckActionEnum.EXPECT.toString()}>{CheckActionEnum.EXPECT.toString()}</option>
                          <option value={CheckActionEnum.WITHIN.toString()}>{CheckActionEnum.WITHIN.toString()}</option>
                          <option value={CheckActionEnum.CLICK.toString()}>{CheckActionEnum.CLICK.toString()}</option>
                        </Form.Select>
                      </OverlayTrigger>
                    </div>
                    <div>
                      <div className='vr'></div>
                    </div>
                    <div>
                      <OverlayTrigger
                        placement={"top"}
                        overlay={
                          <Tooltip>
                            Copy
                          </Tooltip>
                        }
                      >
                        <Button variant='warning' className='iconBtn pt-0 pb-1 mt-2' onClick={this.copyResult}
                                disabled={!this.state.generatedScript}>
                          <Copy color='black' size='medium' />
                        </Button>
                      </OverlayTrigger>
                    </div>
                  </div>
                </div>
              </div>
            </Collapse>
          </Navbar>
        </ThemeProvider>
      </div>
    );
  }
}

export default UuvAssistantComponent;
