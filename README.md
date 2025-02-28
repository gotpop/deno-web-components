# Deno Baseline Server

A modern Deno server implementation with hot reloading capabilities and strict
TypeScript configuration.

## Architecture

```mermaid
graph TD
    A[Browser] -->|HTTP Request| B[Deno Server]
    B -->|Static Files| C[Public Directory]
    B -->|Hot Reload| A
    C -->|main.js| D[JavaScript]
    C -->|main.css| E[Styles]
```

## Project Structure

```mermaid
graph TD
    A[deno-server] -->|Contains| B[src]
    A -->|Config| C[deno.json]
    B -->|Entry| D[server.ts]
    B -->|Static| E[public]
    E -->|Scripts| F[main.js]
    E -->|Styles| G[main.css]
```

## Features

- Hot module reloading
- Static file serving
- TypeScript support
- Strict type checking
- Development mode with watch
- Formatting and linting built-in

## Configuration

The project uses `deno.json` for configuration with the following features:

```json
{
  "compilerOptions": {
    "lib": ["deno.window"],
    "strict": true
  }
}
```

## Available Scripts

- `deno task dev` - Run in development mode with hot reloading
- `deno task start` - Run in production mode
- `deno task test` - Run tests
- `deno task lint` - Lint code
- `deno task fmt` - Format code

## Getting Started

1. Install Deno:
   ```bash
   curl -fsSL https://deno.land/x/install/install.sh | sh
   ```

2. Run the development server:
   ```bash
   deno task dev
   ```

3. Access the server at `http://localhost:8000`

## Development Flow

```mermaid
sequenceDiagram
    participant Browser
    participant Server
    participant FileSystem
    
    Browser->>Server: Request page
    Server->>FileSystem: Read static files
    FileSystem->>Server: Return file contents
    Server->>Browser: Serve HTML/JS/CSS
    
    loop Hot Reload
        FileSystem->>Server: File change detected
        Server->>Browser: Push update
        Browser->>Browser: Update content
    end
```

## Requirements

- Deno 2.2 or higher
- Modern browser (for development)

## License

MIT
