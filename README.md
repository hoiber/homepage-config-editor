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
