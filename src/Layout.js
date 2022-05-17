import React from "react";
import { Outlet } from "react-router-dom";

import { Header } from "./Header";

export function Layout() {
    return (
      <div>
        <Header />
        <div className='home'>
            <div className="content">
              <Outlet/>
            </div>
        </div>
     </div>
    );
}
