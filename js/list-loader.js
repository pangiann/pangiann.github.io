// List Loader for Food & Nightlife sections
// Renders compact, text-based lists in a responsive grid

/**
 * Creates a Google Maps search URL from an address
 */
function createMapsUrl(address, title) {
  const query = address ? `${address}, Madrid` : `${title}, Madrid`;
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}

/**
 * Creates a compact list item
 */
function createListItem(item) {
  const mapsUrl = createMapsUrl(item.address, item.title);
  
  // Build metadata line (neighborhood, price, category)
  const metaParts = [];
  if (item.neighborhood) metaParts.push(item.neighborhood);
  if (item.priceRange) metaParts.push(item.priceRange);
  const metaLine = metaParts.length > 0 ? `<div class="list-item__meta">${metaParts.join(' • ')}</div>` : '';
  
  // Build description
  const description = item.knownFor || item.description || item.vibe || '';
  
  // Special notes (must book, etc.)
  const specialNote = item.mustBook ? '<div class="list-item__note">Must book</div>' : '';
  
  return `
    <div class="list-item">
      <div class="list-item__title">${item.title}</div>
      ${item.address ? `<a href="${mapsUrl}" target="_blank" rel="noopener noreferrer" class="list-item__address">${item.address}</a>` : ''}
      ${metaLine}
      ${description ? `<div class="list-item__description">${description}</div>` : ''}
      ${specialNote}
    </div>
  `;
}

/**
 * Load all food items from multiple directories
 */
async function loadAllFoodItems() {
  const foodPaths = [
    { path: 'data/food-recs/restaurants', label: 'Restaurants' },
    { path: 'data/food-recs/brunch', label: 'Brunch' },
    { path: 'data/food-recs/coffee', label: 'Coffee' },
    { path: 'data/food-recs/burgers', label: 'Burgers' },
    { path: 'data/food-recs/pizza', label: 'Pizza' }
  ];
  
  const allItems = [];
  
  for (const { path, label } of foodPaths) {
    try {
      const response = await fetch(`${path}/index.json`);
      const fileList = await response.json();
      
      const itemPromises = fileList.map(async (filename) => {
        try {
          const itemResponse = await fetch(`${path}/${filename}`);
          if (!itemResponse.ok) return null;
          const item = await itemResponse.json();
          item._category = label; // Add category for grouping
          return item;
        } catch (error) {
          console.warn(`Failed to load ${filename}:`, error);
          return null;
        }
      });
      
      const items = await Promise.all(itemPromises);
      allItems.push(...items.filter(item => item !== null));
    } catch (error) {
      console.error(`Error loading from ${path}:`, error);
    }
  }
  
  return allItems;
}

/**
 * Load all nightlife items from multiple directories
 */
async function loadAllNightlifeItems() {
  const nightlifePaths = [
    { path: 'data/bars', label: 'Bars' },
    { path: 'data/nightlife', label: 'Clubs' }
  ];
  
  const allItems = [];
  
  for (const { path, label } of nightlifePaths) {
    try {
      const response = await fetch(`${path}/index.json`);
      const fileList = await response.json();
      
      const itemPromises = fileList.map(async (filename) => {
        try {
          const itemResponse = await fetch(`${path}/${filename}`);
          if (!itemResponse.ok) return null;
          const item = await itemResponse.json();
          item._category = label; // Add category for grouping
          return item;
        } catch (error) {
          console.warn(`Failed to load ${filename}:`, error);
          return null;
        }
      });
      
      const items = await Promise.all(itemPromises);
      allItems.push(...items.filter(item => item !== null));
    } catch (error) {
      console.error(`Error loading from ${path}:`, error);
    }
  }
  
  return allItems;
}

/**
 * Group items by their category
 */
function groupByCategory(items) {
  const groups = {};
  items.forEach(item => {
    const category = item._category || 'Other';
    if (!groups[category]) {
      groups[category] = [];
    }
    groups[category].push(item);
  });
  return groups;
}

/**
 * Render grouped items with category headers
 */
