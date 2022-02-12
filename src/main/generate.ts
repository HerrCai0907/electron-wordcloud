import { extract, ExtractResult, load as jiebaLoad } from "nodejieba";
import { jiebaDictOption } from "./config";
import { placementAllWords, scaleToMatchSize } from "./geometry/placement";
import { getTextSafe } from "./reader/fileReader";
import { TTFPath } from "./font/TTFPath";
import { filterChinese } from "./reader/chFilter";

interface FileCache {
  txt: string;
  extractRes: ExtractResult[];
}

export class SvgGenerator {
  private wordsMapping = new Map<string, FileCache>();
  private ttfPaths = new Array<TTFPath>();
  private size: number = 200;

  topN = 64;
  filterCN = true;

  constructor() {
    jiebaLoad(jiebaDictOption);
  }

  onChangeChineseonly(filterCN: boolean) {
    if (filterCN == this.filterCN) return;
    this.filterCN = filterCN;
    this._updateExtract();
    this._summaryResult();
    this._changeSize();
  }
  onChangeTopN(topN: number) {
    if (topN == this.topN) return;
    this.topN = topN;
    this._updateExtract();
    this._summaryResult();
    this._changeSize();
  }
  async onAddFiles(paths: string[]) {
    if (paths.length === 0) return;
    await this._addFiles(paths);
    this._summaryResult();
    this._changeSize();
  }
  onRemoveFiles(paths: string[]) {
    if (paths.length === 0) return;
    this._removeFiles(paths);
    this._summaryResult();
    this._changeSize();
  }
  onChangeSize(newSize: number) {
    if (newSize == this.size) return;
    this.size = newSize;
    this._changeSize();
  }

  get svgPathStrings(): string[] {
    return this.ttfPaths.map(v => v.toString());
  }

  private _updateExtract = () => {
    for (const cache of this.wordsMapping.values()) {
      const txt = this.filterCN ? filterChinese(cache.txt) : cache.txt;
      cache.extractRes = extract(txt, this.topN);
    }
  };
  private _addFiles = async (paths: string[]) => {
    await Promise.all(
      paths.map(async path => {
        if (this.wordsMapping.has(path)) {
          return;
        }
        const txt = await getTextSafe(path);
        const processedTxt = this.filterCN ? filterChinese(txt) : txt;
        const cutRes = extract(processedTxt, this.topN);
        this.wordsMapping.set(path, { txt: txt, extractRes: cutRes });
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
    for (const cache of this.wordsMapping.values()) {
      const extractResults = cache.extractRes;
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
  private _changeSize = () => {
    scaleToMatchSize(this.ttfPaths, { x: this.size, y: this.size });
  };
}
