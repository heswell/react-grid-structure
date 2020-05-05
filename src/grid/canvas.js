import React, { forwardRef, useImperativeHandle, useRef } from "react";
import ColumnGroupHeader from "./column-group-header";
import cx from "classnames";

const Canvas = forwardRef(
  (
    { className, contentHeight, contentWidth, height, onScroll, width },
    ref
  ) => {
    const canvasEl = useRef(null);
    const contentEl = useRef(null);

    useImperativeHandle(ref, () => ({
      beginVerticalScroll: () => {
        canvasEl.current.style.height = `${contentHeight}px`;
        contentEl.current.style.transform = "translate3d(0px, 0px, 0px)";
      },
      endVerticalScroll: scrollTop => {
        canvasEl.current.style.height = `${height}px`;
        contentEl.current.style.transform = `translate3d(0px, -${scrollTop}px, 0px)`;
      },
      beginHorizontalScroll: scrollTop => {
        canvasEl.current.style.height = `${600}px`;
        scrollTop = -(scrollTop - 32);
        contentEl.current.style.transform = `translate3d(0px, ${scrollTop}px, 0px)`;
      },
      endHorizontalScroll: scrollTop => {
        canvasEl.current.style.height = `${568}px`;
        contentEl.current.style.transform = `translate3d(0px, -${Math.min(
          scrollTop,
          632
        )}px, 0px)`;
      }
    }));

    return (
      <div
        className={cx("Canvas", className)}
        ref={canvasEl}
        style={{ height, width }}
        onScroll={onScroll}
      >
        <div className="canvas-content-wrapper" style={{ width: contentWidth }}>
          <div
            className="canvas-content"
            ref={contentEl}
            style={{ width: contentWidth, height: contentHeight }}
          />
        </div>
        <ColumnGroupHeader
          height={32}
          width={contentWidth}
          contentWidth={contentWidth}
        />
      </div>
    );
  }
);

export default Canvas;
