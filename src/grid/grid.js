import React, { useRef } from "react";
import ColumnGroupHeader from "./column-group-header";
import Viewport from "./viewport";

import "./grid.css";

export function getScrollHandler(scrollPos, callback) {
  let timeoutHandle = null;
  const pos = { current: 0 };
  const onScrollEnd = () => {
    callback("scroll-end", pos.current);
    timeoutHandle = null;
  };
  return e => {
    // important for the horizontal scroll on Canvas
    e.stopPropagation();
    pos.current = e.target[scrollPos];
    if (timeoutHandle === null) {
      callback("scroll-start", pos.current);
    } else {
      clearTimeout(timeoutHandle);
    }
    timeoutHandle = setTimeout(onScrollEnd, 200);
  };
}

export default ({ width, height }) => {
  const gridEl = useRef(null);
  const viewport = useRef(null);
  const scrollableHeader = useRef(null);

  const handleVerticalScroll = getScrollHandler("scrollTop", scrollEvent => {
    if (scrollEvent === "scroll-start") {
      viewport.current.beginVerticalScroll();
    } else {
      viewport.current.endVerticalScroll();
    }
  });

  const handleHorizontalScroll = getScrollHandler(
    "scrollLeft",
    (scrollEvent, scrollLeft) => {
      if (scrollEvent === "scroll-start") {
        viewport.current.beginHorizontalScroll();
        gridEl.current.classList.add("scrolling-x");
      } else {
        viewport.current.endHorizontalScroll();
        gridEl.current.classList.remove("scrolling-x");
        scrollableHeader.current.endHorizontalScroll(scrollLeft);
      }
    }
  );

  return (
    <div className="Grid" ref={gridEl} style={{ width, height }}>
      <div className="header-container">
        <ColumnGroupHeader
          className="fixed"
          height={32}
          width={200}
          contentWidth={200}
        />
        <ColumnGroupHeader
          className="scrollable"
          height={32}
          ref={scrollableHeader}
          width={600}
          contentWidth={1270}
        />
      </div>
      <Viewport
        ref={viewport}
        top={32}
        contentHeight={1200}
        onHorizontalScroll={handleHorizontalScroll}
        onVerticalScroll={handleVerticalScroll}
      />
    </div>
  );
};
