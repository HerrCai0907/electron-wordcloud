import { Font, parse as ttfParse } from "opentype.js";
import { TTFPath } from "./TTFPath";

export class TTFFont {
  font: Font;
  elememtSize: number;

  constructor(ttfBuf: ArrayBuffer) {
    this.font = ttfParse(ttfBuf);
    this.elememtSize = this.font.unitsPerEm;
  }

  getPath(word: string): TTFPath {
    const path = this.font.getPath(word, 0, 0, 100);
    const commands = path.commands;
    const box = path.getBoundingBox();
    return new TTFPath(commands, box);
  }
}
