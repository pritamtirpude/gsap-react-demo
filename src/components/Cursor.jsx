import React, { useState, useEffect } from "react";
import styled from "styled-components";

const StyledCursor = styled.div`
  width: 40px;
  height: 40px;
  border: 2px solid #ffffff;
  border-radius: 100%;
  position: fixed;
  transform: translate(-50%, -50%);
  pointer-events: none;
  z-index: 100;
  mix-blend-mode: difference;
  transition-property: opcaity, background-color, transform;
  transition-duration: 500ms;
  transition-timing-function: ease;
`;

const isMobile = () => {
  const ua = navigator.userAgent;
  return /Android|Mobi/i.test(ua);
};
const Cursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [hidden, setHidden] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [linkHovered, setLinkHovered] = useState(false);

  const getBackgroundColor = () => {
    if (clicked) {
      return "#ffffff";
    } else if (linkHovered) {
      return "#ffffff";
    } else {
      return "transparent";
    }
  };

  const setScaleLinkHovered = () => {
    if (clicked) {
      return "translate(-50%, -50%) scale(0.9)";
    } else if (linkHovered) {
      return "translate(-50%, -50%) scale(1.5)";
    } else {
      return "translate(-50%, -50%) scale(1)";
    }
  };

  const handleLinkHoverEvents = () => {
    document.querySelectorAll("a").forEach((el) => {
      el.addEventListener("mouseover", () => setLinkHovered(true));
      el.addEventListener("mouseout", () => setLinkHovered(false));
    });
  };

  useEffect(() => {
    const onMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const onMouseEnter = () => {
      setHidden(false);
    };

    const onMouseLeave = () => {
      setHidden(true);
    };

    const onMouseDown = (e) => {
      setClicked(true);
    };

    const onMouseUp = (e) => {
      setClicked(false);
    };
    handleLinkHoverEvents();

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mousedown", onMouseDown);
    document.addEventListener("mouseup", onMouseUp);
    document.body.addEventListener("mouseenter", onMouseEnter);
    document.body.addEventListener("mouseleave", onMouseLeave);

    return () => {
      document.removeEventListener("mouseleave", onMouseMove);
      document.removeEventListener("mousedown", onMouseDown);
      document.removeEventListener("mouseup", onMouseUp);
      document.body.removeEventListener("mouseenter", onMouseEnter);
      document.body.removeEventListener("mouseleave", onMouseLeave);
    };
  }, []);

  if (typeof navigator !== "undefined" && isMobile()) return null;

  return (
    <StyledCursor
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        opacity: hidden ? 0 : 1,
        backgroundColor: getBackgroundColor(),
        transform: setScaleLinkHovered(),
      }}
    />
  );
};

export default Cursor;
