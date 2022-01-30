import { Point } from "./point";
import { Box } from "./TTFPath";

export function archimedeanspiral(xita: number): Point {
  const a = 0;
  const b = 5;
  const t = a + b * xita;
  return new Point(t * Math.cos(xita), t * Math.sin(xita));
}

export function isRectIntersect(a: Box, b: Box): boolean {
  const zx = Math.abs(a.x1 + a.x2 - b.x1 - b.x2);
  const x = Math.abs(a.x1 - a.x2) + Math.abs(b.x1 - b.x2);
  const zy = Math.abs(a.y1 + a.y2 - b.y1 - b.y2);
  const y = Math.abs(a.y1 - a.y2) + Math.abs(b.y1 - b.y2);
  return zx <= x && zy <= y;
}
