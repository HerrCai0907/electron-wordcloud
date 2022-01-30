export class Transform {
  dx: number = 0;
  dy: number = 0;
  _ro: number = 0;
  _scale: number = 1;
  reset() {
    this.dx = 0;
    this.dy = 0;
    this._ro = 0;
    this._scale = 1;
  }
  move(x: number, y: number): this {
    this.dx += x;
    this.dy += y;
    return this;
  }
  local_rotate(ro: number): this {
    this._ro += ro;
    return this;
  }
  rotate(ro: number): this {
    this.dx = this.dx * Math.cos(ro) - this.dy * Math.sin(ro);
    this.dy = this.dx * Math.sin(ro) + this.dy * Math.cos(ro);
    this.local_rotate(ro);
    return this;
  }
  scale(s: number): this {
    this._scale = s;
    return this;
  }
}
