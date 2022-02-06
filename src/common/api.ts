import { ErrorMessage } from "./errorInterface";

export const Channal = {
  svgUpdated: "svgUpdated",

  errorHappened: "errorhappened",

  changeSize: "changesize",
  addFiles: "addfiles",
  removeFiles: "removefiles",
};

export namespace ChannalType {
  export type SvgUpdated = string[];

  export type ErrorHappened = ErrorMessage;

  export type ChangeSize = number;
  export type AddFiles = string[];
  export type RemoveFiles = string[];
}
