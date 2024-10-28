# COM to File to Websocket

This project implements a simple HTTP and WebSocket server that handles incoming requests from ALGE software "COMtoFile".

## Features

- Handles HTTP requests and parses query parameters.
- Uses WebSocket to broadcast received data to connected clients.

## Requirements

- Node.js (version 12 or higher)
- npm (Node package manager)

## Installation

1. **Clone the repository**:

```bash
git clone https://github.com/yourusername/timy-gateway-server.git
cd timy-gateway-server
```

2. **Install dependencies**:

```bash
npm install
```

3. **Set port number**:

You can change port number (default is 8080) to any other port number you wish to use inside app.js

```javascript
const PORT = 8080;
```
    

4. **Usage**:

- Start the server. In the terminal, run:
```bash
node app.js
```

- Use ALGE "COMtoFile" software to send http request (that software allows simulating requests).

- In "COMtoFile" in the "Database an Web" tab, check the "Send time via URL" and in the box type:
```text
http://localhost:8080?
```
- In "COMtoFile" in the "Database an Web" tab, press "Simulate C0" and "Simulate C1" an you will get the info displayed in this app terminal.

![Example Screenshot](./screenshots/examples.png)

5. **Connect via WebSocket**:

You can connect to the WebSocket server at ws://localhost:8080 to receive broadcast messages of the queries sent.
Run included "index.html" locally as example 


6. **License**:

This project is licensed under the MIT License - see the LICENSE file for details.