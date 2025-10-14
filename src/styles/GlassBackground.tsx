import styled from "styled-components";

export const GlassBackground = styled.div`
  position: fixed;
  inset: 0;
  z-index: 0;
  background: url("https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=1600&q=60")
    center/cover no-repeat;
  &::after {
    content: "";
    position: absolute;
    inset: 0;
    background: rgba(255, 255, 255, 0.28);
    backdrop-filter: blur(6px);
    pointer-events: none;
  }
`;
