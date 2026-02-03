# Google Maps Link Update Guide

## What Changed

The site now supports clickable Google Maps links for addresses in food and nightlife sections. When you add a `mapLink` field to any JSON file, the address will become a clickable link that opens the exact location in Google Maps.

## How to Update JSON Files

Add a `mapLink` field to any food or nightlife JSON file:

```json
{
  "title": "Restaurant Name",
  "address": "Street Address, Neighborhood",
  "mapLink": "https://maps.app.goo.gl/YOUR_GOOGLE_MAPS_SHARE_LINK",
  "neighborhood": "Neighborhood Name",
  ...
}
```

## How to Get Google Maps Share Links

1. Open Google Maps
2. Search for the place
3. Click "Share" button
4. Copy the short link (format: `https://maps.app.goo.gl/...`)
5. Add it to the JSON file as `mapLink`

## Files to Update

### Brunch (data/food-recs/brunch/)
- ✅ billy-brunch.json (already updated as example)
- brunchit.json
- federal-cafe.json
- ojala.json
- raices-cafe.json

### Burgers (data/food-recs/burgers/)
- hundred-burgers.json
- juancho.json
- milwaukee-burger.json
- porneat.json

### Coffee (data/food-recs/coffee/)
- ambu.json
- bucolico-cafe.json
- en-bruto.json
- geisha-specialty.json
- mision-cafe.json
- naji.json
- natif.json
- toma-cafe.json

### Pizza (data/food-recs/pizza/)
- bel-mondo.json
- fratelli-figurato.json
- grosso-napoletano.json

### Restaurants (data/food-recs/restaurants/)
- astor.json
- chonmage-ramen.json
- colosimo.json
- el-picaporte.json
- her.json
- la-cabana-argentina.json
- la-maruca.json
- lamucaa.json
- makkila.json
- ochenta-grados.json
- raza-madrid.json
- sardo.json

### Tapas (data/food-recs/tapas/)
- el-viajero.json
- rollo-ocho.json
- taberna-el-sur.json
- taberna-la-buha-chueca.json

### Bars (data/bars/)
- ✅ artquitectura.json (updated with placeholder)
- balmoral.json
- barbara-ann.json
- casa-brava.json
- ficus-bar.json
- intruso.json
- jacks-library.json
- la-mamona.json
- la-musa.json
- macera.json
- papaya.json
- sala-equis.json
- the-irish-rover.json
- the-shaker.json
- tony-2-piano-bar.json
- via-lactea.json

### Nightlife (data/nightlife/)
- ✅ el-chapandaz.json (updated with placeholder)
- fitz-club.json
- icon-club.json
- la-que-faltaba.json
- malaba.json
- maravillas-club.json
- medias-puri.json
- ocho-y-medio.json
- teatro-kapital.json

## Example

Before:
```json
{
  "title": "Billy Brunch",
  "address": "Calle de Fuencarral, 82, Malasaña",
  "neighborhood": "Malasaña",
  ...
}
```

After:
```json
{
  "title": "Billy Brunch",
  "address": "Calle de Fuencarral, 82, Malasaña",
  "mapLink": "https://maps.app.goo.gl/2FKXcrCH1XuKqqeX8",
  "neighborhood": "Malasaña",
  ...
}
```

## Notes

- The `address` field is still required (it's what displays as the link text)
- The `mapLink` field is optional - if not present, address displays as plain text
- Links open in a new tab automatically
- The styling is already set up - blue underlined text that turns green on hover
