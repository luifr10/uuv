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
import ReactDOM from "react-dom";
import "./index.css";
import SearchUrlComponent from "./UuvSearchUrl";
import UuvAssistantComponent from "./UuvAssistantComponent";
import { BrowserRouter, Route, Routes } from "react-router-dom";

/* eslint-disable  @typescript-eslint/no-explicit-any */
document.addEventListener("UUVAssistantReadyToLoad", (e: any) => {
    console.log("event listened: UUVAssistantReadyToLoad");
    ReactDOM.render(
      <>
        <BrowserRouter>
        <Routes>
          <Route path="/" element={<UuvAssistantComponent translator={e?.detail?.translator}/>} />
          <Route path="/search" element={<SearchUrlComponent />}>
          </Route>
        </Routes>
      </BrowserRouter>
      </>,
        document.getElementById("uvv-assistant-root") as HTMLElement
    );
});

