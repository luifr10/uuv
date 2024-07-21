import { defineConfig } from '@vscode/test-cli';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
	label: 'uuvVsCodeTests',
	files: path.resolve(__dirname, 'out/test/extension.test.js'),
});
