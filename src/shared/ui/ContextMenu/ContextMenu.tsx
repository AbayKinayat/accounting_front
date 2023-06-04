import { memo, useState, type ReactNode, useEffect } from "react";
import "./ContextMenu.scss";
import { usePopper } from "react-popper";

interface ContextMenuProps {
  referenceElement: Element | null,
  children: ReactNode,
  isOpen: boolean,
  onClose?: () => void
}

export const ContextMenu = memo<ContextMenuProps>(({ referenceElement, children, isOpen, onClose }) => {
  const [popperElement, setPopperElement] = useState<HTMLElement | null>(null);
  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement: "auto",
  })

  useEffect(() => {
    function windowClickHandler(event: MouseEvent) {
      const target = event.target as HTMLElement;

      const element = target.closest(".context-menu");

      if (isOpen && !element && target !== referenceElement) {
        console.log("sadas")
        onClose?.()
      } 
    }

    window.addEventListener("click", windowClickHandler)

    return () => {
      window.removeEventListener("click", windowClickHandler)
    }
  }, [referenceElement, isOpen]);

  if (!isOpen) {
    return null
  }

  return <div className="context-menu" ref={setPopperElement} style={styles.popper} {...attributes.popper}>
    {children}
  </div>
})