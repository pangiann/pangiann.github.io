# Madrid City Guide - Content Management Guide

## 📁 New Scalable Structure

Your site now uses a **data-driven architecture** that separates content from code:

```
madrid-city-guide/
├── index.html                    # Main page (clean, no hardcoded content)
├── css/styles.css               # Styles
├── js/
│   ├── scripts.js               # Main entry point
│   ├── card-loader.js           # Loads cards from JSON files
│   └── icons.js                 # Reusable SVG icons
└── data/                        # 📂 ALL CONTENT LIVES HERE
    ├── food-recs/
    │   ├── restaurants/
    │   │   ├── index.json       # ["casa-lucio.json", "sobrino-de-botin.json"]
    │   │   ├── casa-lucio.json
    │   │   └── sobrino-de-botin.json
    │   ├── brunch/
    │   │   └── index.json       # []
    │   └── sweets/
    │       └── index.json       # []
    ├── bars/
    │   ├── index.json
    │   └── la-venencia.json
    ├── walks/
    │   ├── index.json
    │   └── retiro-park-loop.json
    └── museums/
        ├── index.json
        └── museo-del-prado.json
```

## ✨ What Changed?

### Before (❌ Not Scalable)
- All content hardcoded in `index.html`
- SVG icons repeated everywhere
- Adding a new place = editing HTML with complex markup
- Hard to maintain and error-prone

### After (✅ Scalable & Maintainable)
- Content in simple JSON files
- Icons centralized and reusable
- Adding a new place = create a JSON file + update index.json
- Clean separation of content and presentation

## 🚀 How to Add New Content

### Example: Adding a New Restaurant

**Step 1:** Create the JSON file
```bash
# Create: data/food-recs/restaurants/el-club-allard.json
```

```json
{
  "title": "El Club Allard",
  "neighborhood": "Sol/Centro",
  "travelTime": "5 min from Sol",
  "knownFor": "Two Michelin stars, innovative tasting menus, elegant setting"
}
```

**Step 2:** Add to index.json
```json
[
  "casa-lucio.json",
  "sobrino-de-botin.json",
  "el-club-allard.json"
]
```

**Step 3:** Done! 🎉
Reload the page and your new restaurant appears automatically.

## 📝 JSON File Format

Each place needs these 4 fields:

```json
{
  "title": "Place Name",              // Required: Name of the place
  "neighborhood": "Neighborhood",     // Required: Which barrio
  "travelTime": "X min from Sol",     // Required: Travel time
  "knownFor": "What makes it special" // Required: Description
}
```

## 🗂️ Adding a New Category

Want to add "Coffee Shops" or "Nightlife"?

**1. Create the folder structure:**
```bash
mkdir -p data/coffee-shops
echo '[]' > data/coffee-shops/index.json
```

**2. Add your first place:**
```json
// data/coffee-shops/federal-cafe.json
{
  "title": "Federal Café",
  "neighborhood": "Malasaña",
  "travelTime": "15 min from Sol",
  "knownFor": "Australian-style brunch, specialty coffee, avocado toast"
}
```

**3. Update index.json:**
```json
["federal-cafe.json"]
```

**4. Configure the loader:**
Edit `js/card-loader.js`:
```javascript
const sectionConfig = {
  'restaurants': 'data/food-recs/restaurants',
  'bars': 'data/bars',
  'walks': 'data/walks',
  'museums': 'data/museums',
  'coffee-shops': 'data/coffee-shops'  // Add this line
};
```

**5. Add HTML section:**
Edit `index.html`:
```html
<section class="content-section" id="coffee-shops">
  <h2 class="section__title">Coffee Shops</h2>
  <div class="photo-grid">
    <!-- Photos will be added in later tasks -->
  </div>
  <div class="cards-grid">
    <!-- Cards loaded dynamically from data/coffee-shops/ -->
  </div>
</section>
```

## 🎯 Benefits

1. **No HTML knowledge needed** - Just edit JSON files
2. **Easy to maintain** - Each place is a separate file
3. **Version control friendly** - See exactly what changed
4. **Scalable** - Add hundreds of places without cluttering code
5. **Reusable** - Icons and card structure defined once
6. **Flexible** - Easy to add new categories or fields

## 🔧 Technical Details

- **Icons:** Defined once in `js/icons.js`, used everywhere
- **Card rendering:** `js/card-loader.js` reads JSON and generates HTML
- **ES Modules:** Modern JavaScript with `import/export`
- **Async loading:** Cards load dynamically when page loads

## 📚 File Naming Convention

Use kebab-case for filenames:
- ✅ `casa-lucio.json`
- ✅ `sobrino-de-botin.json`
- ✅ `museo-del-prado.json`
- ❌ `Casa Lucio.json`
- ❌ `casa_lucio.json`

## 🎨 What About Those SVG Paths?

The `path d="..."` you saw are SVG path definitions. They're now hidden away in `js/icons.js` so you never have to look at them again! The system automatically adds the right icon to each card.
