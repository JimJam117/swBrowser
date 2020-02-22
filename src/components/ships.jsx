import React, { Component } from 'react';
import {Link} from 'react-router-dom';

export class ships extends Component {
    constructor() {
        super();
        this.state = {
            loading : true,
            ships : []
        }
    }

    componentDidMount() {
        fetch("https://swapi.co/api/starships")
            .then(response => response.json())
            .then(data => {
                console.log(data);
                this.setState({
                    loading : false,
                    ships : data.results
                })

            })
    }


    render() {
         return (
            <div>
                <h1>Ships</h1>
                {this.state.loading ? "Loading" : null}
                <div className="items_container">
                { this.state.ships.map((ship) =>
                    <Link to = {`/ship/${ship.url.replace(/[^0-9]/g,'')}`} key={ship.url.replace(/[^0-9]/g,'')} className="item_link"> 
                        <h3>{ship.name}</h3>
                    </Link>
                )}
                </div>
            </div>
        );
    }
}

export default ships;
