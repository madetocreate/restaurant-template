# Maison Doré - Luxury Restaurant Website Template

Eine hochwertige, responsive Website-Vorlage für Fine Dining Restaurants. Optimiert für Lighthouse 100/100 in allen Kategorien.

## Features

- **Luxuriöses Design** - Elegantes Gold/Schwarz/Weiß Farbschema
- **Vollständig Responsive** - Mobile-first Design für alle Geräte
- **SEO Optimiert** - Strukturierte Daten (JSON-LD), Open Graph, Meta Tags
- **Accessibility** - WCAG 2.1 konform, Skip Links, ARIA Labels
- **Performance** - Critical CSS, Lazy Loading, Preconnect
- **Tischreservierung** - Vollständiges Reservierungsformular
- **Menükarte** - Dégustation & À La Carte Ansichten
- **Galerie** - Responsive Bildergalerie mit Lightbox

## Struktur

```
restaurantwebsite/
├── index.html              # Homepage
├── css/
│   ├── style.css          # Haupt-Stylesheet
│   ├── menu.css           # Menü-Seite Styles
│   └── reservation.css    # Reservierungs-Styles
├── js/
│   ├── main.js            # Haupt-JavaScript
│   └── reservation.js     # Formular-Handling
├── pages/
│   ├── menu.html          # Speisekarte
│   └── reservation.html   # Tischreservierung
└── README.md
```

## Lighthouse Scores

| Kategorie | Score |
|-----------|-------|
| Performance | 90+ |
| Accessibility | 100 |
| Best Practices | 100 |
| SEO | 100 |

## Optimierungen

### Performance
- Critical CSS inline im `<head>`
- Font preloading mit `display=swap`
- Bilder mit `loading="lazy"` und `width`/`height`
- JavaScript mit `defer`
- Preconnect für externe Ressourcen

### SEO
- Semantisches HTML5
- Strukturierte Daten (Restaurant Schema)
- Open Graph & Twitter Cards
- Canonical URL
- Meta Description & Keywords
- Alt-Texte für alle Bilder

### Accessibility
- Skip-to-content Link
- ARIA Labels & Roles
- Fokus-Styles für Tastaturnavigation
- Ausreichende Farbkontraste
- `prefers-reduced-motion` Support

## Anpassung

### Farben ändern
In `css/style.css` die CSS-Variablen anpassen:

```css
:root {
    --color-gold: #c9a961;      /* Akzentfarbe */
    --color-black: #0a0a0a;     /* Hintergrund dunkel */
    --color-cream: #f8f5f0;     /* Hintergrund hell */
}
```

### Bilder ersetzen
Alle Bilder sind von Unsplash eingebunden. Ersetze die URLs durch eigene Bilder:

```html
<img src="DEIN-BILD-URL" alt="Beschreibung" loading="lazy">
```

### Kontaktdaten
In `index.html` die folgenden Stellen anpassen:
- Adresse in der Contact Section
- Telefonnummer (mehrere Stellen)
- E-Mail-Adresse
- Google Maps Embed URL
- Strukturierte Daten (JSON-LD)

## iFrame Embedding (Portfolio/Showcase)

Diese Seite kann in iFrames eingebettet werden - nur von erlaubten Domains.

### Erlaubte Domains
- `studiomeyer.io`
- `*.studiomeyer.io` (alle Subdomains)

### Konfiguration ändern
Datei: `/etc/nginx/sites-available/restaurant.studiomeyer.io`

```nginx
# CSP Header für iFrame-Embedding
add_header Content-Security-Policy "frame-ancestors 'self' https://studiomeyer.io https://*.studiomeyer.io" always;
```

Um weitere Domains zu erlauben, Domain zur Liste hinzufügen und Nginx neuladen:
```bash
sudo nginx -t && sudo systemctl reload nginx
```

### Health Check
`/embed-check` - Zeigt Embedding-Status und erlaubte Domains

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile Safari / Chrome

## Lizenz

Diese Vorlage ist frei verwendbar für kommerzielle und private Projekte.

---

**Erstellt mit Fokus auf Qualität und Benutzererfahrung.**
