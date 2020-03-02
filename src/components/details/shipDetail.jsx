import React, { Component } from 'react';

export class shipDetail extends Component {
    
    constructor() {
        super();
        this.state = {
            loading : true,
            ship : {}
        }

    }

// set up the abort controller
controller = new AbortController();
signal = this.controller.signal;

componentDidMount() {
    const id = Number(this.props.match.params.id);
    fetch(
            `https://swapi.co/api/starships/${id}`, 
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
        
        // error catcher
        .catch((e) => {
            if (e.name !== "AbortError") {
                if (e.message === "404" || e.name === "TypeError") {
                    window.location.href = "/not-found";
                }
                else if (e.message === "500") {
                    window.location.href = "/server-error";
                }
                else if (e.message === "419") {
                    window.location.href = "/page-expired";
                }
                //console.log(e.name);
            } 
        });
}

// abort if unmount
componentWillUnmount() {
    this.controller.abort();
}

render() {
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