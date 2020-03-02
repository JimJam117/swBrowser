import React, { useState, useEffect } from 'react';
import { Link, useParams, Redirect } from 'react-router-dom';

// needs a title and a ref (for the API)
function List(props) {
    // page id
    let { id } = useParams();
    id = Number(id) ? Number(id) : 1;

    // abort controller
    var controller = new AbortController();
    var signal = controller.signal;

    const [loading, setLoading] = useState(true);
    const [results, setResults] = useState({});
    const [list, setList] = useState([]);

    const load = () => setLoading(true);


    console.log(id);

    useEffect(() => {
        if (loading) {fetchItems()}
        return () => {
            controller.abort();
        };
    })

    const fetchItems = async (apiUrl = `https://swapi.co/api/${props.apiRef}?page=${id}`) =>  {
        await fetch(apiUrl, {signal})
        .then(async (fetchedData) => {
            const data = await fetchedData.json();
            setResults(data);
            setList(data.results);
            setLoading(false);
        })
        .catch((e) => {
            console.log(e);
        });
    }

    return(
    <main>
    <h1>{props.title} | Page {id}</h1>
        {loading ? "Loading" : 
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

            {results.next ? <Link onClick={load} to={`/${props.linkName}s/${id + 1}`}>Next</Link> : null}
            {results.previous ? <Link onClick={load} to={`/${props.linkName}s/${id - 1}`}>Prev</Link> : null}
            
            </section>
        }
    </main>);

}

export default List;
