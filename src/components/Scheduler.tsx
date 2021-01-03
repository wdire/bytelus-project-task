import React, { Component } from 'react'
import { SchedulerContainer, SchedulerDay, SchedulerDayLabel, SchedulerDayLabelsContainer, SchedulerDragArea, SchedulerItem, SchedulerItemWrapper, SchedulerTime, SchedulerTimeLine, SchedulerTimesContainer, SchedulerTimeText, SchedulerWrapper } from './Scheduler.styles';

const $ = require('jquery');

import 'modules/jquery-ui/themes/base/resizable.css';

import 'jquery-ui/ui/widgets/draggable';
import 'jquery-ui/ui/widgets/droppable';
import 'jquery-ui/ui/widgets/resizable';

const SCHEDULER_ITEM_HEIGHT = 50;

type IProps = {
}

type IState = {
}

export default class Scheduler extends Component<IProps, IState> {
    schedulerDragArea:React.RefObject<HTMLDivElement>;

    constructor(props: IProps){

        super(props);

        this.schedulerDragArea = React.createRef<HTMLDivElement>();

        this.state = {
            
        }
    }

    componentDidMount(){

        let schedulerDragArea = this.schedulerDragArea?.current;

        let schedulerDragArea_offsetHeight = schedulerDragArea?.offsetHeight || 0;

        // Parent(schedulerItem) elm has draggable and
        // child(schedulerItemWrapper) has resizable. They don't work together in same element.

        $(".schedulerItem").draggable({ 
            containment:".schedulerDragArea", 
            snap: ".schedulerDay",
            grid: [ 5, SCHEDULER_ITEM_HEIGHT / 4 ],
            scroll:false,
        });

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

        $(".schedulerDay").droppable({
            drop: function(event:any, ui:any){
                ui.draggable[0].style.left = "0px";
                ui.draggable.detach().appendTo($(this));
            }
        });

        let parent = this.schedulerDragArea.current?.parentElement;
        let scrollHeight = parent?.scrollHeight;

        $(parent).children()[0].style.height = scrollHeight + "px";
        $(parent).children()[1].style.height = scrollHeight + "px";
    }

    render() {
        return (
            <>
                <SchedulerContainer>
                    <SchedulerDayLabelsContainer>
                        <SchedulerDayLabel>Mon</SchedulerDayLabel>
                        <SchedulerDayLabel>Tue</SchedulerDayLabel>
                        <SchedulerDayLabel>Wed</SchedulerDayLabel>
                        <SchedulerDayLabel>Thu</SchedulerDayLabel>
                        <SchedulerDayLabel>Fri</SchedulerDayLabel>
                        <SchedulerDayLabel>Sat</SchedulerDayLabel>
                        <SchedulerDayLabel>Sun</SchedulerDayLabel>
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
                            <SchedulerDay>
                                <SchedulerItem>
                                    <SchedulerItemWrapper>
                                        Kalem
                                    </SchedulerItemWrapper>
                                </SchedulerItem>
                            </SchedulerDay>
                            <SchedulerDay></SchedulerDay>
                            <SchedulerDay></SchedulerDay>
                            <SchedulerDay></SchedulerDay>
                            <SchedulerDay></SchedulerDay>
                            <SchedulerDay></SchedulerDay>
                            <SchedulerDay></SchedulerDay>
                        </SchedulerDragArea>
                    </SchedulerWrapper>
                </SchedulerContainer>
            </>
        )
    }
}
