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
            <main className="details">
                {this.state.loading ? "Loading" : <section className="details-section">
                    <h1>Name:                       {this.state.planet.name}</h1>
                    <p><strong>Terrain:                 </strong>    {this.state.planet.terrain}</p>
                    <p><strong>Climate:                 </strong>    {this.state.planet.climate}</p>
                    <p><strong>Day Length:              </strong>    {this.state.planet.rotation_period} Hours</p>
                    <p><strong>Year Length:             </strong>    {this.state.planet.orbital_period} Days</p>
                    <p><strong>Gravity Strength:        </strong>    {this.state.planet.gravity}</p>
                    <p><strong>Surface Water Percentage:</strong>    {this.state.planet.surface_water}</p>
                    <p><strong>Population:              </strong>    {this.state.planet.population.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</p>                     

                </section>}    
            </main>
        );
    }
}

export default planetDetail;