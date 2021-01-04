import styled, { css } from 'styled-components';

const scheduleMarginLeft = "46px";

export const SchedulerContainer = styled.div.attrs(props => {
    return {
        className:"schedulerContainer"
    }
})`
    width:100%;
    max-height: 100%;
    height:100%;
    padding:40px 0px 15px 60px;
    position:relative;
    display:flex;
    flex-direction:column;
`;

export const SchedulerWrapper = styled.div.attrs(props => {
    return {
        className:"schedulerWrapper"
    }
})`
    height:100%;
    overflow-y:scroll;
    position:relative;
`;


export const SchedulerDragArea = styled.div.attrs(props => {
    return {
        className:"schedulerDragArea"
    }
})`
    height:100%;
    display:flex;
    position:relative;
    margin-left:${scheduleMarginLeft};
    margin-top: 5px;
`;


// START: Scheduler Item

export const SchedulerItem = styled.div.attrs(props => {
    return {
        className:"schedulerItem",
    }
})`
    width:100%;
    min-height:calc(100% / 17);
`;

export const SchedulerItemWrapper = styled.div.attrs(props => {
    return {
        className:"schedulerItemWrapper"
    }
})<{color:string}>`
    width:100%;
    background:#2c2c2c;
    color:#fff;
    min-height:calc(100% / 17);
    height:100px;
    padding:8px;
    border-radius:4px;
    border-top:5px solid ${props => props.color ? props.color : "#da2a2a"};
    font-size:15px;
    overflow:hidden;
    cursor:pointer;
`;

export const SchedulerItemInfoContainer = styled.div.attrs(props => {
    return {
        className:"schedulerItemInfoContainer",
    }
})`
    &.show{
        display:initial;
    }

    display:none;

    position:absolute;
    z-index:500;

`;

export const SchedulerItemInfo = styled.div.attrs(props => {
    return {
        className:"schedulerItemInfo",
    }
})`
    width:260px;
    height:120px;
    background:#fff;
    box-shadow:0px 0px 4px 3px rgba(0,0,0,.2);
    padding:15px;
    font-size:15px;
    display:flex;
    flex-direction:column;
`;

export const SchedulerItemInfoDay = styled.div.attrs(props => {
    return {
        className:"schedulerItemInfoDay",
    }
})`
    font-size:18px;
    margin-bottom:10px;
`;

export const SchedulerItemNameContainer = styled.div.attrs(props => {
    return {
        className:"schedulerItemNameContainer",
    }
})`
    display:flex;
    align-items:center;
    margin-left:15px;
`;

export const SchedulerItemColor = styled.div.attrs(props => {
    return {
        className:"schedulerItemColor",
    }
})`
    width:9px;
    height:9px;
    border-radius:50%;
    border:1px solid rgb(0, 0, 0,0.2);
    margin-right:8px;
`;

export const SchedulerItemName = styled.div.attrs(props => {
    return {
        className:"schedulerItemName",
    }
})`

`;

export const SchedulerItemDelete = styled.div.attrs(props => {
    return {
        className:"schedulerItemDelete",
    }
})`
    margin-top: auto;
    color:#888888;
    cursor:pointer;
`;

export const SchedulerItemInfoClose = styled.div.attrs(props => {
    return {
        className:"schedulerItemInfoClose",
    }
})`
    position: absolute;
    z-index:15;
    top: 13px;
    right: 15px;
    font-size: 18px;
    color: #808080;

    &:hover{
        cursor:pointer;
    }
`;

// END: Scheduler Item


// START: Scheduler Days

export const SchedulerDayLabelsContainer = styled.div`
    display:flex;
    margin-left:${scheduleMarginLeft};
`;

export const SchedulerDay = styled.div.attrs(props => {
    return {
        className:"schedulerDay"
    }
})`
    width:calc(100% / 7);
    max-height:100%;
    margin:0 1px;
    position:relative;
`;

export const SchedulerDayLabel = styled.div`
    width:calc(100% / 7);
    padding-bottom:15px;
    font-size:18px;
    color:#ccc;
`;

// END: Scheduler Days

// START: Scheduler Time

export const SchedulerTimesContainer = styled.div`
    position:absolute;
    top:0;
    bottom:0;
    width:100%;
    height:100%;
`;

export const SchedulerTime = styled.div`
    display:flex;
    align-items:flex-start;
    height:50px;
    padding-top:5px;
`;

export const SchedulerTimeText = styled.div`
    display:inline-block;
    font-size:16px;
    padding-right:10px;
    color:#ccc;
    margin-top: -0.5em;
`;

export const SchedulerTimeLine = styled.div`
    width:100%;
    height:1px;
    background:#ccc;
`;

// END: Scheduler Time