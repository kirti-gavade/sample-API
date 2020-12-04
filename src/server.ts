import app from './app';
import http from 'http';

/**
 * Get port from environment and store in Express.
 */

const port = process.env.PORT || '3000';
app.set('port', port);

/**
 * Create HTTP server.
 */

const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

function onError(error: any) {
  console.log(error);
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  console.log(`Server is listening on ${port}`);
}
