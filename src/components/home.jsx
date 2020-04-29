import React, { Component } from 'react';

export class Home extends Component {
    render() {
        return (
            <main>
                <section className="home home-top">
                <h1>SWbrowser</h1>
                <p>SWbrowser is a simple react app to view data from the <a href="https://swapi.dev/">Star Wars API</a>. You can browse the characters, planets and ships from the films, and click on them to get more details. </p>
                </section>

                <section className="home home-mid">
                <h2>About the project</h2>
                <p>This was the first react app I built that receives data from an API. I used the <strong>Fetch API</strong> to grab the information from swapi, which then takes the response and does some error checks (redirecting to the <a href="/not-found">not found page</a> if the response status code is a 404 for example) and then renders it. I used <strong>functional components</strong> with <strong>react hooks</strong> for the lists of characters, planets and ships, and for the “details” pages (pages that provide the details about whatever item you clicked on in the list) I used <strong>class-based components</strong>. This way I can get used to writing both, and see how similar things are done in each. I used <strong>abortController</strong> to abort the fetch request if the user goes to another page whilst the current page is still loading, to prevent issues with asynchronous promises. <strong>React router</strong> was used to route the pages of the app together. </p> 
                </section>

                <section className="home home-links">
                    <a href="https://github.com/JimJam117/swBrowser">Github</a>
                    <a href="https://jsparrow.uk">James Sparrow</a>
                </section>
            </main>
        );
    }
}

export default Home;
