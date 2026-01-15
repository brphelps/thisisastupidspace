# thisisastupidspace

A full-stack web application with a Go backend and React frontend, designed for deployment to Azure Web Apps.

## Architecture

- **Backend**: Go server using the standard library's `net/http` package
- **Frontend**: React 19 with TypeScript (Create React App)
- **Deployment**: GitHub Actions workflow for Azure Web App deployment

The Go server embeds the React build output and serves it as static files, creating a single deployable binary.

## Prerequisites

- Go 1.22+
- Node.js 20+
- npm

## Development

### Frontend

```bash
cd frontend
npm install
npm start
```

The React dev server runs on `http://localhost:3000`.

### Backend

First, build the frontend:

```bash
cd frontend
npm run build
```

Then run the Go server:

```bash
go run .
```

The server runs on `http://localhost:8080` (or the port specified by the `PORT` environment variable).

## API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/health` | GET | Health check endpoint, returns `{"status": "healthy"}` |
| `/*` | GET | Serves static frontend files |

## Building for Production

```bash
# Build frontend
cd frontend && npm ci && npm run build && cd ..

# Build Go binary
CGO_ENABLED=0 GOOS=linux GOARCH=amd64 go build -o app .
```

## Deployment

This project includes a GitHub Actions workflow (`.github/workflows/deploy.yml`) that automatically deploys to Azure Web Apps on pushes to the `main` branch.

### Setup

1. Create an Azure Web App
2. Download the publish profile from the Azure Portal
3. Add it as a GitHub secret named `AZURE_WEBAPP_PUBLISH_PROFILE`

## Project Structure

```
.
├── .github/workflows/    # GitHub Actions CI/CD
│   └── deploy.yml
├── frontend/             # React frontend
│   ├── public/
│   ├── src/
│   └── package.json
├── main.go               # Go backend entry point
├── go.mod
└── README.md
```

## License

MIT
