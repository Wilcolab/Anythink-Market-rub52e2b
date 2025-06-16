const express = require('express');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static('public'));

const routes = require("./api/routes");
routes(app);

if (!module.parent) {
    app.listen(port, () => {
        console.log(`Server running on port ${port}`);
    });
}

module.exports = app;


//welcome to the server.js file
//this is the main file for the server
//it sets up the express server and listens on a port
//it also serves static files from the public directory     
//it also imports the routes from the api/routes.js file
//it also exports the app for testing purposes
//it also checks if the file is being run directly or being imported
//if it is being run directly, it starts the server
//if it is being imported, it does not start the server
//it also uses the PORT environment variable if it is set
//otherwise it defaults to port 3000