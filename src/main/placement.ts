import { Point } from "./point";
import { Box } from "./TTFPath";

export function archimedeanspiral(xita: number): Point {
  const a = 10;
  const b = 10;
  const t = a + b * xita;
  return new Point(t * Math.cos(xita), t * Math.sin(xita));
}

export function checkInBox(a: Box, b: Box): boolean {
  return (
    a.inBox(b.x1, b.y1) ||
    a.inBox(b.x2, b.y2) ||
    a.inBox(b.x1, b.y2) ||
    a.inBox(b.x2, b.y1) ||
    b.inBox(a.x1, a.y1) ||
    b.inBox(a.x2, a.y1) ||
    b.inBox(a.x1, a.y2) ||
    b.inBox(a.x2, a.y2)
  );
}
