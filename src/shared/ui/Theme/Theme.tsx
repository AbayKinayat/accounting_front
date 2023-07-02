import { memo, useCallback, useEffect, useRef, type MouseEvent } from "react";
import { Button } from "../Button/Button";
import { ContextMenu } from "../ContextMenu/ContextMenu";
import { IContextMenuRef } from "shared/types/IContextMenuRef";
import { ContextMenuItem } from "../ContextMenuItem/ContextMenuItem";
import { updateTheme } from "shared/lib/updateTheme/updateTheme";
import { ITheme } from "shared/types/ITheme";
export const Theme = memo(() => {
  const contextMenuRef = useRef<null | IContextMenuRef>(null);

  const openContextMenu = useCallback((event: MouseEvent<HTMLElement>) => {
    contextMenuRef.current?.open(event);
  }, [contextMenuRef])

  const selectLightTheme = useCallback(() => {
    updateTheme("light");
  }, []);

  const selectDarkTheme = useCallback(() => {
    updateTheme("dark");
  }, []);

  const selectMaterialTheme = useCallback(() => {
    updateTheme("material");
  }, []);

  useEffect(() => {
    let actualTheme = localStorage.getItem("theme");

    if (!actualTheme) actualTheme = "light";

    updateTheme(actualTheme as ITheme)
  }, [])

  return <>
    <Button
      className="theme"
      mod="icon"
      icon="theme"
      onClick={openContextMenu}
    >
      Тема
    </Button>
    <ContextMenu ref={contextMenuRef}>
      <ContextMenuItem onClick={selectLightTheme}>
        Светлый
      </ContextMenuItem>
      <ContextMenuItem onClick={selectDarkTheme}>
        Темный
      </ContextMenuItem>
      <ContextMenuItem onClick={selectMaterialTheme}>
        Матереальный
      </ContextMenuItem>
    </ContextMenu>
  </>
})