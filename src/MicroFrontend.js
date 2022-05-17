import React, { useEffect } from "react";
import axios from 'axios';

function MicroFrontend({ name, host }) {
    useEffect(() => {
        const scriptId = `micro-frontend-script-${name}`;

        const renderMicroFrontend = () => {

            window[`render${name}`](`${name}-container`);
        };

        if (document.getElementById(scriptId)) {
            renderMicroFrontend();
            return;
        }

        axios.get(`${host}/asset-manifest.json`).then(({ data }) => {
            const script = document.createElement("script");
            script.id = scriptId;
            script.crossOrigin = "";
            script.src = `${host}${data.files["main.js"]}`;
            script.onload = () => {
                renderMicroFrontend();
            };
            document.head.appendChild(script);
        })
        return () => {
            document.getElementById(scriptId).remove();
            window[`unmount${name}`] && window[`unmount${name}`](`${name}-container`);
        };
    }, [name, host]);

    return <main id={`${name}-container`} />;
}

MicroFrontend.defaultProps = {
    document,
    window,
};

export default MicroFrontend;
