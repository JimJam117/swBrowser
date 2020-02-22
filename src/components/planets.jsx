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
                { this.state.planets.map((planet) => 
                    <Link to = {`/planets/${planet.name}`} key={planet.name}>
                        <div>
                            <h3>Name: {planet.name}</h3>
                            <p>Terrain: {planet.terrain}</p>
                            <p>Climate: {planet.climate}</p>
                        </div>
                    </Link>
                )}
            </div>
        );
    }
}

export default planets;
