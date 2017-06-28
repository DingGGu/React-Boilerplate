import React from 'react';
import {Route, Switch} from 'react-router-dom';
import {Container} from "flux/utils";

import './App.scss';
import Store from "../../store/Store";

class Main extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (<p>hi</p>)
    }
}

class Root extends React.Component {
    constructor(props) {
        super(props);
    }

    static getStores() {
        return [
            Store
        ]
    }

    static calculateState() {
        return {
            appState: {
                store: Store.getState()
            }
        }
    }

    componentWillUpdate(nextProps) {
        const {location} = this.props;
        if (nextProps.history.action !== 'POP' && (!location.state || !location.state.modal)) {
            this.previousLocation = this.props.location
        }
    }


    render() {
        const {location} = this.props;
        const isModal = !!(
            location.state &&
            location.state.modal &&
            this.previousLocation !== location // not initial render
        );

        return (
            <div className="site-wrapper">
                <Switch location={isModal ? this.previousLocation : location}>
                    <Route exact path="/" render={props => <Main appState={this.state.appState} {...props}/>}/>
                </Switch>
            </div>
        );
    }
}

const App = Container.create(Root);

export default App;