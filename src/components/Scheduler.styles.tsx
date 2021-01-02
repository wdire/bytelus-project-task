import styled, { css } from 'styled-components';

export const SchedulerContainer = styled.div.attrs(props => {
    return {
        className:"schedulerContainer"
    }
})`
    width:100%;
    height:100%;
    position:relative;
`;

export const SchedulerDay = styled.div.attrs(props => {
    return {
        className:"schedulerDay"
    }
})`
    width:calc(100% / 7);
    border-right:1px solid #000;
`;

export const SchedulerItem = styled.div.attrs(props => {
    return {
        className:"schedulerItem"
    }
})`
    width:100%;
    background:#808080;
    height:170px;
    padding:10px;
`;

export const SchedulerDragArea = styled.div`
    height:100%;
    display:flex;
    position:relative;
`;