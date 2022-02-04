import { decode } from "iconv-lite";
import { detect } from "jschardet";

export function intelligentDecode(buf: Buffer): string {
  const encoding = detect(buf);
  console.log(encoding);
  if (encoding.confidence < 0.8) {
    // addDebug(`unknown encoding of ${path}`);
    return "";
  }
  return decode(buf, encoding.encoding);
}
