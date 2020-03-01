import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Planets() {
    var controller = new AbortController();
    var signal = controller.signal;

    useEffect(() => {
        fetchItems()
        return () => {
            controller.abort();
        };
    }, [])

    const [loading, setLoading] = useState(true);
    const [planets, setPlanets] = useState([]);

    const fetchItems = async () =>  {
        const fetchedData = await fetch("https://swapi.co/api/people", {signal})
        .then(async (fetchedData) => {
            const data = await fetchedData.json();
            setPlanets(data.results);
            setLoading(false);
        })
        .catch((e) => {
            console.log(e);
        });
    }

    return(<div>
        <h1>Planets</h1>
        {loading ? "Loading" : null}
        <div className="items_container">
        { planets.map((planet) => 
            <Link to = {`/planet/${planet.url.replace(/[^0-9]/g,'')}`} key={planet.url.replace(/[^0-9]/g,'')} className="item_link"> 
                <h3>{planet.name}</h3>
            </Link>
        )}
        </div>
    </div>);

}

export default Planets;
