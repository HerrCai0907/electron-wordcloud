import { decode } from "iconv-lite";
import { detect } from "jschardet";

export function intelligentDecode(buf: Buffer): string {
  const encoding = detect(buf);
  console.log(encoding);
  if (encoding.confidence < 0.8) {
    throw Error("unkonwn encoding");
  }
  return decode(buf, encoding.encoding);
}
