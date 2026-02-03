import { icons } from './icons.js';

// Configuration mapping section IDs to their data folders
const sectionConfig = {
  'neighborhoods': 'data/neighborhoods',
  'restaurants': 'data/food-recs/restaurants',
  'brunch': 'data/food-recs/brunch',
  'coffee': 'data/food-recs/coffee',
  'burgers': 'data/food-recs/burgers',
  'pizza': 'data/food-recs/pizza',
  'sweets': 'data/food-recs/sweets',
  'bars': 'data/bars',
  'clubs': 'data/nightlife',
  'walks': 'data/walks',
  'museums': 'data/museums',
  'sightseeing': 'data/sightseeing',
  'day-trips': 'data/day-trips',
  'must-try': 'data/must-try',
  'tips': 'data/survival-rules'
};

/**
 * Creates a category card with a list of items
 * @param {Array} items - Array of item data objects
 * @param {string} categoryTitle - The category title
 * @param {string} sectionId - The section ID for context-specific rendering
 * @returns {string} HTML string for the category card
 */
function createCategoryCard(items, categoryTitle, sectionId) {
  // Neighborhood list items
  if (sectionId === 'neighborhoods') {
    const itemsHtml = items.map(item => `
      <li class="category-list__item">
        <strong class="item__name">${item.title}</strong>
        <span class="item__description">Best for: ${item.bestFor} • ${item.vibe}</span>
      </li>
    `).join('');
    
    return `
      <article class="category-card">
        <ul class="category-list">
          ${itemsHtml}
        </ul>
      </article>
    `;
  }

  // Must-try list items
  if (sectionId === 'must-try') {
    const itemsHtml = items.map(item => `
      <li class="category-list__item">
        <strong class="item__name">${item.title}</strong>
        <span class="item__description">${item.knownFor}</span>
      </li>
    `).join('');
    
    return `
      <article class="category-card">
        <ul class="category-list">
          ${itemsHtml}
        </ul>
      </article>
    `;
  }

  // Survival rules list items
  if (sectionId === 'tips') {
    const itemsHtml = items.map(item => `
      <li class="category-list__item">
        <strong class="item__name">${item.title}</strong>
        <span class="item__description">${item.rule}</span>
      </li>
    `).join('');
    
    return `
      <article class="category-card">
        <ul class="category-list">
          ${itemsHtml}
        </ul>
      </article>
    `;
  }

  // Restaurant/Food list items
  if (sectionId === 'restaurants') {
    // Group restaurants by category
    const topPicks = items.filter(item => item.category === 'Top Pick');
    const spanishFood = items.filter(item => item.category === 'Great Spanish Food');
    const somethingDifferent = items.filter(item => item.category === 'Something Different');
    
    const createRestaurantItem = (item) => {
      const addressHtml = item.mapLink 
        ? `<a href="${item.mapLink}" target="_blank" rel="noopener noreferrer" class="item__address">${item.address || item.neighborhood}</a>`
        : `<span class="item__address">${item.address || item.neighborhood}</span>`;
      
      return `
        <li class="category-list__item">
          <strong class="item__name">${item.title}</strong>
          ${addressHtml}
          <span class="item__price">${item.priceRange || ''}</span>
          <span class="item__description">${item.knownFor}</span>
        </li>
      `;
    };
    
    let html = '<article class="category-card">';
    
    if (topPicks.length > 0) {
      html += `
        <h3 class="category-card__subtitle">Top Picks (Book These)</h3>
        <ul class="category-list">
          ${topPicks.map(createRestaurantItem).join('')}
        </ul>
      `;
    }
    
    if (spanishFood.length > 0) {
      html += `
        <h3 class="category-card__subtitle">Great Spanish Food</h3>
        <ul class="category-list">
          ${spanishFood.map(createRestaurantItem).join('')}
        </ul>
      `;
    }
    
    if (somethingDifferent.length > 0) {
      html += `
        <h3 class="category-card__subtitle">Something Different</h3>
        <ul class="category-list">
          ${somethingDifferent.map(createRestaurantItem).join('')}
        </ul>
      `;
    }
    
    html += '</article>';
    return html;
  }

  // Other food categories
  if (['brunch', 'coffee', 'burgers', 'pizza'].includes(sectionId)) {
    const itemsHtml = items.map(item => {
      const addressHtml = item.mapLink 
        ? `<a href="${item.mapLink}" target="_blank" rel="noopener noreferrer" class="item__address">${item.address || item.neighborhood}</a>`
        : `<span class="item__address">${item.address || item.neighborhood}</span>`;
      
      return `
        <li class="category-list__item">
          <strong class="item__name">${item.title}</strong>
          ${addressHtml}
          <span class="item__price">${item.priceRange || ''}</span>
          <span class="item__description">${item.knownFor}</span>
        </li>
      `;
    }).join('');
    
    return `
      <article class="category-card">
        <ul class="category-list">
          ${itemsHtml}
        </ul>
      </article>
    `;
  }

  // Bar/Nightlife list items - group bars by type
  if (sectionId === 'bars') {
    const cocktailBars = items.filter(item => item.category === 'Cocktails' || item.category === 'Cocktail Bar');
    const otherBars = items.filter(item => item.category !== 'Cocktails' && item.category !== 'Cocktail Bar');
    
    const createBarItem = (item) => {
      const addressHtml = item.mapLink 
        ? `<a href="${item.mapLink}" target="_blank" rel="noopener noreferrer" class="item__address">${item.address || item.neighborhood}</a>`
        : `<span class="item__address">${item.address || item.neighborhood}</span>`;
      
      return `
        <li class="category-list__item">
          <strong class="item__name">${item.title}</strong>
          ${addressHtml}
          <span class="item__price">${item.priceRange || ''}</span>
          <span class="item__description">${item.knownFor}</span>
        </li>
      `;
    };
    
    let html = '<article class="category-card">';
    
    if (cocktailBars.length > 0) {
      html += `
        <h3 class="category-card__subtitle">Cocktails (Before Club)</h3>
        <ul class="category-list">
          ${cocktailBars.map(createBarItem).join('')}
        </ul>
      `;
    }
    
    if (otherBars.length > 0) {
      html += `
        <h3 class="category-card__subtitle">Bars</h3>
        <ul class="category-list">
          ${otherBars.map(createBarItem).join('')}
        </ul>
      `;
    }
    
    html += '</article>';
    return html;
  }

  // Clubs - group by mood
  if (sectionId === 'clubs') {
    const bigCommercial = items.filter(item => item.category === 'Big / Commercial');
    const indieAlt = items.filter(item => item.category === 'Indie / Alternative');
    const funChaos = items.filter(item => item.category === 'Fun / Chaos / University');
    
    const createClubItem = (item) => {
      const addressHtml = item.mapLink 
        ? `<a href="${item.mapLink}" target="_blank" rel="noopener noreferrer" class="item__address">${item.address || item.neighborhood}</a>`
        : `<span class="item__address">${item.address || item.neighborhood}</span>`;
      
      return `
        <li class="category-list__item">
          <strong class="item__name">${item.title}</strong>
          ${addressHtml}
          <span class="item__description">${item.knownFor}</span>
        </li>
      `;
    };
    
    let html = '<article class="category-card">';
    
    if (bigCommercial.length > 0) {
      html += `
        <h3 class="category-card__subtitle">Big / Commercial</h3>
        <ul class="category-list">
          ${bigCommercial.map(createClubItem).join('')}
        </ul>
      `;
    }
    
    if (indieAlt.length > 0) {
      html += `
        <h3 class="category-card__subtitle">Indie / Alternative</h3>
        <ul class="category-list">
          ${indieAlt.map(createClubItem).join('')}
        </ul>
      `;
    }
    
    if (funChaos.length > 0) {
      html += `
        <h3 class="category-card__subtitle">Fun / Chaos / University</h3>
        <ul class="category-list">
          ${funChaos.map(createClubItem).join('')}
        </ul>
      `;
    }
    
    html += '</article>';
    return html;
  }

  // Default: walks, museums, day-trips (keep individual cards for these)
  return null;
}

