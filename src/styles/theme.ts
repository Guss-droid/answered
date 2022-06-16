import { extendTheme } from "@chakra-ui/react";

export const theme = extendTheme({
  colors: {
    gray: {
      "1000": "#000",
      "900": "#121214",
      "800": "#181B23",
      "700": "#353535",
      "600": "#4B4D63",
      "500": "#757575",
      "400": "#797D9A",
      "300": "#9699B0",
      "200": "#B3B5C6",
      "150": "#C4C4C4",
      "125": "#E5E5E5",
      "100": "#D1D2DC",
      "75": "#F4F4F4",
      "25": "#F5F5F5",
      "0": "#FFF",
    },
    red: {
      "700": "#851010",
      "600": "#E63757",
      "500": "#B21616"
    },
    green: {
      "800": "#09581F",
      "700": "#1C7B36",
      "600": "#50B26C",
      "500": "#00D97E",
      "400": "#0FDB49"
    },
    blue: {
      "500": "#158DE3",
      "400": "#189EFF",
    }
  },
  fonts: {
    body: "Roboto",
    heading: "Roboto"
  },
  config: {
    initialColorMode: "light",
    useSystemColorMode: false
  },
})