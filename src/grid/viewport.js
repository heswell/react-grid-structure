import React, { forwardRef, useImperativeHandle, useRef } from "react";
import Canvas from "./canvas";
import cx from "classnames";

const Viewport = forwardRef(
  ({ contentHeight, onVerticalScroll, onHorizontalScroll, top }, ref) => {
    const viewportEl = useRef(null);
    const scrollingEl = useRef(null);
    const fixedCanvas = useRef(null);
    const scrollableCanvas = useRef(null);

    console.log(`Viewport render`, fixedCanvas.current);

    useImperativeHandle(ref, () => ({
      beginVerticalScroll: () => {
        fixedCanvas.current.beginVerticalScroll();
        scrollableCanvas.current.beginVerticalScroll();
      },
      endVerticalScroll: () => {
        const scrollTop = viewportEl.current.scrollTop;
        fixedCanvas.current.endVerticalScroll(scrollTop);
        scrollableCanvas.current.endVerticalScroll(scrollTop);
      },
      beginHorizontalScroll: () => {
        const scrollTop = viewportEl.current.scrollTop;
        scrollingEl.current.style.height = `${1232}px`;
        fixedCanvas.current.beginHorizontalScroll(scrollTop);
        scrollableCanvas.current.beginHorizontalScroll(scrollTop);
      },
      endHorizontalScroll: () => {
        const scrollTop = viewportEl.current.scrollTop;
        fixedCanvas.current.endHorizontalScroll(scrollTop);
        scrollableCanvas.current.endHorizontalScroll(scrollTop);
        scrollingEl.current.style.height = `${1200}px`;
      }
    }));

    return (
      <div
        className={cx("Viewport")}
        ref={viewportEl}
        style={{ top }}
        onScroll={onVerticalScroll}
      >
        <div
          className="scrolling-canvas-container"
          ref={scrollingEl}
          style={{ height: contentHeight }}
        >
          <Canvas
            className="fixed"
            contentWidth={200}
            contentHeight={1200}
            height={568}
            ref={fixedCanvas}
            width={200}
          />
          <Canvas
            className="scrollable"
            contentHeight={1200}
            contentWidth={1270}
            height={568}
            onScroll={onHorizontalScroll}
            ref={scrollableCanvas}
            width={585}
          />
        </div>
      </div>
    );
  }
);

export default Viewport;
