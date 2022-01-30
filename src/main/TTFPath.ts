import { BoundingBox, Path, PathCommand } from "opentype.js";
import { Point } from "./point";
import { Transform } from "./transform";

abstract class Command {
  abstract toString(transform: Transform): string;
}
class CommandM extends Command {
  constructor(public p: Point) {
    super();
  }
  toString(transform: Transform): string {
    return `M ${this.p.toString(transform)}`;
  }
}
class CommandL extends Command {
  constructor(public p: Point) {
    super();
  }
  toString(transform: Transform): string {
    return `L ${this.p.toString(transform)}`;
  }
}
class CommandC extends Command {
  constructor(public p: Point, public p1: Point, public p2: Point) {
    super();
  }
  toString(transform: Transform): string {
    return `C ${this.p1.toString(transform)} ${this.p2.toString(transform)} ${this.p.toString(transform)}`;
  }
}
class CommandQ extends Command {
  constructor(public p: Point, public p1: Point) {
    super();
  }
  toString(transform: Transform): string {
    return `Q ${this.p1.toString(transform)} ${this.p.toString(transform)}`;
  }
}
class CommandZ extends Command {
  toString(transform: Transform): string {
    return "Z";
  }
}

class Box {
  constructor(public x1: number, public x2: number, public y1: number, public y2: number) {}
  transform(t: Transform): Box {
    const p1 = new Point(this.x1, this.y1).transform(t);
    const p2 = new Point(this.x2, this.y2).transform(t);
    return new Box(p1.x, p2.x, p1.y, p2.y);
  }
}

export class TTFPath {
  commands: Command[];
  private _box: Box;
  get box(): Box {
    return this._box.transform(this.transform);
  }
  transform = new Transform();
  constructor(commands: PathCommand[], box: BoundingBox) {
    this._box = new Box(box.x1, box.x2, box.y1, box.y2);
    this.commands = new Array(commands.length);
    for (let i = 0; i < commands.length; i++) {
      let cmd: Command;
      const c = commands[i];
      switch (c.type) {
        case "M": {
          cmd = new CommandM(new Point(c.x, c.y));
          break;
        }
        case "L": {
          cmd = new CommandL(new Point(c.x, c.y));
          break;
        }
        case "C": {
          cmd = new CommandC(new Point(c.x, c.y), new Point(c.x1, c.y1), new Point(c.x2, c.y2));
          break;
        }
        case "Q": {
          cmd = new CommandQ(new Point(c.x, c.y), new Point(c.x1, c.y1));
          break;
        }
        case "Z": {
          cmd = new CommandZ();
          break;
        }
      }
      this.commands[i] = cmd;
    }
  }
  toString(): string {
    return `<path d="${this.commands.map(c => c.toString(this.transform)).join(" ")}"/>`;
  }
}
