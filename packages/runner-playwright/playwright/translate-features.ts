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

import { Common, fs } from "@uuv/runner-commons";

const FEATURE_DIR = `${__dirname}/../tests/.features-gen/e2e`;
console.debug("dirName: ", FEATURE_DIR);
const filenames = fs.readdirSync(FEATURE_DIR,
    { encoding: "utf8" });
filenames.forEach(file => {
     // console.debug("fileName: ",file)
    const generatedFile = `${FEATURE_DIR}/${file}`;
    let data = fs.readFileSync(
        generatedFile,
        { encoding: "utf8" });
    data = data
        .replaceAll("Soit", "Given")
        .replaceAll("Sachant que", "Given")
        .replaceAll("Sachant qu'", "Given")
        .replaceAll("Sachant", "Given")
        .replaceAll("Etant donné que", "Given")
        .replaceAll("Étant donné que", "Given")
        .replaceAll("Étant donné qu'", "Given")
        .replaceAll("Etant donné qu'", "Given")
        .replaceAll("Etant données", "Given")
        .replaceAll("Étant données", "Given")
        .replaceAll("Etant donnés", "Given")
        .replaceAll("Étant donnés", "Given")
        .replaceAll("Etant donnée", "Given")
        .replaceAll("Étant donnée", "Given")
        .replaceAll("Etant donné", "Given")
        .replaceAll("Étant donné", "Given")
        .replaceAll("Quand", "When")
        .replaceAll("Lorsque", "When")
        .replaceAll("Lorsqu'", "When")
        .replaceAll("Alors", "Then")
        .replaceAll("Donc", "Then")
        .replaceAll("Et que", "And")
        .replaceAll("Et qu'", "And")
        .replaceAll("Et", "And")
        .replaceAll("Mais que", "But")
        .replaceAll("Mais qu'", "But")
        .replaceAll("Mais", "But");
    data = "/*******************************\n" +
        "NE PAS MODIFIER, FICHIER GENERE\n" +
        "*******************************/\n\n" +
        data;
    Common.writeWordingFile(generatedFile, data);
});
