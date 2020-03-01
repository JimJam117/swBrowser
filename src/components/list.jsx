import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// needs a title and a ref (for the API)
function List(props) {
    var controller = new AbortController();
    var signal = controller.signal;

    const [loading, setLoading] = useState(true);
    const [pageNum, setPageNum] = useState(1);
    const [results, setResults] = useState({});
    const [list, setList] = useState([]);

    useEffect(() => {
        if (loading) {fetchItems()}
        return () => {
            controller.abort();
        };
    })

    const fetchItems = async (apiUrl = `https://swapi.co/api/${props.apiRef}?page=${pageNum}`) =>  {
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


    const loadNextPage = () => {
        setLoading(true);
        setPageNum(pageNum + 1);
        //fetchEffect();
    }

    const loadLastPage = () => {
        setLoading(true);
        setPageNum(pageNum - 1);
        //fetchEffect();
    }

    return(<main>
    <h1>{props.title} | Page {pageNum}</h1>
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

            {results.next ? <button onClick={loadNextPage}>Next</button> : null}
            {results.previous ? <button onClick={loadLastPage}>Prev</button> : null}
            
            </section>
        }
    </main>);

}

export default List;
