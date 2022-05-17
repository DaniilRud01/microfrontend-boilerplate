> ### Attention!
>before setting up the container and your microinterface
remember that when developing locally, the container must always be running locally with your microinterface that you are developing


> This build allows you to easily deploy micro frontend applications, all you need to do is set up your micro frontend applications following the instructions below.

> this assembly is a container for your applications

> container is for:<br/>
global routing <br/>
static application elements (header, footer)<br/>
Authorization<br/>
and the like that needs to be defined at the top level

`setting instruction: In a container`

* `create .env file and put your application addresses in it`
---

`Setting instruction: in your micro frontend`
* `Add to your micro frontend application`
    * `react-app-rewired`
> When the container app tries to load the MFE, everything must be in a single JS file. you have to disable fragmentation. For this you will use the react-app-rewired package. Using this, you can override the build configuration without fetching the application.

*`Create config-overrides.js at the root level of your microinterface with the template below`

```js
module.exports = {
    webpack: (config, env) => {
        config.optimization.runtimeChunk = false;
        config.optimization.splitChunks = {
            cacheGroups: {
                default: false,
            },
        };

        config.output.filename = "static/js/[name].js";

        config.plugins[5].options.filename = "static/css/[name].css";
        config.plugins[5].options.moduleFilename = () => "static/css/main.css";
        return config;
    },
};
```

> Further: <br/>
change the package.json scripts in your micro frontend to the current template

```json
{
  "scripts": {
    "start": "PORT=3001 react-app-rewired start",
    "build": "react-app-rewired build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  }
}
```

> for local development, you need to specify the port on which your application will run by default it is 3000, but for local development 3000 will be occupied by the container, so each of your micro frontend needs to specify the port on which your application will run

> As all our microfrontends and container will be hosted in different subdomains, we must enable CORS in all our microfrontends. To do this create src/setupProxy.js and add the following content.

```js
module.exports = (app) => {
    app.use((req, res, next) => {
        res.header("Access-Control-Allow-Origin", "*");
        next();
    });
};
```

> The final modification we need for the your microfrontend is to update its index.js with the render function. To do this, edit the index.js with the following content.
Important render function name should be the same as the container name i.e render[AppName] == '[AppName]-container'.

```js
window.renderAppName = (containerId, history) => {
    ReactDOM.render(
        <App history={history} />,
        document.getElementById(containerId),
    );
};

if (!document.getElementById('AppName-container')) {
    ReactDOM.render(<App />, document.getElementById('root'));
}

reportWebVitals();
```
---
## Example integration

> For examples of integrating micro frontend into a container, see the container <br />
> src/apps

> For an example of routing, see src/App.js
