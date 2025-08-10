# Docker Usage Guide

This project provides two Docker image variants to suit different use cases:

## Image Variants

### 1. Full Server Image (Default)
**Image:** `homepage-config-editor:latest`
- **Base:** Node.js Alpine
- **Features:** Full-featured server with live config file updates
- **Port:** 3001
- **Use Case:** Development, live editing, dynamic configuration management

### 2. Static Nginx Image
**Image:** `homepage-config-editor:static`
- **Base:** Nginx Alpine
- **Features:** Optimized static build, read-only
- **Port:** 80
- **Use Case:** Production deployments, Kubernetes, reverse proxy setups

## Quick Start

### Using Docker Hub

#### Full Server (with live updates)
```bash
# Basic usage
docker run -p 3001:3001 hoiber/homepage-config-editor:latest

# With persistent config directory
docker run -p 3001:3001 -v /path/to/config:/config hoiber/homepage-config-editor:latest

# With live updates enabled
docker run -p 3001:3001 -v /path/to/config:/config -e ENABLE_LIVE_UPDATES=true hoiber/homepage-config-editor:latest
```

#### Static Nginx Build
```bash
# Basic usage
docker run -p 8080:80 hoiber/homepage-config-editor:static
```

### Using GitHub Container Registry

#### Full Server
```bash
docker run -p 3001:3001 ghcr.io/hoiber/homepage-config-editor:latest
```

#### Static Build
```bash
docker run -p 8080:80 ghcr.io/hoiber/homepage-config-editor-static:latest
```

## Environment Variables

### Full Server Image
| Variable | Default | Description |
|----------|---------|-------------|
| `NODE_ENV` | `production` | Node.js environment |
| `PORT` | `3001` | Server port |
| `HOMEPAGE_CONFIG_PATH` | `/config` | Config directory path |
| `SERVICES_FILE` | `services.yaml` | Services config filename |
| `SETTINGS_FILE` | `settings.yaml` | Settings config filename |
| `WIDGETS_FILE` | `widgets.yaml` | Widgets config filename |
| `ENABLE_LIVE_UPDATES` | `false` | Enable live file watching |

### Static Image
No environment variables - served by Nginx.

## Docker Compose Examples

### Full Server with Persistent Storage
```yaml
version: '3.8'
services:
  homepage-config-editor:
    image: hoiber/homepage-config-editor:latest
    container_name: homepage-config-gui
    ports:
      - "3001:3001"
    volumes:
      - ./config:/config
    environment:
      - ENABLE_LIVE_UPDATES=true
    restart: unless-stopped
```

### Static Build with Reverse Proxy
```yaml
version: '3.8'
services:
  homepage-config-editor:
    image: hoiber/homepage-config-editor:static
    container_name: homepage-config-static
    ports:
      - "8080:80"
    restart: unless-stopped

  nginx-proxy:
    image: nginx:alpine
    ports:
      - "80:80"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf
    depends_on:
      - homepage-config-editor
```

## Platform Support

Both images support multiple architectures:
- `linux/amd64` (Intel/AMD 64-bit)
- `linux/arm64` (ARM 64-bit, Apple M1/M2, ARM servers)
- `linux/arm/v7` (32-bit ARM, Raspberry Pi) - Docker Hub only

## Kubernetes Deployment

### Full Server Deployment
```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: homepage-config-editor
spec:
  replicas: 1
  selector:
    matchLabels:
      app: homepage-config-editor
  template:
    metadata:
      labels:
        app: homepage-config-editor
    spec:
      containers:
      - name: homepage-config-editor
        image: hoiber/homepage-config-editor:latest
        ports:
        - containerPort: 3001
        env:
        - name: ENABLE_LIVE_UPDATES
          value: "true"
        volumeMounts:
        - name: config-volume
          mountPath: /config
      volumes:
      - name: config-volume
        persistentVolumeClaim:
          claimName: homepage-config-pvc
---
apiVersion: v1
kind: Service
metadata:
  name: homepage-config-editor-service
spec:
  selector:
    app: homepage-config-editor
  ports:
  - protocol: TCP
    port: 3001
    targetPort: 3001
  type: LoadBalancer
```

### Static Deployment with Ingress
```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: homepage-config-static
spec:
  replicas: 3
  selector:
    matchLabels:
      app: homepage-config-static
  template:
    metadata:
      labels:
        app: homepage-config-static
    spec:
      containers:
      - name: homepage-config-static
        image: hoiber/homepage-config-editor:static
        ports:
        - containerPort: 80
---
apiVersion: v1
kind: Service
metadata:
  name: homepage-config-static-service
spec:
  selector:
    app: homepage-config-static
  ports:
  - protocol: TCP
    port: 80
    targetPort: 80
---
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: homepage-config-ingress
spec:
  rules:
  - host: homepage-config.example.com
    http:
      paths:
      - path: /
        pathType: Prefix
        backend:
          service:
            name: homepage-config-static-service
            port:
              number: 80
```

## Building Locally

### Full Server Image
```bash
cd homepage-config-gui
docker build -t homepage-config-editor:latest .
```

### Static Image
```bash
cd homepage-config-gui
docker build -f Dockerfile.static -t homepage-config-editor:static .
```

## Troubleshooting

### Common Issues

1. **Permission Issues with Config Directory**
   ```bash
   # Fix permissions
   chmod -R 755 /path/to/config
   chown -R 1000:1000 /path/to/config
   ```

2. **Live Updates Not Working**
   - Ensure `ENABLE_LIVE_UPDATES=true`
   - Check volume mount is correct
   - Verify config files are writable

3. **Static Build Not Loading**
   - Check if running on correct port (80)
   - Verify no reverse proxy conflicts

### Health Checks

#### Full Server
```bash
# Check if server is running
curl http://localhost:3001/health

# Check API endpoint
curl http://localhost:3001/api/services
```

#### Static Build
```bash
# Check if Nginx is serving
curl http://localhost:8080/
```

## Security Considerations

1. **Production Deployment**
   - Use static image for production when possible
   - Run containers as non-root user
   - Use read-only file systems where applicable

2. **Config Directory Security**
   - Set appropriate file permissions
   - Use secrets management for sensitive data
   - Consider using init containers for config setup

3. **Network Security**
   - Use internal networks in Docker Compose
   - Implement proper ingress controls in Kubernetes
   - Consider TLS termination at load balancer

## Support

For issues and questions:
- GitHub Issues: [homepage-config-editor/issues](https://github.com/thomas/homepage-config-editor/issues)
- Docker Hub: [hoiber/homepage-config-editor](https://hub.docker.com/r/hoiber/homepage-config-editor)
- GHCR: [ghcr.io/hoiber/homepage-config-editor](https://github.com/hoiber/homepage-config-editor/pkgs/container/homepage-config-editor)