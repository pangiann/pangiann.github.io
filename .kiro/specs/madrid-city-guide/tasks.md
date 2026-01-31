# Implementation Plan: Madrid City Guide

## Overview

Build a static single-page Madrid city guide website using HTML, CSS, and minimal JavaScript. The implementation follows a mobile-first approach with progressive enhancement for larger screens. All code will be compatible with GitHub Pages hosting.

## Tasks

- [ ] 1. Set up project structure and base styles
  - [x] 1.1 Create directory structure and base HTML document
    - Create `index.html` with semantic HTML5 structure
    - Create `css/styles.css` and `js/scripts.js` files
    - Create image directory structure (`images/hero/`, `images/map/`, etc.)
    - Add Google Fonts link for Ovo and Fraunces
    - _Requirements: 8.1, 8.3_

  - [x] 1.2 Implement CSS custom properties and base styles
    - Define color palette variables (#ede9d7, #4e2a1e, #98b7d2, #32412d)
    - Define typography scale and font-family variables
    - Define spacing system variables
    - Define breakpoint variables
    - Set up CSS reset and base element styles
    - _Requirements: 6.1, 6.2, 6.3_

  - [ ]* 1.3 Write property tests for typography consistency
    - **Property 1: Heading Typography Consistency**
    - **Property 2: Body Typography Consistency**
    - **Validates: Requirements 1.3, 3.4, 4.2, 6.1, 6.2**

- [ ] 2. Implement Hero Section
  - [x] 2.1 Create hero section HTML structure
    - Add hero container with title, subtitle, and intro text
    - Add hero image with proper alt text
    - Use semantic HTML with appropriate heading hierarchy
    - _Requirements: 1.1, 1.3, 9.1, 9.2_

  - [x] 2.2 Style hero section with responsive design
    - Apply warm color palette (cream background, dark brown text)
    - Style typography with Ovo for title
    - Implement responsive layout for mobile and desktop
    - _Requirements: 1.2, 1.4, 7.1_

- [ ] 3. Implement Neighborhood Map Section
  - [x] 3.1 Create SVG neighborhood map with zone overlays
    - Create base map SVG structure
    - Add colored path elements for each of 8 neighborhoods
    - Apply distinct colors to each zone
    - Add ARIA labels for accessibility
    - _Requirements: 2.1, 2.2, 9.1_

  - [x] 3.2 Create map legend component
    - Add legend container with color swatches and labels
    - Ensure legend colors match zone colors
    - Style legend for readability
    - _Requirements: 2.3_

  - [ ] 3.3 Style map section with responsive behavior
    - Ensure map scales appropriately on mobile
    - Maintain legibility at small viewport sizes
    - _Requirements: 2.4, 7.1_

  - [ ]* 3.4 Write property tests for neighborhood map
    - **Property 3: Neighborhood Zone Color Uniqueness**
    - **Property 4: Legend-Zone Correspondence**
    - **Validates: Requirements 2.2, 2.3**

- [ ] 4. Implement Content Card Component
  - [x] 4.1 Create content card HTML structure
    - Define card markup with title, location, travel time, and description
    - Use semantic HTML (article element)
    - Add appropriate class names for styling
    - _Requirements: 4.1_

  - [x] 4.2 Style content card component
    - Apply Fraunces font for body text
    - Add accent colors for visual hierarchy
    - Style card layout with proper spacing
    - _Requirements: 4.2, 4.4_

  - [x] 4.3 Implement responsive card grid layout
    - Create CSS grid for card arrangement
    - Define column behavior at different breakpoints
    - Ensure cards stack on mobile
    - _Requirements: 4.3, 7.4_

  - [ ]* 4.4 Write property tests for content cards
    - **Property 5: Content Card Structure Completeness**
    - **Property 10: Responsive Grid Column Reduction**
    - **Validates: Requirements 4.1, 4.3, 7.1, 7.4**

- [ ] 5. Implement Photo Grid Component
  - [x] 5.1 Create photo grid HTML structure
    - Define grid container with figure elements
    - Add images with lazy loading attribute
    - Include descriptive alt text for all images
    - _Requirements: 5.1, 9.2, 10.3_

  - [x] 5.2 Style photo grid with responsive layout
    - Implement CSS grid for multi-column layout
    - Add object-fit to prevent image distortion
    - Define responsive column behavior
    - _Requirements: 5.2, 5.3, 5.4_

  - [ ]* 5.3 Write property tests for photo grids
    - **Property 6: Section Photo Grid Presence**
    - **Property 7: Photo Grid Multi-Image Requirement**
    - **Property 8: Image Aspect Ratio Preservation**
    - **Validates: Requirements 3.3, 5.1, 5.4**

- [ ] 6. Checkpoint - Verify core components
  - Ensure all tests pass, ask the user if questions arise.

- [x] 7. Implement Content Sections
  - [x] 7.1 Create Restaurants section
    - Add section with heading, photo grid, and content cards
    - Include placeholder content for restaurant recommendations
    - _Requirements: 3.1, 3.2, 3.3_

  - [x] 7.2 Create Bars section
    - Add section with heading, photo grid, and content cards
    - Include placeholder content for bar recommendations
    - _Requirements: 3.1, 3.2, 3.3_

  - [x] 7.3 Create Walks/Routes section
    - Add section with heading, photo grid, and content cards
    - Include placeholder content for walk recommendations
    - _Requirements: 3.1, 3.2, 3.3_

  - [x] 7.4 Create Museums & Monuments section
    - Add section with heading, photo grid, and content cards
    - Include placeholder content for museum recommendations
    - _Requirements: 3.1, 3.2, 3.3_

  - [x] 7.5 Create Practical Tips section
    - Add section with heading and tip content
    - Style tips appropriately
    - _Requirements: 3.1, 3.2_

- [x] 8. Implement Accessibility Features
  - [x] 8.1 Verify semantic HTML and heading hierarchy
    - Ensure proper heading levels (h1 → h2 → h3)
    - Add skip navigation link
    - Verify landmark regions
    - _Requirements: 9.1_

  - [x] 8.2 Verify image alt text and ARIA labels
    - Review all images for descriptive alt text
    - Add ARIA labels to interactive elements
    - _Requirements: 9.2_

  - [x] 8.3 Verify color contrast compliance
    - Check text/background contrast ratios
    - Ensure WCAG AA compliance (4.5:1 minimum)
    - _Requirements: 9.3_

  - [x] 8.4 Implement keyboard navigation
    - Ensure all interactive elements are focusable
    - Add visible focus indicators
    - _Requirements: 9.4_

  - [ ]* 8.5 Write property tests for accessibility
    - **Property 11: Semantic Heading Hierarchy**
    - **Property 12: Image Alt Text Presence**
    - **Property 13: Color Contrast Compliance**
    - **Validates: Requirements 9.1, 9.2, 9.3**

- [x] 9. Implement Performance Optimizations
  - [x] 9.1 Implement lazy loading for images
    - Add loading="lazy" to below-fold images
    - Keep hero image with loading="eager"
    - _Requirements: 10.3_

  - [x] 9.2 Optimize font loading
    - Add font-display: swap to font declarations
    - Consider preloading critical fonts
    - _Requirements: 10.4_

  - [x] 9.3 Minimize render-blocking resources
    - Add defer attribute to non-critical scripts
    - Ensure CSS is optimized
    - _Requirements: 10.2_

  - [ ]* 9.4 Write property tests for performance
    - **Property 14: Lazy Loading for Below-Fold Images**
    - **Validates: Requirements 10.3**

- [ ] 10. Implement Responsive Behavior
  - [ ] 10.1 Test and refine mobile layout (< 768px)
    - Verify single-column layouts
    - Ensure touch-friendly spacing
    - Test on various mobile viewport sizes
    - _Requirements: 7.1, 7.2_

  - [ ] 10.2 Test and refine tablet layout (768px - 1024px)
    - Verify intermediate layouts
    - Adjust grid columns as needed
    - _Requirements: 7.3_

  - [ ] 10.3 Test and refine desktop layout (> 1024px)
    - Verify multi-column layouts
    - Ensure content doesn't stretch too wide
    - _Requirements: 7.1_

  - [ ]* 10.4 Write property tests for responsive behavior
    - **Property 9: No Horizontal Overflow**
    - **Validates: Requirements 7.2**

- [ ] 11. Final Checkpoint - Complete verification
  - Ensure all tests pass, ask the user if questions arise.
  - Verify site works as static files
  - Confirm GitHub Pages compatibility

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP
- Each task references specific requirements for traceability
- Checkpoints ensure incremental validation
- Property tests validate universal correctness properties
- Placeholder content should be replaced with actual Madrid recommendations
- Images will need to be sourced/created separately
