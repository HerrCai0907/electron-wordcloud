import assert from "assert";
import { ColorThema, colorThemas, defaultThema } from "../../common/colorThema";

class RGB {
  constructor(public r: number, public g: number, public b: number) {}
  static createFromString(rgb: string) {
    const r = parseInt(rgb.slice(1, 3), 16);
    const g = parseInt(rgb.slice(3, 5), 16);
    const b = parseInt(rgb.slice(5, 7), 16);
    return new RGB(r, g, b);
  }
  static merge(a: RGB, b: RGB, p: number): RGB {
    const numberMerge = (f: number, s: number) => {
      return f * p + s * (1 - p);
    };
    return new RGB(numberMerge(a.r, b.r), numberMerge(a.g, b.g), numberMerge(a.b, b.b));
  }
  toString(): string {
    return `rgb(${this.r},${this.g},${this.b})`;
  }
}

const colorSets = new Map<ColorThema, RGB[]>();
colorThemas.forEach(v => {
  colorSets.set(
    v.id,
    v.colors.map(c => RGB.createFromString(c))
  );
});

export class ColorGenerator {
  private _thema: ColorThema = defaultThema;

  setThema(thema: ColorThema) {
    this._thema = thema;
  }

  getColor(): string {
    const set = colorSets.get(this._thema);
    assert(set != undefined);
    const cur = Math.random() * (set.length - 1);
    const first = set[Math.floor(cur)];
    const second = set[Math.ceil(cur)];
    return RGB.merge(first, second, cur - Math.floor(cur)).toString();
  }
  getColors(n: number): string[] {
    let res = new Array<string>(n);
    for (let i = 0; i < n; i++) {
      res[i] = this.getColor();
    }
    return res;
  }
}
