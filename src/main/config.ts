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
import { join } from "path";

export const jiebaDictOption = {
  dict: join(__dirname, jieba_dict),
  hmmDict: join(__dirname, hmm_model),
  userDict: join(__dirname, user_dict),
  idfDict: join(__dirname, idf),
  stopWordDict: join(__dirname, stop_words),
};

export const indexPath: string = join(__dirname, "..", "web", "index.html");
const ttf = readFileSync(join(__dirname, defaultFontPath));
export const defaultFont = new TTFFont(ttf.buffer);