function renderGroupedItems(groups) {
  let html = '<div class="list-grid__group">';
  
  Object.entries(groups).forEach(([category, items]) => {
    html += `<div class="list-grid__category-header">${category}</div>`;
    html += items.map(item => createListItem(item)).join('');
  });
  
  html += '</div>';
  return html;
}

/**
 * Initialize food section
 */
async function initializeFoodSection() {
  const container = document.querySelector('#food .list-grid');
  if (!container) {
    console.warn('Food section container not found');
    return;
  }
  
  const items = await loadAllFoodItems();
  const groups = groupByCategory(items);
  container.innerHTML = renderGroupedItems(groups);
}

/**
 * Initialize nightlife section
 */
async function initializeNightlifeSection() {
  const container = document.querySelector('#nightlife .list-grid');
  if (!container) {
    console.warn('Nightlife section container not found');
    return;
  }
  
  const items = await loadAllNightlifeItems();
  const groups = groupByCategory(items);
  container.innerHTML = renderGroupedItems(groups);
}

/**
 * Initialize must-try section with simple list style
 */
async function initializeMustTrySection() {
  const container = document.querySelector('#must-try .must-try-list');
  if (!container) {
    console.warn('Must-try section container not found');
    return;
  }
  
  try {
    const response = await fetch('data/must-try/index.json');
    const fileList = await response.json();
    
    const itemPromises = fileList.map(async (filename) => {
      try {
        const itemResponse = await fetch(`data/must-try/${filename}`);
        if (!itemResponse.ok) return null;
        return await itemResponse.json();
      } catch (error) {
        console.warn(`Failed to load ${filename}:`, error);
        return null;
      }
    });
    
    const items = await Promise.all(itemPromises);
    const validItems = items.filter(item => item !== null);
    
    // Simple list of titles
    const html = validItems.map(item => `<div class="must-try-item">${item.title}</div>`).join('');
    container.innerHTML = html;
  } catch (error) {
    console.error('Error loading must-try items:', error);
  }
}

/**
 * Initialize neighborhoods section with alternating layout
 */
async function initializeNeighborhoodsSection() {
  const container = document.querySelector('#neighborhoods .neighborhoods-list');
  if (!container) {
    console.warn('Neighborhoods section container not found');
    return;
  }
  
  try {
    const response = await fetch('data/neighborhoods/index.json');
    const fileList = await response.json();
    
    const itemPromises = fileList.map(async (filename) => {
      try {
        const itemResponse = await fetch(`data/neighborhoods/${filename}`);
        if (!itemResponse.ok) return null;
        return await itemResponse.json();
      } catch (error) {
        console.warn(`Failed to load ${filename}:`, error);
        return null;
      }
    });
    
    const items = await Promise.all(itemPromises);
    const validItems = items.filter(item => item !== null);
    
    // Create alternating layout
    const html = validItems.map((item, index) => {
      const isEven = index % 2 === 0;
      const imageUrl = item.image || `images/neighborhoods/${item.title.toLowerCase().replace(/\s+/g, '-')}.jpg`;
      
      return `
        <div class="neighborhood-item ${isEven ? 'neighborhood-item--image-right' : 'neighborhood-item--image-left'}">
          <div class="neighborhood-item__content">
            <h3 class="neighborhood-item__title">${item.title}</h3>
            <p class="neighborhood-item__description">${item.bestFor || item.description || ''}</p>
            <p class="neighborhood-item__vibe">${item.vibe || ''}</p>
          </div>
          <div class="neighborhood-item__image">
            <img src="${imageUrl}" alt="${item.title} neighborhood" loading="lazy">
          </div>
        </div>
      `;
    }).join('');
    
    container.innerHTML = html;
  } catch (error) {
    console.error('Error loading neighborhoods:', error);
  }
}

/**
 * Initialize all list sections
 */
export function initializeListSections() {
  initializeFoodSection();
  initializeNightlifeSection();
  initializeMustTrySection();
  initializeNeighborhoodsSection();
}
