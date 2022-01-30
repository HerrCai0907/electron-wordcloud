import { extract } from "nodejieba";

export function cutWords(paper: string, topN: number): { word: string; weight: number }[] {
  const res = extract(paper, topN);
  const total = res.reduce((prev, curr) => prev + curr.weight, 0);
  return res.map(v => {
    return { word: v.word, weight: v.weight / total };
  });
}