/**
 * Creates individual content card (for walks, museums, day-trips)
 */
function createIndividualCard(cardData) {
  const mapLinkHtml = cardData.mapLink ? `
    <a href="${cardData.mapLink}" target="_blank" rel="noopener noreferrer" class="card__map-link">
      ${icons.map}
      View Route on Map
    </a>
  ` : '';

  const howToGetThereHtml = cardData.howToGetThere ? `
    <p class="card__how-to-get-there">
      <strong>How to get there:</strong> ${cardData.howToGetThere}
    </p>
  ` : '';

  const ticketInfoHtml = cardData.ticketInfo ? `
    <p class="card__ticket-info">
      <strong>Tickets:</strong> ${cardData.ticketInfo}
    </p>
  ` : '';

  const ticketLinkHtml = cardData.ticketLink ? `
    <a href="${cardData.ticketLink}" target="_blank" rel="noopener noreferrer" class="card__ticket-link">
      ${icons.ticket}
      Buy Tickets
    </a>
  ` : '';

  return `
    <article class="content-card">
      <h3 class="card__title">${cardData.title}</h3>
      <div class="card__meta">
        <span class="card__location">
          ${icons.location}
          ${cardData.neighborhood}
        </span>
        <span class="card__travel-time">
          ${icons.clock}
          ${cardData.travelTime}
        </span>
      </div>
      <p class="card__known-for">
        <strong>Known for:</strong> ${cardData.knownFor}
      </p>
      ${howToGetThereHtml}
      ${ticketInfoHtml}
      ${ticketLinkHtml}
      ${mapLinkHtml}
    </article>
  `;
}

