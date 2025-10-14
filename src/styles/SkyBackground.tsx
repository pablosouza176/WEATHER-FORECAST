import styled from "styled-components";

export const Sky = styled.div`
  position: fixed;
  inset: 0;
  background-image: url("https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=1600&q=60");
  background-size: cover;
  background-position: center;
  filter: saturate(1.05) contrast(1.02);
  opacity: 0.18;
  z-index: 0;
  pointer-events: none;
`;
