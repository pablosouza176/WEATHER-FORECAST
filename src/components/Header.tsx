import React from "react";
import styled from "styled-components";

const HeaderContainer = styled.header`
  padding: 2rem 0 1.5rem 0;
  text-align: center;
  background: linear-gradient(90deg, #4f8ef7 0%, #a1c4fd 100%);
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: 600;
  color: #fff;
  margin: 0;
`;

const Header: React.FC = () => (
  <HeaderContainer>
    <Title>Dashboard – Previsão do tempo</Title>
  </HeaderContainer>
);

export default Header;
