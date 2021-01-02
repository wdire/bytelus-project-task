import React, { Component } from 'react'
import { SchedulerContainer, SchedulerDay, SchedulerItem } from './Scheduler.styles';

const $ = require('jquery');
import 'jquery-ui/ui/widgets/draggable';


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

        $(".schedulerItem").draggable({ containment:".schedulerContainer", snap: ".schedulerDay", grid: [ schedulerDayWidth, 15 ]  });
    }

    render() {
        return (
            <>
                <SchedulerContainer ref={this.schedulerContainer}>
                    <SchedulerDay></SchedulerDay>
                    <SchedulerDay></SchedulerDay>
                    <SchedulerDay></SchedulerDay>
                    <SchedulerDay></SchedulerDay>
                    <SchedulerDay></SchedulerDay>
                    <SchedulerDay></SchedulerDay>
                    <SchedulerDay></SchedulerDay>
                </SchedulerContainer>
            </>
        )
    }
}
