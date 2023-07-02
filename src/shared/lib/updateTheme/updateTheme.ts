import { ITheme } from "shared/types/ITheme";

const THEME_CLASSNAME = "APP_THEME";

function setTheme(style: { default: string }) {

  const prevThemeStyle = document.head.getElementsByClassName(THEME_CLASSNAME)[0];

  if (prevThemeStyle) {
    prevThemeStyle.textContent = style.default;
  } else {
    const themeStyle = document.createElement("style");

    themeStyle.textContent = style.default;
    themeStyle.className = THEME_CLASSNAME;
    document.head.appendChild(themeStyle);
  }
}

export async function updateTheme(theme: ITheme) {
  let module = { default: "" }

  switch (theme) {
    case "light":
      module = await import("!raw-loader!../../../theme/light/index.css")
      break;
    case "dark":
      module = await import("!raw-loader!../../../theme/dark/index.css");
      break;
    case "material":
      module = await import("!raw-loader!../../../theme/material/index.css");
      break;
  }

  localStorage.setItem("theme", theme);

  setTheme(module)
}