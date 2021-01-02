import React, { Component } from 'react'
import { SchedulerContainer, SchedulerDay, SchedulerDragArea, SchedulerItem } from './Scheduler.styles';

const $ = require('jquery');
import 'jquery-ui/ui/widgets/draggable';
import 'jquery-ui/ui/widgets/droppable';


type IProps = {
}

type IState = {
}

export default class Scheduler extends Component<IProps, IState> {
    schedulerContainer:React.RefObject<HTMLDivElement>

    constructor(props: IProps){

        super(props);

        this.schedulerContainer = React.createRef<HTMLDivElement>();

        this.state = {
            
        }
    }

    componentDidMount(){

        let schedulerDayWidth = this.schedulerContainer.current?.offsetWidth ? this.schedulerContainer.current?.offsetWidth / 7 : 0;

        console.log(schedulerDayWidth);

        $(".schedulerItem").draggable({ 
            containment:".schedulerContainer", 
            snap: ".schedulerDay",
            grid: [ 5, 15 ],
            scroll:false,
        });

        $(".schedulerDay").droppable({
            drop: function(event:any, ui:any){
                ui.draggable[0].style.left = "0px";
                ui.draggable.detach().appendTo($(this));
            }
        });
    }

    render() {
        return (
            <>
                <SchedulerContainer ref={this.schedulerContainer}>
                    <SchedulerDragArea>
                        <SchedulerDay><SchedulerItem>Kalem</SchedulerItem></SchedulerDay>
                        <SchedulerDay></SchedulerDay>
                        <SchedulerDay></SchedulerDay>
                        <SchedulerDay></SchedulerDay>
                        <SchedulerDay></SchedulerDay>
                        <SchedulerDay></SchedulerDay>
                        <SchedulerDay></SchedulerDay>
                    </SchedulerDragArea>
                </SchedulerContainer>
            </>
        )
    }
}
