import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';

export class characterDetail extends Component {
    
    constructor() {
        super();
        this.state = {
            loading : true,
            character : {},
            e : null
        }
    }
    
    // set up the abort controller
    controller = new AbortController();
    signal = this.controller.signal;

    componentDidMount() {
        const id = Number(this.props.match.params.id);
        fetch(
                `https://swapi.dev/api/people/${id}`, 
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

        //err catch
        .catch((e) => {
            this.setState({
                ...this.state,
                e : e
            })

        });
        
        // catch and log err
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
                        <h1>Name:                           {this.state.character.name}</h1>
                        <p><strong>Height:</strong>         {this.state.character.height}cm</p>
                        <p><strong>Mass:</strong>           {this.state.character.mass}kg</p>
                        <p><strong>Hair Color:</strong>     {this.state.character.hair_color}</p>
                        <p><strong>Skin Color:</strong>     {this.state.character.skin_color}</p>
                        <p><strong>Eye Color:</strong>      {this.state.character.eye_color}</p>
                        <p><strong>Birth Year:</strong>     {this.state.character.birth_year}</p>
                        <p><strong>Gender:</strong>         {this.state.character.gender}</p>   
                    </section>
                </main>                  
        );
    
    }
}

export default characterDetail;