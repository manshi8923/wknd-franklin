import { getMetadata } from '../../scripts/aem.js';
import { loadFragment } from '../fragment/fragment.js';

/**
 * loads and decorates the footer
 * @param {Element} block 
 */
export default async function decorate(block) { 
  const footerMeta = getMetadata('footer');
  const footerPath = footerMeta ? new URL(footerMeta, window.location).pathname : '/footer';
  const fragment = await loadFragment(footerPath);
  block.textContent = '';
  const footer = document.createElement('div');
  while (fragment.firstElementChild) footer.append(fragment.firstElementChild);
  block.append(footer);
  console.log(footer);
  const followUsParagraph = document.querySelector('.footer .section .default-content-wrapper p:nth-of-type(5)');
  console.log(followUsParagraph);
  // Check if the paragraph exists
  if (followUsParagraph) {
      followUsParagraph.innerHTML = 'Follow Us<br><span class="social-media-icons">' +
      '<a href="http://www.facebook.com" title="Facebook"><i class="fab fa-facebook-f"></i></a>' +
      '<a href="http://www.twitter.com" title="Twitter"><i class="fab fa-twitter"></i></a>' +
      '<a href="http://www.instagram.com" title="Instagram"><i class="fab fa-instagram"></i></a>' +
      '</span>';
  }
}


