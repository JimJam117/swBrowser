import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';

export class planetDetail extends Component {
    
    constructor() {
        super();
        this.state = {
            loading : true,
            planet : {},
            e : null
        }

    }

    // set up the abort controller
    controller = new AbortController();
    signal = this.controller.signal;

    componentDidMount() {
        const id = Number(this.props.match.params.id);
        fetch(
                `https://swapi.dev/api/planets/${id}`, 
                {signal: this.signal} // abort signal
            )

            // response handling, throw custom errors 
            .then((response) => {
                if (response.status === 500) {
                    throw new Error("500");
                }
                else if(response.status === 404) {
                    throw new Error("404");
                }
                else if(response.status === 419) {
                    throw new Error("419");
                }
                 
                return response.json();
            })

            // set the state
            .then(
                data => {
                    this.setState({
                        loading : false,
                        planet : data
                    })
                }  
            )
            
      //err catch
      .catch((e) => {
        this.setState({
            ...this.state,
            e : e
        })
      });
    }

    // abort if unmount
    componentWillUnmount() {
        this.controller.abort();
    }

    render() {

        // render error redirect if there is an error
        if(this.state.e != null) {
            if (this.state.e.name !== "AbortError") {
                if (this.state.e.message === "404" || this.state.e.name === "TypeError") {
                    return (<Redirect to="/not-found" />);
                }
                else if (this.state.e.message === "500") {
                    return (<Redirect to="/server-error" />);
                }
                else if (this.state.e.message === "419") {
                    return (<Redirect to="/page-expired" />);
                }
            }
        }

        return (
            
                this.state.loading ? <div className="loading">Loading</div> : 
                <main className="details">
                    <section className="details-section">
                    <h1>Name:                       {this.state.planet.name}</h1>
                    <p><strong>Terrain:                 </strong>    {this.state.planet.terrain}</p>
                    <p><strong>Climate:                 </strong>    {this.state.planet.climate}</p>
                    <p><strong>Day Length:              </strong>    {this.state.planet.rotation_period} Hours</p>
                    <p><strong>Year Length:             </strong>    {this.state.planet.orbital_period} Days</p>
                    <p><strong>Gravity Strength:        </strong>    {this.state.planet.gravity}</p>
                    <p><strong>Surface Water Percentage:</strong>    {this.state.planet.surface_water}</p>
                    <p><strong>Population:              </strong>    {this.state.planet.population.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</p>                     
                    </section>
                </main>                  
        );
    
    }
}


export default planetDetail;