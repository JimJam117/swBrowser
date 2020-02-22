import React, { Component } from 'react'

export class Character extends Component {

    constructor() {
        super();
        this.state = {
            loading : true,
            character : {}
        }
    }

    componentDidMount() {
        fetch("https://swapi.co/api/planets/12/")
            .then(response => response.json())
            .then(data => {
                console.log(data);
                this.setState({
                    loading : false,
                    character : data
                })
            })
    }

    render() {
        return (
            <div>
                {this.state.loading ? "Loading..." : this.state.character.name}
            </div>
        );
    }
}

export default Character;
