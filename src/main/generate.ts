import { writeFileSync } from "fs";
import { defaultFont } from "./config";

export function generate(words: string[]) {
  const paths = defaultFont.getPath(text[0]);
  paths.transform.move(0, 100);
  console.log(paths.box);
  return `<?xml version="1.0" standalone="no"?>
<svg xmlns="http://www.w3.org/2000/svg" version="1.1">
  <title>Example triangle01- simple example of a 'path'</title>
  <desc>A path that draws a triangle</desc>
${paths.toString()}
</svg>
  `;
}

const text = ["海岳高深", "幽瑟", "染翰操纸", "贪幸", "举胔", "夐絶", "百日黄", "轸转", "理财", "据本生利", "承载", "贾区", "默省", "凶妖", "燕舞莺歌"];

writeFileSync("test.svg", generate(text));
