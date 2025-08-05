#!/bin/bash

# Homepage Config GUI - Project Setup Script
# Run this from your project root directory to create the complete file structure

set -e

echo "🚀 Setting up Homepage Config GUI project structure..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to create directories
create_directories() {
    echo -e "${BLUE}📁 Creating directory structure...${NC}"
    
    mkdir -p .github/workflows
    mkdir -p public
    mkdir -p src
    
    echo -e "${GREEN}✅ Directories created${NC}"
}

# Function to create package.json
create_package_json() {
    echo -e "${BLUE}📦 Creating package.json...${NC}"
    
    cat > package.json << 'EOF'
{
  "name": "homepage-config-gui",
  "version": "1.0.0",
  "description": "Visual GUI for Homepage configuration without Docker labels",
  "private": true,
  "homepage": ".",
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-scripts": "5.0.1",
    "lucide-react": "^0.263.1"
  },
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  },
  "eslintConfig": {
    "extends": [
      "react-app",
      "react-app/jest"
    ]
  },
  "browserslist": {
    "production": [
      ">0.2%",
      "not dead",
      "not op_mini all"
    ],
    "development": [
      "last 1 chrome version",
      "last 1 firefox version",
      "last 1 safari version"
    ]
  },
  "keywords": [
    "homepage",
    "dashboard",
    "homelab",
    "docker",
    "yaml",
    "configuration",
    "gui"
  ],
  "author": "Your Name",
  "license": "MIT",
  "repository": {
    "type": "git",
    "url": "https://github.com/yourusername/homepage-config-gui.git"
  },
  "bugs": {
    "url": "https://github.com/yourusername/homepage-config-gui/issues"
  }
}
EOF
    
    echo -e "${GREEN}✅ package.json created${NC}"
}

# Function to create public files
create_public_files() {
    echo -e "${BLUE}🌐 Creating public files...${NC}"
    
    # public/index.html
    cat > public/index.html << 'EOF'
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <link rel="icon" href="%PUBLIC_URL%/favicon.ico" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="theme-color" content="#000000" />
    <meta name="description" content="Visual GUI for Homepage configuration without Docker labels" />
    <link rel="apple-touch-icon" href="%PUBLIC_URL%/logo192.png" />
    <link rel="manifest" href="%PUBLIC_URL%/manifest.json" />
    <title>Homepage Config GUI</title>
  </head>
  <body>
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <div id="root"></div>
  </body>
</html>
EOF

    # public/manifest.json
    cat > public/manifest.json << 'EOF'
{
  "short_name": "Homepage Config GUI",
  "name": "Homepage Configuration GUI",
  "icons": [
    {
      "src": "favicon.ico",
      "sizes": "64x64 32x32 24x24 16x16",
      "type": "image/x-icon"
    }
  ],
  "start_url": ".",
  "display": "standalone",
  "theme_color": "#000000",
  "background_color": "#ffffff"
}
EOF

    # Create a simple favicon (base64 encoded)
    echo "Creating simple favicon..."
    # This creates a simple 16x16 favicon
    touch public/favicon.ico
    
    echo -e "${GREEN}✅ Public files created${NC}"
}

# Function to create src files
create_src_files() {
    echo -e "${BLUE}⚛️ Creating React source files...${NC}"
    
    # src/index.js
    cat > src/index.js << 'EOF'
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
EOF

    # src/index.css
    cat > src/index.css << 'EOF'
@import 'tailwindcss/base';
@import 'tailwindcss/components';
@import 'tailwindcss/utilities';

body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

code {
  font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
    monospace;
}
EOF

    # src/App.js - This is a placeholder, user needs to copy the React component
    cat > src/App.js << 'EOF'
import React from 'react';

// TODO: Copy the HomepageConfigGUI component from the Claude artifact here
// This is the main React component that contains all the GUI functionality

function App() {
  return (
    <div className="App">
      <h1>Homepage Config GUI</h1>
      <p>Please replace this with the HomepageConfigGUI component from the Claude artifact.</p>
    </div>
  );
}

export default App;
EOF
    
    echo -e "${GREEN}✅ React source files created${NC}"
    echo -e "${YELLOW}⚠️  Don't forget to copy the HomepageConfigGUI component into src/App.js${NC}"
}

