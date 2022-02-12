import { ErrorMessage } from "./errorInterface";

export const Channal = {
  errorHappened: "errorhappened",

  svgUpdated: "svgUpdated",

  changeSize: "changesize",
  addFiles: "addfiles",
  removeFiles: "removefiles",

  getColor: "getcolor",
  getColorReply: "getcolorreply",
};

export namespace ChannalType {
  export type ErrorHappened = ErrorMessage;

  export type SvgUpdated = string[];

  export type ChangeSize = number;
  export type AddFiles = string[];
  export type RemoveFiles = string[];

  export type GetColor = number;
  export type GetColorReply = string[];
}
