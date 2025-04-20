require('dotenv').config();
const app = require('./app');
const {printError, printInfo} = require('./utils/logger');

const port = process.env.PORT || 3000;
const server = app.listen(port);

function onError(error) {
    switch (error.code) {
        case "EACCES":
            printError(`Port ${port} requires elevated priviledge`);
            process.exit(1);
        case "EADDRINUSE":
            printError(`Port ${port} is already in use`);
            process.exit(1);
        default:
            throw error;
    }
}

function onListening() {
    const addr = server.address();
    const bind = typeof addr === 'string' ? addr : `port ${addr.port}`;
    printInfo(`Server is listening on ${bind}`);
}

server.on("error", onError);
server.on("listening", onListening);