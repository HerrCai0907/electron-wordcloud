import { extract, ExtractResult, ready, init } from "@congcongcai/jieba.js";

enum InitStatus {
  Start,
  Finish,
}

export class JiebaExtractor {
  private status: InitStatus;

  constructor() {
    this.status = InitStatus.Start;
    this._init();
  }

  async extract(str: string, topN: number): Promise<ExtractResult[]> {
    await new Promise<void>(resolved => {
      const retry = () => {
        if (this.status == InitStatus.Start) {
          setTimeout(retry, 10);
        } else {
          resolved();
        }
      };
      retry();
    });
    return extract(str, topN);
  }

  private async _init() {
    await ready();
    init();
    this.status = InitStatus.Finish;
  }
}
