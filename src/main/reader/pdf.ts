import { getDocument, GlobalWorkerOptions } from "pdfjs-dist";
import { TextItem, TextMarkedContent } from "pdfjs-dist/types/src/display/api";
import { pdfWorkerPath } from "../config";

GlobalWorkerOptions.workerSrc = pdfWorkerPath;

export async function getTextFromPDF(path: string) {
  let doc = await getDocument(path).promise;
  let strings: string[] = [];
  for (let i = 1; i <= doc.numPages; i++) {
    let page1 = await doc.getPage(i);
    let content = await page1.getTextContent();
    content.items.forEach((item: TextItem | TextMarkedContent) => {
      if ("str" in item) {
        strings.push(item.str);
      }
    });
  }
  return strings.join("");
}
