# Deployment & SEO Setup Guide

## 🚀 Quick Start

### 1. Before Deployment - Update Domain URLs

Replace `https://udgroup.com/` with your actual domain in these files:

**index.html** (Line references may vary)
```html
<link rel="canonical" href="YOUR_DOMAIN_HERE" />
<meta property="og:url" content="YOUR_DOMAIN_HERE" />
<meta name="twitter:url" content="YOUR_DOMAIN_HERE" />
<script type="application/ld+json">
  "url": "YOUR_DOMAIN_HERE"
</script>
```

**sitemap.xml**
```xml
<loc>YOUR_DOMAIN_HERE</loc>
```

**robots.txt**
```
Sitemap: YOUR_DOMAIN_HERE/sitemap.xml
```

### 2. Create Social Media Images

Create these images and place in `/public/`:

1. **og-image.jpg** (1200x630px)
   - Facebook, LinkedIn sharing
   - Should include: UD Group logo, Amara Garden City visual, tagline

2. **twitter-image.jpg** (1200x600px)
   - Twitter sharing
   - Similar to og-image but 2:1 ratio

**Design Tips:**
- Use high-quality images of the property
- Include UD Group branding
- Add text overlay with main value proposition
- Keep text readable at small sizes
- Test on both dark and light backgrounds

### 3. Build for Production

```bash
# Install dependencies
npm install

# Run production build
npm run build

# Preview locally (optional)
npm run preview

# Visit http://localhost:4173 to test
```

### 4. Deploy Options

#### Option A: Vercel (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Follow prompts to link project
# Vercel will auto-detect vite.config.ts
```

**Vercel Dashboard Setup:**
1. Go to project settings
2. Add environment variables (if using chatbot)
   - `ANTHROPIC_API_KEY` = your_key_here
3. Enable automatic deployments from Git

#### Option B: Netlify
```bash
# Install Netlify CLI
npm i -g netlify-cli

# Deploy
netlify deploy --prod

# Set build command: npm run build
# Set publish directory: dist
```

**Netlify Dashboard Setup:**
1. Site settings > Build & deploy
2. Build command: `npm run build`
3. Publish directory: `dist`
4. Add environment variables (Settings > Environment)

#### Option C: Traditional Hosting (cPanel, etc.)
```bash
# Build locally
npm run build

# Upload the 'dist' folder contents to your server
# Upload .htaccess to the root directory
# Ensure mod_rewrite is enabled for SPA routing
```

## 🔍 Post-Deployment SEO Setup

### Step 1: Verify Site is Live
- [ ] Visit your domain
- [ ] Check all sections load correctly
- [ ] Test on mobile device
- [ ] Verify HTTPS is working (green padlock)

### Step 2: Google Search Console
1. Go to [Google Search Console](https://search.google.com/search-console)
2. Add your property (domain or URL prefix)
3. Verify ownership (DNS, HTML file, or tag method)
4. Submit sitemap: `https://yourdomain.com/sitemap.xml`
5. Request indexing for homepage

**Key Actions:**
- [ ] Add and verify property
- [ ] Submit sitemap
- [ ] Request indexing
- [ ] Set up email alerts

