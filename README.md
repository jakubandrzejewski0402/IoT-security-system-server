# IoT_Security_System_Server

## Overview
The IoT_Security_System_Server is a backend application designed for Internet of Things (IoT) security devices. The application handles four main types of events emitted by IoT devices: alarm armed, alarm disarmed, low battery, and intrusion detected. It provides real-time event tracking and stores event histories in a MongoDB database.

## Technology Stack
- **Runtime Environment**: Node.js
- **Web Framework**: Express.js
- **Programming Language**: TypeScript
- **Database**: MongoDB
- **ORM**: Mongoose
- **Event Emitter**: eventemitter3
- **Logging**: winston
- **SMS Notifications**: Twilio
- **Real-Time Communication**: socket.io

## Installation
Before you begin, ensure you have Node.js and MongoDB installed on your machine. Clone the repository, install dependencies, and start the server:

```bash
$ git clone <repository-url>
$ cd iot_security_system_server
$ npm install
$ npm run build
$ npm run serve
```

Alternatively, for development, you can use:

```bash
$ npm start
```

## Configuration
The server requires environment variables to be set for connecting to MongoDB and the Twilio SMS service. These should be defined in a `.env` file at the root of the project.

Example `.env` file content:

```plaintext
MONGODB_URI=mongodb://localhost:27017/iot_security_system
TWILIO_ACCOUNT_SID=your-twilio-account-sid
TWILIO_AUTH_TOKEN=your-twilio-auth-token
TWILIO_PHONE_NUMBER=your-twilio-phone-number
```

## API Endpoints
The server exposes the following endpoints which correspond to various security events:

- **POST** `/api/alarm-armed`
- **POST** `/api/alarm-disarmed`
- **POST** `/api/low-battery`
- **POST** `/api/intruded`

Event payloads should include a `deviceId` and may include other relevant data.

## Event Handling
Events are processed asynchronously through event emitters and handlers. Interceptors log every event to the database. For real-time status tracking, socket communication is utilized (note: this information is not persistent).

## SMS Notifications
SMS notifications are sent using Twilio when events are received. Ensure the relevant phone number is included in the request header for this feature to work.

## Logs
The application logs events and server activity to console and to files found in the `logs` directory.

## Security
Note that there is currently no authentication layer for the API endpoints, which should be considered if deploying in a production environment.

## Development and Testing
This project includes utilities for setting up event listeners and emitting test events. Server activity and event processing can be monitored through logs.

## Contributing
Contributions are welcome. Please ensure to follow the coding conventions and write tests for new features when contributing to the project.

## License
This project is open source and available under the [MIT License](LICENSE).

## Contact
For any additional information or support, please contact the development team.
