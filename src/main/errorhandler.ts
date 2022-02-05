import { webContents } from ".";
import { Channal } from "../common/api";
import { ErrorMessage } from "../common/errorInterface";

export function emitError(msg: string, desc?: string) {
  let errorMsg: ErrorMessage = { msg, desc };
  webContents.send(Channal.errorhappened, errorMsg);
}
