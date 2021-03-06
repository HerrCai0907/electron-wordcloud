export type ColorThema = string;

interface Thema {
  id: ColorThema;
  colors: string[];
}

export const colorThemas: Thema[] = [
  { id: "蓝色", colors: ["#5B3265", "#5B9AFF", "#3C77BA"] },
  { id: "红色", colors: ["#FD9A28", "#FF5126", "#D50000"] },
];

export const defaultThema: ColorThema = colorThemas[0].id;
