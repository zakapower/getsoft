"use client";

import { useEffect, useRef, useState } from "react";
import "./OverlayScrollbar.css";

const HIDE_DELAY_MS = 900;
const MIN_THUMB = 36;
const ARROW = 20;
const STEP = 72;
const MEASURE_DEBOUNCE_MS = 120;

export function OverlayScrollbar() {
  const [needed, setNeeded] = useState(false);
  const [active, setActive] = useState(false);
  const hideTimer = useRef(0);
  const measureTimer = useRef(0);
  const drag = useRef<{ startY: number; startTop: number } | null>(null);
  const hovering = useRef(false);
  const holdTimer = useRef(0);
  const holdInterval = useRef(0);
  const thumbRef = useRef<HTMLButtonElement>(null);
  const railRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef({
    view: 0,
    total: 0,
    thumbHeight: MIN_THUMB,
    thumbTop: ARROW,
    maxTop: 0,
  });
  const raf = useRef(0);
  const activeRef = useRef(false);

  useEffect(() => {
    const root = document.documentElement;

    function applyThumb(top: number, height: number) {
      const el = thumbRef.current;
      if (!el) return;
      el.style.top = `${top}px`;
      el.style.height = `${height}px`;
    }

    function updateThumbFromScroll() {
      const { view, total, thumbHeight, maxTop } = trackRef.current;
      if (total <= view + 1) return;
      const top =
        total === view
          ? ARROW
          : ARROW + Math.round((root.scrollTop / (total - view)) * maxTop);
      const clamped = Math.min(ARROW + maxTop, Math.max(ARROW, top));
      trackRef.current.thumbTop = clamped;
      applyThumb(clamped, thumbHeight);
    }

    function syncHeaderOffset() {
      const header = document.querySelector(".site-header");
      const headerH =
        header instanceof HTMLElement
          ? Math.round(header.getBoundingClientRect().height)
          : 0;
      root.style.setProperty("--header-h", `${headerH}px`);
      return headerH;
    }

    function measure() {
      const headerH = syncHeaderOffset();
      const view = root.clientHeight;
      const total = root.scrollHeight;
      const canScroll = total > view + 1;
      trackRef.current.view = view;
      trackRef.current.total = total;

      setNeeded((prev) => (prev === canScroll ? prev : canScroll));

      if (!canScroll) {
        if (activeRef.current) {
          activeRef.current = false;
          setActive(false);
        }
        return;
      }

      const railH =
        railRef.current?.clientHeight || Math.max(0, view - headerH);
      const track = Math.max(0, railH - ARROW * 2);
      const ratio = view / total;
      const height = Math.max(MIN_THUMB, Math.round(track * ratio));
      const maxTop = Math.max(0, track - height);
      trackRef.current.thumbHeight = height;
      trackRef.current.maxTop = maxTop;
      updateThumbFromScroll();
    }

    function scheduleMeasure() {
      window.clearTimeout(measureTimer.current);
      measureTimer.current = window.setTimeout(measure, MEASURE_DEBOUNCE_MS);
    }

    function scheduleHide() {
      window.clearTimeout(hideTimer.current);
      hideTimer.current = window.setTimeout(() => {
        if (!drag.current && !hovering.current) {
          activeRef.current = false;
          setActive(false);
        }
      }, HIDE_DELAY_MS);
    }

    function show() {
      if (!activeRef.current) {
        activeRef.current = true;
        setActive(true);
      }
      scheduleHide();
    }

    function onScroll() {
      if (raf.current) return;
      raf.current = window.requestAnimationFrame(() => {
        raf.current = 0;
        updateThumbFromScroll();
        show();
      });
    }

    measure();

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", scheduleMeasure, { passive: true });
    const ro = new ResizeObserver(scheduleMeasure);
    ro.observe(document.documentElement);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", scheduleMeasure);
      ro.disconnect();
      window.clearTimeout(hideTimer.current);
      window.clearTimeout(measureTimer.current);
      window.clearTimeout(holdTimer.current);
      window.clearInterval(holdInterval.current);
      if (raf.current) window.cancelAnimationFrame(raf.current);
    };
  }, []);

  function scrollByStep(delta: number) {
    document.documentElement.scrollBy({ top: delta, behavior: "auto" });
    if (!activeRef.current) {
      activeRef.current = true;
      setActive(true);
    }
  }

  function startHold(delta: number) {
    scrollByStep(delta);
    window.clearTimeout(holdTimer.current);
    window.clearInterval(holdInterval.current);
    holdTimer.current = window.setTimeout(() => {
      holdInterval.current = window.setInterval(() => scrollByStep(delta), 50);
    }, 320);
  }

  function stopHold() {
    window.clearTimeout(holdTimer.current);
    window.clearInterval(holdInterval.current);
    window.clearTimeout(hideTimer.current);
    hideTimer.current = window.setTimeout(() => {
      if (!hovering.current && !drag.current) {
        activeRef.current = false;
        setActive(false);
      }
    }, HIDE_DELAY_MS);
  }

  useEffect(() => {
    if (!needed || !thumbRef.current) return;
    const { thumbTop, thumbHeight } = trackRef.current;
    thumbRef.current.style.top = `${thumbTop}px`;
    thumbRef.current.style.height = `${thumbHeight}px`;
  }, [needed, active]);

  if (!needed) return null;

  return (
    <div
      ref={railRef}
      className={
        active
          ? "overlay-scrollbar overlay-scrollbar--active"
          : "overlay-scrollbar"
      }
      aria-hidden="true"
      onPointerEnter={() => {
        hovering.current = true;
        activeRef.current = true;
        setActive(true);
        window.clearTimeout(hideTimer.current);
      }}
      onPointerLeave={() => {
        hovering.current = false;
        if (drag.current) return;
        window.clearTimeout(hideTimer.current);
        hideTimer.current = window.setTimeout(() => {
          activeRef.current = false;
          setActive(false);
        }, HIDE_DELAY_MS);
      }}
    >
      <button
        type="button"
        className="overlay-scrollbar__arrow overlay-scrollbar__arrow--up"
        tabIndex={-1}
        onPointerDown={(e) => {
          e.preventDefault();
          startHold(-STEP);
        }}
        onPointerUp={stopHold}
        onPointerCancel={stopHold}
      />
      <button
        ref={thumbRef}
        type="button"
        className="overlay-scrollbar__thumb"
        tabIndex={-1}
        onPointerDown={(e) => {
          e.preventDefault();
          const startY = e.clientY;
          const startTop = trackRef.current.thumbTop;
          drag.current = { startY, startTop };
          document.body.classList.add("is-overlay-dragging");
          activeRef.current = true;
          setActive(true);
          window.clearTimeout(hideTimer.current);
          e.currentTarget.setPointerCapture(e.pointerId);

          function onMove(ev: PointerEvent) {
            if (!drag.current) return;
            const root = document.documentElement;
            const { view, total, maxTop } = trackRef.current;
            const nextTop = Math.min(
              ARROW + maxTop,
              Math.max(
                ARROW,
                drag.current.startTop + (ev.clientY - drag.current.startY),
              ),
            );
            trackRef.current.thumbTop = nextTop;
            const el = thumbRef.current;
            if (el) el.style.top = `${nextTop}px`;
            const maxScroll = total - view;
            root.scrollTop =
              maxTop === 0 ? 0 : ((nextTop - ARROW) / maxTop) * maxScroll;
          }

          function onUp() {
            drag.current = null;
            document.body.classList.remove("is-overlay-dragging");
            window.removeEventListener("pointermove", onMove);
            window.removeEventListener("pointerup", onUp);
            window.removeEventListener("pointercancel", onUp);
            window.clearTimeout(hideTimer.current);
            hideTimer.current = window.setTimeout(() => {
              if (!hovering.current) {
                activeRef.current = false;
                setActive(false);
              }
            }, HIDE_DELAY_MS);
          }

          window.addEventListener("pointermove", onMove);
          window.addEventListener("pointerup", onUp);
          window.addEventListener("pointercancel", onUp);
        }}
      />
      <button
        type="button"
        className="overlay-scrollbar__arrow overlay-scrollbar__arrow--down"
        tabIndex={-1}
        onPointerDown={(e) => {
          e.preventDefault();
          startHold(STEP);
        }}
        onPointerUp={stopHold}
        onPointerCancel={stopHold}
      />
    </div>
  );
}