# Function to create Docker files
create_docker_files() {
    echo -e "${BLUE}🐳 Creating Docker files...${NC}"
    
    # Dockerfile
    cat > Dockerfile << 'EOF'
# Build stage
FROM node:18-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy source code
COPY src/ ./src/
COPY public/ ./public/

# Build the application
RUN npm run build

# Production stage
FROM nginx:alpine

# Copy custom nginx config
COPY nginx.conf /etc/nginx/nginx.conf

# Copy built app from builder stage
COPY --from=builder /app/build /usr/share/nginx/html

# Create non-root user
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nextjs -u 1001

# Set permissions
RUN chown -R nextjs:nodejs /usr/share/nginx/html && \
    chown -R nextjs:nodejs /var/cache/nginx && \
    chown -R nextjs:nodejs /var/log/nginx && \
    chown -R nextjs:nodejs /etc/nginx/conf.d

RUN touch /var/run/nginx.pid && \
    chown -R nextjs:nodejs /var/run/nginx.pid

USER nextjs

EXPOSE 3000

CMD ["nginx", "-g", "daemon off;"]
EOF

    # nginx.conf
    cat > nginx.conf << 'EOF'
user nextjs;
worker_processes auto;
pid /var/run/nginx.pid;

events {
    worker_connections 1024;
}

http {
    include /etc/nginx/mime.types;
    default_type application/octet-stream;
    
    sendfile on;
    tcp_nopush on;
    tcp_nodelay on;
    keepalive_timeout 65;
    types_hash_max_size 2048;
    
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css text/xml text/javascript application/javascript application/xml+rss application/json;
    
    server {
        listen 3000;
        server_name localhost;
        root /usr/share/nginx/html;
        index index.html;
        
        # Handle React Router
        location / {
            try_files $uri $uri/ /index.html;
        }
        
        # Security headers
        add_header X-Frame-Options "SAMEORIGIN" always;
        add_header X-Content-Type-Options "nosniff" always;
        add_header X-XSS-Protection "1; mode=block" always;
        
        # Cache static assets
        location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
            expires 1y;
            add_header Cache-Control "public, immutable";
        }
    }
}
EOF

    # docker-compose.yml
    cat > docker-compose.yml << 'EOF'
version: '3.8'

services:
  homepage-config-gui:
    build: .
    container_name: homepage-config-gui
    ports:
      - "3001:3000"
    restart: unless-stopped
    environment:
      - NODE_ENV=production
    labels:
      - "traefik.enable=true"
      - "traefik.http.routers.homepage-config.rule=Host(`config.yourdomain.com`)"
      - "traefik.http.services.homepage-config.loadbalancer.server.port=3000"
EOF

    # docker-compose.full.yml
    cat > docker-compose.full.yml << 'EOF'
version: '3.8'

services:
  homepage:
    image: ghcr.io/gethomepage/homepage:latest
    container_name: homepage
    ports:
      - "3000:3000"
    volumes:
      - ./config:/app/config
      - /var/run/docker.sock:/var/run/docker.sock:ro
    restart: unless-stopped

  homepage-config-gui:
    build: .
    container_name: homepage-config-gui
    ports:
      - "3001:3000"
    volumes:
      - ./config:/app/config:rw  # Share config with homepage
    restart: unless-stopped
    depends_on:
      - homepage
    labels:
      - "traefik.enable=true"
      - "traefik.http.routers.config.rule=Host(`config.yourdomain.com`)"
EOF
    
    echo -e "${GREEN}✅ Docker files created${NC}"
}

# Function to create ignore files
create_ignore_files() {
    echo -e "${BLUE}🚫 Creating ignore files...${NC}"
    
    # .dockerignore
    cat > .dockerignore << 'EOF'
node_modules
npm-debug.log
.git
.gitignore
README.md
.env
.nyc_output
coverage
.cache
build
dist
.DS_Store
EOF

    # .gitignore
    cat > .gitignore << 'EOF'
# Dependencies
node_modules/
/.pnp
.pnp.js

# Testing
/coverage

# Production
/build

# Misc
.DS_Store
.env.local
.env.development.local
.env.test.local
.env.production.local

npm-debug.log*
yarn-debug.log*
yarn-error.log*

# IDEs
.vscode/
.idea/
*.swp
*.swo

# Docker
.dockerignore
EOF
    
    echo -e "${GREEN}✅ Ignore files created${NC}"
}

