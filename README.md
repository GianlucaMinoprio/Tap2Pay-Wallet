# Tap2Pay ultrasonic payment

## React Native Ultrasonic Payment App

Welcome to the Ultrasonic Payment App built with React Native! This application allows users to make payments using ultrasonic sound waves. We utilize the power of Safe for account creation and payment functionalities, and the payments are made using ApeCoin.

## Features:

- **Mobile Payments using Ultrasonics:** Seamlessly pay without needing physical contact or scanning QR codes.
- **Safe Integration:** Safe ensures secure account creation and payment processing.
- **ApeCoin Transactions:** All transactions are made using the ApeCoin cryptocurrency.

## Getting Started:

### Prerequisites:

Ensure you have the following installed:
- Node.js
- Yarn or npm
- React Native and the Expo Go app for mobile testing

### Installation:

1. Clone the repository to your local machine.
2. Navigate to the root directory and run:
   ```bash
   yarn install
   # or
   npm install
3. Navigate to the SafeServer directory and run:
   ```bash
   yarn install
   # or
   npm install
4. Navigate to the ggwave-server directory and run:
   ```bash
   yarn install
   # or
   npm install

### Running the App:

1. Start the SafeServer:
    ```bash
    cd SafeServer
    node server.js
2. Start the ggwave-server:
    ```bash
    cd ggwave-server
    ./run_server.sh
3. Finally, in the root directory, run:
    ```bash
    expo start
