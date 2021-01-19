const WebSocket = require('ws');
const url = require('url');

const wss = new WebSocket.Server({
  port: 8080
});

var clients = [];

var names = [];

function broadcast(clientsList, data) {
  clientsList.forEach(function(client) {
    client.send(data);
  });
}



wss.on('connection', function connection(ws, req) {
  const parameters = url.parse(req.url, true);
  console.log(parameters.query.name);
  clients.push(ws);

  ws.on('message', function incoming(message) {
    let data = JSON.parse(message)
    if (data.type == "command") {
      if (data.message == "connect") {
        names.push(data.names);
        console.log(data.names);
      }
    } else if (data.type == "message") {
      broadcast(clients, message);
    }
  });
});
