import React, { Component } from 'react';
import {Link} from 'react-router-dom';


export class header extends Component {
    render() {
        return (
            <nav >
                <Link to="/" className="title"><h1>SWbrowser</h1></Link>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/characters">Characters</Link></li>
                    <li><Link to="/planets">Planets</Link></li>
                    <li><Link to="/ships">Ships</Link></li>
                </ul>
            </nav> 
        );
    }
}

export default header;