# Function to create GitHub workflows
create_github_workflows() {
    echo -e "${BLUE}⚙️ Creating GitHub Actions workflows...${NC}"
    
    # .github/workflows/docker-build.yml
    cat > .github/workflows/docker-build.yml << 'EOF'
name: Build and Push Docker Image

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

env:
  REGISTRY: ghcr.io
  IMAGE_NAME: ${{ github.repository }}

jobs:
  build-and-push:
    runs-on: ubuntu-latest
    permissions:
      contents: read
      packages: write

    steps:
    - name: Checkout repository
      uses: actions/checkout@v4

    - name: Log in to Container Registry
      uses: docker/login-action@v3
      with:
        registry: ${{ env.REGISTRY }}
        username: ${{ github.actor }}
        password: ${{ secrets.GITHUB_TOKEN }}

    - name: Extract metadata
      id: meta
      uses: docker/metadata-action@v5
      with:
        images: ${{ env.REGISTRY }}/${{ env.IMAGE_NAME }}
        tags: |
          type=ref,event=branch
          type=ref,event=pr
          type=sha,prefix={{branch}}-

    - name: Build and push Docker image
      uses: docker/build-push-action@v5
      with:
        context: .
        push: true
        tags: ${{ steps.meta.outputs.tags }}
        labels: ${{ steps.meta.outputs.labels }}
EOF

    # .github/workflows/release.yml
    cat > .github/workflows/release.yml << 'EOF'
name: Release

on:
  push:
    tags:
      - 'v*'

env:
  REGISTRY: ghcr.io
  IMAGE_NAME: ${{ github.repository }}

jobs:
  release:
    runs-on: ubuntu-latest
    permissions:
      contents: write
      packages: write

    steps:
    - name: Checkout
      uses: actions/checkout@v4

    - name: Log in to Container Registry
      uses: docker/login-action@v3
      with:
        registry: ${{ env.REGISTRY }}
        username: ${{ github.actor }}
        password: ${{ secrets.GITHUB_TOKEN }}

    - name: Extract metadata
      id: meta
      uses: docker/metadata-action@v5
      with:
        images: ${{ env.REGISTRY }}/${{ env.IMAGE_NAME }}
        tags: |
          type=ref,event=tag
          type=raw,value=latest

    - name: Build and push Docker image
      uses: docker/build-push-action@v5
      with:
        context: .
        push: true
        tags: ${{ steps.meta.outputs.tags }}
        labels: ${{ steps.meta.outputs.labels }}

    - name: Create Release
      uses: actions/create-release@v1
      env:
        GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
      with:
        tag_name: ${{ github.ref }}
        release_name: Release ${{ github.ref }}
        draft: false
        prerelease: false
EOF
    
    echo -e "${GREEN}✅ GitHub workflows created${NC}"
}

