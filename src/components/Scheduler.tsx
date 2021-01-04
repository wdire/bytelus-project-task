import React, { Component } from 'react'
import ReactDOM from "react-dom";
import { SchedulerContainer, SchedulerDay, SchedulerDayLabel, SchedulerDayLabelsContainer, SchedulerDragArea, SchedulerItem, SchedulerItemColor, SchedulerItemDelete, SchedulerItemInfo, SchedulerItemInfoClose, SchedulerItemInfoContainer, SchedulerItemInfoDay, SchedulerItemName, SchedulerItemNameContainer, SchedulerItemWrapper, SchedulerTime, SchedulerTimeLine, SchedulerTimesContainer, SchedulerTimeText, SchedulerWrapper } from './Scheduler.styles';

const $ = require('jquery');

import 'modules/jquery-ui/themes/base/resizable.css';

import 'jquery-ui/ui/widgets/draggable';
import 'jquery-ui/ui/widgets/droppable';
import 'jquery-ui/ui/widgets/resizable';
import { createId, roundTo_25 } from '../utils';

// One hour in pixel
const SCHEDULER_ITEM_HEIGHT = 50;

const SchedulerDaysArr = ["Monday", "Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];

enum SchedulerDays {
    MON = 0,
    TUE = 1,
    WED = 2,
    THU = 3,
    FRI = 4,
    SAT = 5,
    SUN = 6
}

type SchedulerItemInfo = {
    id:number;
    name:string;
    day:SchedulerDays;
    startTime:number;
    endTime:number;
    color:string;
}

type SchedulerItemInfoOptional = {
    name?:string;
    day?:SchedulerDays;
    startTime?:number;
    endTime?:number;
    color?:string;
}

const PRE_DEFINED_SCHEDULES = [
    {
        color:"red",
        day:SchedulerDays.WED,
        startTime:3.75,
        endTime:6.5,
        name:"Have Fun",
        id:createId()
    },
    {
        color:"blue",
        day:SchedulerDays.MON,
        startTime:5.50,
        endTime:7.25,
        name:"Watch a movie",
        id:createId()
    },
    {
        color:"purple",
        day:SchedulerDays.TUE,
        startTime:1,
        endTime:2,
        name:"Some Meeting 1",
        id:createId()
    },
    {
        color:"lightblue",
        day:SchedulerDays.SAT,
        startTime:8.50,
        endTime:13,
        name:"Some Meeting 3",
        id:createId()
    },
    {
        color:"green",
        day:SchedulerDays.SUN,
        startTime:4.25,
        endTime:7,
        name:"Some Meeting 2",
        id:createId()
    },
];


type IProps = {
}

type IState = {
    currentInfoElmId:number;
}

export default class Scheduler extends Component<IProps, IState> {
    schedulerDragArea:React.RefObject<HTMLDivElement>;

    constructor(props: IProps){

        super(props);

        this.schedulerDragArea = React.createRef<HTMLDivElement>();

        this.state = {
            currentInfoElmId:0
        }
    }

    componentDidMount(){

        for(let i = 0; i < PRE_DEFINED_SCHEDULES.length;i++){
            this.createSchedulerItem(PRE_DEFINED_SCHEDULES[i]);
        }


        // Parent(schedulerItem) elm has draggable and
        // child(schedulerItemWrapper) has resizable. They don't work together in same element.

        this.initSchedulerItems();

        $(".schedulerDay").droppable({
            drop: (event:any, ui:any) => {
                ui.draggable[0].style.left = "0px";
                if(ui.draggable[0].parentElement !== event.target){
                    ui.draggable.detach().appendTo(event.target);
                    let itemInfo:SchedulerItemInfo = JSON.parse(ui.helper[0].getAttribute("data-info"));

                    itemInfo.day = Number(event.target.getAttribute("data-day"));

                    ui.helper[0].setAttribute("data-info", JSON.stringify(itemInfo));
                }
            }
        });

        let parent = this.schedulerDragArea.current?.parentElement;
        let scrollHeight = parent?.scrollHeight;

        if(scrollHeight){
            $(parent).children()[0].style.height = scrollHeight + "px";
            $(parent).children()[1].style.height = scrollHeight - 50 + "px";
        }
    }

    createSchedulerItem = (info:SchedulerItemInfo)=>{

        let itemTop = roundTo_25(info.startTime - 1) * SCHEDULER_ITEM_HEIGHT;

        let itemHeight = roundTo_25(info.endTime - 1) * SCHEDULER_ITEM_HEIGHT - itemTop;

        let elm = (
                <SchedulerItem style={{top:itemTop}} data-id={info.id} data-info={JSON.stringify(info)} >
                    <SchedulerItemWrapper color={info.color} style={{height:itemHeight}}>
                        {info.name}
                    </SchedulerItemWrapper>
                </SchedulerItem>
        );

        ReactDOM.render(elm, $(`.schedulerDay[data-day=${info.day}]`)[0], ()=>{
            this.initSchedulerItems();
        });
    }

    initSchedulerItems = () => {

        let schedulerDragArea = this.schedulerDragArea?.current;

        let schedulerItemWidth = schedulerDragArea?.offsetWidth ? Math.floor(schedulerDragArea?.offsetWidth / 7) : 5;

        $(".schedulerItem").draggable({ 
            containment:".schedulerDragArea", 
            snap: ".schedulerDay",
            snapMode: "inner",
            grid: [ schedulerItemWidth, SCHEDULER_ITEM_HEIGHT / 4 ],
            scroll:false,
            start:(event:any, ui:any)=>{

                this.hideItemInfo();

            },
            stop:(event:any, ui:any)=>{

                //Set start and end time on dragging ends

                let timeStart = roundTo_25(ui.position.top / SCHEDULER_ITEM_HEIGHT + 1);
                let timeEnd = roundTo_25((ui.helper[0].offsetHeight + ui.position.top) / SCHEDULER_ITEM_HEIGHT + 1);

                let itemInfo:SchedulerItemInfo = JSON.parse(ui.helper[0].getAttribute("data-info"));

                itemInfo.startTime = timeStart;
                itemInfo.endTime = timeEnd;

                ui.helper[0].setAttribute("data-info", JSON.stringify(itemInfo));
            }

        }).css("position","absolute").click((e:any)=>{

            this.hideItemInfo();

            this.handleSchedulerItemClick(e);
        });

        $(".schedulerItemWrapper").resizable({
            handles:"s",
            minHeight:SCHEDULER_ITEM_HEIGHT,
            containment:".schedulerDragArea", 
            resize:(event:any, ui:any)=>{

                //Change increasing size to (50 / 4 min) in px
                let newHeight = Math.round( ui.size.height / (SCHEDULER_ITEM_HEIGHT / 4) ) * (SCHEDULER_ITEM_HEIGHT / 4);
                
                ui.size.height = newHeight;

            },
            stop:(event:any, ui:any)=>{

                //Set end time on resizing ends

                let newHeight = Math.round( ui.size.height / (SCHEDULER_ITEM_HEIGHT / 4) ) * (SCHEDULER_ITEM_HEIGHT / 4);

                let itemInfo:SchedulerItemInfo = JSON.parse(ui.helper[0].parentElement.getAttribute("data-info"));

                let timeEnd = roundTo_25((newHeight + ui.helper[0].parentElement.offsetTop) / SCHEDULER_ITEM_HEIGHT + 1);

                itemInfo.endTime = timeEnd;

                ui.helper[0].parentElement.setAttribute("data-info", JSON.stringify(itemInfo));

            }
        });
    }

    
    handleSchedulerItemClick = (e:any) => {
        let parentElm = (e.target as HTMLDivElement).parentElement;

        if(parentElm){
            let itemInfoData = parentElm.getAttribute("data-info");
            if(itemInfoData){
                let itemInfo:SchedulerItemInfo = JSON.parse(itemInfoData);

                let top = parentElm.offsetTop - 20;
                let left = parentElm.parentElement?.offsetLeft || 50;

                left = left + (parentElm.offsetWidth / 2);

                this.showItemInfo({
                    posX:left,
                    posY:top,
                    info:itemInfo
                });
            }
        }
    }

    showItemInfo = (data:{
        posX:number;
        posY:number;
        info:SchedulerItemInfo
    }) => {
        let itemInfoCon = $(".schedulerItemInfoContainer");
        itemInfoCon.css("top",data.posY);
        itemInfoCon.css("left",data.posX);

        let startTimeDate = new Date(0, 0);
        let startTime = startTimeDate.setMinutes(data.info.startTime * 60);
        let startTimeResult = startTimeDate.toTimeString().slice(0, 5);

        let endTimeDate = new Date(0, 0);
        let endTime = endTimeDate.setMinutes(data.info.endTime * 60);
        let endTimeResult = endTimeDate.toTimeString().slice(0, 5);

        let itemDayTime = SchedulerDaysArr[data.info.day] + " " + startTimeResult + " - " + endTimeResult;

        $(itemInfoCon).find(".schedulerItemInfoDay").text(itemDayTime);
        $(itemInfoCon).find(".schedulerItemName").text(data.info.name);
        $(itemInfoCon).find(".schedulerItemColor").css("background", data.info.color);

        this.setState({currentInfoElmId:data.info.id});

        itemInfoCon.addClass("show");
    }

    hideItemInfo = ()=>{
        $("div.schedulerItemInfoContainer").removeClass("show");
    }

    deleteItemInfo = ()=>{
        document.querySelectorAll(".schedulerItem").forEach((e:any)=>{
            let itemId:number = e.getAttribute("data-id");
            
            if(Number(itemId) === Number(this.state.currentInfoElmId)){
                e.remove();
                this.hideItemInfo();
            }
        });
    }

    setSchedulerItemInfo = (id:string, info:SchedulerItemInfoOptional)=>{

    }

    writeScheduleDays = ()=>{
        let days = [];
        for (let item in SchedulerDaysArr) {
            days.push(<SchedulerDay key={item} data-day={item}></SchedulerDay>);
        }
        return days;
    }

    writeScheduleDaysLabels = ()=>{
        let labels = [];
        for (let item in SchedulerDaysArr) {
            labels.push(<SchedulerDayLabel key={item+"_label"}>{SchedulerDaysArr[item].substr(0,3)}</SchedulerDayLabel>);
        }
        return labels;
    }

    render() {
        return (
            <>
                <SchedulerContainer>
                    <SchedulerDayLabelsContainer>
                        {this.writeScheduleDaysLabels()}
                    </SchedulerDayLabelsContainer>
                    <SchedulerWrapper>
                        <SchedulerTimesContainer>
                            <SchedulerTime>
                                <SchedulerTimeText>01:00</SchedulerTimeText>
                                <SchedulerTimeLine></SchedulerTimeLine>
                            </SchedulerTime>
                            <SchedulerTime>
                                <SchedulerTimeText>02:00</SchedulerTimeText>
                                <SchedulerTimeLine></SchedulerTimeLine>
                            </SchedulerTime>
                            <SchedulerTime>
                                <SchedulerTimeText>03:00</SchedulerTimeText>
                                <SchedulerTimeLine></SchedulerTimeLine>
                            </SchedulerTime>
                            <SchedulerTime>
                                <SchedulerTimeText>04:00</SchedulerTimeText>
                                <SchedulerTimeLine></SchedulerTimeLine>
                            </SchedulerTime>
                            <SchedulerTime>
                                <SchedulerTimeText>05:00</SchedulerTimeText>
                                <SchedulerTimeLine></SchedulerTimeLine>
                            </SchedulerTime>
                            <SchedulerTime>
                                <SchedulerTimeText>06:00</SchedulerTimeText>
                                <SchedulerTimeLine></SchedulerTimeLine>
                            </SchedulerTime>
                            <SchedulerTime>
                                <SchedulerTimeText>07:00</SchedulerTimeText>
                                <SchedulerTimeLine></SchedulerTimeLine>
                            </SchedulerTime>
                            <SchedulerTime>
                                <SchedulerTimeText>08:00</SchedulerTimeText>
                                <SchedulerTimeLine></SchedulerTimeLine>
                            </SchedulerTime>
                            <SchedulerTime>
                                <SchedulerTimeText>09:00</SchedulerTimeText>
                                <SchedulerTimeLine></SchedulerTimeLine>
                            </SchedulerTime>
                            <SchedulerTime>
                                <SchedulerTimeText>10:00</SchedulerTimeText>
                                <SchedulerTimeLine></SchedulerTimeLine>
                            </SchedulerTime>
                            <SchedulerTime>
                                <SchedulerTimeText>11:00</SchedulerTimeText>
                                <SchedulerTimeLine></SchedulerTimeLine>
                            </SchedulerTime>
                            <SchedulerTime>
                                <SchedulerTimeText>12:00</SchedulerTimeText>
                                <SchedulerTimeLine></SchedulerTimeLine>
                            </SchedulerTime>
                            <SchedulerTime>
                                <SchedulerTimeText>13:00</SchedulerTimeText>
                                <SchedulerTimeLine></SchedulerTimeLine>
                            </SchedulerTime>
                            <SchedulerTime>
                                <SchedulerTimeText>14:00</SchedulerTimeText>
                                <SchedulerTimeLine></SchedulerTimeLine>
                            </SchedulerTime>
                            <SchedulerTime>
                                <SchedulerTimeText>15:00</SchedulerTimeText>
                                <SchedulerTimeLine></SchedulerTimeLine>
                            </SchedulerTime>
                            <SchedulerTime>
                                <SchedulerTimeText>16:00</SchedulerTimeText>
                                <SchedulerTimeLine></SchedulerTimeLine>
                            </SchedulerTime>
                            <SchedulerTime>
                                <SchedulerTimeText>17:00</SchedulerTimeText>
                                <SchedulerTimeLine></SchedulerTimeLine>
                            </SchedulerTime>
                            <SchedulerTime>
                                <SchedulerTimeText>18:00</SchedulerTimeText>
                                <SchedulerTimeLine></SchedulerTimeLine>
                            </SchedulerTime>
                            <SchedulerTime>
                                <SchedulerTimeText>19:00</SchedulerTimeText>
                                <SchedulerTimeLine></SchedulerTimeLine>
                            </SchedulerTime>
                            <SchedulerTime>
                                <SchedulerTimeText>20:00</SchedulerTimeText>
                                <SchedulerTimeLine></SchedulerTimeLine>
                            </SchedulerTime>
                            <SchedulerTime>
                                <SchedulerTimeText>21:00</SchedulerTimeText>
                                <SchedulerTimeLine></SchedulerTimeLine>
                            </SchedulerTime>
                            <SchedulerTime>
                                <SchedulerTimeText>22:00</SchedulerTimeText>
                                <SchedulerTimeLine></SchedulerTimeLine>
                            </SchedulerTime>
                            <SchedulerTime>
                                <SchedulerTimeText>23:00</SchedulerTimeText>
                                <SchedulerTimeLine></SchedulerTimeLine>
                            </SchedulerTime>
                            <SchedulerTime>
                                <SchedulerTimeText>24:00</SchedulerTimeText>
                                <SchedulerTimeLine></SchedulerTimeLine>
                            </SchedulerTime>
                        </SchedulerTimesContainer>
                        <SchedulerDragArea ref={this.schedulerDragArea}>
                            {this.writeScheduleDays()}
                            <SchedulerItemInfoContainer>
                                <SchedulerItemInfo>
                                    <SchedulerItemInfoDay>
                                        Thursday 14:15 - 17:15
                                    </SchedulerItemInfoDay>
                                    <SchedulerItemNameContainer>
                                        <SchedulerItemColor></SchedulerItemColor>
                                        <SchedulerItemName>Some Meeting</SchedulerItemName>
                                    </SchedulerItemNameContainer>
                                    <SchedulerItemDelete onClick={()=>{this.deleteItemInfo()}}>
                                        Delete time slot
                                    </SchedulerItemDelete>
                                    <SchedulerItemInfoClose onClick={()=>{this.hideItemInfo()}}>&#10005;</SchedulerItemInfoClose>
                                </SchedulerItemInfo>
                            </SchedulerItemInfoContainer>
                        </SchedulerDragArea>
                    </SchedulerWrapper>
                </SchedulerContainer>
            </>
        )
    }
}
