"use client";

import { ArrowDownAZ, Check, Clock3, Layers } from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";
import { useApp } from "@/context/AppContext";
import { getDictionary } from "@/i18n/dictionaries";
import { sortIds, type SortId } from "@/lib/sort";

type Props = {
  value: SortId;
  onChange: (next: SortId) => void;
};

function labelFor(id: SortId, dict: ReturnType<typeof getDictionary>) {
  if (id === "name") return dict.sortName;
  if (id === "category") return dict.sortCategory;
  return dict.sortRecent;
}

function IconFor({ id }: { id: SortId }) {
  if (id === "name") return <ArrowDownAZ className="sort-menu__icon" strokeWidth={2.25} aria-hidden />;
  if (id === "category") return <Layers className="sort-menu__icon" strokeWidth={2.25} aria-hidden />;
  return <Clock3 className="sort-menu__icon" strokeWidth={2.25} aria-hidden />;
}

export function SortMenu({ value, onChange }: Props) {
  const { lang } = useApp();
  const dict = getDictionary(lang);
  const listId = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [hoverReady, setHoverReady] = useState(false);
  const [hovered, setHovered] = useState<SortId | null>(null);

  useEffect(() => {
    if (!open) {
      setHoverReady(false);
      setHovered(null);
      return;
    }

    const enableHoverTimer = window.setTimeout(() => {
      setHoverReady(true);
    }, 180);

    function onPointerDown(e: PointerEvent) {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }

    window.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("keydown", onKey);
    return () => {
      window.clearTimeout(enableHoverTimer);
      window.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const currentLabel = labelFor(value, dict);

  return (
    <div className={`sort-menu${open ? " is-open" : ""}`} ref={rootRef}>
      <button
        type="button"
        className="sort-menu__trigger"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        aria-label={`${dict.sortLabel}: ${currentLabel}`}
        title={`${dict.sortLabel}: ${currentLabel}`}
        onClick={() => setOpen((v) => !v)}
      >
        <IconFor id={value} />
      </button>
      <ul
        id={listId}
        className="sort-menu__list"
        role="listbox"
        aria-label={dict.sortLabel}
        hidden={!open}
      >
        {sortIds.map((id) => {
          const active = id === value;
          const isHover = hoverReady && hovered === id;
          return (
            <li key={id} role="presentation">
              <button
                type="button"
                role="option"
                aria-selected={active}
                className={`sort-menu__option${active ? " is-active" : ""}${isHover ? " is-hover" : ""}`}
                onPointerEnter={() => {
                  if (hoverReady) setHovered(id);
                }}
                onPointerLeave={() => {
                  setHovered((cur) => (cur === id ? null : cur));
                }}
                onClick={() => {
                  onChange(id);
                  setOpen(false);
                }}
              >
                <span className="sort-menu__option-label">{labelFor(id, dict)}</span>
                <Check
                  className={`sort-menu__check${active ? " is-on" : ""}`}
                  strokeWidth={2.5}
                  aria-hidden
                />
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
