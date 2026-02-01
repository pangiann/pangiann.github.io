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
function createListItem(item, showOnlyTopPicks = false, category = '') {
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
  
  // Top pick badge
  const topPickBadge = item.topPick ? '<span class="top-pick-badge">Top Pick</span>' : '';
  const itemClass = item.topPick ? 'list-item list-item--top-pick' : 'list-item';
  
  // Add extra-option class and data attribute for non-top picks
  const extraClass = !item.topPick ? ` extra-option` : '';
  const extraData = !item.topPick ? ` data-category="${category}"` : '';
  
  return `
    <div class="${itemClass}${extraClass}"${extraData}>
      <div class="list-item__title">${item.title}${topPickBadge}</div>
      ${item.address ? `<a href="${mapsUrl}" target="_blank" rel="noopener noreferrer" class="list-item__address">${item.address}</a>` : ''}
      ${metaLine}
      ${description ? `<div class="list-item__description">${description}</div>` : ''}
      ${specialNote}
    </div>
  `;
}

// Store loaded data for toggling
let foodData = null;
let nightlifeData = null;

/**
 * Load all food items from multiple directories
 */
async function loadAllFoodItems() {
  const foodPaths = [
    { path: 'data/food-recs/tapas', label: 'Tapas' },
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
function renderGroupedItems(groups, showOnlyTopPicks = false) {
  let html = '<div class="list-grid__group">';
  
  Object.entries(groups).forEach(([category, items]) => {
    // Sort items: top picks first, then others
    const sortedItems = [...items].sort((a, b) => {
      if (a.topPick && !b.topPick) return -1;
      if (!a.topPick && b.topPick) return 1;
      return 0;
    });
    
    if (sortedItems.length > 0) {
      html += `<div class="list-grid__category-header">${category}</div>`;
      
      // Check if we have both top picks and non-top picks
      const hasTopPicks = sortedItems.some(item => item.topPick);
      const hasNonTopPicks = sortedItems.some(item => !item.topPick);
      const showToggle = hasTopPicks && hasNonTopPicks;
      
      // Render items
      sortedItems.forEach((item, index) => {
        html += createListItem(item, showOnlyTopPicks, category);
        
        // Add toggle link after the last top pick
        if (showToggle && item.topPick && 
            (index === sortedItems.length - 1 || !sortedItems[index + 1]?.topPick)) {
          html += `<div class="toggle-extra-link-container">
            <button class="toggle-extra-link" data-category="${category}">Hide extra options</button>
          </div>`;
        }
      });
    }
  });
  
  html += '</div>';
  return html;
}

/**
 * Initialize food section
 */
async function initializeFoodSection(showOnlyTopPicks = false) {
  const container = document.querySelector('#food .list-grid');
  if (!container) {
    console.warn('Food section container not found');
    return;
  }
  
  if (!foodData) {
    foodData = await loadAllFoodItems();
  }
  
  const groups = groupByCategory(foodData);
  container.innerHTML = renderGroupedItems(groups, showOnlyTopPicks);
}

/**
 * Initialize nightlife section
 */
async function initializeNightlifeSection(showOnlyTopPicks = false) {
  const container = document.querySelector('#nightlife .list-grid');
  if (!container) {
    console.warn('Nightlife section container not found');
    return;
  }
  
  if (!nightlifeData) {
    nightlifeData = await loadAllNightlifeItems();
  }
  
  const groups = groupByCategory(nightlifeData);
  container.innerHTML = renderGroupedItems(groups, showOnlyTopPicks);
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
export function initializeListSections(showOnlyTopPicks = false) {
  initializeFoodSection(showOnlyTopPicks);
  initializeNightlifeSection(showOnlyTopPicks);
  initializeMustTrySection();
  initializeNeighborhoodsSection();
  initializeToggleButtons();
  initializeInlineToggleLinks();
}

/**
 * Initialize inline toggle links for hiding/showing extra options
 */
let toggleLinksInitialized = false;

function initializeInlineToggleLinks() {
  // Only initialize once to avoid multiple event listeners
  if (toggleLinksInitialized) return;
  toggleLinksInitialized = true;
  
  // Use event delegation since links are dynamically created
  document.addEventListener('click', (e) => {
    if (e.target.classList.contains('toggle-extra-link')) {
      e.preventDefault();
      e.stopPropagation();
      
      const button = e.target;
      const category = button.getAttribute('data-category');
      const isHiding = button.textContent.includes('Hide');
      
      // Find all extra option items for this category
      const categoryContainer = button.closest('.list-grid__group');
      const extraItems = categoryContainer.querySelectorAll(`.extra-option[data-category="${category}"]`);
      
      // Toggle visibility
      extraItems.forEach(item => {
        if (isHiding) {
          item.classList.add('hidden');
        } else {
          item.classList.remove('hidden');
        }
      });
      
      // Update button text
      button.textContent = isHiding ? 'Show extra options' : 'Hide extra options';
    }
  });
}

/**
 * Initialize toggle buttons for food and nightlife sections
 */
function initializeToggleButtons() {
  const buttons = document.querySelectorAll('.more-options-btn');
  
  buttons.forEach(button => {
    button.addEventListener('click', async () => {
      const section = button.getAttribute('data-section');
      const currentState = button.getAttribute('data-showing');
      const showTopPicks = currentState === 'all';
      
      // Update button state and text
      if (showTopPicks) {
        button.setAttribute('data-showing', 'top-picks');
        button.textContent = section === 'food' ? 'View All Food Options' : 'View All Nightlife Options';
      } else {
        button.setAttribute('data-showing', 'all');
        button.textContent = section === 'food' ? 'Show Top Picks Only' : 'Show Top Picks Only';
      }
      
      // Re-render the section
      if (section === 'food') {
        await initializeFoodSection(showTopPicks);
      } else if (section === 'nightlife') {
        await initializeNightlifeSection(showTopPicks);
      }
      
      // Always scroll to the top of the section
      const sectionElement = document.querySelector(`#${section}`);
      if (sectionElement) {
        sectionElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}

// Export functions for use in more options pages
export { loadAllFoodItems, loadAllNightlifeItems, groupByCategory, renderGroupedItems };
