import React from "react";
import {Link} from "react-router-dom";

export function Header() {
    return (
        <div className="banner">
            <nav>
                <Link to={'/'}>Go to main</Link>
                <Link to={'/example-app'}>Go Example App</Link>
            </nav>
        </div>
    );
}
