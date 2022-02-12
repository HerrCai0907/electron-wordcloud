const colorSet = ["#86E3CE", "#D0E6A5", "#FFDD94", "#FA897B", "#CCABD8"];

export class ColorGenerator {
  thema = "";

  getColor() {
    return colorSet[Math.floor(Math.random() * colorSet.length)];
  }
  getColors(n: number) {
    let res = new Array<string>(n);
    for (let i = 0; i < n; i++) {
      res[i] = this.getColor();
    }
    return res;
  }
}
