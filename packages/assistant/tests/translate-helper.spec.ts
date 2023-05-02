import { TranslateHelper } from "../src/helper/TranslateHelper";
import { fs } from "@uuv/runner-commons";
import { JSDOM } from "jsdom";

// describe("translateEngine", () => {
//
// const html = fs.readFileSync("../public/index.html");
//   const dom = new JSDOM(html);
//   const document = dom.window.document;
//   test("translateEngine with role, name and content", () => {
//     const element = document.querySelector("[id='lname']");
//     expect(TranslateHelper.translateEngine(element as HTMLElement)).toEqual(
//       "I should see an element with role \"textbox\" and name \"Last name\" and content \"Doe\"");
//   });
// });
