import { promises, statSync } from "fs";
const readFile = promises.readFile;
import { extract, ExtractResult, load, textRankExtract } from "nodejieba";
import { jiebaDictOption } from "./config";
import { addDebug } from "./debug";

load(jiebaDictOption);

export function cutWords(paper: string, topN: number): ExtractResult[] {
  return textRankExtract(paper, topN);
}

export async function cutWordsFromFiles(paths: string[], topN: number, onChange?: (process: number) => void): Promise<ExtractResult[]> {
  let currProcess = 0;
  let totalProcess = new Array<number>(paths.length);
  let mapping = new Map<string, number>();
  paths.forEach((v, i) => {
    const status = statSync(v);
    if (!status.isFile()) {
      totalProcess[i] = 0;
      addDebug(`${v} is not file`);
      return;
    }
    totalProcess[i] = status.size;
  });
  await Promise.all(
    paths.map(async (v, i) => {
      const buf = await readFile(v);
      const str = buf.toString("utf8");
      const cutRes = extract(str, topN);
      console.log(cutRes);
      cutRes.forEach(v => {
        const old = mapping.get(v.word);
        if (old != undefined) {
          mapping.set(v.word, old + v.weight * totalProcess[i]);
        } else {
          mapping.set(v.word, v.weight * totalProcess[i]);
        }
      });
    })
  );

  let res = new Array<ExtractResult>();
  let maxExtractValue = 0;
  mapping.forEach((v, k) => {
    maxExtractValue = Math.max(maxExtractValue, v);
    res.push({ word: k, weight: v });
  });
  res.forEach(v => {
    v.weight /= maxExtractValue;
  });
  res.sort((a, b) => b.weight - a.weight);
  return res.slice(0, topN);
}
