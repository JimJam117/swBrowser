import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Ships() {
    var controller = new AbortController();
    var signal = controller.signal;

    useEffect(() => {
        fetchItems()
        return () => {
            controller.abort();
        };
    }, [])

    const [loading, setLoading] = useState(true);
    const [ships, setShips] = useState([]);

    const fetchItems = async () =>  {
        const fetchedData = await fetch("https://swapi.co/api/starships", {signal})
        .then(async (fetchedData) => {
            const data = await fetchedData.json();
            setShips(data.results);
            setLoading(false);
        })
        .catch((e) => {
            console.log(e);
        });
    }

    return(<div>
        <h1>Ships</h1>
        {loading ? "Loading" : null}
        <div className="items_container">
        { ships.map((ship) => 
            <Link to = {`/ship/${ship.url.replace(/[^0-9]/g,'')}`} key={ship.url.replace(/[^0-9]/g,'')} className="item_link"> 
                <h3>{ship.name}</h3>
            </Link>
        )}
        </div>
    </div>);

}

export default Ships;
