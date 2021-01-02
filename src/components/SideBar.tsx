import React, { Component } from 'react'

const $ = require('jquery');
import 'jquery-ui/ui/widgets/draggable';
import { SideBarContainer } from './SideBar.styles';


type IProps = {
}

type IState = {
}


export default class SideBar extends Component {

    constructor(props: IProps){
        super(props);

        this.state = {
            
        }
    }

    render() {
        return (
            <>
                <SideBarContainer>
                    d
                </SideBarContainer>
            </>
        )
    }
}
