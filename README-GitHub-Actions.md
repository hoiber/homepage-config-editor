# GitHub Actions Setup Guide

This guide explains how to set up GitHub Actions to automatically build and publish Docker images to Docker Hub and GitHub Container Registry (GHCR).

## Required Repository Secrets

### For Docker Hub Publishing

You need to create the following secret in your GitHub repository settings:

1. **DOCKERHUB_TOKEN**
   - Docker Hub access token (not your password)
   - Create at: https://hub.docker.com/settings/security
   - Permissions: Read, Write, Delete

### For GitHub Container Registry (GHCR)

No additional secrets needed - uses `GITHUB_TOKEN` automatically.

## Setting up Repository Secrets

1. Go to your GitHub repository
2. Click **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret**
4. Add the DOCKERHUB_TOKEN secret with the token from Docker Hub

## Docker Hub Setup

### 1. Create Docker Hub Repository

```bash
# Login to Docker Hub
docker login

# Create repositories (or do this via Docker Hub web interface)
# These will be created automatically when first pushed
```

### 2. Repository Names

The workflows are configured to push to:
- `hoiber/homepage-config-editor:latest` (full server)
- `hoiber/homepage-config-editor:static` (static build)

## GitHub Container Registry Setup

GHCR images will be published to:
- `ghcr.io/hoiber/homepage-config-editor:latest` (full server)
- `ghcr.io/hoiber/homepage-config-editor-static:latest` (static build)

The repository name will match your GitHub username/organization automatically.

## Workflow Triggers

### Automatic Triggers

1. **Push to main branch**: Publishes `latest` tag
2. **Git tags**: Publishes semantic version tags (e.g., `v1.0.0`)
3. **GitHub releases**: Publishes release-specific tags
4. **Pull requests**: Only tests builds (no publishing)

### Manual Triggers

You can manually trigger workflows from the Actions tab.

## Image Tags

### Semantic Versioning (for git tags)
- `v1.2.3` → `1.2.3`, `1.2`, `1`, `latest`
- `v2.0.0` → `2.0.0`, `2.0`, `2`, `latest`

### Branch-based Tags
- `main` branch → `latest`
- Feature branches → `branch-name`

## Multi-Architecture Support

Images are built for multiple platforms:
- **Docker Hub**: `linux/amd64`, `linux/arm64`, `linux/arm/v7`
- **GHCR**: `linux/amd64`, `linux/arm64`

## Workflow Files

### Main Workflows

1. **docker-hub.yml**: Publishes to Docker Hub
2. **ghcr.yml**: Publishes to GitHub Container Registry
3. **test-build.yml**: Tests builds on PRs

### Combined Workflow

- **docker-publish.yml**: Alternative all-in-one workflow (disabled by default)

## Customizing Image Names

### Docker Hub

Edit `.github/workflows/docker-hub.yml`:
```yaml
env:
  DOCKERHUB_REPOSITORY: your-image-name  # Change this
```

### GitHub Container Registry

Edit `.github/workflows/ghcr.yml`:
```yaml
env:
  IMAGE_NAME: ${{ github.repository }}  # Uses repo name by default
```

## Security Features

### Image Signing (GHCR only)

Images are automatically signed using Cosign with keyless signing.

### Vulnerability Scanning

Consider adding Trivy or Snyk scanning:

```yaml
- name: Run Trivy vulnerability scanner
  uses: aquasecurity/trivy-action@master
  with:
    image-ref: '${{ env.REGISTRY }}/${{ env.IMAGE_NAME }}:${{ github.sha }}'
    format: 'sarif'
    output: 'trivy-results.sarif'
```

## Monitoring Builds

### GitHub Actions

1. Go to repository → **Actions** tab
2. View workflow runs and logs
3. Check for any failures or warnings

### Docker Hub

1. Check [Docker Hub](https://hub.docker.com) for published images
2. Verify tags and architectures
3. Monitor download statistics

### GHCR

1. Go to repository → **Packages** tab
2. View published container images
3. Check package details and tags

## Troubleshooting

### Common Issues

1. **Authentication Failed**
   - Verify Docker Hub token has correct permissions
   - Check secret names match exactly
   - Ensure token isn't expired

2. **Build Failures**
   - Check Dockerfile syntax
   - Verify all dependencies are available
   - Review build logs in Actions tab

3. **Multi-arch Build Issues**
   - Some packages may not support all architectures
   - Consider using conditional platform builds

### Debug Steps

1. **Test locally**:
   ```bash
   # Test full server build
   cd homepage-config-gui
   docker build -t test:latest .
   
   # Test static build
   docker build -f Dockerfile.static -t test:static .
   ```

2. **Check workflow logs**:
   - GitHub Actions → Workflow run → Step details

3. **Validate secrets**:
   - Repository Settings → Secrets → Verify names and values

## Best Practices

### Tagging Strategy

- Use semantic versioning for releases
- Keep `latest` tag for main branch
- Use descriptive tags for features

### Security

- Regularly rotate Docker Hub tokens
- Use minimal base images
- Scan images for vulnerabilities
- Don't include secrets in images

### Performance

- Use build caches (already configured)
- Optimize Dockerfile layers
- Consider multi-stage builds for smaller images

## Example Release Process

1. **Make changes** to your code
2. **Commit and push** to main branch
3. **Create a tag**:
   ```bash
   git tag v1.0.0
   git push origin v1.0.0
   ```
4. **Create GitHub release** (optional)
5. **Images are automatically built** and pushed

## Monitoring and Notifications

### Slack/Discord Notifications

Add notification step to workflows:

```yaml
- name: Slack Notification
  if: failure()
  uses: 8398a7/action-slack@v3
  with:
    status: failure
    webhook_url: ${{ secrets.SLACK_WEBHOOK }}
```

### Email Notifications

GitHub will automatically email you on workflow failures if enabled in your notification settings.

## Support

For issues with GitHub Actions:
- Check the [GitHub Actions documentation](https://docs.github.com/en/actions)
- Review workflow logs for specific error messages
- Ensure all required secrets are configured correctly