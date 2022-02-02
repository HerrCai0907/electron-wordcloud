//@ts-ignore
import defaultFontPath from "./站酷高端黑修订151105.ttf";

//@ts-ignore
import jieba_dict from "../../node_modules/nodejieba/dict/jieba.dict.utf8";
//@ts-ignore
import hmm_model from "../../node_modules/nodejieba/dict/hmm_model.utf8";
//@ts-ignore
import idf from "../../node_modules/nodejieba/dict/idf.utf8";
//@ts-ignore
import stop_words from "../../node_modules/nodejieba/dict/stop_words.utf8";
//@ts-ignore
import user_dict from "../../node_modules/nodejieba/dict/user.dict.utf8";

import { TTFFont } from "./TTFFont";
import { readFileSync } from "fs";
import { resolve } from "path";
import { addDebug } from "./debug";

export const jiebaDictOption = {
  dict: resolve(__dirname, jieba_dict),
  hmmDict: resolve(__dirname, hmm_model),
  userDict: resolve(__dirname, user_dict),
  idfDict: resolve(__dirname, idf),
  stopWordDict: resolve(__dirname, stop_words),
};
addDebug(jiebaDictOption);

export const indexPath: string = resolve(__dirname, "..", "web", "index.html");
const ttf = readFileSync(resolve(__dirname, defaultFontPath));
export const defaultFont = new TTFFont(ttf.buffer);
