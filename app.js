import React from 'react';
import ReactDOM from 'react-dom';
import Loadable from 'react-loadable';
import {
    HashRouter as Router,
    Route,
    Switch
} from 'react-router-dom';

import Nav from './app/nav';
import Loading from './app/loading';

const About = Loadable({
    loader: () => import('./app/about'),
    loading: Loading,
});
const Notes = Loadable({
    loader: () => import('./app/notes'),
    loading: Loading,
});

class App extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div>
                <Route component={Nav}/>
                <Switch>
                    <Route exact path="/" component={Notes}/>
                    <Route path="/about" component={About}/>
                </Switch>
            </div>
        );
    }
}

ReactDOM.render(
    <Router>
        <App/>
    </Router>,
    document.getElementById('root')
);