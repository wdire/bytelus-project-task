import React, { Component } from 'react';

import SideBar from './components/SideBar';
import { Main } from './App.styles';
import Scheduler from './components/Scheduler';

const $ = require('jquery');
import 'jquery-ui/ui/widgets/draggable';

export class App extends Component {

    componentDidMount(){
        
    }

    render() {

        return (
            <>
                <Main>
                    <SideBar/>
                    <Scheduler/>
                </Main>
            </>
        )
    }
}
