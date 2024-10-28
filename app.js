// ------------------------- EXTERNAL MODULES -------------------------
const http = require('http');
const url = require('url');
const WebSocket = require('ws');


// ------------------------- GLOBALS -------------------------
let lastQuery = {};
const PORT = 8080;


// ------------------------- HTTP SERVER -------------------------

// Create server
const server = http.createServer((req, res) => {
    
    res.writeHead(200);
    res.end();
    
    lastQuery = url.parse(req.url, true).query;
    lastQuery.TIMESTAMP = new Date().toISOString().split('T')[1].split('.')[0]; // hh:mm:ss 

    WSbroadcast(JSON.stringify(lastQuery));
    
    const formattedRow = formatRow(lastQuery);
    console.log(formattedRow);
    
});

// Start listening
server.listen(PORT, () => {
    console.clear();
    console.log('\n -> Server running on port:', PORT, '<-\n');
    const header = [
        '|------------|------------|------------|------------|------------|------------|------------|------------|',
        '|  HH:MM:SS  |   ACTION   |  EVENTID   |   HEATID   |    TIME    |  CHANNEL   |    BIB     |   GROUP    |',
        '|------------|------------|------------|------------|------------|------------|------------|------------|'
    ].join('\n');
    console.log(header);
});


// ------------------------- WEB SOCKET SERVER -------------------------

// Start the WebSocket server
const wss = new WebSocket.Server({ server });

// Handle WebSocket connections
wss.on('connection', ws => {
    ws.send(JSON.stringify(lastQuery));

    ws.on('message', message => {
        // console.log(`Incoming WebSocket message: ${message}`);
    });

    ws.on('error', console.error);
});

// Broadcast to all WebSocket clients
function WSbroadcast(data) {
    wss.clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(data);
        }
    });
}


// ------------------------- TEXT FORMAT FUNCTIONS -------------------------

// Add spaces before and after to center a text within a given length
function centerText(text, width) {
    const str = text.toString();
    const padding = Math.max(0, width - str.length);
    const padLeft = Math.floor(padding / 2);
    const padRight = padding - padLeft;
    return ' '.repeat(padLeft) + str + ' '.repeat(padRight);
}

// Format row with centered texts
function formatRow(query) {
    const {
        TIMESTAMP = '',
        ACTION = '',
        EVENTID = '',
        HEATID = '',
        TIME = '',
        CHANNEL = '',
        BIB = '',
        GROUP = ''
    } = query;

    return `| ${centerText(TIMESTAMP, 10)} | ${centerText(ACTION, 10)} | ${centerText(EVENTID, 10)} | ${centerText(HEATID, 10)} | ${centerText(TIME, 10)} | ${centerText(CHANNEL, 10)} | ${centerText(BIB, 10)} | ${centerText(GROUP, 10)} |`;
}
