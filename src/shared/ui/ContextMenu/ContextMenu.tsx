import { memo, useState, type ReactNode, useEffect, useImperativeHandle, forwardRef, useRef } from "react";
import { Instance, createPopper, popper } from "@popperjs/core";
import { IContextMenuRef } from "shared/types/IContextMenuRef";
import classNames from "classnames";

interface ContextMenuProps {
  children: ReactNode,
  className?: string
}

export const ContextMenu = memo(
  forwardRef<IContextMenuRef, ContextMenuProps>(({ children, className }, ref) => {
    const [popperElement, setPopperElement] = useState<HTMLElement | null>(null);
    const [popperInstance, setPopperInstance] = useState<null | Instance>(null);

    useImperativeHandle(ref, () => ({
      open(event: React.MouseEvent<HTMLElement>) {

        const referenceElement = event.currentTarget;

        if (popperElement && referenceElement) {
          setTimeout(() => {
            setPopperInstance(createPopper({
              getBoundingClientRect() {
                const clientRect = referenceElement.getBoundingClientRect();
                return {
                  left: event.clientX,
                  top: event.clientY,
                  bottom: clientRect.bottom,
                  right: clientRect.right,
                  width: 0,
                  height: 0,
                  x: clientRect.x,
                  y: clientRect.y,
                  toJSON: clientRect.toJSON
                }
              },
            }, popperElement, {
              placement: "auto",
              modifiers: [
                {
                  name: "offset",
                  options: {
                    offset: [0, 5],
                  },
                },
                {
                  name: "preventOverflow",
                  options: {
                    rootBoundary: "viewport",
                    tether: false,
                  },
                },
                {
                  name: "flip",
                  options: {
                    altBoundary: true,
                  },
                },
              ]
            }))
            popperElement.style.position = "fixed";
            popperElement.style.display = "flex";
            popperElement.style.left = `${event.clientX}px`;
            popperElement.style.top = `${event.clientY}px`;
            popperInstance?.update();
          }, 1)

        }
      },
      close() {
        if (popperElement) popperElement.style.display = "none";
        popperInstance?.destroy();
        setPopperInstance(null)
      }
    }))

    useEffect(() => {
      function windowClickHandler(event: MouseEvent) {
        const target = event.target as HTMLElement;

        const element = target.closest(".context-menu");

        if (popperInstance && !element && target !== popperElement) {
          if (popperElement) popperElement.style.display = "none";
          popperInstance?.destroy()
          setPopperInstance(null);
        }
      }

      window.addEventListener("click", windowClickHandler)

      return () => {
        window.removeEventListener("click", windowClickHandler)
      }
    }, [popperElement, popperInstance]);

    return <div className={classNames(
      "context-menu", 
      className,
      {
        "context-menu_active": popperInstance
      }
      )} ref={setPopperElement}>
      {children}
    </div>
  })
)