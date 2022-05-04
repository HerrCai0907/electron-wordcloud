//@ts-ignore
import defaultFontPath from "./站酷高端黑修订151105.ttf";

//@ts-ignore
import pdf_worker_js from "pdfjs-dist/legacy/build/pdf.worker.min.js";

import { TTFFont } from "./font/TTFFont";
import { readFileSync } from "fs";
import { join } from "path";

export const pdfWorkerPath = join(__dirname, pdf_worker_js);

export const indexPath: string = join(__dirname, "..", "web", "index.html");
const ttf = readFileSync(join(__dirname, defaultFontPath));
export const defaultFont = new TTFFont(ttf.buffer);
