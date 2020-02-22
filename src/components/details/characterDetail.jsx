import React, { Component } from 'react';

export class characterDetail extends Component {
    
    constructor() {
        super();
        this.state = {
            loading : true,
            character : {}
        }

    }

    componentDidMount() {
        const id = Number(this.props.match.params.id);
        fetch(`https://swapi.co/api/people/${id}`)
            .then(response => response.json())
            .then(data => {
                this.setState({
                    loading : false,
                    character : data
                })
                console.log(id);
            })
    }

    render() {
        

        return (
            <div>
                {this.state.loading ? "Loading" : <div>
                    <p>Name:        {this.state.character.name}</p>
                    <p>Height:      {this.state.character.height}</p>
                    <p>Mass:        {this.state.character.mass}</p>
                    <p>Hair Color:  {this.state.character.hair_color}</p>
                    <p>Skin Color:  {this.state.character.skin_color}</p>
                    <p>Eye Color:   {this.state.character.eye_color}</p>
                    <p>Birth Year:  {this.state.character.birth_year}</p>
                    <p>Gender:      {this.state.character.gender}</p>   

                </div>}    
            </div>
        );
    }
}

export default characterDetail;