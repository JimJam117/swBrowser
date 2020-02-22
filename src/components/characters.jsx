import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export class characters extends Component {

    constructor() {
        super();
        this.state = {
            loading : true,
            characters : []
        }
    }

    componentDidMount() {
        fetch("https://swapi.co/api/people")
            .then(response => response.json())
            .then(data => {
                console.log(data);
                this.setState({
                    loading : false,
                    characters : data.results
                })
            })
    }


    render() {
         return (
            <div>
                <h1>Characters</h1>
                {this.state.loading ? "Loading" : null}
                { this.state.characters.map((character) => 
                    <Link to = {`/characters/${character.name}`} key={character.name}>
                        <div>
                            <h3>Name: {character.name}</h3>
                            <p>Age: {character.birth_year}</p>
                        </div>
                    </Link>
                )}
            </div>
        );
    }
}

export default characters;
