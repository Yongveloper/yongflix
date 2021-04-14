import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const globalStyles = createGlobalStyle`
  ${reset};
    * {
        box-sizing:border-box;
    }
    
    body {
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

    ::-webkit-scrollbar {
    width: 10px;
    }

    ::-webkit-scrollbar-track {
    background: #b4b4b4; border-radius: 10px;
    }
    
    ::-webkit-scrollbar-thumb {
    background: #888; border-radius: 10px;
    }

    ::-webkit-scrollbar-thumb:hover {
    background: #555; 
    }
`;

export default globalStyles;
