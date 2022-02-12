import { extract, ExtractResult, load as jiebaLoad } from "nodejieba";
import { jiebaDictOption } from "./config";
import { placementAllWords, scaleToMatchSize } from "./geometry/placement";
import { getTextSafe } from "./reader/fileReader";
import { TTFPath } from "./font/TTFPath";

export class SvgGenerator {
  private wordsMapping = new Map<string, ExtractResult[]>();
  private ttfPaths = new Array<TTFPath>();
  private size: number = 200;

  topN = 64; // TODO

  constructor() {
    jiebaLoad(jiebaDictOption);
  }

  async onAddFiles(paths: string[]) {
    if (paths.length === 0) return;
    await this._addFiles(paths);
    this._summaryResult();
    this._changeSize(this.size);
  }
  onRemoveFiles(paths: string[]) {
    if (paths.length === 0) return;
    this._removeFiles(paths);
    this._summaryResult();
    this._changeSize(this.size);
  }
  onChangeSize(newSize: number) {
    if (newSize == this.size) return;
    this._changeSize(newSize);
  }

  get svgPathStrings(): string[] {
    return this.ttfPaths.map(v => v.toString());
  }

  private _addFiles = async (paths: string[]) => {
    await Promise.all(
      paths.map(async path => {
        if (this.wordsMapping.has(path)) {
          return;
        }
        let txt = await getTextSafe(path);
        const cutRes = extract(txt, this.topN);
        this.wordsMapping.set(path, cutRes);
      })
    );
  };
  private _removeFiles = (paths: string[]) => {
    paths.forEach(path => {
      this.wordsMapping.delete(path);
    });
  };

  private _summaryResult() {
    const summary = new Map<string, number>();
    for (const extractResults of this.wordsMapping.values()) {
      for (const extractResult of extractResults) {
        const thisValue = summary.get(extractResult.word);
        if (thisValue == undefined) {
          summary.set(extractResult.word, extractResult.weight);
        } else {
          summary.set(extractResult.word, thisValue + extractResult.weight);
        }
      }
    }

    let maxExtractValue = 0;
    let summaryExtractResults = new Array<ExtractResult>();
    summary.forEach((v, k) => {
      maxExtractValue = Math.max(maxExtractValue, v);
      summaryExtractResults.push({ word: k, weight: v });
    });
    summaryExtractResults.forEach(v => {
      v.weight /= maxExtractValue;
    });
    summaryExtractResults.sort((a, b) => b.weight - a.weight);

    this.ttfPaths = placementAllWords(summaryExtractResults.slice(0, this.topN));
  }

  private _changeSize = (newSize: number) => {
    this.size = newSize;
    scaleToMatchSize(this.ttfPaths, { x: newSize, y: newSize });
  };
}
