import { useState } from 'react';
import { Plus, Download, Trash2, Copy, Home, Settings, Upload, ChevronUp, ChevronDown } from 'lucide-react';

const HomepageConfigGUI = () => {
  const [selectedQuickAdd, setSelectedQuickAdd] = useState({});
  const [importError, setImportError] = useState('');
  const [importSuccess, setImportSuccess] = useState('');
  
  const commonServices = {
    // Media Servers & Streaming
    plex: {
      name: 'Plex',
      href: 'http://localhost:32400',
      description: 'Media streaming server',
      icon: 'plex',
      widget: { type: 'plex', url: 'http://localhost:32400', key: 'your-plex-token' }
    },
    sonarr: {
      name: 'Sonarr',
      href: 'http://localhost:8989',
      description: 'TV series management',
      icon: 'sonarr',
      widget: { type: 'sonarr', url: 'http://localhost:8989', key: 'your-api-key' }
    },
    radarr: {
      name: 'Radarr',
      href: 'http://localhost:7878',
      description: 'Movie collection manager',
      icon: 'radarr',
      widget: { type: 'radarr', url: 'http://localhost:7878', key: 'your-api-key' }
    },
    lidarr: {
      name: 'Lidarr',
      href: 'http://localhost:8686',
      description: 'Music collection manager',
      icon: 'lidarr',
      widget: { type: 'lidarr', url: 'http://localhost:8686', key: 'your-api-key' }
    },
    prowlarr: {
      name: 'Prowlarr',
      href: 'http://localhost:9696',
      description: 'Indexer manager',
      icon: 'prowlarr',
      widget: { type: 'prowlarr', url: 'http://localhost:9696', key: 'your-api-key' }
    },
    bazarr: {
      name: 'Bazarr',
      href: 'http://localhost:6767',
      description: 'Subtitle management',
      icon: 'bazarr',
      widget: { type: 'bazarr', url: 'http://localhost:6767', key: 'your-api-key' }
    },
    jellyfin: {
      name: 'Jellyfin',
      href: 'http://localhost:8096',
      description: 'Free media streaming',
      icon: 'jellyfin',
      widget: { type: 'jellyfin', url: 'http://localhost:8096', key: 'your-api-key' }
    },
    portainer: {
      name: 'Portainer',
      href: 'http://localhost:9000',
      description: 'Docker management',
      icon: 'portainer',
      widget: { type: 'portainer', url: 'http://localhost:9000', key: 'your-api-key' }
    },
    traefik: {
      name: 'Traefik',
      href: 'http://localhost:8080',
      description: 'Reverse proxy dashboard',
      icon: 'traefik',
      widget: { type: 'traefik', url: 'http://localhost:8080', key: '' }
    },
    qbittorrent: {
      name: 'qBittorrent',
      href: 'http://localhost:8080',
      description: 'BitTorrent client',
      icon: 'qbittorrent',
      widget: { type: 'qbittorrent', url: 'http://localhost:8080', key: '' }
    },
    sabnzbd: {
      name: 'SABnzbd',
      href: 'http://localhost:8080',
      description: 'Usenet downloader',
      icon: 'sabnzbd',
      widget: { type: 'sabnzbd', url: 'http://localhost:8080', key: 'your-api-key' }
    },
    grafana: {
      name: 'Grafana',
      href: 'http://localhost:3000',
      description: 'Monitoring dashboards',
      icon: 'grafana',
      widget: { type: 'grafana', url: 'http://localhost:3000', key: 'your-api-key' }
    },
    homeassistant: {
      name: 'Home Assistant',
      href: 'http://localhost:8123',
      description: 'Home automation',
      icon: 'homeassistant',
      widget: { type: 'homeassistant', url: 'http://localhost:8123', key: 'your-long-lived-token' }
    },
    uptimekuma: {
      name: 'Uptime Kuma',
      href: 'http://localhost:3001',
      description: 'Uptime monitoring',
      icon: 'uptime-kuma',
      widget: { type: 'uptimekuma', url: 'http://localhost:3001', key: 'your-api-key' }
    },
    tautulli: {
      name: 'Tautulli',
      href: 'http://localhost:8181',
      description: 'Plex monitoring',
      icon: 'tautulli',
      widget: { type: 'tautulli', url: 'http://localhost:8181', key: 'your-api-key' }
    },
    overseerr: {
      name: 'Overseerr',
      href: 'http://localhost:5055',
      description: 'Media request management',
      icon: 'overseerr',
      widget: { type: 'overseerr', url: 'http://localhost:5055', key: 'your-api-key' }
    },
    adguard: {
      name: 'AdGuard Home',
      href: 'http://localhost:3000',
      description: 'Network-wide ad blocking',
      icon: 'adguard-home',
      widget: { type: 'adguard', url: 'http://localhost:3000', key: '' }
    },
    nginxpm: {
      name: 'Nginx Proxy Manager',
      href: 'http://localhost:81',
      description: 'Reverse proxy management',
      icon: 'nginx-proxy-manager',
      widget: { type: 'npm', url: 'http://localhost:81', key: '' }
    },
    nextcloud: {
      name: 'Nextcloud',
      href: 'http://localhost:8080',
      description: 'Personal cloud storage',
      icon: 'nextcloud',
      widget: { type: 'nextcloud', url: 'http://localhost:8080', key: 'your-api-key' }
    },
    gitea: {
      name: 'Gitea',
      href: 'http://localhost:3000',
      description: 'Git service',
      icon: 'gitea',
      widget: { type: 'gitea', url: 'http://localhost:3000', key: 'your-api-key' }
    },
    transmission: {
      name: 'Transmission',
      href: 'http://localhost:9091',
      description: 'BitTorrent client',
      icon: 'transmission',
      widget: { type: 'transmission', url: 'http://localhost:9091', key: '' }
    },
    deluge: {
      name: 'Deluge',
      href: 'http://localhost:8112',
      description: 'BitTorrent client',
      icon: 'deluge',
      widget: { type: 'deluge', url: 'http://localhost:8112', key: 'your-password' }
    },
    ombi: {
      name: 'Ombi',
      href: 'http://localhost:3579',
      description: 'Media request platform',
      icon: 'ombi',
      widget: { type: 'ombi', url: 'http://localhost:3579', key: 'your-api-key' }
    },
    pihole: {
      name: 'Pi-hole',
      href: 'http://localhost:80/admin',
      description: 'Network-wide ad blocking',
      icon: 'pi-hole',
      widget: { type: 'pihole', url: 'http://localhost:80', key: 'your-api-key' }
    },
    emby: {
      name: 'Emby',
      href: 'http://localhost:8096',
      description: 'Media streaming server',
      icon: 'emby',
      widget: { type: 'emby', url: 'http://localhost:8096', key: 'your-api-key' }
    },
    authentik: {
      name: 'Authentik',
      href: 'http://localhost:9000',
      description: 'Identity provider',
      icon: 'authentik',
      widget: { type: 'authentik', url: 'http://localhost:9000', key: 'your-api-key' }
    },
    readarr: {
      name: 'Readarr',
      href: 'http://localhost:8787',
      description: 'Book collection manager',
      icon: 'readarr',
      widget: { type: 'readarr', url: 'http://localhost:8787', key: 'your-api-key' }
    },
    jackett: {
      name: 'Jackett',
      href: 'http://localhost:9117',
      description: 'Torrent indexer proxy',
      icon: 'jackett',
      widget: { type: 'jackett', url: 'http://localhost:9117', key: 'your-api-key' }
    },
    flaresolverr: {
      name: 'FlareSolverr',
      href: 'http://localhost:8191',
      description: 'Cloudflare solver proxy',
      icon: 'flaresolverr',
      widget: null
    },
    nzbget: {
      name: 'NZBGet',
      href: 'http://localhost:6789',
      description: 'Usenet downloader',
      icon: 'nzbget',
      widget: { type: 'nzbget', url: 'http://localhost:6789', key: '' }
    },
    calibre: {
      name: 'Calibre',
      href: 'http://localhost:8080',
      description: 'E-book management',
      icon: 'calibre',
      widget: { type: 'calibre', url: 'http://localhost:8080', key: '' }
    },
    calibreweb: {
      name: 'Calibre-Web',
      href: 'http://localhost:8083',
      description: 'Web interface for Calibre',
      icon: 'calibre-web',
      widget: { type: 'calibreweb', url: 'http://localhost:8083', key: '' }
    },
    photoprism: {
      name: 'PhotoPrism',
      href: 'http://localhost:2342',
      description: 'Photo management',
      icon: 'photoprism',
      widget: { type: 'photoprism', url: 'http://localhost:2342', key: '' }
    },
    immich: {
      name: 'Immich',
      href: 'http://localhost:2283',
      description: 'Photo and video backup',
      icon: 'immich',
      widget: { type: 'immich', url: 'http://localhost:2283', key: 'your-api-key' }
    },
    filebrowser: {
      name: 'File Browser',
      href: 'http://localhost:8080',
      description: 'Web-based file manager',
      icon: 'filebrowser',
      widget: { type: 'filebrowser', url: 'http://localhost:8080', key: '' }
    },
    duplicati: {
      name: 'Duplicati',
      href: 'http://localhost:8200',
      description: 'Backup solution',
      icon: 'duplicati',
      widget: { type: 'duplicati', url: 'http://localhost:8200', key: '' }
    },
    syncthing: {
      name: 'Syncthing',
      href: 'http://localhost:8384',
      description: 'File synchronization',
      icon: 'syncthing',
      widget: { type: 'syncthing', url: 'http://localhost:8384', key: '' }
    },
    code: {
      name: 'VS Code Server',
      href: 'http://localhost:8080',
      description: 'Web-based code editor',
      icon: 'code-server',
      widget: null
    },
    docker: {
      name: 'Docker',
      href: 'http://localhost:2375',
      description: 'Container engine',
      icon: 'docker',
      widget: { type: 'docker', url: 'unix:///var/run/docker.sock', key: '' }
    },
    yacht: {
      name: 'Yacht',
      href: 'http://localhost:8000',
      description: 'Docker web UI',
      icon: 'yacht',
      widget: null
    },
    prometheus: {
      name: 'Prometheus',
      href: 'http://localhost:9090',
      description: 'Monitoring system',
      icon: 'prometheus',
      widget: { type: 'prometheus', url: 'http://localhost:9090', key: '' }
    },
    influxdb: {
      name: 'InfluxDB',
      href: 'http://localhost:8086',
      description: 'Time series database',
      icon: 'influxdb',
      widget: { type: 'influxdb', url: 'http://localhost:8086', key: 'your-token' }
    },
    unifi: {
      name: 'UniFi Controller',
      href: 'https://localhost:8443',
      description: 'Network management',
      icon: 'unifi',
      widget: { type: 'unifi', url: 'https://localhost:8443', key: 'your-username-password' }
    },
    opnsense: {
      name: 'OPNsense',
      href: 'https://localhost:443',
      description: 'Firewall and router',
      icon: 'opnsense',
      widget: { type: 'opnsense', url: 'https://localhost:443', key: 'your-api-key' }
    },
    pfsense: {
      name: 'pfSense',
      href: 'https://localhost:443',
      description: 'Firewall and router',
      icon: 'pfsense',
      widget: { type: 'pfsense', url: 'https://localhost:443', key: '' }
    },
    wireguard: {
      name: 'WireGuard',
      href: 'http://localhost:51820',
      description: 'VPN server',
      icon: 'wireguard',
      widget: { type: 'wireguard', url: 'http://localhost:51820', key: '' }
    },
    openvpn: {
      name: 'OpenVPN',
      href: 'http://localhost:943',
      description: 'VPN server',
      icon: 'openvpn',
      widget: null
    },
    unbound: {
      name: 'Unbound',
      href: 'http://localhost:5053',
      description: 'DNS resolver',
      icon: 'unbound',
      widget: { type: 'unbound', url: 'http://localhost:5053', key: '' }
    },
    bind9: {
      name: 'BIND9',
      href: 'http://localhost:953',
      description: 'DNS server',
      icon: 'bind9',
      widget: null
    },
    truenas: {
      name: 'TrueNAS',
      href: 'https://localhost:443',
      description: 'Network storage',
      icon: 'truenas',
      widget: { type: 'truenas', url: 'https://localhost:443', key: 'your-api-key' }
    },
    freenas: {
      name: 'FreeNAS',
      href: 'https://localhost:443',
      description: 'Network storage',
      icon: 'freenas',
      widget: null
    },
    omv: {
      name: 'OpenMediaVault',
      href: 'http://localhost:80',
      description: 'NAS solution',
      icon: 'openmediavault',
      widget: { type: 'openmediavault', url: 'http://localhost:80', key: '' }
    },
    postgres: {
      name: 'PostgreSQL',
      href: 'http://localhost:5432',
      description: 'Database server',
      icon: 'postgres',
      widget: { type: 'postgres', url: 'postgres://localhost:5432', key: '' }
    },
    mysql: {
      name: 'MySQL',
      href: 'http://localhost:3306',
      description: 'Database server',
      icon: 'mysql',
      widget: { type: 'mysql', url: 'mysql://localhost:3306', key: '' }
    },
    phpmyadmin: {
      name: 'phpMyAdmin',
      href: 'http://localhost:8080',
      description: 'MySQL web interface',
      icon: 'phpmyadmin',
      widget: null
    },
    pgadmin: {
      name: 'pgAdmin',
      href: 'http://localhost:5050',
      description: 'PostgreSQL web interface',
      icon: 'pgadmin',
      widget: null
    },
    redis: {
      name: 'Redis',
      href: 'http://localhost:6379',
      description: 'In-memory database',
      icon: 'redis',
      widget: { type: 'redis', url: 'redis://localhost:6379', key: '' }
    },
    mongodb: {
      name: 'MongoDB',
      href: 'http://localhost:27017',
      description: 'NoSQL database',
      icon: 'mongodb',
      widget: { type: 'mongodb', url: 'mongodb://localhost:27017', key: '' }
    },
    bookstack: {
      name: 'BookStack',
      href: 'http://localhost:8080',
      description: 'Wiki platform',
      icon: 'bookstack',
      widget: { type: 'bookstack', url: 'http://localhost:8080', key: 'your-api-key' }
    },
    outline: {
      name: 'Outline',
      href: 'http://localhost:3000',
      description: 'Team wiki',
      icon: 'outline',
      widget: null
    },
    wikijs: {
      name: 'Wiki.js',
      href: 'http://localhost:3000',
      description: 'Modern wiki app',
      icon: 'wikijs',
      widget: { type: 'wikijs', url: 'http://localhost:3000', key: 'your-api-key' }
    },
    joplin: {
      name: 'Joplin Server',
      href: 'http://localhost:22300',
      description: 'Note taking sync',
      icon: 'joplin',
      widget: null
    },
    trilium: {
      name: 'Trilium',
      href: 'http://localhost:8080',
      description: 'Hierarchical note taking',
      icon: 'trilium',
      widget: null
    },
    wallabag: {
      name: 'Wallabag',
      href: 'http://localhost:8080',
      description: 'Read-it-later app',
      icon: 'wallabag',
      widget: { type: 'wallabag', url: 'http://localhost:8080', key: 'your-api-key' }
    },
    shiori: {
      name: 'Shiori',
      href: 'http://localhost:8080',
      description: 'Bookmark manager',
      icon: 'shiori',
      widget: null
    },
    mattermost: {
      name: 'Mattermost',
      href: 'http://localhost:8065',
      description: 'Team communication',
      icon: 'mattermost',
      widget: { type: 'mattermost', url: 'http://localhost:8065', key: 'your-token' }
    },
    rocket: {
      name: 'Rocket.Chat',
      href: 'http://localhost:3000',
      description: 'Team chat platform',
      icon: 'rocketchat',
      widget: null
    },
    matrix: {
      name: 'Matrix Synapse',
      href: 'http://localhost:8008',
      description: 'Decentralized chat',
      icon: 'matrix',
      widget: null
    },
    element: {
      name: 'Element',
      href: 'http://localhost:8080',
      description: 'Matrix web client',
      icon: 'element',
      widget: null
    },
    mailcow: {
      name: 'Mailcow',
      href: 'https://localhost:443',
      description: 'Mail server suite',
      icon: 'mailcow',
      widget: { type: 'mailcow', url: 'https://localhost:443', key: 'your-api-key' }
    },
    roundcube: {
      name: 'Roundcube',
      href: 'http://localhost:8080',
      description: 'Webmail interface',
      icon: 'roundcube',
      widget: null
    },
    changedetection: {
      name: 'ChangeDetection',
      href: 'http://localhost:5000',
      description: 'Website change monitor',
      icon: 'changedetection-io',
      widget: { type: 'changedetection', url: 'http://localhost:5000', key: 'your-api-key' }
    },
    upsnap: {
      name: 'Upsnap',
      href: 'http://localhost:8090',
      description: 'Network scanner',
      icon: 'upsnap',
      widget: null
    },
    speedtest: {
      name: 'LibreSpeed',
      href: 'http://localhost:80',
      description: 'Internet speed test',
      icon: 'librespeed',
      widget: { type: 'speedtest', url: 'http://localhost:80', key: '' }
    },
    smokeping: {
      name: 'SmokePing',
      href: 'http://localhost:80',
      description: 'Network latency monitor',
      icon: 'smokeping',
      widget: { type: 'smokeping', url: 'http://localhost:80', key: '' }
    },
    ntopng: {
      name: 'ntopng',
      href: 'http://localhost:3000',
      description: 'Network traffic monitor',
      icon: 'ntopng',
      widget: null
    },
    netdata: {
      name: 'Netdata',
      href: 'http://localhost:19999',
      description: 'Real-time monitoring',
      icon: 'netdata',
      widget: { type: 'netdata', url: 'http://localhost:19999', key: '' }
    },
    zabbix: {
      name: 'Zabbix',
      href: 'http://localhost:8080',
      description: 'Network monitoring',
      icon: 'zabbix',
      widget: { type: 'zabbix', url: 'http://localhost:8080', key: 'your-token' }
    },
    nodered: {
      name: 'Node-RED',
      href: 'http://localhost:1880',
      description: 'Flow-based programming',
      icon: 'nodered',
      widget: null
    },
    zigbee2mqtt: {
      name: 'Zigbee2MQTT',
      href: 'http://localhost:8080',
      description: 'Zigbee to MQTT bridge',
      icon: 'zigbee2mqtt',
      widget: { type: 'zigbee2mqtt', url: 'http://localhost:8080', key: '' }
    },
    frigate: {
      name: 'Frigate',
      href: 'http://localhost:5000',
      description: 'NVR with AI detection',
      icon: 'frigate',
      widget: { type: 'frigate', url: 'http://localhost:5000', key: '' }
    },
    motioneye: {
      name: 'motionEye',
      href: 'http://localhost:8765',
      description: 'Video surveillance',
      icon: 'motioneye',
      widget: null
    },
    grocy: {
      name: 'Grocy',
      href: 'http://localhost:9283',
      description: 'Household management',
      icon: 'grocy',
      widget: { type: 'grocy', url: 'http://localhost:9283', key: 'your-api-key' }
    },
    paperlessngx: {
      name: 'Paperless-ngx',
      href: 'http://localhost:8000',
      description: 'Document management',
      icon: 'paperless',
      widget: { type: 'paperlessngx', url: 'http://localhost:8000', key: 'your-token' }
    },
    recipes: {
      name: 'Tandoor Recipes',
      href: 'http://localhost:8080',
      description: 'Recipe manager',
      icon: 'tandoor',
      widget: null
    },
    mealie: {
      name: 'Mealie',
      href: 'http://localhost:9925',
      description: 'Recipe manager',
      icon: 'mealie',
      widget: { type: 'mealie', url: 'http://localhost:9925', key: 'your-api-key' }
    },
    minecraft: {
      name: 'Minecraft Server',
      href: 'http://localhost:25565',
      description: 'Game server',
      icon: 'minecraft',
      widget: { type: 'minecraft', url: 'localhost:25565', key: '' }
    },
    pterodactyl: {
      name: 'Pterodactyl',
      href: 'http://localhost:80',
      description: 'Game server management',
      icon: 'pterodactyl',
      widget: { type: 'pterodactyl', url: 'http://localhost:80', key: 'your-api-key' }
    },
    // Additional Media & Content Management
    audiobookshelf: {
      name: 'AudioBookshelf',
      href: 'http://localhost:13378',
      description: 'Audiobook and podcast server',
      icon: 'audiobookshelf',
      widget: { type: 'audiobookshelf', url: 'http://localhost:13378', key: 'your-api-key' }
    },
    kavita: {
      name: 'Kavita',
      href: 'http://localhost:5000',
      description: 'Digital library for comics/manga',
      icon: 'kavita',
      widget: { type: 'kavita', url: 'http://localhost:5000', key: 'your-api-key' }
    },
    komga: {
      name: 'Komga',
      href: 'http://localhost:25600',
      description: 'Media server for comics/mangas/BDs',
      icon: 'komga',
      widget: { type: 'komga', url: 'http://localhost:25600', key: 'your-api-key' }
    },
    tubearchivist: {
      name: 'TubeArchivist',
      href: 'http://localhost:8000',
      description: 'YouTube archival made simple',
      icon: 'tubearchivist',
      widget: { type: 'tubearchivist', url: 'http://localhost:8000', key: 'your-api-key' }
    },
    // Request Management
    jellyseerr: {
      name: 'Jellyseerr',
      href: 'http://localhost:5055',
      description: 'Media request management for Jellyfin',
      icon: 'jellyseerr',
      widget: { type: 'jellyseerr', url: 'http://localhost:5055', key: 'your-api-key' }
    },
    // Additional Download Clients
    rutorrent: {
      name: 'ruTorrent',
      href: 'http://localhost:8080',
      description: 'Web interface for rTorrent',
      icon: 'rutorrent',
      widget: { type: 'rutorrent', url: 'http://localhost:8080', key: '' }
    },
    flood: {
      name: 'Flood',
      href: 'http://localhost:3000',
      description: 'Modern web UI for rTorrent',
      icon: 'flood',
      widget: { type: 'flood', url: 'http://localhost:3000', key: '' }
    },
    jdownloader: {
      name: 'JDownloader',
      href: 'http://localhost:5800',
      description: 'Download management tool',
      icon: 'jdownloader',
      widget: { type: 'jdownloader', url: 'http://localhost:5800', key: '' }
    },
    pyload: {
      name: 'pyLoad',
      href: 'http://localhost:8000',
      description: 'Free and open source download manager',
      icon: 'pyload',
      widget: { type: 'pyload', url: 'http://localhost:8000', key: 'your-api-key' }
    },
    // System Monitoring & Management
    glances: {
      name: 'Glances',
      href: 'http://localhost:61208',
      description: 'System monitoring tool',
      icon: 'glances',
      widget: { type: 'glances', url: 'http://localhost:61208', key: '' }
    },
    scrutiny: {
      name: 'Scrutiny',
      href: 'http://localhost:8080',
      description: 'Hard drive health dashboard',
      icon: 'scrutiny',
      widget: { type: 'scrutiny', url: 'http://localhost:8080', key: '' }
    },
    healthchecks: {
      name: 'Healthchecks.io',
      href: 'http://localhost:8000',
      description: 'Cron job monitoring',
      icon: 'healthchecks',
      widget: { type: 'healthchecks', url: 'http://localhost:8000', key: 'your-api-key' }
    },
    watchtower: {
      name: 'Watchtower',
      href: 'http://localhost:8080',
      description: 'Auto-update containers',
      icon: 'watchtower',
      widget: { type: 'watchtower', url: 'http://localhost:8080', key: '' }
    },
    gatus: {
      name: 'Gatus',
      href: 'http://localhost:8080',
      description: 'Automated service health dashboard',
      icon: 'gatus',
      widget: { type: 'gatus', url: 'http://localhost:8080', key: '' }
    },
    // Networking & VPN
    cloudflared: {
      name: 'Cloudflared',
      href: 'http://localhost:8080',
      description: 'Cloudflare tunnel',
      icon: 'cloudflared',
      widget: { type: 'cloudflared', url: 'http://localhost:8080', key: 'your-account-id' }
    },
    tailscale: {
      name: 'Tailscale',
      href: 'http://localhost:8080',
      description: 'VPN service',
      icon: 'tailscale',
      widget: { type: 'tailscale', url: 'http://localhost:8080', key: 'your-api-key' }
    },
    headscale: {
      name: 'Headscale',
      href: 'http://localhost:8080',
      description: 'Self-hosted Tailscale control server',
      icon: 'headscale',
      widget: { type: 'headscale', url: 'http://localhost:8080', key: 'your-api-key' }
    },
    gluetun: {
      name: 'Gluetun',
      href: 'http://localhost:8080',
      description: 'VPN client in a thin Docker container',
      icon: 'gluetun',
      widget: { type: 'gluetun', url: 'http://localhost:8080', key: '' }
    },
    // Additional Monitoring Tools
    beszel: {
      name: 'Beszel',
      href: 'http://localhost:8090',
      description: 'Lightweight server monitoring',
      icon: 'beszel',
      widget: { type: 'beszel', url: 'http://localhost:8090', key: 'your-api-key' }
    },
    checkmk: {
      name: 'Checkmk',
      href: 'http://localhost:5000',
      description: 'IT infrastructure monitoring',
      icon: 'checkmk',
      widget: { type: 'checkmk', url: 'http://localhost:5000', key: 'your-api-key' }
    },
    // Home Automation Extensions
    esphome: {
      name: 'ESPHome',
      href: 'http://localhost:6052',
      description: 'ESP device management',
      icon: 'esphome',
      widget: { type: 'esphome', url: 'http://localhost:6052', key: '' }
    },
    homebridge: {
      name: 'Homebridge',
      href: 'http://localhost:8581',
      description: 'HomeKit bridge',
      icon: 'homebridge',
      widget: { type: 'homebridge', url: 'http://localhost:8581', key: 'your-api-key' }
    },
    evcc: {
      name: 'EVCC',
      href: 'http://localhost:7070',
      description: 'EV charging controller',
      icon: 'evcc',
      widget: { type: 'evcc', url: 'http://localhost:7070', key: '' }
    },
    // Development & Version Control
    gitlab: {
      name: 'GitLab',
      href: 'http://localhost:80',
      description: 'DevOps platform',
      icon: 'gitlab',
      widget: { type: 'gitlab', url: 'http://localhost:80', key: 'your-api-key' }
    },
    // Communication & Notifications
    gotify: {
      name: 'Gotify',
      href: 'http://localhost:80',
      description: 'Self-hosted push notifications',
      icon: 'gotify',
      widget: { type: 'gotify', url: 'http://localhost:80', key: 'your-api-key' }
    },
    mastodon: {
      name: 'Mastodon',
      href: 'http://localhost:3000',
      description: 'Decentralized social network',
      icon: 'mastodon',
      widget: { type: 'mastodon', url: 'http://localhost:3000', key: 'your-api-key' }
    },
    // Additional Storage & Backup
    kopia: {
      name: 'Kopia',
      href: 'http://localhost:51515',
      description: 'Cross-platform backup tool',
      icon: 'kopia',
      widget: { type: 'kopia', url: 'http://localhost:51515', key: '' }
    },
    urbackup: {
      name: 'UrBackup',
      href: 'http://localhost:55414',
      description: 'Client/server backup system',
      icon: 'urbackup',
      widget: { type: 'urbackup', url: 'http://localhost:55414', key: '' }
    },
    // Additional Web Apps
    linkwarden: {
      name: 'LinkWarden',
      href: 'http://localhost:3000',
      description: 'Bookmark manager',
      icon: 'linkwarden',
      widget: { type: 'linkwarden', url: 'http://localhost:3000', key: 'your-api-key' }
    },
    miniflux: {
      name: 'Miniflux',
      href: 'http://localhost:8080',
      description: 'Minimalist RSS reader',
      icon: 'miniflux',
      widget: { type: 'miniflux', url: 'http://localhost:8080', key: 'your-api-key' }
    },
    freshrss: {
      name: 'FreshRSS',
      href: 'http://localhost:8080',
      description: 'RSS aggregator',
      icon: 'freshrss',
      widget: { type: 'freshrss', url: 'http://localhost:8080', key: 'your-api-key' }
    },
    // Finance & Personal Management
    firefly: {
      name: 'Firefly III',
      href: 'http://localhost:8080',
      description: 'Personal finance manager',
      icon: 'firefly',
      widget: { type: 'firefly', url: 'http://localhost:8080', key: 'your-api-key' }
    },
    ghostfolio: {
      name: 'Ghostfolio',
      href: 'http://localhost:3333',
      description: 'Portfolio tracker',
      icon: 'ghostfolio',
      widget: { type: 'ghostfolio', url: 'http://localhost:3333', key: 'your-api-key' }
    },
    // Additional Security
    crowdsec: {
      name: 'CrowdSec',
      href: 'http://localhost:8080',
      description: 'Collaborative security',
      icon: 'crowdsec',
      widget: { type: 'crowdsec', url: 'http://localhost:8080', key: 'your-api-key' }
    },
    // Task & Project Management
    vikunja: {
      name: 'Vikunja',
      href: 'http://localhost:3456',
      description: 'To-do app & project management',
      icon: 'vikunja',
      widget: { type: 'vikunja', url: 'http://localhost:3456', key: 'your-api-key' }
    },
    // Media Processing
    tdarr: {
      name: 'Tdarr',
      href: 'http://localhost:8265',
      description: 'Audio/video library transcoding',
      icon: 'tdarr',
      widget: { type: 'tdarr', url: 'http://localhost:8265', key: '' }
    },
    unmanic: {
      name: 'Unmanic',
      href: 'http://localhost:8888',
      description: 'Library optimizer',
      icon: 'unmanic',
      widget: { type: 'unmanic', url: 'http://localhost:8888', key: '' }
    },
    fileflows: {
      name: 'FileFlows',
      href: 'http://localhost:5000',
      description: 'File processing automation',
      icon: 'fileflows',
      widget: { type: 'fileflows', url: 'http://localhost:5000', key: '' }
    },
    // Additional NAS & Storage
    diskstation: {
      name: 'Synology DiskStation',
      href: 'http://localhost:5000',
      description: 'Synology NAS management',
      icon: 'diskstation',
      widget: { type: 'diskstation', url: 'http://localhost:5000', key: 'your-api-key' }
    },
    qnap: {
      name: 'QNAP',
      href: 'http://localhost:8080',
      description: 'QNAP NAS management',
      icon: 'qnap',
      widget: { type: 'qnap', url: 'http://localhost:8080', key: 'your-api-key' }
    },
    // Password & Identity Management
    vaultwarden: {
      name: 'Vaultwarden',
      href: 'http://localhost:80',
      description: 'Password manager',
      icon: 'bitwarden',
      widget: { type: 'vaultwarden', url: 'http://localhost:80', key: '' }
    },
    // 3D Printing
    moonraker: {
      name: 'Moonraker',
      href: 'http://localhost:7125',
      description: 'Klipper API server',
      icon: 'moonraker',
      widget: { type: 'moonraker', url: 'http://localhost:7125', key: '' }
    },
    octoprint: {
      name: 'OctoPrint',
      href: 'http://localhost:5000',
      description: '3D printer web interface',
      icon: 'octoprint',
      widget: { type: 'octoprint', url: 'http://localhost:5000', key: 'your-api-key' }
    }
  };

  const [config, setConfig] = useState({
    groups: [
      {
        id: 'group1',
        name: 'Development',
        services: [
          {
            id: 'service1',
            name: 'GitLab',
            href: 'http://localhost:8080',
            description: 'Git repository management',
            icon: 'gitlab',
            widget: null
          }
        ]
      }
    ]
  });

  const [editingGroup, setEditingGroup] = useState(null);
  const [editingService, setEditingService] = useState(null);

  const addGroup = () => {
    const newGroup = {
      id: `group${Date.now()}_${Math.random().toString(36).substring(2, 11)}`,
      name: 'New Group',
      services: []
    };
    setConfig(prev => ({
      ...prev,
      groups: [...prev.groups, newGroup]
    }));
    setEditingGroup(newGroup.id);
  };

  const addService = (groupId, quickService = null) => {
    const newService = quickService ? {
      id: `service${Date.now()}_${Math.random().toString(36).substring(2, 11)}`,
      ...quickService
    } : {
      id: `service${Date.now()}_${Math.random().toString(36).substring(2, 11)}`,
      name: 'New Service',
      href: 'http://localhost:3000',
      description: '',
      icon: '',
      widget: null
    };
    
    setConfig(prev => ({
      ...prev,
      groups: prev.groups.map(group =>
        group.id === groupId
          ? { ...group, services: [...group.services, newService] }
          : group
      )
    }));
    if (!quickService) setEditingService(newService.id);
  };

  const quickAddService = (groupId) => {
    const selectedService = selectedQuickAdd[groupId];
    if (selectedService && commonServices[selectedService]) {
      addService(groupId, commonServices[selectedService]);
      setSelectedQuickAdd(prev => ({ ...prev, [groupId]: '' }));
    }
  };

  const updateGroup = (groupId, updates) => {
    setConfig(prev => ({
      ...prev,
      groups: prev.groups.map(group =>
        group.id === groupId ? { ...group, ...updates } : group
      )
    }));
  };

  const updateService = (serviceId, updates) => {
    setConfig(prev => ({
      ...prev,
      groups: prev.groups.map(group => ({
        ...group,
        services: group.services.map(service =>
          service.id === serviceId ? { ...service, ...updates } : service
        )
      }))
    }));
  };

  const deleteGroup = (groupId) => {
    setConfig(prev => ({
      ...prev,
      groups: prev.groups.filter(group => group.id !== groupId)
    }));
  };

  const deleteService = (serviceId) => {
    setConfig(prev => ({
      ...prev,
      groups: prev.groups.map(group => ({
        ...group,
        services: group.services.filter(service => service.id !== serviceId)
      }))
    }));
  };

  const parseYAML = (yamlContent) => {
    const lines = yamlContent.split('\n');
    const groups = [];
    let currentGroup = null;
    let currentService = null;
    let inWidget = false;

    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) continue;

      if (line.startsWith('- ') && line.includes(':') && !line.startsWith('  ')) {
        // New group
        const groupName = line.substring(2).replace(':', '').trim();
        if (groupName) {
          currentGroup = {
            id: `group${Date.now()}_${Math.random().toString(36).substring(2, 11)}`,
            name: groupName,
            services: []
          };
          groups.push(currentGroup);
          inWidget = false;
        }
      } else if (line.startsWith('  - ') && line.includes(':')) {
        // New service
        const serviceName = line.substring(4).replace(':', '').trim();
        if (serviceName && currentGroup) {
          currentService = {
            id: `service${Date.now()}_${Math.random().toString(36).substring(2, 11)}`,
            name: serviceName,
            href: '',
            description: '',
            icon: '',
            widget: null
          };
          currentGroup.services.push(currentService);
          inWidget = false;
        }
      } else if (line.includes('href:') && currentService) {
        const hrefValue = line.split('href:')[1]?.trim();
        if (hrefValue) currentService.href = hrefValue;
      } else if (line.includes('description:') && currentService) {
        const descValue = line.split('description:')[1]?.trim();
        if (descValue) currentService.description = descValue;
      } else if (line.includes('icon:') && currentService) {
        const iconValue = line.split('icon:')[1]?.trim();
        if (iconValue) currentService.icon = iconValue;
      } else if (line.includes('widget:') && currentService) {
        currentService.widget = { type: '', url: '', key: '' };
        inWidget = true;
      } else if (inWidget && currentService && currentService.widget) {
        if (line.includes('type:')) {
          const typeValue = line.split('type:')[1]?.trim();
          if (typeValue) currentService.widget.type = typeValue;
        } else if (line.includes('url:')) {
          const urlValue = line.split('url:')[1]?.trim();
          if (urlValue) currentService.widget.url = urlValue;
        } else if (line.includes('key:')) {
          const keyValue = line.split('key:')[1]?.trim();
          if (keyValue) currentService.widget.key = keyValue;
        }
      }
    }

    return groups;
  };

  const importConfig = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // Validate file type
    if (!file.name.toLowerCase().endsWith('.yaml') && !file.name.toLowerCase().endsWith('.yml')) {
      setImportError('Please select a valid YAML file (.yaml or .yml)');
      setImportSuccess('');
      event.target.value = '';
      return;
    }

    // Validate file size (max 1MB)
    if (file.size > 1024 * 1024) {
      setImportError('File size too large. Please select a file smaller than 1MB.');
      setImportSuccess('');
      event.target.value = '';
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const yamlContent = e.target.result;
        if (!yamlContent || typeof yamlContent !== 'string') {
          throw new Error('Invalid file content');
        }
        
        const importedGroups = parseYAML(yamlContent);
        
        if (importedGroups && importedGroups.length > 0) {
          setConfig({ groups: importedGroups });
          setImportError('');
          setImportSuccess(`Successfully imported ${importedGroups.length} group(s) with ${importedGroups.reduce((total, group) => total + group.services.length, 0)} service(s)`);
          setTimeout(() => setImportSuccess(''), 5000);
        } else {
          setImportError('No valid groups found in the YAML file');
          setImportSuccess('');
        }
      } catch (error) {
        setImportError(`Error parsing YAML: ${error.message || 'Unknown error'}`);
        setImportSuccess('');
      }
    };
    
    reader.onerror = () => {
      setImportError('Error reading file. Please try again.');
      setImportSuccess('');
    };
    
    reader.readAsText(file);
    
    // Reset file input
    event.target.value = '';
  };

  const triggerImport = () => {
    document.getElementById('yaml-import').click();
  };

  const moveServiceUp = (groupId, serviceId) => {
    setConfig(prev => ({
      ...prev,
      groups: prev.groups.map(group => {
        if (group.id === groupId) {
          const serviceIndex = group.services.findIndex(s => s.id === serviceId);
          if (serviceIndex > 0) {
            const newServices = [...group.services];
            [newServices[serviceIndex - 1], newServices[serviceIndex]] = 
            [newServices[serviceIndex], newServices[serviceIndex - 1]];
            return { ...group, services: newServices };
          }
        }
        return group;
      })
    }));
  };

  const moveServiceDown = (groupId, serviceId) => {
    setConfig(prev => ({
      ...prev,
      groups: prev.groups.map(group => {
        if (group.id === groupId) {
          const serviceIndex = group.services.findIndex(s => s.id === serviceId);
          if (serviceIndex < group.services.length - 1) {
            const newServices = [...group.services];
            [newServices[serviceIndex], newServices[serviceIndex + 1]] = 
            [newServices[serviceIndex + 1], newServices[serviceIndex]];
            return { ...group, services: newServices };
          }
        }
        return group;
      })
    }));
  };

  const moveGroupUp = (groupId) => {
    setConfig(prev => {
      const groupIndex = prev.groups.findIndex(g => g.id === groupId);
      if (groupIndex > 0) {
        const newGroups = [...prev.groups];
        [newGroups[groupIndex - 1], newGroups[groupIndex]] = 
        [newGroups[groupIndex], newGroups[groupIndex - 1]];
        return { ...prev, groups: newGroups };
      }
      return prev;
    });
  };

  const moveGroupDown = (groupId) => {
    setConfig(prev => {
      const groupIndex = prev.groups.findIndex(g => g.id === groupId);
      if (groupIndex < prev.groups.length - 1) {
        const newGroups = [...prev.groups];
        [newGroups[groupIndex], newGroups[groupIndex + 1]] = 
        [newGroups[groupIndex + 1], newGroups[groupIndex]];
        return { ...prev, groups: newGroups };
      }
      return prev;
    });
  };

  const generateYAML = () => {
    if (!config.groups || config.groups.length === 0) {
      return '';
    }
    
    // Convert to YAML-like string (simplified)
    let yamlStr = '';
    config.groups.forEach((group, groupIndex) => {
      if (!group.name) return;
      
      yamlStr += `- ${group.name}:\n`;
      
      if (group.services && group.services.length > 0) {
        group.services.forEach(service => {
          if (!service.name) return;
          
          yamlStr += `  - ${service.name}:\n`;
          if (service.href) yamlStr += `      href: ${service.href}\n`;
          if (service.description) yamlStr += `      description: ${service.description}\n`;
          if (service.icon) yamlStr += `      icon: ${service.icon}\n`;
          if (service.widget && service.widget.type) {
            yamlStr += `      widget:\n`;
            yamlStr += `        type: ${service.widget.type}\n`;
            if (service.widget.url) yamlStr += `        url: ${service.widget.url}\n`;
            if (service.widget.key) yamlStr += `        key: ${service.widget.key}\n`;
          }
        });
      }
      
      // Add spacing between groups except for the last one
      if (groupIndex < config.groups.length - 1) {
        yamlStr += '\n';
      }
    });

    return yamlStr;
  };

  const downloadConfig = () => {
    const yamlContent = generateYAML();
    const blob = new Blob([yamlContent], { type: 'text/yaml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'services.yaml';
    a.click();
    URL.revokeObjectURL(url);
  };

  const copyToClipboard = async () => {
    try {
      const yamlContent = generateYAML();
      if (!yamlContent) {
        setImportError('No configuration to copy');
        setTimeout(() => setImportError(''), 3000);
        return;
      }
      
      await navigator.clipboard.writeText(yamlContent);
      setImportSuccess('YAML copied to clipboard!');
      setImportError('');
      setTimeout(() => setImportSuccess(''), 3000);
    } catch (error) {
      setImportError('Failed to copy to clipboard');
      setTimeout(() => setImportError(''), 3000);
    }
  };

  const commonWidgetTypes = [
    // Core Media & Arr Stack
    'plex', 'jellyfin', 'emby', 'tautulli', 'sonarr', 'radarr', 'lidarr', 'readarr', 
    'prowlarr', 'bazarr', 'overseerr', 'jellyseerr', 'ombi',
    
    // Download Clients
    'qbittorrent', 'transmission', 'deluge', 'sabnzbd', 'nzbget', 'rutorrent', 
    'flood', 'jdownloader', 'pyload',
    
    // System & Infrastructure
    'portainer', 'traefik', 'nginx', 'docker', 'watchtower', 'yacht',
    
    // Monitoring & Health
    'uptime-kuma', 'uptimerobot', 'grafana', 'prometheus', 'netdata', 'glances',
    'scrutiny', 'healthchecks', 'gatus', 'beszel', 'checkmk',
    
    // Networking & Security
    'adguard', 'pihole', 'cloudflared', 'tailscale', 'headscale', 'gluetun',
    'unifi', 'opnsense', 'pfsense', 'authentik', 'vaultwarden', 'crowdsec',
    
    // Home Automation
    'homeassistant', 'esphome', 'homebridge', 'nodered', 'zigbee2mqtt', 'evcc',
    
    // Media Processing & Management
    'tdarr', 'unmanic', 'fileflows', 'audiobookshelf', 'kavita', 'komga', 
    'tubearchivist', 'calibre-web', 'photoprism', 'immich',
    
    // Storage & NAS
    'truenas', 'freenas', 'openmediavault', 'diskstation', 'qnap', 'nextcloud',
    'filebrowser', 'syncthing', 'duplicati', 'kopia', 'urbackup',
    
    // Development & Git
    'gitea', 'gitlab', 'github', 'jenkins', 'portainer',
    
    // Communication & Social
    'gotify', 'mastodon', 'mattermost', 'rocketchat', 'matrix', 'element',
    
    // Finance & Personal
    'firefly', 'ghostfolio', 'grocy', 'paperlessngx', 'mealie', 'tandoor',
    'vikunja', 'linkwarden', 'wallabag', 'shiori',
    
    // RSS & Reading
    'miniflux', 'freshrss', 'bookstack', 'outline', 'wikijs', 'trilium',
    
    // 3D Printing & IoT
    'moonraker', 'octoprint', 'frigate', 'motioneye',
    
    // Gaming & Entertainment
    'minecraft', 'pterodactyl', 'steam',
    
    // Mail & Web Services
    'mailcow', 'roundcube', 'changedetection', 'upsnap', 'speedtest',
    
    // Databases
    'postgres', 'mysql', 'redis', 'mongodb', 'influxdb',
    
    // Additional Services
    'autobrr', 'jackett', 'flaresolverr', 'code-server', 'smokeping', 'ntopng',
    'zabbix', 'joplin', 'custom'
  ];

  return (
    <div className="min-h-screen bg-slate-900 text-white p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <Home className="h-8 w-8 text-blue-400" />
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Homepage Config Builder
            </h1>
          </div>

        {/* Hidden file input for import */}
        <input
          id="yaml-import"
          type="file"
          accept=".yaml,.yml"
          onChange={importConfig}
          className="hidden"
        />

        {/* Import Success/Error Display */}
        {importSuccess && (
          <div className="mb-6 p-4 bg-green-900/20 border border-green-800 rounded-lg">
            <div className="flex items-center gap-2 text-green-300">
              <span className="font-semibold">Success:</span>
              <span>{importSuccess}</span>
              <button
                onClick={() => setImportSuccess('')}
                className="ml-auto text-green-400 hover:text-green-300"
              >
                ×
              </button>
            </div>
          </div>
        )}
        {importError && (
          <div className="mb-6 p-4 bg-red-900/20 border border-red-800 rounded-lg">
            <div className="flex items-center gap-2 text-red-300">
              <span className="font-semibold">Import Error:</span>
              <span>{importError}</span>
              <button
                onClick={() => setImportError('')}
                className="ml-auto text-red-400 hover:text-red-300"
              >
                ×
              </button>
            </div>
          </div>
        )}
          <div className="flex gap-3">
            <button
              onClick={triggerImport}
              className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg transition-colors"
            >
              <Upload className="h-4 w-4" />
              Import YAML
            </button>
            <button
              onClick={copyToClipboard}
              className="flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
            >
              <Copy className="h-4 w-4" />
              Copy YAML
            </button>
            <button
              onClick={downloadConfig}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
            >
              <Download className="h-4 w-4" />
              Download services.yaml
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          {/* Config Builder */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Service Groups</h2>
              <button
                onClick={addGroup}
                className="flex items-center gap-2 px-3 py-2 bg-green-600 hover:bg-green-700 rounded-lg transition-colors text-sm"
              >
                <Plus className="h-4 w-4" />
                Add Group
              </button>
            </div>

            {config.groups.map((group, groupIndex) => (
              <div key={group.id} className="bg-slate-800 rounded-lg p-4 border border-slate-700">
                {/* Group Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    {editingGroup === group.id ? (
                      <input
                        type="text"
                        value={group.name}
                        onChange={(e) => updateGroup(group.id, { name: e.target.value })}
                        onBlur={() => setEditingGroup(null)}
                        onKeyDown={(e) => e.key === 'Enter' && setEditingGroup(null)}
                        className="bg-slate-700 text-white px-3 py-1 rounded border border-slate-600 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 outline-none transition-all"
                        autoFocus
                      />
                    ) : (
                      <h3
                        className="text-lg font-medium cursor-pointer hover:text-blue-400 transition-colors"
                        onClick={() => setEditingGroup(group.id)}
                      >
                        {group.name}
                      </h3>
                    )}
                  </div>
                  <div className="flex items-center gap-3">
                    {/* Group reorder buttons */}
                    <div className="flex items-center gap-1 bg-purple-900/30 px-2 py-1 rounded border border-purple-700">
                      <span className="text-xs text-purple-300 mr-1">Group:</span>
                      <button
                        onClick={() => moveGroupUp(group.id)}
                        disabled={groupIndex === 0}
                        className={`p-1 rounded transition-all ${
                          groupIndex === 0 
                            ? 'text-slate-500 cursor-not-allowed' 
                            : 'text-purple-300 hover:text-purple-200 hover:bg-purple-800/50'
                        }`}
                        title="Move group up"
                      >
                        <ChevronUp className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => moveGroupDown(group.id)}
                        disabled={groupIndex === config.groups.length - 1}
                        className={`p-1 rounded transition-all ${
                          groupIndex === config.groups.length - 1
                            ? 'text-slate-500 cursor-not-allowed' 
                            : 'text-purple-300 hover:text-purple-200 hover:bg-purple-800/50'
                        }`}
                        title="Move group down"
                      >
                        <ChevronDown className="h-4 w-4" />
                      </button>
                    </div>

                    <div className="h-6 w-px bg-slate-600"></div>
                    
                    <button
                      onClick={() => addService(group.id)}
                      className="p-2 text-green-400 hover:text-green-300 hover:bg-slate-700 rounded transition-all"
                      title="Add custom service"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                    <div className="flex gap-1">
                      <select
                        value={selectedQuickAdd[group.id] || ''}
                        onChange={(e) => setSelectedQuickAdd(prev => ({ ...prev, [group.id]: e.target.value }))}
                        className="bg-slate-600 text-white text-xs px-2 py-1 rounded border border-slate-500 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 outline-none transition-all"
                      >
                        <option value="">Quick add...</option>
                        {Object.entries(commonServices)
                          .sort(([,a], [,b]) => a.name.localeCompare(b.name))
                          .map(([key, service]) => (
                            <option key={key} value={key}>{service.name}</option>
                          ))}
                      </select>
                      <button
                        onClick={() => quickAddService(group.id)}
                        disabled={!selectedQuickAdd[group.id]}
                        className="px-2 py-1 text-xs bg-blue-600 hover:bg-blue-700 disabled:bg-slate-600 disabled:text-slate-400 rounded transition-colors"
                        title="Add selected service with defaults"
                      >
                        Add
                      </button>
                    </div>
                    <button
                      onClick={() => deleteGroup(group.id)}
                      className="p-1 text-red-400 hover:text-red-300 transition-colors"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                {/* Services */}
                <div className="space-y-3">
                  {group.services.map((service, index) => (
                    <div
                      key={service.id}
                      className="bg-slate-700 rounded p-3 border border-slate-600 hover:border-slate-500 transition-colors"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-3">
                          <span className="text-xs text-slate-400 font-mono bg-slate-800 px-2 py-1 rounded">
                            {index + 1}
                          </span>
                          {editingService === service.id ? (
                            <input
                              type="text"
                              value={service.name}
                              onChange={(e) => updateService(service.id, { name: e.target.value })}
                              onBlur={() => setEditingService(null)}
                              onKeyDown={(e) => e.key === 'Enter' && setEditingService(null)}
                              className="bg-slate-600 text-white px-2 py-1 rounded border border-slate-500 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 outline-none transition-all"
                              autoFocus
                            />
                          ) : (
                            <span
                              className="font-medium cursor-pointer hover:text-blue-400 transition-colors"
                              onClick={() => setEditingService(service.id)}
                            >
                              {service.name}
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-3">
                          {/* Service reorder buttons */}
                          <div className="flex items-center gap-1 bg-blue-900/30 px-2 py-1 rounded border border-blue-700">
                            <span className="text-xs text-blue-300 mr-1">#</span>
                            <button
                              onClick={() => moveServiceUp(group.id, service.id)}
                              disabled={index === 0}
                              className={`p-1 rounded transition-all ${
                                index === 0 
                                  ? 'text-slate-500 cursor-not-allowed' 
                                  : 'text-blue-300 hover:text-blue-200 hover:bg-blue-800/50'
                              }`}
                              title="Move service up"
                            >
                              <ChevronUp className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => moveServiceDown(group.id, service.id)}
                              disabled={index === group.services.length - 1}
                              className={`p-1 rounded transition-all ${
                                index === group.services.length - 1
                                  ? 'text-slate-500 cursor-not-allowed' 
                                  : 'text-blue-300 hover:text-blue-200 hover:bg-blue-800/50'
                              }`}
                              title="Move service down"
                            >
                              <ChevronDown className="h-4 w-4" />
                            </button>
                          </div>
                          
                          <button
                            onClick={() => deleteService(service.id)}
                            className="p-1 text-red-400 hover:text-red-300 hover:bg-red-900/30 rounded transition-all"
                            title="Delete service"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                        <div>
                          <label className="block text-slate-300 mb-1">URL</label>
                          <input
                            type="text"
                            value={service.href}
                            onChange={(e) => updateService(service.id, { href: e.target.value })}
                            className="w-full bg-slate-600 text-white px-2 py-1 rounded border border-slate-500 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 outline-none transition-all"
                            placeholder="http://localhost:3000"
                          />
                        </div>
                        <div>
                          <label className="block text-slate-300 mb-1">Icon</label>
                          <input
                            type="text"
                            value={service.icon}
                            onChange={(e) => updateService(service.id, { icon: e.target.value })}
                            className="w-full bg-slate-600 text-white px-2 py-1 rounded border border-slate-500 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 outline-none transition-all"
                            placeholder="plex, gitlab, etc."
                          />
                        </div>
                        <div className="sm:col-span-2">
                          <label className="block text-slate-300 mb-1">Description</label>
                          <input
                            type="text"
                            value={service.description}
                            onChange={(e) => updateService(service.id, { description: e.target.value })}
                            className="w-full bg-slate-600 text-white px-2 py-1 rounded border border-slate-500 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 outline-none transition-all"
                            placeholder="Optional description"
                          />
                        </div>
                      </div>

                      {/* Widget Configuration */}
                      <div className="mt-4 pt-3 border-t border-slate-600">
                        <label className="block text-slate-300 mb-2 text-sm">Widget (Optional)</label>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-sm">
                          <select
                            value={service.widget?.type || ''}
                            onChange={(e) => {
                              const newWidget = e.target.value ? { type: e.target.value, url: '', key: '' } : null;
                              updateService(service.id, { widget: newWidget });
                            }}
                            className="bg-slate-600 text-white px-2 py-1 rounded border border-slate-500 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 outline-none transition-all"
                          >
                            <option value="">No widget</option>
                            {commonWidgetTypes
                              .sort((a, b) => a.localeCompare(b))
                              .map(type => (
                                <option key={type} value={type}>{type}</option>
                              ))}
                          </select>
                          {service.widget && (
                            <>
                              <input
                                type="text"
                                value={service.widget.url || ''}
                                onChange={(e) => updateService(service.id, { 
                                  widget: { ...service.widget, url: e.target.value }
                                })}
                                placeholder="API URL"
                                className="bg-slate-600 text-white px-2 py-1 rounded border border-slate-500 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 outline-none transition-all"
                              />
                              <input
                                type="text"
                                value={service.widget.key || ''}
                                onChange={(e) => updateService(service.id, { 
                                  widget: { ...service.widget, key: e.target.value }
                                })}
                                placeholder="API Key"
                                className="bg-slate-600 text-white px-2 py-1 rounded border border-slate-500 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 outline-none transition-all"
                              />
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  {group.services.length === 0 && (
                    <div className="text-center py-8 text-slate-400">
                      <p>No services in this group</p>
                      <button
                        onClick={() => addService(group.id)}
                        className="mt-2 text-blue-400 hover:text-blue-300 transition-colors"
                      >
                        Add your first service
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}

            {config.groups.length === 0 && (
              <div className="text-center py-12 text-slate-400">
                <Home className="h-12 w-12 mx-auto mb-4 text-slate-500" />
                <p className="mb-4">No groups configured yet</p>
                <button
                  onClick={addGroup}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                >
                  Create your first group
                </button>
              </div>
            )}
          </div>

          {/* YAML Preview */}
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <Settings className="h-5 w-5 text-slate-400" />
              <h2 className="text-xl font-semibold">Generated services.yaml</h2>
            </div>
            
            <div className="bg-slate-800 rounded-lg border border-slate-700 overflow-hidden">
              <div className="bg-slate-700 px-4 py-2 text-sm text-slate-300 border-b border-slate-600">
                services.yaml
              </div>
              <pre className="p-4 text-sm overflow-auto max-h-96 text-green-400">
                <code>{generateYAML() || '# No configuration yet'}</code>
              </pre>
            </div>

            {/* Quick Tips */}
            <div className="bg-blue-900/20 rounded-lg p-4 border border-blue-800">
              <h3 className="font-semibold text-blue-300 mb-2">Quick Tips</h3>
              <ul className="text-sm text-blue-200 space-y-1">
                <li>• Import existing services.yaml files to edit them</li>
                <li>• Use the <span className="text-purple-300 font-semibold">purple "Group" controls</span> to reorder groups</li>
                <li>• Use the <span className="text-blue-300 font-semibold">blue "#" controls</span> to reorder services within groups</li>
                <li>• Numbers show the current position of each service</li>
                <li>• Use "Quick add" dropdown for popular services with defaults</li>
                <li>• Click group/service names to edit them inline</li>
                <li>• Copy or download the YAML when you're done</li>
              </ul>
            </div>

            {/* Quick Add Services */}
            <div className="bg-purple-900/20 rounded-lg p-4 border border-purple-800">
              <h3 className="font-semibold text-purple-300 mb-2">Quick Add Services (120+ Available!)</h3>
              <div className="text-sm text-purple-200 space-y-1">
                <div><strong>Media Servers:</strong> Plex, Jellyfin, Emby, AudioBookshelf</div>
                <div><strong>*Arr Stack:</strong> Sonarr, Radarr, Lidarr, Readarr, Prowlarr, Bazarr</div>
                <div><strong>Downloads:</strong> qBittorrent, Transmission, Deluge, SABnzbd, NZBGet, ruTorrent, Flood, JDownloader, pyLoad</div>
                <div><strong>Request Management:</strong> Overseerr, Jellyseerr, Ombi</div>
                <div><strong>Media Management:</strong> Kavita, Komga, TubeArchivist, Calibre-Web</div>
                <div><strong>Photos & Images:</strong> PhotoPrism, Immich</div>
                <div><strong>Files & Backup:</strong> File Browser, Duplicati, Syncthing, Kopia, UrBackup</div>
                <div><strong>Infrastructure:</strong> Portainer, Traefik, Nginx PM, Docker, Yacht, Watchtower</div>
                <div><strong>Monitoring:</strong> Grafana, Uptime Kuma, Prometheus, Netdata, Zabbix, Glances, Scrutiny, Healthchecks, Gatus, Beszel</div>
                <div><strong>Networking & VPN:</strong> UniFi, OPNsense, pfSense, WireGuard, Pi-hole, AdGuard, Cloudflared, Tailscale, Headscale, Gluetun</div>
                <div><strong>Storage & NAS:</strong> TrueNAS, FreeNAS, OpenMediaVault, Synology DiskStation, QNAP, Nextcloud</div>
                <div><strong>Databases:</strong> PostgreSQL, MySQL, phpMyAdmin, pgAdmin, Redis, MongoDB, InfluxDB</div>
                <div><strong>RSS & Reading:</strong> Miniflux, FreshRSS, BookStack, Outline, Wiki.js, Joplin, Trilium</div>
                <div><strong>Bookmarks:</strong> LinkWarden, Wallabag, Shiori</div>
                <div><strong>Communication:</strong> Mattermost, Rocket.Chat, Matrix, Element, Gotify, Mastodon</div>
                <div><strong>Mail:</strong> Mailcow, Roundcube</div>
                <div><strong>Home Automation:</strong> Home Assistant, ESPHome, Homebridge, Node-RED, Zigbee2MQTT, EVCC</div>
                <div><strong>Security & Auth:</strong> Vaultwarden, Authentik, CrowdSec</div>
                <div><strong>Finance & Personal:</strong> Firefly III, Ghostfolio, Grocy, Paperless-ngx, Mealie, Tandoor Recipes, Vikunja</div>
                <div><strong>Development:</strong> Gitea, GitLab, VS Code Server</div>
                <div><strong>Media Processing:</strong> Tdarr, Unmanic, FileFlows</div>
                <div><strong>3D Printing:</strong> Moonraker, OctoPrint</div>
                <div><strong>Gaming:</strong> Minecraft Server, Pterodactyl</div>
                <div><strong>Additional Tools:</strong> ChangeDetection, Speedtest Tracker, SmokePing, Custom API widgets</div>
                <div className="text-xs text-purple-300 mt-2">All include default ports & widget configurations with proper Homepage widget types!</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomepageConfigGUI;