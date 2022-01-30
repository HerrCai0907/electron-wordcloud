import { TTFFont } from "./TTFFont";

const { join } = require("path");
import { readFileSync } from "fs";

export const indexPath: string = join(__dirname, "..", "web", "index.html");
const ttf = readFileSync("/Users/caicongcong/Desktop/electron-worldcloud/src/main/站酷高端黑修订151105.ttf");
export const defaultFont = new TTFFont(ttf.buffer);
