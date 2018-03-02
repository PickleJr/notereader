import React from 'react';
import ReactDOM from 'react-dom';
import { Preloader } from 'react-materialize';

export default class Loading extends React.Component {
    render() {
        return(
            <div className="center-align">
                <Preloader size='medium' flashing/>
            </div>
        );
    }
}