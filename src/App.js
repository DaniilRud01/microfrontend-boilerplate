import React from "react";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";

import { Layout } from "./Layout";
import { Home } from "./Home";
import { ExampleApp, ExampleSubAppFirst } from "./apps/example-app";

function App() {
    return (
        <Router>
            <Routes>
                <Route exact path="/" element={<Layout />}>
                    <Route exact index element={<Home />}/>
                    <Route exact path="/example-app" element={<ExampleApp />}/>
                    <Route exact path="/example-app/:id" element={<ExampleSubAppFirst />}/>
                </Route>
            </Routes>
        </Router>
    );
}
export default App;