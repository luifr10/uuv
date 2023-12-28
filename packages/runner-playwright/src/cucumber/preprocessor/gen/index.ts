/**
 * Generate playwright tests from Gherkin documents.
 */
import path from "node:path";
import { ILoadConfigurationOptions, IRunEnvironment, loadConfiguration } from "@cucumber/cucumber/api";
import { PickleWithDocument } from "@cucumber/cucumber/lib/api/gherkin";
import { GherkinDocument, Pickle, ParseError } from "@cucumber/messages";
import { loadSources } from "./load_sources";
import { PWFile } from "./generate";
import { saveFiles } from "./save";

export type GenOptions = {
  outputDir?: string;
  cucumberConfig?: string;
  cwd?: string;
  tags?: string;
};

const defaults: Required<Pick<GenOptions, "outputDir" | "cwd">> = {
  outputDir: ".features-gen",
  cwd: process.cwd(),
};

export async function generateTestFiles(inputOptions?: GenOptions): Promise<Map<string, GherkinDocument>> {
  const { outputDir, cwd, cucumberConfig, tags } = Object.assign({}, defaults, inputOptions);
  const features = await loadFeatures({ file: cucumberConfig }, { cwd });
  const files = buildFiles(features, tags);
  const paths = saveFiles(files, path.join(cwd, outputDir));
  const mapOfFile = new Map<string, GherkinDocument>();
  paths.forEach((path, index) => mapOfFile.set(path, Array.from(features.keys())[index]));
  return mapOfFile;
}

async function loadFeatures(options?: ILoadConfigurationOptions, environment?: IRunEnvironment) {
  const { runConfiguration } = await loadConfiguration(options, environment);
  const { filteredPickles, parseErrors } = await loadSources(runConfiguration.sources, environment);
  handleParseErrors(parseErrors);
  return groupByDocument(filteredPickles);
}

function buildFiles(features: Map<GherkinDocument, Pickle[]>, tags?: string) {
  const files: PWFile[] = [];
  features.forEach((pickles, doc) => files.push(new PWFile(doc, pickles, tags).build()));
  return files;
}

function groupByDocument(filteredPickles: PickleWithDocument[]) {
  const features = new Map<GherkinDocument, Pickle[]>();
  filteredPickles.forEach(({ pickle, gherkinDocument }) => {
    let pickles = features.get(gherkinDocument);
    if (!pickles) {
      pickles = [];
      features.set(gherkinDocument, pickles);
    }
    pickles.push(pickle);
  });
  return features;
}

function handleParseErrors(parseErrors: ParseError[]) {
  if (parseErrors.length) {
    parseErrors.forEach((parseError) => {
      // eslint-disable-next-line no-console
      console.error(`Parse error in "${parseError.source.uri}" ${parseError.message}`);
    });
    process.exit(1);
  }
}
