import styled, { createGlobalStyle, css } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
    html{
        height:100%;
    }

    body{
        font-family:"Roboto", Arial, Helvetica, sans-serif;
        margin:0;
        padding:0;
        color:#fff;
        background:#282828;
    }

    *{
        box-sizing:border-box;
    }
`;

export const Main = styled.div`
    
`;