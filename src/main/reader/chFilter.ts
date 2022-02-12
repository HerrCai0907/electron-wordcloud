export function filterChinese(str: string): string {
  const v = str.match(/[\u4e00-\u9fa5]+/g);
  const res = v?.join(" ") || "";
  return res;
}
