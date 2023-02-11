import React, { useRef, useEffect } from "react";
import styled from "styled-components";

import BackgroundHero from "./BackgroundHero";
import ForegroundHero from "./ForegroundHero";
import MidgroundHero from "./MidgroundHero";

const StyledSVGWrapper = styled.div`
  position: relative;
  width: 50vw;
  height: 30vw;
`;

const ParallaxHeroSection = () => {
  const foregroundRef = useRef();
  const backgroundRef = useRef();
  const midgroundRef = useRef();

  useEffect(() => {
    const onMove = ({ clientX, clientY }) => {
      foregroundRef.current.moveTo(clientX / 4, clientY / 8);
      midgroundRef.current.moveTo(clientX / 8, clientY / 16);
      backgroundRef.current.moveTo(clientX / 12, clientY / 24);
    };

    document.addEventListener("mousemove", onMove);

    const onLeave = () => {
      foregroundRef.current.moveTo(0, 0);
      midgroundRef.current.moveTo(0, 0);
      backgroundRef.current.moveTo(0, 0);
    };

    document.addEventListener("mouseleave", onLeave);

    return () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <StyledSVGWrapper>
      <BackgroundHero ref={backgroundRef} />
      <MidgroundHero ref={midgroundRef} />
      <ForegroundHero ref={foregroundRef} />
    </StyledSVGWrapper>
  );
};

export default ParallaxHeroSection;