### Step 3: Google Analytics 4
1. Go to [Google Analytics](https://analytics.google.com/)
2. Create new GA4 property
3. Get Measurement ID (G-XXXXXXXXXX)
4. Add tracking code to `index.html`:

```html
<!-- Add before closing </head> tag -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

**Key Actions:**
- [ ] Create GA4 property
- [ ] Add tracking code
- [ ] Verify tracking is working (Real-time reports)
- [ ] Set up conversion goals

### Step 4: Bing Webmaster Tools
1. Go to [Bing Webmaster Tools](https://www.bing.com/webmasters)
2. Add your site
3. Verify ownership
4. Submit sitemap
5. Use "Import from Google Search Console" for faster setup

**Key Actions:**
- [ ] Add and verify site
- [ ] Submit sitemap
- [ ] Import from Google (if available)

### Step 5: Validate SEO Implementation

**Test Meta Tags:**
1. **Facebook Debugger**
   - https://developers.facebook.com/tools/debug/
   - Enter your URL
   - Click "Scrape Again" if needed
   - Verify og:image displays correctly

2. **Twitter Card Validator**
   - https://cards-dev.twitter.com/validator
   - Enter your URL
   - Verify card preview

3. **LinkedIn Post Inspector**
   - https://www.linkedin.com/post-inspector/
   - Enter your URL
   - Clear cache if needed

**Test Structured Data:**
1. **Google Rich Results Test**
   - https://search.google.com/test/rich-results
   - Enter your URL
   - Verify Organization and RealEstateAgent schemas are valid

2. **Schema Markup Validator**
   - https://validator.schema.org/
   - Enter your URL
   - Check for errors

**Key Actions:**
- [ ] Test Facebook sharing
- [ ] Test Twitter card
- [ ] Validate structured data
- [ ] Fix any errors found

### Step 6: Performance Testing

**Run These Tests:**

1. **Google PageSpeed Insights**
   - https://pagespeed.web.dev/
   - Enter your URL
   - Target: Desktop 90+, Mobile 75+

2. **GTmetrix**
   - https://gtmetrix.com/
   - Enter your URL
   - Check waterfall, recommendations

3. **WebPageTest**
   - https://www.webpagetest.org/
   - Test from multiple locations
   - Check filmstrip view

**Key Actions:**
- [ ] PageSpeed score > 85
- [ ] Core Web Vitals pass
- [ ] No critical errors
- [ ] Load time < 3s

## 📊 Monitoring & Maintenance

### Week 1: Initial Monitoring
- [ ] Check Google Search Console daily for crawl errors
- [ ] Monitor Analytics for traffic sources
- [ ] Verify all pages are being indexed
- [ ] Fix any 404 errors
- [ ] Monitor Core Web Vitals

### Monthly Tasks
- [ ] Review search performance in GSC
- [ ] Check for broken links
- [ ] Update content if needed
- [ ] Review and respond to user feedback
- [ ] Check competitor rankings
- [ ] Update sitemap if new pages added

### Quarterly Tasks
- [ ] Comprehensive SEO audit
- [ ] Performance benchmarking
- [ ] Content refresh
- [ ] Backlink analysis
- [ ] Keyword ranking review

## 🎯 SEO Best Practices (Ongoing)

### Content Strategy
1. **Blog Posts** - Add a blog section
   - Construction tips
   - Real estate market updates
   - Project updates
   - Company news

2. **Location Pages** - If expanding
   - Individual pages for each project
   - City/region-specific content

3. **FAQ Section** - Add common questions
   - Buying process
   - Financing options
   - Project timelines

### Link Building
1. **Local Directories**
   - Myanmar Yellow Pages
   - Local business listings
   - Chamber of Commerce

2. **Industry Links**
   - Construction associations
   - Real estate forums
   - Trade publications

3. **Social Media**
   - Regular Facebook posts
   - LinkedIn company page
   - Instagram for visuals

### Technical Maintenance
1. **Regular Updates**
   - Keep dependencies updated
   - Monitor for security issues
   - Update content regularly
   - Fix broken links promptly

2. **Mobile Optimization**
   - Test on various devices
   - Check touch targets
   - Verify forms work on mobile
   - Test page speed on 3G/4G

## 🆘 Troubleshooting

### Site Not Indexed After 2 Weeks
- Check robots.txt isn't blocking crawlers
- Verify sitemap is accessible
- Request indexing in Google Search Console
- Check for manual penalties (unlikely for new site)

### Poor PageSpeed Scores
- Clear browser cache and test again
- Check server response time
- Verify images are optimized
- Check for render-blocking resources
- Review console for errors

### Social Sharing Not Working
- Verify og-image.jpg exists and is accessible
- Use Facebook Debugger to scrape again
- Check image dimensions (1200x630)
- Verify meta tags are present

### Search Rankings Not Improving
- Be patient (3-6 months for results)
- Create quality content consistently
- Build quality backlinks
- Engage on social media
- Focus on user experience

## 📞 Support & Resources

### Developer Tools
- Chrome DevTools - Built-in browser tools
- React DevTools - React debugging
- Lighthouse - Performance audits
- Web Vitals Extension - Real-time metrics

### Learning Resources
- [Google SEO Starter Guide](https://developers.google.com/search/docs/fundamentals/seo-starter-guide)
- [Moz Beginner's Guide to SEO](https://moz.com/beginners-guide-to-seo)
- [Web.dev Learn](https://web.dev/learn/)
- [Google Search Central](https://developers.google.com/search)

### Community
- [r/SEO](https://reddit.com/r/SEO) - Reddit community
- [Webmaster World](https://www.webmasterworld.com/) - Forums
- [Search Engine Journal](https://www.searchenginejournal.com/) - News
- [Search Engine Land](https://searchengineland.com/) - Updates

---

## ✅ Final Checklist

### Pre-Launch
- [ ] Updated all domain URLs
- [ ] Created social media images
- [ ] Built production version
- [ ] Tested locally
- [ ] Verified all links work
- [ ] Checked mobile responsiveness

### Launch Day
- [ ] Deployed to production
- [ ] Verified HTTPS works
- [ ] Submitted sitemap to Google
- [ ] Submitted sitemap to Bing
- [ ] Added Google Analytics
- [ ] Tested social sharing

### Week 1
- [ ] Monitored for errors
- [ ] Verified indexing started
- [ ] Checked performance scores
- [ ] Fixed any issues found
- [ ] Started content marketing

**Congratulations on your launch! 🎉**

---

**Document Version:** 1.0.0  
**Last Updated:** July 7, 2026  
**Contact:** For questions, refer to README.md
