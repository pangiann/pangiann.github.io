# Madrid City Guide - Data Structure

This directory contains all the content data for the Madrid City Guide in a modular, easy-to-maintain format.

## Structure

```
data/
├── food-recs/
│   ├── restaurants/
│   │   ├── index.json          # List of restaurant files
│   │   └── [place-name].json   # Individual restaurant data
│   ├── brunch/
│   │   ├── index.json
│   │   └── [place-name].json
│   └── sweets/
│       ├── index.json
│       └── [place-name].json
├── bars/
│   ├── index.json
│   └── [place-name].json
├── walks/
│   ├── index.json
│   └── [place-name].json
└── museums/
    ├── index.json
    └── [place-name].json
```

## Adding New Content

### 1. Create a new place JSON file

Create a new file in the appropriate category folder with this structure:

```json
{
  "title": "Place Name",
  "neighborhood": "Neighborhood Name",
  "travelTime": "X min from Sol",
  "knownFor": "Description of what makes this place special"
}
```

**Example:** `data/food-recs/restaurants/sobrino-de-botin.json`
```json
{
  "title": "Sobrino de Botín",
  "neighborhood": "La Latina",
  "travelTime": "8 min from Sol",
  "knownFor": "World's oldest restaurant, famous roast suckling pig, historic atmosphere"
}
```

### 2. Add the filename to index.json

Update the `index.json` file in the same folder to include your new file:

```json
[
  "casa-lucio.json",
  "sobrino-de-botin.json"
]
```

### 3. That's it!

The card will automatically appear on the website when you reload the page.

## Adding New Categories

To add a completely new category (e.g., "coffee-shops"):

1. Create a new folder: `data/coffee-shops/`
2. Add an `index.json` file with an empty array: `[]`
3. Add your place JSON files
4. Update `js/card-loader.js` to include the new section:

```javascript
const sectionConfig = {
  // ... existing sections
  'coffee-shops': 'data/coffee-shops'
};
```

5. Add the corresponding section to `index.html`:

```html
<section class="content-section" id="coffee-shops">
  <h2 class="section__title">Coffee Shops</h2>
  <div class="photo-grid">
    <!-- Photos -->
  </div>
  <div class="cards-grid">
    <!-- Cards loaded dynamically from data/coffee-shops/ -->
  </div>
</section>
```

## Benefits of This Structure

✅ **Easy to add new places** - Just create a JSON file and add it to index.json
✅ **Easy to update** - Edit individual JSON files without touching HTML
✅ **Organized by category** - Clear folder structure
✅ **Scalable** - Add as many places as you want without cluttering the codebase
✅ **Version control friendly** - Each place is a separate file, easier to track changes
✅ **No code knowledge needed** - Anyone can add content by editing JSON files
