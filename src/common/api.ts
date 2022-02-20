import { ErrorMessage } from "./errorInterface";

export const Channal = {
  errorHappened: "errorHappened",

  svgUpdated: "svgUpdated",

  changeSize: "changeSize",
  addFiles: "addFiles",
  removeFiles: "removeFiles",

  getColor: "getColor",
  colorUpdated: "getColorReply",

  setTopN: "setTopN",
  setChineseOnly: "setChineseOnly",
};

export namespace ChannalType {
  export type ErrorHappened = ErrorMessage;

  export type SvgUpdated = string[];

  export type ChangeSize = number;
  export type AddFiles = string[];
  export type RemoveFiles = string[];

  export type GetColorReply = string[];

  export type SetTopN = number;
  export type SetChineseOnly = boolean;
}
