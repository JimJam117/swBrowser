import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';

export class shipDetail extends Component {
    
    constructor() {
        super();
        this.state = {
            loading : true,
            ship : {},
            e : null
        }

    }

// set up the abort controller
controller = new AbortController();
signal = this.controller.signal;

componentDidMount() {
    const id = Number(this.props.match.params.id);
    fetch(
            `https://swapi.dev/api/starships/${id}`, 
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
                    ship : data
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
                    <h1>Name:                   {this.state.ship.name}</h1>
                    <p><strong>Crew Capacity:          </strong>     {this.state.ship.crew}</p>
                    <p><strong>Passenger Capacity:     </strong>     {this.state.ship.passengers}</p>
                    <p><strong>Cost:                   </strong>     {this.state.ship.cost_in_credits} Credits</p>
                    <p><strong>Length:                 </strong>     {this.state.ship.length}</p>
                    <p><strong>Hyperdrive Rating:      </strong>     {this.state.ship.hyperdrive_rating}</p>
                    <p><strong>Manufacturer:           </strong>     {this.state.ship.manufacturer}</p>
                    <p><strong>Model:                  </strong>     {this.state.ship.model}</p>
                    <p><strong>Top Speed in Atmosphere:</strong>     {this.state.ship.max_atmosphering_speed}</p>  
                    </section>
                </main>                  
        );
    
    }
}


export default shipDetail;