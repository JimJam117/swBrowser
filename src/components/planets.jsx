import React, { Component } from 'react';
import {Link} from 'react-router-dom';

export class planets extends Component {
    constructor() {
        super();
        this.state = {
            loading : true,
            planets : []
        }
    }

    componentDidMount() {
        fetch("https://swapi.co/api/planets")
            .then(response => response.json())
            .then(data => {
                console.log(data);
                this.setState({
                    loading : false,
                    planets : data.results
                })
            })
    }


    render() {
         return (
            <div>
                <h1>Planets</h1>
                {this.state.loading ? "Loading" : null}
                <div className="items_container">
                { this.state.planets.map((planet) => 
                <Link to = {`/planet/${planet.url.replace(/[^0-9]/g,'')}`} key={planet.url.replace(/[^0-9]/g,'')} className="item_link"> 
                    <h3>{planet.name}</h3>
                </Link>
                )}
                </div>
            </div>
        );
    }
}

export default planets;
