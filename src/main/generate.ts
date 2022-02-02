import { ExtractResult } from "nodejieba";
import { defaultFont } from "./config";
import { archimedeanspiral, isRectIntersect } from "./placement";
import { Point } from "./point";
import { TTFPath } from "./TTFPath";

function getPathRange(paths: TTFPath[]) {
  if (paths.length === 0) {
    console.error("paths length = 0");
    return { minx: 0, maxx: 0, miny: 0, maxy: 0 };
  }
  let minx = paths[0].box.x1;
  let maxx = minx;
  let miny = paths[0].box.y1;
  let maxy = miny;
  paths.forEach(v => {
    const box = v.box;
    maxx = Math.max(maxx, box.x1, box.x2);
    minx = Math.min(minx, box.x1, box.x2);
    maxy = Math.max(maxy, box.y1, box.y2);
    miny = Math.min(miny, box.y1, box.y2);
  });
  return { minx, maxx, miny, maxy };
}

export function generate(words: ExtractResult[], range: { x: number; y: number }) {
  const paths = new Array<TTFPath>();
  let xita = Math.random() * 10;
  words.forEach((v, i) => {
    const target = defaultFont.getPath(v.word);
    target.transform.scale(0.2 + 0.8 * v.weight);
    let lastP = new Point(0, 0);
    do {
      const p = archimedeanspiral(xita);
      target.transform.move(p.x - lastP.x, p.y - lastP.y);
      lastP = p;
      xita += 0.2;
    } while (paths.some(v => isRectIntersect(v.box, target.box)));
    paths.push(target);
    if ([20, 50].includes(i)) {
      xita = 0;
    }
  });
  const { minx, maxx, miny, maxy } = getPathRange(paths);
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

  console.log(getPathRange(paths));
  return paths.map(v => v.toString());
}
