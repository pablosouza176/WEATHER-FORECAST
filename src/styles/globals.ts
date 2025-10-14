import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap');
  body {
    min-height: 100vh;
    margin: 0;
    padding: 0;
    font-family: 'Inter', Arial, sans-serif;
    background: linear-gradient(to bottom, #8ccaf7, #e6f4ff);
    background-image: url('https://i.imgur.com/1s2zv6q.png');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
  }
`;
