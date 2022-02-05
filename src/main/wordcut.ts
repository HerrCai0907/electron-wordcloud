import { statSync } from "fs";
import { extract, ExtractResult, load, textRankExtract } from "nodejieba";
import { jiebaDictOption } from "./config";
import { addDebug } from "./debug";
import { emitError } from "./errorhandler";
import { getText } from "./reader/fileReader";

load(jiebaDictOption);

export function cutWords(paper: string, topN: number): ExtractResult[] {
  return textRankExtract(paper, topN);
}

export async function cutWordsFromFiles(paths: string[], topN: number): Promise<ExtractResult[]> {
  let totalProcess = new Array<number>(paths.length);
  let mapping = new Map<string, number>();
  paths.forEach((path, i) => {
    const status = statSync(path);
    if (!status.isFile()) {
      totalProcess[i] = 0;
      emitError("not a file", path);
      return;
    }
    totalProcess[i] = status.size;
  });
  await Promise.all(
    paths.map(async (path, i) => {
      let str: string;
      try {
        str = await getText(path);
      } catch (e) {
        emitError(`${e}`, path);
        return;
      }
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
