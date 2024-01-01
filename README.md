# IoT Security System

## Overview

Welcome to the IoT Security System Server-side Application! This platform is expertly engineered to manage and monitor an IoT-based security system, offering a robust and responsive solution for your safety needs. It operates seamlessly through event-driven architecture, ensuring real-time responsiveness and accurate tracking of your IoT security devices' statuses.

## Features

-   Event Tracking: Every interaction with your IoT devices is logged in a database, ensuring detailed monitoring and security analysis.
-   SMS Alerts: Receive instant notifications via SMS for any significant security events, keeping you informed in real-time.
-   Status Management: Maintain an up-to-date view of your devices' status in our database, ensuring effective management of your security system.

## Tech Stack

This project is built using Node.js, Express.js, TypeScript, MongoDb, EventEmitter3 and Twilio.

## How to Run

1. Clone this repository to your local machine.
2. Ensure you have Node.js and yarn installed.
3. Create .env.development file in the project root directory to store your environment variables.
4. Open the .env.development file and add necessary environment variables(.env.example)
5. Navigate to the project directory in your terminal.
6. Install the necessary dependencies using yarn:

    `yarn install`

7. Run the application:

    `yarn run dev` or `yarn run dev:windows`

The server should now be running at the specified port (as set in your environment variables) or on the default
port &rarr; 3000.
