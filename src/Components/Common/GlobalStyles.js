import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const GlobalStyles = createGlobalStyle`
    ${reset};
    * {
        box-sizing:border-box;
    }
    body{
        font-family: 'Noto Sans KR', sans-serif;
        font-size: 16px;
        background-color:#1b1b1b;
        color: white;       
        padding-top:50px;
    a{
        text-decoration: none;
        color:inherit;
    }
    }
`;

export default GlobalStyles;
