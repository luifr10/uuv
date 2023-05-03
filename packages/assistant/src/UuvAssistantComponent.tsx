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

import React, { useState } from "react";
import "./UuvAssistantComponent.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Form, Navbar, OverlayTrigger, Toast, ToastContainer, Tooltip } from "react-bootstrap";
import { base, Clear, Copy, Select } from "grommet-icons";
import deepmerge from "deepmerge";
import { ThemeProvider } from "styled-components";
import { CheckActionEnum, TranslateHelper } from "./helper/TranslateHelper";

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
  generatedScript?: string;
  currentAction: "selection" | "none";
  resultCopied: boolean;
  checkAction: string;
  isDisabled: boolean;
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
      currentAction: "none",
      resultCopied: false,
      checkAction: CheckActionEnum.EXPECT,
      isDisabled: false
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
      isDisabled: false
    });
  }

  setShowResultCopiedToast(resultCopied: boolean) {
    this.setState({
      ...this.state,
      resultCopied: resultCopied
    });
  }

  copyResult() {
    if (this.state?.generatedScript) {
      navigator.clipboard.writeText(this.state.generatedScript);
      this.setShowResultCopiedToast(true);
    }
  }

  startSelect() {
    console.debug("startSelect");
    this.inspector.enable();
    this.setState({
      ...this.state,
      currentAction: "selection"
    });
  }

  buildSelector() {
    const disabledElement = "";
    const removeDisableHandler = this.clickOnDIsabledElementFeature(disabledElement);

    document.addEventListener("mouseover", removeDisableHandler);
    this.inspector = new Inspector({
      root: "body",
      excluded: ["#uvv-assistant-root"],
      outlineStyle: "2px solid red",
      onClick: (el: HTMLElement) => {
        this.translate(el).then(value => {
          this.setState({
            ...this.state,
            generatedScript: value,
            currentAction: "none"
          });
        });
        this.inspector.cancel();
      }
    });
  }

  private clickOnDIsabledElementFeature(disabledElement: string) {
    const removeDisableHandler = (e: MouseEvent): void => {
      e.preventDefault();
      const element = document.elementFromPoint(e.clientX, e.clientY);
      if (element && element.hasAttribute("disabled")) {
        disabledElement = TranslateHelper.getSelector(element);
        element.removeAttribute("disabled");
        element.setAttribute("readonly", "true");
        this.setState({
          ...this.state,
          isDisabled: true
        });
      } else {
        if (disabledElement) {
          document.querySelector(disabledElement)?.setAttribute("disabled", "true");
          this.setState({
            ...this.state,
            isDisabled: false
          });
        }
      }
    };
    return removeDisableHandler;
  }

  private async translate(el: HTMLElement) {
    console.debug("translator,", this.props.translator);
    return this.props.translator
      ? Promise.resolve(this.props.translator(el))
      : TranslateHelper.translateEngine(el, this.state.checkAction, this.state.isDisabled);
  }

  componentDidMount() {
    this.buildSelector();
  }

  componentWillUnmount() {
    this.reset();
  }

  render() {

    const handleSelectCheckActionChange: React.ChangeEventHandler<HTMLSelectElement> = (event) => {
      this.setState({ ...this.state,
        checkAction: event.target.value });
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
          <Navbar className='UuvAssistant pb-3' fixed='bottom' bg='dark' variant='dark'>
            <div className='w-100 d-flex flex-row align-items-stretch gap-3 ps-4 pe-4'>
              <div>
                <OverlayTrigger
                  placement={"top"}
                  overlay={
                    <Tooltip>
                      Cancel
                    </Tooltip>
                  }
                >
                  <Button variant='secondary' className='IconBtn m-1v pt-0 pb-1 ' onClick={this.reset}
                          disabled={this.state.currentAction === "none"}>
                    <Clear color='brand' size='medium' />
                  </Button>
                </OverlayTrigger>
                <OverlayTrigger
                  placement={"top"}
                  overlay={
                    <Tooltip>
                      Select an element
                    </Tooltip>
                  }
                >
                  <Button variant='primary' className='IconBtn m-1 pt-0 pb-1 ' onClick={this.startSelect}
                          disabled={this.state.currentAction === "selection"}>
                    <Select color='brand' size='medium' />
                  </Button>
                </OverlayTrigger>
              </div>
              <div>
                <div className='vr'></div>
              </div>
              <div className={"flex-grow-1 d-flex flex-row align-items-center"}>
                <span className='GeneratedScriptLabel'>Result :</span>
                <span className='GeneratedScript ms-3'>{this.state.generatedScript}</span>
              </div>
              <div>
                <div className='vr'></div>
              </div>
              <div>
                <Form>
                  <Form.Select className='mt-1' size='sm' aria-label='action' value={checkAction} onChange={handleSelectCheckActionChange}>
                    <option value={CheckActionEnum.EXPECT.toString()}>{CheckActionEnum.EXPECT.toString()}</option>
                    <option value={CheckActionEnum.WITHIN.toString()}>{CheckActionEnum.WITHIN.toString()}</option>
                  </Form.Select>
                </Form>
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
                  <Button variant='warning' className='IconBtn m-1 pt-0 pb-1 ' onClick={this.copyResult}
                          disabled={!this.state.generatedScript}>
                    <Copy color='black' size='medium' />
                  </Button>
                </OverlayTrigger>
              </div>
            </div>
          </Navbar>
        </ThemeProvider>
      </div>
    );
  }
}

export default UuvAssistantComponent;
