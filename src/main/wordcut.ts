import { extract, textRankExtract } from "nodejieba";

export function cutWords(paper: string, topN: number): { word: string; weight: number }[] {
  return textRankExtract(paper, topN);
}
