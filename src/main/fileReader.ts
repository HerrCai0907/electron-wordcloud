import { detect } from "jschardet";
import { promises } from "fs";
import { decode } from "iconv-lite";
import { addDebug } from "./debug";
const readFile = promises.readFile;

export async function getFileString(path: string) {
  const buf = await readFile(path);
  const encoding = detect(buf);
  console.log(encoding);
  if (encoding.confidence < 0.8) {
    addDebug(`unknown encoding of ${path}`);
    return "";
  }
  const str = decode(buf, encoding.encoding);
  return str;
}