/**
 * Loads sightseeing categories and renders them
 */
async function loadSightseeing() {
  const sightseeingContent = document.querySelector('#sightseeing .sightseeing-content');
  if (!sightseeingContent) {
    console.warn('Sightseeing content container not found');
    return;
  }

  try {
    const response = await fetch('data/sightseeing.json');
    const data = await response.json();
    
    const html = data.categories.map(category => `
      <div class="sightseeing-category">
        <h3 class="sightseeing-category__title">${category.title}</h3>
        <ul class="sightseeing-category__list">
          ${category.items.map(item => `<li class="sightseeing-category__item">${item}</li>`).join('')}
        </ul>
      </div>
    `).join('');
    
    sightseeingContent.innerHTML = html;
  } catch (error) {
    console.error('Error loading sightseeing data:', error);
  }
}

/**
 * Loads all JSON files from a directory and renders cards
 * @param {string} sectionId - The section ID to load cards for
 */
async function loadCardsForSection(sectionId) {
  console.log(`Loading section: ${sectionId}`);
  const dataPath = sectionConfig[sectionId];
  if (!dataPath) {
    console.warn(`No data path configured for section: ${sectionId}`);
    return;
  }

  const cardsGrid = document.querySelector(`#${sectionId} .cards-grid`);
  console.log(`Looking for selector: #${sectionId} .cards-grid`, cardsGrid);
  if (!cardsGrid) {
    console.warn(`Cards grid not found for section: ${sectionId}`);
    return;
  }

  try {
    // Fetch the list of files in the directory
    console.log(`Fetching: ${dataPath}/index.json`);
    const response = await fetch(`${dataPath}/index.json`);
    const fileList = await response.json();
    console.log(`Files for ${sectionId}:`, fileList);
    
    // Load each card data file
    const cardPromises = fileList.map(async (filename) => {
      const cardResponse = await fetch(`${dataPath}/${filename}`);
      return await cardResponse.json();
    });
    
    const cardsData = await Promise.all(cardPromises);
    console.log(`Loaded ${cardsData.length} items for ${sectionId}`);
    
    // Determine if this section should use category cards or individual cards
    const useCategoryCard = ['neighborhoods', 'restaurants', 'brunch', 'coffee', 'burgers', 'pizza', 'bars', 'clubs', 'must-try', 'tips'].includes(sectionId);
    
    if (useCategoryCard) {
      // Group all items into one category card
      const categoryTitles = {
        'neighborhoods': 'Madrid Neighborhoods',
        'restaurants': 'Restaurants',
        'brunch': 'Brunch',
        'coffee': 'Coffee',
        'burgers': 'Burgers',
        'pizza': 'Pizza',
        'bars': 'Bars',
        'clubs': 'Clubs',
        'must-try': 'What You Must Try',
        'tips': 'Survival Rules'
      };
      
      const html = createCategoryCard(cardsData, categoryTitles[sectionId], sectionId);
      console.log(`Generated HTML for ${sectionId}:`, html.substring(0, 200));
      cardsGrid.innerHTML = html;
    } else {
      // Render individual cards (walks, museums, day-trips)
      cardsGrid.innerHTML = cardsData.map(data => createIndividualCard(data)).join('');
    }
  } catch (error) {
    console.error(`Error loading cards for ${sectionId}:`, error);
  }
}

/**
 * Initialize card loading for all sections
 */
export function initializeCards() {
  // Load sightseeing separately (different format)
  loadSightseeing();
  
  // Load card-based sections
  Object.keys(sectionConfig).forEach(sectionId => {
    loadCardsForSection(sectionId);
  });
}
