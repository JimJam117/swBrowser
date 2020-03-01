import React, { Component } from 'react';

export class planetDetail extends Component {
    
    constructor() {
        super();
        this.state = {
            loading : true,
            planet : {}
        }

    }

    // set up the abort controller
    controller = new AbortController();
    signal = this.controller.signal;

    componentDidMount() {
        const id = Number(this.props.match.params.id);
        fetch(
                `https://swapi.co/api/planets/${id}`, 
                {signal: this.signal} // abort signal
            )
            .then(response => response.json())
            .then(
                data => {
                    this.setState({
                        loading : false,
                        planet : data
                    })
                }  
            )
            .catch((e) => { console.log(e);}) // catch and log err
    }

    // abort if unmount
    componentWillUnmount() {
        this.controller.abort();
    }

    render() {
        

        return (
            <div>
                {this.state.loading ? "Loading" : <div>
                    <p>Name:        {this.state.planet.name}</p>

                    <p>Terrain:      {this.state.planet.terrain}</p>
                    <p>Climate:        {this.state.planet.climate}</p>
                    <p>Day Length:  {this.state.planet.rotation_period} Hours</p>
                    <p>Year Length:  {this.state.planet.orbital_period} Days</p>
                    <p>Gravity Strength:   {this.state.planet.gravity}</p>
                    <p>Surface Water Percentage:  {this.state.planet.surface_water}</p>
                    <p>Population:      {this.state.planet.population.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</p>                     

                </div>}    
            </div>
        );
    }
}

export default planetDetail;