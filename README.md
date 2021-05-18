This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).


Prima eseguire l'installazione di `yarn` [installation](https://yarnpkg.com/lang/en/docs/install/) se non già presente

## Sviluppo e note

---
**ATTENZIONE**

Per problemi (da approfondire) che intercorrono tra la libreria `web3` e `node`  si consiglia l'utilizzo della versione node 10

```
nvm install 10
nvm use 10
```

---


Per partire in modalità sviluppo è necessario andare nella root del progetto e lanciare lo script `start`

```
$ cd chorchain-web  
$ yarn run start
```

A questo punto si è in *modalità sviluppo* e tutte le modifiche apportate al codice Javascript verrano visualizzate subito nel browser. Questa modalità infatti prevede l'**hot reloading**, che appena si accorge di una modifica ricompila e visualizza il nuovo codice.

La modalità di sviluppo prevede l'impiego di un proxy interno e configurabile tramite il file `setupProxy.js`
Il proxy interno può essere configurato verso più servizi esterni (REST) intercettabili con ad esempio un certo prefisso (/api, /rest, /apiv1, /apiv2, ...)


Altre cose da conoscere:

- per il routing si utilizza la libreria *React-router*
- per lo sviluppo con React si utilizza e consiglia la nuova modalità di sviluppo che impiega gli *hooks*
- per le chiamate agli endpoint REST si utilizza *axios* e *fetch* (con la preferenza verso axios)

Attualmente il codice è scritto in maniera (poco standard) e un po' confusionaria perchè è stato scritto molto velocemente per la fase prototipale. Seguirà una fase di ristrutturazione.
 
 
## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `yarn build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
