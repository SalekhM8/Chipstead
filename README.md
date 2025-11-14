# Chipstead Tandoori - Premium Restaurant Website

A modern, luxury website for Chipstead Tandoori featuring glass morphism design, video backgrounds, and exceptional SEO optimization.

## 🌟 Features

### Design & UX
- **Premium Glass Morphism UI** - Modern curved glass cards with green tinge and subtle transparency
- **Video Background** - Blurred video background for immersive experience
- **Responsive Design** - Perfectly optimized for desktop, tablet, and mobile devices
- **Smooth Animations** - Intersection Observer API for elegant scroll animations
- **Auto-scrolling Dishes** - Horizontal auto-scroll showcase with curved images
- **Premium Typography** - Cormorant Garamond for headings, Inter for body text
- **Golden Accent Colors** - Luxury yellowy-gold from the logo throughout

### Pages
1. **Home (index.html)** - Hero section, special dishes carousel, about, contact
2. **Menu (menu.html)** - Complete menu with categories, filtering, and beautiful cards
3. **Blog (blog.html)** - SEO-optimized blog with featured posts and categories

### SEO Optimization
✅ Complete meta tags (title, description, keywords)
✅ Open Graph tags for social media sharing
✅ Twitter Card integration
✅ Structured Data (Schema.org) for Restaurant, Menu, and Blog
✅ Canonical URLs
✅ Sitemap.xml
✅ Robots.txt
✅ PWA Manifest
✅ Semantic HTML5
✅ Image alt attributes
✅ Fast loading optimization
✅ Mobile-first responsive design
✅ .htaccess for performance (compression, caching, security headers)

### Performance
- Browser caching via .htaccess
- GZIP compression
- Lazy loading for images
- Optimized animations
- Preloading critical resources
- Debounced scroll events

### Accessibility
- ARIA labels
- Keyboard navigation support
- Semantic HTML structure
- High contrast text
- Focus indicators
- Screen reader friendly

## 📁 File Structure

```
ChipsteadTandoori/
├── index.html              # Home page
├── menu.html               # Menu page
├── blog.html               # Blog page
├── styles.css              # Main stylesheet
├── menu-styles.css         # Menu-specific styles
├── blog-styles.css         # Blog-specific styles
├── script.js               # Main JavaScript
├── menu-script.js          # Menu filtering & interactions
├── robots.txt              # Search engine crawling rules
├── sitemap.xml             # XML sitemap for SEO
├── .htaccess               # Apache configuration
├── manifest.json           # PWA manifest
├── chipstead.mp4           # Background video
├── balti.png               # Menu item image
├── lambchops.png           # Menu item image
├── onionbhaji.png          # Menu item image
├── tandoori.png            # Menu item image
└── README.md               # This file
```

## 🎨 Design Specifications

### Colors
- **Primary Gold**: #D4AF37
- **Light Gold**: #F4E4B5
- **Dark Gold**: #B8941F
- **Green Primary**: #2D5D3F
- **Green Tinge**: rgba(45, 93, 63, 0.15)
- **Dark Background**: #0A0E0D
- **Glass Background**: rgba(255, 255, 255, 0.08)

### Typography
- **Headings**: Cormorant Garamond (300-700)
- **Body**: Inter (300-600)

### Glass Morphism Effect
- Background: Linear gradient with green tinge
- Backdrop filter: blur(20px) saturate(180%)
- Border radius: 30px
- Border: 1px solid rgba(255, 255, 255, 0.15)
- Box shadow: 0 8px 32px rgba(0, 0, 0, 0.37)

## 🚀 Deployment

### Local Development
1. Open `index.html` in a modern web browser
2. For best results, use a local server:
   ```bash
   python -m http.server 8000
   # or
   npx serve
   ```

### Production Deployment

#### Prerequisites
- Web hosting with Apache (for .htaccess)
- SSL certificate (recommended for HTTPS)
- Domain: chipsteadtandoori.com

#### Steps
1. Upload all files to your web server
2. Ensure Apache mod_rewrite, mod_deflate, and mod_expires are enabled
3. Update all URLs in HTML files to match your domain
4. Configure SSL and update .htaccess to force HTTPS
5. Submit sitemap.xml to Google Search Console
6. Verify all social media tags with respective validators

### SEO Checklist After Deployment
- [ ] Submit sitemap to Google Search Console
- [ ] Submit sitemap to Bing Webmaster Tools
- [ ] Test with Google Rich Results Test
- [ ] Verify Open Graph tags with Facebook Debugger
- [ ] Check Twitter Card with Twitter Card Validator
- [ ] Test mobile-friendliness with Google Mobile-Friendly Test
- [ ] Check page speed with Google PageSpeed Insights
- [ ] Register business with Google My Business
- [ ] Create and link social media profiles

## 📱 Mobile Responsiveness

The website is fully responsive with breakpoints at:
- **Desktop**: 1024px and above
- **Tablet**: 768px - 1023px
- **Mobile**: 480px - 767px
- **Small Mobile**: Below 480px

Key mobile features:
- Hamburger menu navigation
- Stacked layouts
- Touch-optimized buttons
- Optimized images
- Video pauses on mobile when not in viewport (performance)

## 🔧 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## ⚡ Performance Tips

1. **Optimize Video**: Compress chipstead.mp4 to reduce file size
2. **Image Optimization**: Use WebP format with PNG fallbacks
3. **CDN**: Consider using a CDN for static assets
4. **Minify**: Minify CSS and JavaScript for production
5. **Lazy Loading**: Implement native lazy loading for more images

## 🔐 Security

The .htaccess file includes security headers:
- X-Frame-Options (clickjacking protection)
- X-XSS-Protection
- X-Content-Type-Options (MIME sniffing prevention)
- Content Security Policy
- Referrer Policy

## 📊 Analytics

Add your analytics code before the closing `</head>` tag:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=YOUR-GA-ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'YOUR-GA-ID');
</script>
```

## 🌐 Social Media Integration

Update the following with actual social media URLs in the HTML files:
- Facebook: `https://facebook.com/chipsteadtandoori`
- Instagram: `https://instagram.com/chipsteadtandoori`
- Twitter: `https://twitter.com/chipsteadtandoori`
- TripAdvisor: Update with actual link

## 📧 Contact Information

Update the following in HTML files:
- Phone: Currently set to `01737 555 555`
- Email: `info@chipsteadtandoori.com`
- Address: High Street, Chipstead, Surrey, CR5
- Opening Hours: Mon-Sun: 5:00 PM - 11:00 PM

## 🎯 Future Enhancements

- [ ] Online ordering system integration
- [ ] Reservation system
- [ ] Customer reviews section
- [ ] Photo gallery
- [ ] Live chat support
- [ ] Loyalty program integration
- [ ] Email newsletter backend
- [ ] Blog CMS integration
- [ ] Multi-language support
- [ ] Dark/Light mode toggle

## 📝 License

© 2024 Chipstead Tandoori. All rights reserved.

## 👨‍💻 Development

Built with:
- Pure HTML5, CSS3, and JavaScript
- No frameworks for maximum performance
- Modern ES6+ JavaScript
- CSS Grid and Flexbox
- Intersection Observer API
- CSS Custom Properties (Variables)

---

**Note**: Remember to replace placeholder content (phone numbers, email, social media links) with actual business information before going live.

For support or questions, contact the development team.

