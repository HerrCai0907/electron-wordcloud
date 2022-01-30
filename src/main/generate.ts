import { writeFileSync } from "fs";
import { defaultFont } from "./config";
import { archimedeanspiral, checkInBox } from "./placement";
import { Point } from "./point";
import { TTFPath } from "./TTFPath";

export function generate(words: string[], range: { x: number; y: number }) {
  const paths = new Array<TTFPath>();
  let xita = 10;
  words.forEach((word, i) => {
    const target = defaultFont.getPath(word);
    target.transform.move(500, 300).scale(0.2 + (0.8 * (words.length - i)) / words.length);
    let lastP = new Point(0, 0);
    do {
      const p = archimedeanspiral(xita);
      target.transform.move(p.x - lastP.x, p.y - lastP.y);
      lastP = p;
      xita += 0.2;
    } while (paths.some(v => checkInBox(v.box, target.box)));
    paths.push(target);
  });

  let minx: number, maxx: number, miny: number, maxy: number;
  if (paths.length === 0) {
    (minx = 0), (maxx = 0), (miny = 0), (maxy = 0);
  } else {
    minx = paths[0].box.x1;
    maxx = minx;
    miny = paths[0].box.y1;
    maxy = miny;
  }
  paths.forEach(v => {
    const box = v.box;
    if (box.x1 > maxx) maxx = box.x1;
    if (box.x1 < minx) minx = box.x1;
    if (box.x2 > maxx) maxx = box.x2;
    if (box.x2 < minx) minx = box.x2;

    if (box.y1 > maxy) maxy = box.y1;
    if (box.y1 < miny) miny = box.y1;
    if (box.y2 > maxy) maxy = box.y2;
    if (box.y2 < miny) miny = box.y2;
  });
  console.log(minx, maxx, miny, maxy);
  const x_scale = range.x / (maxx - minx);
  const y_scale = range.y / (maxy - miny);
  const scale = Math.min(x_scale, y_scale) * 0.9;
  const x_center = 0.5 * (maxx + minx);
  const y_center = 0.5 * (maxy + miny);
  paths.forEach(v => {
    v.transform.move(0.5 * range.x - x_center, 0.5 * range.y - y_center);
    const vbox = v.box;
    const scaleOffsetX = 0.5 * ((scale - 1) * (2 * vbox.x1) - (scale - 1) * range.x);
    const scaleOffsetY = 0.5 * ((scale - 1) * (2 * vbox.y2) - (scale - 1) * range.y);
    v.transform.scale(scale).move(scaleOffsetX, scaleOffsetY);
  });

  minx = paths[0].box.x1;
  maxx = minx;
  miny = paths[0].box.y1;
  maxy = miny;
  paths.forEach(v => {
    const box = v.box;
    if (box.x1 > maxx) maxx = box.x1;
    if (box.x1 < minx) minx = box.x1;
    if (box.x2 > maxx) maxx = box.x2;
    if (box.x2 < minx) minx = box.x2;

    if (box.y1 > maxy) maxy = box.y1;
    if (box.y1 < miny) miny = box.y1;
    if (box.y2 > maxy) maxy = box.y2;
    if (box.y2 < miny) miny = box.y2;
  });
  console.log(minx, maxx, miny, maxy);

  return `<?xml version="1.0" standalone="no"?>
<svg xmlns="http://www.w3.org/2000/svg" version="1.1">
  <title>Example triangle01- simple example of a 'path'</title>
  <desc>A path that draws a triangle</desc>
${paths.map(v => v.toString()).join("\n")}
</svg>
  `;
}

const text = ["海岳高深", "幽瑟", "染翰操纸", "贪幸", "hhhh", "abc", "百日黄", "轸转", "理财", "据本生利", "承载", "贾区", "默省", "凶妖", "燕舞莺歌"];

writeFileSync("test.svg", generate(text, { x: 1000, y: 500 }));
