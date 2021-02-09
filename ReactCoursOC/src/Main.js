import React from "react";
import Memory from './Component/Memory/App'
import Pendu from './Component/Pendu/Pendu'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";

// This site has 3 pages, all of which are rendered
// dynamically in the browser (not server rendered).
//
// Although the page does not ever refresh, notice how
// React Router keeps the URL up to date as you navigate
// through the site. This preserves the browser history,
// making sure things like the back button and bookmarks
// work properly.

export default function BasicExample() {
    return (
        <Router>
            <div className="HEHO">
                <nav className="navbar navbar-expand-lg navbar-light fixed-top" id="mainNav">
                    <div className="container">
                        <div className="collapse navbar-collapse" id="navbarResponsive">
                            <ul className="navbar-nav ml-auto">
                                <li className="nav-item"><Link className="MesChoux" to="/">Home</Link></li>
                                <li className="nav-item"><Link className="MesChoux" to="/Memory">Jeu de mémoire</Link></li>
                                <li className="nav-item"><Link className="MesChoux" to="/Pendu">Jeu du pendu</Link></li>
                            </ul>
                        </div>
                    </div>
                </nav>


            </div>
            <div>
                <hr />

                {/*
          A <Switch> looks through all its children <Route>
          elements and renders the first one whose path
          matches the current URL. Use a <Switch> any time
          you have multiple routes, but you want only one
          of them to render at a time
        */}
                <Switch>
                    <Route exact path="/">
                        <Home />
                    </Route>
                    <Route path="/Memory">
                        <Memory />
                    </Route>
                    <Route path="/Pendu">
                        <Pendu />
                    </Route>
                </Switch>
            </div>
        </Router>
    );
}

// You can think of these components as "pages"
// in your app.

function Home() {
    return (
        <div className="imagehome">
            <img src="luffy.png" alt="Luffy"/>
            <p>Salut développeur ! Tu peux visiter les autres pages grâce à la nav-bar</p>
        </div>
    );
}
