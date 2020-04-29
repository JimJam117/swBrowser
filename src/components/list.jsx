import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

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

    useEffect(() => {
        if (loading) {fetchItems()}
        return () => {
            controller.abort();
        };
    })

    const fetchItems = async (apiUrl = `https://swapi.dev/api/${props.apiRef}?page=${id}`) =>  {
        
        await fetch(apiUrl, {signal})
            .then(async (response) => {

                //throw errors if issues
                if (response.status === 500) {
                    throw new Error("500");
                }
                else if(response.status === 404) {
                    throw new Error("404");
                }
                else if(response.status === 419) {
                    throw new Error("419");
                }

                const data = await response.json();
                setResults(data);
                setList(data.results);
                setLoading(false);

        })

        //err catch
        .catch((e) => {
            if (e.name !== "AbortError") {
                if (e.message === "404" || e.name === "TypeError") {
                    window.location.href = "/not-found";
                }
                else if (e.message === "500") {
                    window.location.href = "/server-error";
                }
                else if (e.message === "419") {
                    window.location.href = "/page-expired";
                }
            } 
        });
    }

    return(
    
        loading ? <div className="loading">Loading</div> : 
        <main>
        <h1>{props.title} | Page {id}</h1>
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

            <div className="pagination">
            {results.previous ? <Link className="pagination-link" onClick={load} to={`/${props.linkName}s/${id - 1}`}>Prev</Link> : null}
            {results.next ? <Link className="pagination-link" onClick={load} to={`/${props.linkName}s/${id + 1}`}>Next</Link> : null}
            </div>

            </section>
            </main>
        
    );

}

export default List;
