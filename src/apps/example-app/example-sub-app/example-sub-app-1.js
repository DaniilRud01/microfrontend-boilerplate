import MicroFrontend from "../../../MicroFrontend";
import React from "react";

export function ExampleSubAppFirst({ history }) {
    return <MicroFrontend history={history} host={'past your app host address'} name="first app component" />
}