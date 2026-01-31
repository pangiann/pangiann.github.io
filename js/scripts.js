// Madrid City Guide Scripts
import { initializeCards } from './card-loader.js';
import { initializeListSections } from './list-loader.js';

// Load intro text from file
async function loadIntroText() {
  try {
    const response = await fetch('data/intro.txt');
    const text = await response.text();
    
    const introContent = document.querySelector('.intro__content');
    if (introContent) {
      // Split by double newlines to get paragraphs
      const paragraphs = text.split('\n\n').filter(p => p.trim());
      
      // First paragraph is the heading
      const heading = document.createElement('h2');
      heading.className = 'intro__heading';
      heading.textContent = paragraphs[0];
      introContent.appendChild(heading);
      
      // Rest are body paragraphs
      paragraphs.slice(1).forEach(para => {
        const p = document.createElement('p');
        p.className = 'intro__text';
        p.textContent = para.trim();
        introContent.appendChild(p);
      });
    }
  } catch (error) {
    console.error('Error loading intro text:', error);
  }
}

// Initialize card loading when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  loadIntroText();
  initializeCards();
  initializeListSections();
  console.log('Madrid City Guide loaded');
});
