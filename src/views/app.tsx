import React, { Component, useEffect } from 'react';
import { Switch, Route } from "react-router-dom";
import Home from './home';
import NoMatch from './no_match';
import ReactGA from 'react-ga';

class App extends Component {
    setGA = () => {
        ReactGA.initialize('UA-110182129-1');
        ReactGA.pageview('Init page view');
    };
    
    initDarkMode = () => {
        // 从本地存储中获取暗黑模式设置
        const darkMode = localStorage.getItem('darkMode');
        if (darkMode && JSON.parse(darkMode)) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    };
    
    componentDidMount() {
        this.setGA();
        this.initDarkMode();
    };

    render() {
        return (
            <Switch>
                <Route exact path="/">
                    <Home />
                </Route>
                <Route exact path="/v4">
                    <Home />
                </Route>
                <Route exact path="/v3">
                    <Home />
                </Route>
                <Route exact path="/v2">
                    <Home />
                </Route>
                <Route exact path="/v1">
                    <Home />
                </Route>
                <Route exact path="/v0">
                    <Home />
                </Route>
                <Route path="*">
                    <NoMatch />
                </Route>
            </Switch>
        )
    }
}

export default App;
