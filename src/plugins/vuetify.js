import "@mdi/font/css/materialdesignicons.css";
import "vuetify/styles";
import { createVuetify } from "vuetify";
const blueTheme = {
  dark: false,
  colors: {
    background: "#34495E",
    surface: "#FFFFFF",
    primary: "#9B59B6",
    "primary-darken-1": "#3700B3",
    secondary: "#03DAC6",
    "secondary-darken-1": "#018786",
    error: "#B00020",
    info: "#2196F3",
    success: "#4CAF50",
    warning: "#FB8C00",
  },
};
export default createVuetify({
  theme: {
    defaultTheme: "blueTheme",
    themes: { blueTheme },
  },
});
