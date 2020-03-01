import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Characters() {
    var controller = new AbortController();
    var signal = controller.signal;

    useEffect(() => {
        fetchItems()
        return () => {
            controller.abort();
        };
    }, [])

    const [loading, setLoading] = useState(true);
    const [characters, setCharacters] = useState([]);

    const fetchItems = async () =>  {
        const fetchedData = await fetch("https://swapi.co/api/people", {signal})
        .then(async (fetchedData) => {
            const data = await fetchedData.json();
            setCharacters(data.results);
            setLoading(false);
        })
        .catch((e) => {
            console.log(e);
        });
    }

    return(<div>
        <h1>Characters</h1>
        {loading ? "Loading" : null}
        <div className="items_container">
        { characters.map((character) => 
            <Link to = {`/character/${character.url.replace(/[^0-9]/g,'')}`} key={character.url.replace(/[^0-9]/g,'')} className="item_link"> 
                <h3>{character.name}</h3>
            </Link>
        )}
        </div>
    </div>);

}

export default Characters;
