import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// needs a title and a ref (for the API)
function List(props) {
    var controller = new AbortController();
    var signal = controller.signal;

    useEffect(() => {
        fetchItems()
        return () => {
            controller.abort();
        };
    })

    const [loading, setLoading] = useState(true);
    const [list, setList] = useState([]);

    const fetchItems = async () =>  {
        await fetch(`https://swapi.co/api/${props.apiRef}`, {signal})
        .then(async (fetchedData) => {
            const data = await fetchedData.json();
            setList(data.results);
            setLoading(false);
        })
        .catch((e) => {
            console.log(e);
        });
    }

    return(<main>
        <h1>{props.title}</h1>
        {loading ? "Loading" : null}
        <section className="items_container">
        <ul>
            { list.map((item) => 
                <li key={item.url.replace(/[^0-9]/g,'')} className="item-list-item">
                    <Link to = {`/${props.linkName}/${item.url.replace(/[^0-9]/g,'')}`} key={item.url.replace(/[^0-9]/g,'')} className="item-link"> 
                        <h3>{item.name}</h3>
                    </Link>
                </li>
            )}
        </ul>
        </section>
    </main>);

}

export default List;
