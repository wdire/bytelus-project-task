import React, { Component } from 'react'
import ReactDOM from "react-dom";
import { SchedulerContainer, SchedulerDay, SchedulerDayLabel, SchedulerDayLabelsContainer, SchedulerDragArea, SchedulerItem, SchedulerItemWrapper, SchedulerTime, SchedulerTimeLine, SchedulerTimesContainer, SchedulerTimeText, SchedulerWrapper } from './Scheduler.styles';

const $ = require('jquery');

import 'modules/jquery-ui/themes/base/resizable.css';

import 'jquery-ui/ui/widgets/draggable';
import 'jquery-ui/ui/widgets/droppable';
import 'jquery-ui/ui/widgets/resizable';
import { createId } from '../utils';

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

type IProps = {
}

type IState = {
    schedulerItems:SchedulerItemInfo[];
}

export default class Scheduler extends Component<IProps, IState> {
    schedulerDragArea:React.RefObject<HTMLDivElement>;

    constructor(props: IProps){

        super(props);

        this.schedulerDragArea = React.createRef<HTMLDivElement>();

        this.state = {
            schedulerItems:[]
        }
    }

    componentDidMount(){

        this.createSchedulerItem({
            color:"red",
            day:SchedulerDays.WED,
            startTime:3.75,
            endTime:6.5,
            name:"Some Meeting",
            id:createId()
        });


        // Parent(schedulerItem) elm has draggable and
        // child(schedulerItemWrapper) has resizable. They don't work together in same element.

        this.initSchedulerItems();

        $(".schedulerDay").droppable({
            drop: (event:any, ui:any) => {
                ui.draggable[0].style.left = "0px";
                if(ui.draggable[0].parentElement !== event.target){
                    ui.draggable.detach().appendTo(event.target);
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

        this.setState((prevState)=>{
            return {schedulerItems:[...prevState.schedulerItems, info]};
        });

        let itemTop = (info.startTime - 1) * SCHEDULER_ITEM_HEIGHT;

        let itemHeight = (info.endTime - 1) * SCHEDULER_ITEM_HEIGHT - itemTop;

        let elm = (
                <SchedulerItem style={{top:itemTop}}>
                    <SchedulerItemWrapper color={info.color} data-id={JSON.stringify(info)} style={{height:itemHeight}}>
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
            stop:(event:any, ui:any)=>{
                let timeStart = ui.position.top / SCHEDULER_ITEM_HEIGHT + 1;
                let timeEnd = (ui.helper[0].offsetHeight + ui.position.top) / SCHEDULER_ITEM_HEIGHT + 1;

                this.setSchedulerItemInfo({
                    startTime:timeStart,
                    endTime:timeEnd
                });
            }

        }).css("position","absolute");

        $(".schedulerItemWrapper").resizable({
            handles:"s",
            minHeight:SCHEDULER_ITEM_HEIGHT,
            containment:".schedulerDragArea", 
            resize:(event:any, ui:any)=>{

                //Change increasing size to (50 / 4 min) in px
                let newHeight = Math.round( ui.size.height / (SCHEDULER_ITEM_HEIGHT / 4) ) * (SCHEDULER_ITEM_HEIGHT / 4);
                
                ui.size.height = newHeight;

            }
        });
    }

    setSchedulerItemInfo = (info:SchedulerItemInfoOptional)=>{
        
        
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
                        </SchedulerDragArea>
                    </SchedulerWrapper>
                </SchedulerContainer>
            </>
        )
    }
}
