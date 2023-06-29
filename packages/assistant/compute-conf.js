const replaceJSONProperty = require("replace-json-property");
const fs = require("fs");

const buildAssetManifest = require("./build/asset-manifest.json");

const destConfFile = "./dist/launcher/conf.json";
const srcConfFile = "./launcher/conf.json";
fs.copyFileSync(srcConfFile, destConfFile);

replaceJSONProperty.replace(destConfFile, "reactScript", `/build${buildAssetManifest.files["main.js"]}`);
replaceJSONProperty.replace(destConfFile, "cssFile", `/build${buildAssetManifest.files["main.css"]}`);
replaceJSONProperty.replace(destConfFile, "unifiedFile", "../unified-uuv-assistant.js");

replaceJSONProperty.replace(srcConfFile, "reactScript", `/build${buildAssetManifest.files["main.js"]}`);
replaceJSONProperty.replace(srcConfFile, "cssFile", `/build${buildAssetManifest.files["main.css"]}`);
