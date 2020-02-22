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
                <div className="items_container">
                { this.state.characters.map((character) => 
                    <Link to = {`/character/${character.url.replace(/[^0-9]/g,'')}`} key={character.url.replace(/[^0-9]/g,'')} className="item_link"> 
                        <h3>{character.name}</h3>
                    </Link>
                )}
                </div>
            </div>
        );
    }
}

export default characters;