# Function to create README and LICENSE
create_docs() {
    echo -e "${BLUE}📚 Creating documentation...${NC}"
    
    # README.md
    cat > README.md << 'EOF'
# Homepage Config GUI

🎨 **Visual configuration builder for [Homepage](https://gethomepage.dev) - perfect for services that can't use Docker labels!**

[![Docker Build](https://github.com/yourusername/homepage-config-gui/actions/workflows/docker-build.yml/badge.svg)](https://github.com/yourusername/homepage-config-gui/actions/workflows/docker-build.yml)
[![GitHub release](https://img.shields.io/github/release/yourusername/homepage-config-gui.svg)](https://github.com/yourusername/homepage-config-gui/releases)

## ✨ Features

- 🎯 **Visual Interface** - Drag, drop, and click to build your config
- 📥 **Import/Export** - Load existing YAML configs and export when done
- 🚀 **70+ Pre-configured Services** - Popular homelab apps with defaults
- ↕️ **Reorder Everything** - Arrange groups and services with arrow controls
- 🎨 **Live Preview** - See your YAML update in real-time
- 🐳 **Docker Ready** - Deploy alongside Homepage
- 📱 **Mobile Friendly** - Works great on phones and tablets

## 🚀 Quick Start

### Docker Run
```bash
docker run -d \
  --name homepage-config-gui \
  -p 3001:3000 \
  ghcr.io/yourusername/homepage-config-gui:latest
```

### Docker Compose
```yaml
services:
  homepage-config-gui:
    image: ghcr.io/yourusername/homepage-config-gui:latest
    container_name: homepage-config-gui
    ports:
      - "3001:3000"
    restart: unless-stopped
```

### With Homepage Integration
```yaml
services:
  homepage:
    image: ghcr.io/gethomepage/homepage:latest
    container_name: homepage
    ports:
      - "3000:3000"
    volumes:
      - ./config:/app/config
    restart: unless-stopped

  homepage-config-gui:
    image: ghcr.io/yourusername/homepage-config-gui:latest
    container_name: homepage-config-gui
    ports:
      - "3001:3000"
    volumes:
      - ./config:/app/config  # Share config directory
    restart: unless-stopped
```

## 📖 Usage

1. **Access the GUI** at `http://localhost:3001`
2. **Import** existing configs or start fresh
3. **Add services** using quick-add dropdown or manually
4. **Organize** with arrow controls to reorder groups/services
5. **Configure widgets** for live stats and monitoring
6. **Export** your `services.yaml` when done
7. **Restart Homepage** to see changes

## 🛠️ Development

```bash
# Clone the repository
git clone https://github.com/yourusername/homepage-config-gui.git
cd homepage-config-gui

# Install dependencies
npm install

# Start development server
npm start

# Build for production
npm run build
```

## 🎯 Why Use This?

- **No Docker Labels Needed** - Perfect for external services, VMs, bare metal
- **Visual Configuration** - No more hand-editing YAML files
- **Comprehensive** - Supports all Homepage features and 70+ popular services
- **Homelab Friendly** - Designed by homelab enthusiasts for homelab enthusiasts
- **Time Saving** - Generate complex configs in minutes, not hours

## 📦 Supported Services

Over 70 popular homelab services with pre-configured defaults:

- **Media**: Plex, Jellyfin, Emby, Sonarr, Radarr, Lidarr, Readarr
- **Downloads**: qBittorrent, Transmission, SABnzbd, NZBGet
- **Infrastructure**: Portainer, Traefik, Nginx PM, Authentik
- **Monitoring**: Grafana, Prometheus, Uptime Kuma, Netdata
- **Home Automation**: Home Assistant, ESPHome, Node-RED
- **And many more!**

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Homepage](https://gethomepage.dev) - The amazing dashboard this tool configures
- [Lucide React](https://lucide.dev) - Beautiful icons
- [Tailwind CSS](https://tailwindcss.com) - Styling framework
EOF

    # LICENSE
    cat > LICENSE << 'EOF'
MIT License

Copyright (c) 2024 Your Name

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
EOF
    
    echo -e "${GREEN}✅ Documentation created${NC}"
}

# Function to create tailwind config
create_tailwind_config() {
    echo -e "${BLUE}🎨 Creating Tailwind CSS config...${NC}"
    
    # Install tailwind dependencies note
    cat > tailwind.config.js << 'EOF'
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
EOF

    echo -e "${GREEN}✅ Tailwind config created${NC}"
    echo -e "${YELLOW}⚠️  Remember to install Tailwind CSS: npm install -D tailwindcss${NC}"
}

# Main execution
main() {
    echo -e "${GREEN}🚀 Homepage Config GUI Project Setup${NC}"
    echo -e "${BLUE}This script will create the complete project structure${NC}"
    echo ""
    
    create_directories
    create_package_json
    create_public_files
    create_src_files
    create_docker_files
    create_ignore_files
    create_github_workflows
    create_docs
    create_tailwind_config
    
    echo ""
    echo -e "${GREEN}🎉 Project setup complete!${NC}"
    echo ""
    echo -e "${YELLOW}📋 Next steps:${NC}"
    echo -e "   1. Copy the HomepageConfigGUI React component into src/App.js"
    echo -e "   2. Update package.json and README.md with your GitHub username"
    echo -e "   3. Install dependencies: ${BLUE}npm install${NC}"
    echo -e "   4. Install Tailwind CSS: ${BLUE}npm install -D tailwindcss${NC}"
    echo -e "   5. Start development: ${BLUE}npm start${NC}"
    echo -e "   6. Initialize git: ${BLUE}git init && git add . && git commit -m 'Initial commit'${NC}"
    echo ""
    echo -e "${GREEN}🐳 To test Docker build:${NC}"
    echo -e "   ${BLUE}docker build -t homepage-config-gui .${NC}"
    echo -e "   ${BLUE}docker run -d -p 3001:3000 homepage-config-gui${NC}"
    echo ""
    echo -e "${GREEN}✨ Happy coding!${NC}"
}

# Run the main function
main