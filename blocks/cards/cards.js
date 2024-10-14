import { createOptimizedPicture } from '../../scripts/aem.js';

export default function decorate(block) {
  /* change to ul, li */
  const ul = document.createElement('ul');
  [...block.children].forEach((row) => {
    const li = document.createElement('li');
    while (row.firstElementChild) li.append(row.firstElementChild);
    
    // Add click event listener to each card
    li.addEventListener('click', () => {
      window.location.href = '/magazine';
    });

    [...li.children].forEach((div) => {
      if (div.children.length === 1 && div.querySelector('picture')) {
        div.className = 'cards-card-image';
      } else {
        div.className = 'cards-card-body';
      }
    });
    ul.append(li);
  });

  ul.querySelectorAll('picture > img').forEach((img) => 
    img.closest('picture').replaceWith(createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]))
  );

  block.textContent = '';
  block.append(ul);

  const cardBodies = document.querySelectorAll('.cards-card-body');
  cardBodies.forEach(cardBody => {
    const secondParagraph = cardBody.querySelector('p:nth-of-type(2)');
    if (secondParagraph) {
      secondParagraph.classList.add('second-para');
    }
  });

  const nextAdventures = document.getElementById('next-adventures');
  const allArticles = document.getElementById('all-articles');
  const allTrips = document.getElementById('all-trips');
  const par = document.getElementById('where-do-we-want-to-go');

  allArticles.classList.add('banner-button');
  allTrips.classList.add('banner-button');

  // Add click event listener to All Articles
  allArticles.addEventListener('click', () => {
    window.location.href = '/magazine';
  });

  const originalText = nextAdventures.innerHTML;
  nextAdventures.innerHTML = '<span class="half-underline">Next</span> Adventures';
}
