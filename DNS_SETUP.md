# Setting up erikaalban.com with Cloudflare and GitHub Pages

## Step 1: Enable GitHub Pages with Custom Domain

1. Go to your repository: https://github.com/erikaalban/erikaalban.com/settings/pages
2. Under "Source", select **"GitHub Actions"** (not "Deploy from a branch")
3. Under "Custom domain", enter: `erikaalban.com`
4. Check **"Enforce HTTPS"** (this will be available after DNS propagates)
5. Click **Save**

GitHub will show you the IP addresses and CNAME target you need to configure.

## Step 2: Configure DNS in Cloudflare

1. Log in to Cloudflare Dashboard: https://dash.cloudflare.com
2. Select your domain: `erikaalban.com`
3. Go to **DNS** > **Records**

### Add/Update DNS Records:

#### For apex domain (erikaalban.com):
- **Type**: `CNAME`
- **Name**: `@` (or `erikaalban.com`)
- **Target**: `erikaalban.github.io` (or whatever GitHub shows you)
- **Proxy status**: 🟠 **Proxied** (orange cloud) - This enables Cloudflare CDN
- **TTL**: Auto

#### For www subdomain (optional):
- **Type**: `CNAME`
- **Name**: `www`
- **Target**: `erikaalban.github.io`
- **Proxy status**: 🟠 **Proxied** (orange cloud)
- **TTL**: Auto

**Note**: If Cloudflare doesn't allow CNAME on apex domain, use:
- **Type**: `A` records pointing to GitHub Pages IPs (GitHub will show these in Pages settings)

## Step 3: SSL/TLS Settings in Cloudflare

1. Go to **SSL/TLS** in Cloudflare dashboard
2. Set encryption mode to **"Full"** or **"Full (strict)"**
3. This ensures HTTPS works properly with GitHub Pages

## Step 4: Wait for Propagation

- DNS changes can take a few minutes to several hours
- Cloudflare usually propagates quickly (5-15 minutes)
- GitHub Pages may take up to 24 hours to detect the custom domain

## Step 5: Verify Setup

1. Check GitHub Pages settings - it should show "DNS check successful" when ready
2. Visit https://erikaalban.com (wait for HTTPS to be available)
3. Visit https://www.erikaalban.com (if configured)

## Troubleshooting

- **DNS not resolving**: Wait longer, check Cloudflare DNS records are correct
- **HTTPS not working**: Make sure SSL/TLS is set to "Full" in Cloudflare, wait for GitHub to provision certificate
- **CNAME on apex**: Some DNS providers don't allow CNAME on root. Cloudflare supports it with their proxy, but if issues occur, use A records instead

## Current Configuration

- **CNAME file**: Contains `erikaalban.com`
- **GitHub Pages**: Should be set to use GitHub Actions
- **Cloudflare**: Should proxy traffic for CDN benefits

