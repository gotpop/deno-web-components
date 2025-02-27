# README.md

# Deno Server Project

This project is a simple Deno server that serves a JavaScript file and a CSS file with hot reloading and browser updating functionality.

## Project Structure

```
deno-server
├── src
│   ├── server.ts          # Entry point for the Deno server
│   └── public
│       ├── styles
│       │   └── main.css   # CSS styles for the application
│       └── scripts
│           └── main.js    # JavaScript code for the application
├── deno.json              # Deno configuration file
├── import_map.json        # Module import mapping
└── README.md              # Project documentation
```

## Setup Instructions

1. **Install Deno**: Make sure you have Deno installed on your machine. You can follow the instructions on the [Deno website](https://deno.land/).

2. **Clone the Repository**: Clone this repository to your local machine.

   ```bash
   git clone <repository-url>
   cd deno-server
   ```

3. **Run the Server**: Start the Deno server with the following command:

   ```bash
   deno run --allow-net --allow-read src/server.ts
   ```

4. **Access the Application**: Open your browser and navigate to `http://localhost:8000` to view the application.

## Usage

- The server will automatically reload the JavaScript and CSS files when changes are detected, allowing for a smooth development experience.
- You can modify the `main.js` and `main.css` files to see the changes reflected in the browser without needing to refresh manually.

## License

This project is licensed under the MIT License.