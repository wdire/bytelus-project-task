import React, { Component } from 'react';

import SideBar from './components/SideBar';
import { GlobalStyle, Main } from './App.styles';
import Scheduler from './components/Scheduler';

type IProps = {
}

type IState = {
}

export class App extends Component<IProps, IState> {

    constructor(props: IProps){
        super(props);

        this.state = {

        }
    }

    componentDidMount(){

    }

    render() {

        return (
            <>
                <GlobalStyle></GlobalStyle>
                <Main>
                    <SideBar/>
                    <Scheduler/>
                </Main>
            </>
        )
    }
}
