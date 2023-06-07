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

const fs= require("fs");
let jsFile = "";
fs.readdirSync("build/static/js/").forEach(file => {
  if (file.startsWith("main.") && file.endsWith(".js")) {
    jsFile = file.replace(".js", "");
  }
});

const coreJs = require(`../build/static/js/${jsFile}`);
let translator;
const uuvCssContent = "body{-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Oxygen,Ubuntu,Cantarell,Fira Sans,Droid Sans,Helvetica Neue,sans-serif;margin:0}code{font-family:source-code-pro,Menlo,Monaco,Consolas,Courier New,monospace}.uuvAssistant{box-shadow:0 .0625em .0625em rgba(0, 0,0,.25),0 .125em .5em rgba(0,0,0,.25),inset 0 0 0 1px hsla(0,0%,100%,.1);opacity:95%}.uuvArrowExpander{cursor:pointer;left:50%;width:30px}.uuvArrowExpander,.uuvFloatingButton{border -color:grey;height:30px;position:absolute;top:-1em}.uuvFloatingButton{width:120px;z-index:9999999779}.uuvActionAside :disabled{width:200px}.uuvActionAside{border-color:grey;margin-le ft:10%; margin-right:10px;width:80%}/*# sourceMappingURL=main.a63bc536.css.map*/";

window.onload = function() {
  if (window.location === window.parent.location) {
    const rootElement = document.createElement("div");
    const event = translator !== undefined ? new CustomEvent("UUVAssistantReadyToLoad", {
      detail: {
        translator: translator
      }
    }) : new Event("UUVAssistantReadyToLoad");
    rootElement.id = "uvv-assistant-root";
    document.body.appendChild(rootElement);
    document.dispatchEvent(event);

    const style = document.createElement("style");
    style.type = "text/css";
    style.innerHTML = uuvCssContent;
    document.getElementsByTagName("head")[0].appendChild(style);
  }
};

coreJs();


