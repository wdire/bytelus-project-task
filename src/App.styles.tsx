import styled, { createGlobalStyle, css } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
    html{
        height:100%;
    }

    body{
        height:100%;
        font-family:"Roboto", Arial, Helvetica, sans-serif;
        margin:0;
        padding:0;
        color:#000;
        background:#fff;
    }

    *{
        box-sizing:border-box;
    }

    .container{
        height:100%;
    }
`;

export const Main = styled.div`
    display:flex;
    width:100%;
    height:100%;
`;