import { load, textRankExtract } from "nodejieba";
import { jiebaDictOption } from "./config";

// load(jiebaDictOption);

export function cutWords(paper: string, topN: number): { word: string; weight: number }[] {
  return textRankExtract(paper, topN);
}
