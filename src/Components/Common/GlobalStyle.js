import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';
import GmarketSansTTFMedium from '../../font/GmarketSansTTFMedium.ttf';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const globalStyles = createGlobalStyle`
    ${reset};
    @font-face {
    font-family: 'Gmarket Sans';
    src: url(${GmarketSansTTFMedium}) format('truetype');
    font-weight: 300;
    font-style: normal;
    font-display: auto;
  }
    * {
        box-sizing:border-box;     
    }
    body{
        font-family: 'Gmarket Sans';
        font-size: 16px;
        background-color:#1b1b1b;
        color: white;       
        padding-top:50px;
    }
    a{
        text-decoration: none;
        color:inherit;
    }
`;

export default globalStyles;
