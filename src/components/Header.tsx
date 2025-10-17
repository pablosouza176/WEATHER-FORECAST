import React from "react";
import styled from "styled-components";

const HeaderContainer = styled.header`
  padding: 2rem 0 1.5rem 0;
  text-align: center;
  background: linear-gradient(90deg, #4f8ef7 0%, #a1c4fd 100%);
`;

const Header: React.FC = () => (
  <HeaderContainer></HeaderContainer>
);

export default Header;
