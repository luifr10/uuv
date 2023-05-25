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
import type { TourProps } from "antd";
import { Button, Col, ConfigProvider, Result, Row, theme, Tooltip, Tour } from "antd";
import Search from "antd/lib/input/Search";
import { CssHelper } from "./helper/CssHelper";
import uuvLogoJson from "./assets/uuvLogo.json";
import UuvAssistantComponent from "./UuvAssistantComponent";
import { AssistantTour } from "./model/assistant-tour";

const SearchUrlComponent: React.FC = () => {
  const uuvLogo = CssHelper.getBase64File(uuvLogoJson);
  const documentationLink = "https://e2e-test-quest.github.io/uuv/";
  const githubLink = "https://github.com/e2e-test-quest/uuv";
  const assistantLink = "https://www.npmjs.com/package/@uuv/assistant";
  const cypressLink = "https://www.npmjs.com/package/@uuv/cypress";
  const playwrightLink = "https://www.npmjs.com/package/@uuv/playwright";
  const sentencesLink = "https://e2e-test-quest.github.io/uuv/docs/wordings/generated-wording-description/en-generated-wording-description";
  const [open, setOpen] = useState<boolean>(false);
  const assistantTour = new AssistantTour();
  const steps: TourProps["steps"] = [
    {
      title: "Resize uuv assistant",
      description: "Change the size of uuv assistant for more comfort",
      target: () => assistantTour.refResize.current
    },
    {
      title: "Select button",
      description: "Selects a dom element and generates a uuv sentence",
      target: () => assistantTour.refSelect.current
    },
    {
      title: "Copy button",
      description: "Copies the generated uuv sentence to the clipboard",
      target: () => assistantTour.refCopy.current
    },
    {
      title: "Action button",
      description: "Selects a test action that contextualizes the generated uuv sentence, such as verification or click",
      target: () => assistantTour.refAction.current
    },
    {
      title: "Generated sentence",
      description: "Displays the generated uuv sentence",
      target: () => assistantTour.refSentence.current
    },
    {
      title: "Search button",
      description: "Visit website to test with UUV",
      target: () => assistantTour.refSearch.current
    }
  ];
  assistantTour.steps = steps;
  return (
    <>
      <ConfigProvider
        theme={{
          algorithm: theme.darkAlgorithm
        }}
      >
        <Result
          icon={<Tooltip placement='bottom' title='Go to steps definition'>
            <a href='https://e2e-test-quest.github.io/uuv/docs/category/description-of-sentences'>
              <img
                src={uuvLogo}
                width='200'
                height='200'
                alt='UUV logo' />
            </a>
          </Tooltip>}
          title='User centric Usecases Validator'
          subTitle={
            <>
              <Row justify='center' gutter={15}>
                <Col><Tooltip placement='bottom' title='visit available dictionary of sentences'>
                  <a href={sentencesLink}><img src='https://img.shields.io/badge/sentences-0B4C89?style=for-the-badge&logo=github&logoColor=white'
                                               alt='documentation containing sentences' /></a>
                </Tooltip>
                </Col>
                <Col><Tooltip placement='bottom' title='visit documentation'>
                  <a href={documentationLink}><img
                    src='https://img.shields.io/badge/UUV documentation-grey?style=for-the-badge&logo=github&logoColor=white'
                    alt='documentation' /></a>
                </Tooltip>
                </Col>
                <Col><Tooltip placement='bottom' title='visit github'>
                  <a href={githubLink}><img src='https://img.shields.io/badge/Github-black?&style=for-the-badge&logo=github&logoColor=white'
                                            alt='gitHub' /></a>
                </Tooltip>
                </Col>
                <Col><Tooltip placement='bottom' title='visit @uuv/assistant npmjs lib'>
                  <a href={assistantLink}>
                    <img src='https://img.shields.io/badge/@uuv/assistant-0B4C89?style=for-the-badge&logo=npm' alt='@uuv/assistant npm library' />
                  </a>
                </Tooltip>
                </Col>
                <Col><Tooltip placement='bottom' title='visit @uuv/cypress npmjs lib'>
                  <a href={cypressLink}>
                    <img src='https://img.shields.io/badge/@uuv/cypress-0B4C89?style=for-the-badge&logo=npm' alt='@uuv/cypress npm library' />
                  </a>
                </Tooltip></Col>
                <Col>
                  <Tooltip placement='bottom' title='visit @uuv/playwright npmjs lib'>
                    <a href={playwrightLink}>
                      <img src='https://img.shields.io/badge/@uuv/playwright-0B4C89?style=for-the-badge&logo=npm' alt='@uuv/playwright npm library' />
                    </a>
                  </Tooltip></Col>
              </Row>
            </>
          }
          extra={[
            <>
              <Row justify={"center"}><Button onClick={() => setOpen(true)}>
                Tour of @uuv/assistant
              </Button>
              </Row>
              <br />
              <Row justify='center'>
                <Col span={12}><span style={{ display: "inline block !important" }} ref={assistantTour.refSearch}>
                  <Search
                  placeholder='https://google.fr'
                  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                  // @ts-ignore
                  onSearch={(value: string) => window.electronAPI.setUrl(value)}
                  defaultValue='https://google.fr'
                  style={{ width: 304 }} /></span></Col>
              </Row><Tour zIndex={1000000000000} open={open} onClose={() => setOpen(false)} steps={assistantTour.steps} />
              <UuvAssistantComponent tour={assistantTour} /></>
          ]}
        />
      </ConfigProvider>
    </>
  );
};

export default SearchUrlComponent;
