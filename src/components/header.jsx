import React, { Component } from 'react';
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';


export class header extends Component {
    render() {
        return (
            <nav >
                <Link to="/"><h1>SWbrowser</h1></Link>
                <ul>
                    <Link to="/"><li>Home</li></Link>
                    <Link to="/characters"><li>Characters</li></Link>
                    <Link to="/planets"><li>Planets</li></Link>
                    <Link to="/ships"><li>Ships</li></Link> 
                </ul>
            </nav> 
        );
    }
}

export default header;
