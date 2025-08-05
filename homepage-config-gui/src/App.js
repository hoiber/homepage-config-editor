import React, { useState } from 'react';
import { Plus, Download, Trash2, Copy, Home, Settings, Upload, ChevronUp, ChevronDown } from 'lucide-react';
import './App.css';

const HomepageConfigGUI = () => {
  const [selectedQuickAdd, setSelectedQuickAdd] = useState({});
  const [importError, setImportError] = useState('');
  const [importSuccess, setImportSuccess] = useState('');
  
  const commonServices = {
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
    nextcloud: {
      name: 'Nextcloud',
      href: 'http://localhost:8080',
      description: 'Personal cloud storage',
      icon: 'nextcloud',
      widget: { type: 'nextcloud', url: 'http://localhost:8080', key: 'your-api-key' }
    }
  };

  const [config, setConfig] = useState({
    groups: [
      {
        id: 'group1',
        name: 'Media',
        services: [
          {
            id: 'service1',
            name: 'Plex',
            href: 'http://localhost:32400',
            description: 'Media streaming server',
            icon: 'plex',
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
      id: `group${Date.now()}`,
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
      id: `service${Date.now()}`,
      ...quickService
    } : {
      id: `service${Date.now()}`,
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

  const triggerImport = () => {
    document.getElementById('yaml-import').click();
  };

  const generateYAML = () => {
    let yamlStr = '';
    config.groups.forEach(group => {
      yamlStr += `- ${group.name}:\n`;
      group.services.forEach(service => {
        yamlStr += `  - ${service.name}:\n`;
        yamlStr += `      href: ${service.href}\n`;
        if (service.description) yamlStr += `      description: ${service.description}\n`;
        if (service.icon) yamlStr += `      icon: ${service.icon}\n`;
        if (service.widget) {
          yamlStr += `      widget:\n`;
          yamlStr += `        type: ${service.widget.type}\n`;
          if (service.widget.url) yamlStr += `        url: ${service.widget.url}\n`;
          if (service.widget.key) yamlStr += `        key: ${service.widget.key}\n`;
        }
      });
      yamlStr += '\n';
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

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generateYAML());
    setImportSuccess('YAML copied to clipboard!');
    setTimeout(() => setImportSuccess(''), 3000);
  };

  return (
    <div className="app">
      <div className="container">
        {/* Header */}
        <div className="header">
          <div className="header-title">
            <Home className="icon-lg" />
            <h1>Homepage Config Builder</h1>
          </div>
          <div className="header-buttons">
            <button onClick={triggerImport} className="btn btn-green">
              <Upload className="icon" />
              Import YAML
            </button>
            <button onClick={copyToClipboard} className="btn btn-gray">
              <Copy className="icon" />
              Copy YAML
            </button>
            <button onClick={downloadConfig} className="btn btn-blue">
              <Download className="icon" />
              Download
            </button>
          </div>
        </div>

        <input
          id="yaml-import"
          type="file"
          accept=".yaml,.yml"
          style={{ display: 'none' }}
        />

        {/* Success/Error Messages */}
        {importSuccess && (
          <div className="alert alert-success">
            <span><strong>Success:</strong> {importSuccess}</span>
            <button onClick={() => setImportSuccess('')} className="alert-close">×</button>
          </div>
        )}

        {importError && (
          <div className="alert alert-error">
            <span><strong>Error:</strong> {importError}</span>
            <button onClick={() => setImportError('')} className="alert-close">×</button>
          </div>
        )}

        {/* Main Content */}
        <div className="main-grid">
          {/* Config Builder */}
          <div className="config-section">
            <div className="section-header">
              <h2>Service Groups</h2>
              <button onClick={addGroup} className="btn btn-green btn-sm">
                <Plus className="icon" />
                Add Group
              </button>
            </div>

            {config.groups.map((group, groupIndex) => (
              <div key={group.id} className="group-card">
                <div className="group-header">
                  <div>
                    {editingGroup === group.id ? (
                      <input
                        type="text"
                        value={group.name}
                        onChange={(e) => updateGroup(group.id, { name: e.target.value })}
                        onBlur={() => setEditingGroup(null)}
                        onKeyDown={(e) => e.key === 'Enter' && setEditingGroup(null)}
                        className="input-edit"
                        autoFocus
                      />
                    ) : (
                      <h3 onClick={() => setEditingGroup(group.id)} className="group-title">
                        {group.name}
                      </h3>
                    )}
                  </div>
                  <div className="group-controls">
                    <button onClick={() => addService(group.id)} className="btn-icon">
                      <Plus className="icon" />
                    </button>
                    <select
                      value={selectedQuickAdd[group.id] || ''}
                      onChange={(e) => setSelectedQuickAdd(prev => ({ ...prev, [group.id]: e.target.value }))}
                      className="select-sm"
                    >
                      <option value="">Quick add...</option>
                      {Object.entries(commonServices).map(([key, service]) => (
                        <option key={key} value={key}>{service.name}</option>
                      ))}
                    </select>
                    <button 
                      onClick={() => quickAddService(group.id)}
                      disabled={!selectedQuickAdd[group.id]}
                      className="btn btn-blue btn-xs"
                    >
                      Add
                    </button>
                    <button onClick={() => deleteGroup(group.id)} className="btn-icon btn-red">
                      <Trash2 className="icon" />
                    </button>
                  </div>
                </div>

                <div className="services-list">
                  {group.services.map((service, index) => (
                    <div key={service.id} className="service-card">
                      <div className="service-header">
                        <div className="service-info">
                          <span className="service-number">{index + 1}</span>
                          {editingService === service.id ? (
                            <input
                              type="text"
                              value={service.name}
                              onChange={(e) => updateService(service.id, { name: e.target.value })}
                              onBlur={() => setEditingService(null)}
                              onKeyDown={(e) => e.key === 'Enter' && setEditingService(null)}
                              className="input-edit"
                              autoFocus
                            />
                          ) : (
                            <span 
                              onClick={() => setEditingService(service.id)}
                              className="service-name"
                            >
                              {service.name}
                            </span>
                          )}
                        </div>
                        <button 
                          onClick={() => deleteService(service.id)}
                          className="btn-icon btn-red"
                        >
                          <Trash2 className="icon" />
                        </button>
                      </div>
                      
                      <div className="service-fields">
                        <div className="field">
                          <label>URL</label>
                          <input
                            type="text"
                            value={service.href}
                            onChange={(e) => updateService(service.id, { href: e.target.value })}
                            className="input"
                            placeholder="http://localhost:3000"
                          />
                        </div>
                        <div className="field">
                          <label>Icon</label>
                          <input
                            type="text"
                            value={service.icon}
                            onChange={(e) => updateService(service.id, { icon: e.target.value })}
                            className="input"
                            placeholder="plex, gitlab, etc."
                          />
                        </div>
                        <div className="field field-full">
                          <label>Description</label>
                          <input
                            type="text"
                            value={service.description}
                            onChange={(e) => updateService(service.id, { description: e.target.value })}
                            className="input"
                            placeholder="Optional description"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  {group.services.length === 0 && (
                    <div className="empty-state">
                      <p>No services in this group</p>
                      <button onClick={() => addService(group.id)} className="btn btn-blue">
                        Add your first service
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}

            {config.groups.length === 0 && (
              <div className="empty-state">
                <Home className="icon-xl" />
                <p>No groups configured yet</p>
                <button onClick={addGroup} className="btn btn-blue">
                  Create your first group
                </button>
              </div>
            )}
          </div>

          {/* YAML Preview */}
          <div className="yaml-section">
            <div className="section-header">
              <Settings className="icon" />
              <h2>Generated services.yaml</h2>
            </div>
            
            <div className="yaml-preview">
              <div className="yaml-header">services.yaml</div>
              <pre className="yaml-content">
                <code>{generateYAML() || '# No configuration yet'}</code>
              </pre>
            </div>

            <div className="tips-card">
              <h3>Quick Tips</h3>
              <ul>
                <li>• Import existing services.yaml files to edit them</li>
                <li>• Use "Quick add" dropdown for popular services</li>
                <li>• Click group/service names to edit them inline</li>
                <li>• Icons use Dashboard Icons (no extension needed)</li>
                <li>• Copy or download the YAML when you're done</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

function App() {
  return <HomepageConfigGUI />;
}

export default App;