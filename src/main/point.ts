import { Transform } from "./transform";

export class Point {
  constructor(public x: number, public y: number) {}
  transform(t: Transform): Point {
    const x = t._scale * (this.x * Math.cos(t._ro) - this.y * Math.sin(t._ro)) + t.dx;
    const y = t._scale * (this.x * Math.sin(t._ro) + this.y * Math.cos(t._ro)) + t.dy;
    return new Point(x, y);
  }
  toString(transform: Transform): string {
    const x = transform._scale * (this.x * Math.cos(transform._ro) - this.y * Math.sin(transform._ro)) + transform.dx;
    const y = transform._scale * (this.x * Math.sin(transform._ro) + this.y * Math.cos(transform._ro)) + transform.dy;
    return `${x} ${y}`;
  }
}
