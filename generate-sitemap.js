const fs = require('fs');
const path = require('path');

const baseUrl = 'https://fastsong.eu.org';
const pages = [
  '/',
  '/about',
  '/team',
  '/artikel',
  '/artikel/tips',
  '/artikel/news',
  '/features',
  '/download'
];

const urls = pages.map(page => `
<url>
  <loc>${baseUrl}${page}</loc>
  <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
  <changefreq>weekly</changefreq>
  <priority>0.9</priority>
</url>
`).join('');

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="https://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;

fs.writeFileSync('sitemap.xml', sitemap);
console.log('Sitemap.xml berhasil dibuat!');
