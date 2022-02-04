import { async as ZipAsync } from "node-stream-zip";
import { intelligentDecode } from "./decode";
import { Parser as XmlParser } from "htmlparser2";

export async function getTextFromDocx(path: string): Promise<string> {
  const zip = new ZipAsync({ file: path });
  let xmlstr = "";
  const entries = await zip.entries();
  for (const entry of Object.values(entries)) {
    if (entry.name.endsWith("document.xml")) {
      xmlstr = intelligentDecode(await zip.entryData(entry.name));
      break;
    }
  }
  await zip.close();
  return parserXml(xmlstr);
}

function parserXml(xmlstr: string): string {
  const strs = new Array<string>();
  let wt: boolean = false;
  const parser = new XmlParser({
    onopentag(name) {
      wt = name === "w:t";
    },
    ontext(text) {
      if (wt) {
        strs.push(text);
      }
    },
  });
  parser.write(xmlstr);
  return strs.join("\n");
}
