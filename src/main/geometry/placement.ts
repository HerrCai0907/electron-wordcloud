import { ExtractResult } from "nodejieba";
import { defaultFont } from "../config";
import { Point } from "./point";
import { Box, TTFPath } from "../font/TTFPath";

function archimedeanspiral(xita: number, offsetx: number, offsety: number): Point {
  const a = 0;
  const b = 5;
  const t = a + b * xita;
  return new Point(t * Math.cos(xita) + offsetx, t * Math.sin(xita) + offsety);
}

function isRectIntersect(a: Box, b: Box): boolean {
  const zx = Math.abs(a.x1 + a.x2 - b.x1 - b.x2);
  const x = Math.abs(a.x1 - a.x2) + Math.abs(b.x1 - b.x2);
  const zy = Math.abs(a.y1 + a.y2 - b.y1 - b.y2);
  const y = Math.abs(a.y1 - a.y2) + Math.abs(b.y1 - b.y2);
  return zx <= x && zy <= y;
}

function getPathRange(paths: TTFPath[]) {
  if (paths.length === 0) {
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

export function placementAllWords(words: ExtractResult[]): Array<TTFPath> {
  const paths = new Array<TTFPath>();
  let xita = Math.random() * 10;
  words.forEach((v, i) => {
    const target = defaultFont.getPath(v.word);
    target.transform.scale(0.05 + 0.95 * v.weight);
    const box = target.box;
    const offsetx = -Math.abs(box.x1 - box.x2) / 2;
    const offsety = -Math.abs(box.y1 - box.y2) / 2;
    let lastP = new Point(0, 0);
    do {
      const p = archimedeanspiral(xita, offsetx, offsety);
      target.transform.move(p.x - lastP.x, p.y - lastP.y);
      lastP = p;
      xita += 0.2;
    } while (paths.some(v => isRectIntersect(v.box, target.box)));
    paths.push(target);
    if ([20, 50].includes(i)) {
      xita = 0;
    }
  });
  return paths;
}

export function scaleToMatchSize(paths: Array<TTFPath>, range: { x: number; y: number }): void {
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
  // console.log(getPathRange(paths));
}
