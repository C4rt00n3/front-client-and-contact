import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    title: string;
    colors: {
      totalBlack: string;
      grey100: string;
      grey50: string;
      grey25: string;
      grey: string;
      withe: string;
      totalWithe: string;
      green: string;
      blue: string;
      colorbrand1: string;
    };
  }
}
