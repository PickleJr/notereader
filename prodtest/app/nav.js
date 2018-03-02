import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';

export default class Nav extends React.Component {
    componentDidMount() {
        $(".button-collapse").sideNav({
            closeOnClick: true,
            draggable: true,
        });
    }

    render() {
        return(
            <nav className="purple darken-3">
                <div className="nav-wrapper">
                    <Link to="/" className="brand-logo center">Note Reader</Link>
                    <a data-activates="mobile-nav" className="button-collapse"><i className="material-icons">menu</i></a>
                    <ul className="left hide-on-med-and-down">
                        <li className={this.props.location.pathname == "/" ? 'active' : ''}>
                            <Link to="/">Home</Link>
                        </li>
                        <li className={this.props.location.pathname == "/about" ? 'active' : ''}>
                            <Link to="/about">About</Link>
                        </li>
                    </ul>
                    <ul className="side-nav purple darken-3" id="mobile-nav">
                        <li className={this.props.location.pathname == "/" ? 'active' : ''}>
                            <Link to="/" className="white-text">Home</Link>
                        </li>
                        <li className={this.props.location.pathname == "/about" ? 'active' : ''}>
                            <Link to="/about" className="white-text">About</Link>
                        </li>
                    </ul>
                </div>
            </nav>
        );
    }
}