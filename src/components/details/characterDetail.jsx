import React, { Component } from 'react';

export class characterDetail extends Component {
    
    constructor() {
        super();
        this.state = {
            loading : true,
            character : {}
        }
    }
    
    // set up the abort controller
    controller = new AbortController();
    signal = this.controller.signal;

    componentDidMount() {
        const id = Number(this.props.match.params.id);
        fetch(
                `https://swapi.co/api/people/${id}`, 
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
                        character : data
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
                    // console.log(e.name);
                } 
            });
        
        // catch and log err
    }

    // abort if unmount
    componentWillUnmount() {
        this.controller.abort();
    }

    render() {
        return (
            <main className="details">
                {this.state.loading ? "Loading" : <section className="details-section">
                    <h1>Name:                           {this.state.character.name}</h1>
                    <p><strong>Height:</strong>         {this.state.character.height}cm</p>
                    <p><strong>Mass:</strong>           {this.state.character.mass}kg</p>
                    <p><strong>Hair Color:</strong>     {this.state.character.hair_color}</p>
                    <p><strong>Skin Color:</strong>     {this.state.character.skin_color}</p>
                    <p><strong>Eye Color:</strong>      {this.state.character.eye_color}</p>
                    <p><strong>Birth Year:</strong>     {this.state.character.birth_year}</p>
                    <p><strong>Gender:</strong>         {this.state.character.gender}</p>   

                </section>}    
            </main>
        );
    }
}

export default characterDetail;