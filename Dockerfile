# Stage 1: Build frontend
FROM node:20-alpine AS frontend-builder

WORKDIR /app/frontend

# Copy package files first for better caching
COPY frontend/package.json frontend/package-lock.json ./

# Install dependencies (cached unless package*.json changes)
RUN npm ci

# Copy frontend source
COPY frontend/ ./

# Copy posts directory (needed for generate-posts script)
COPY posts/ /app/posts/

# Build frontend (runs generate-posts via prebuild)
RUN npm run build

# Stage 2: Build Go binary
FROM golang:1.23-alpine AS go-builder

WORKDIR /app

# Copy go.mod first for dependency caching
COPY go.mod ./
RUN go mod download

# Copy source code
COPY main.go ./

# Copy built frontend from previous stage
COPY --from=frontend-builder /app/frontend/build ./frontend/build

# Build the Go binary
RUN CGO_ENABLED=0 GOOS=linux GOARCH=amd64 go build -ldflags="-s -w" -o app .

# Stage 3: Final minimal image
FROM scratch

# Copy the binary
COPY --from=go-builder /app/app /app

# Expose port
EXPOSE 8080

# Run the application
ENTRYPOINT ["/app"]
