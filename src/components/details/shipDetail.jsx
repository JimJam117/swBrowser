import React, { Component } from 'react';

export class shipDetail extends Component {
    
    constructor() {
        super();
        this.state = {
            loading : true,
            ship : {}
        }

    }

    componentDidMount() {
        const id = Number(this.props.match.params.id);
        fetch(`https://swapi.co/api/starships/${id}`)
            .then(response => response.json())
            .then(data => {
                this.setState({
                    loading : false,
                    ship : data
                })
                console.log(id);
            })
    }

    render() {
        

        return (
            <div>
                {this.state.loading ? "Loading" : <div>
                    <p>Name:                    {this.state.ship.name}</p>
                    <p>Crew Capacity:                    {this.state.ship.crew}</p>
                    <p>Passenger Capacity:              {this.state.ship.passengers}</p>
                    <p>Cost:         {this.state.ship.cost_in_credits} Credits</p>
                    <p>Length:                  {this.state.ship.length}</p>
                    <p>Hyperdrive Rating:       {this.state.ship.hyperdrive_rating}</p>
                    <p>Manufacturer:            {this.state.ship.manufacturer}</p>
                    <p>Model:                   {this.state.ship.model}</p>
                    <p>Top Speed in Atmosphere:  {this.state.ship.max_atmosphering_speed}</p>  

                </div>}    
            </div>
        );
    }
}

export default shipDetail;