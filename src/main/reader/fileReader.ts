import { promises } from "fs";
import { emitError } from "../errorhandler";
const readFile = promises.readFile;
import { intelligentDecode } from "./decode";
import { getTextFromDocx } from "./docx";
import { getTextFromPDF } from "./pdf";

export async function getText(path: string): Promise<string> {
  if (path.endsWith(".docx")) {
    return getTextFromDocx(path);
  }
  if (path.endsWith(".pdf")) {
    return getTextFromPDF(path);
  }
  const buf = await readFile(path);
  return intelligentDecode(buf);
}

export async function getTextSafe(path: string): Promise<string> {
  let str = "";
  try {
    str = await getText(path);
  } catch (e) {
    emitError(`${e}`, path);
  }
  return str;
}
