
import { fetchPlaceholders } from '../../scripts/aem.js';

function updateActiveSlide(slide) {
    const block = slide.closest('.carousel');
    const slideIndex = parseInt(slide.dataset.slideIndex, 10);
    block.dataset.activeSlide = slideIndex;

    const slides = block.querySelectorAll('.carousel-slide');

    slides.forEach((aSlide, idx) => {
        aSlide.setAttribute('aria-hidden', idx !== slideIndex);
        aSlide.querySelectorAll('a').forEach((link) => {
            if (idx !== slideIndex) {
                link.setAttribute('tabindex', '-1');
            } else {
                link.removeAttribute('tabindex');
            }
        });
    });

    const indicators = block.querySelectorAll('.carousel-slide-indicator');
    indicators.forEach((indicator, idx) => {
        if (idx !== slideIndex) {
            indicator.querySelector('button').removeAttribute('disabled');
        } else {
            indicator.querySelector('button').setAttribute('disabled', 'true');
        }
    });

    // Select the carousel slide content
    const carouselContents = document.querySelectorAll('.carousel-slide-content');
    // Iterate through each slide content
    carouselContents.forEach((carouselContent) => {
        const firstParagraph = carouselContent.querySelector('p:nth-child(1)');
        const secondParagraph = carouselContent.querySelector('p:nth-child(2)');
        const thirdParagraph = carouselContent.querySelector('p:nth-child(3)');
        // Apply a class name to them
        if (firstParagraph) {
            firstParagraph.classList.add('carousel-heading'); // Change to your desired class name
        }
        if (secondParagraph) {
            secondParagraph.classList.add('carousel-content');
        }
        if (thirdParagraph) {
            const spanElement = document.createElement('span');
            spanElement.innerHTML = thirdParagraph.innerHTML;
            thirdParagraph.parentNode.replaceChild(spanElement, thirdParagraph);
            spanElement.classList.add('carousel-button');
        }
    });

    // logics for banner-wrapper
    const banner = document.querySelector('.banner');
    if (banner) {
        const firstChild = banner.firstElementChild; // Select the first child
        if (firstChild) {
            firstChild.classList.add('banner-box'); // Add the class
        }
        const bannerBox = document.querySelector('.banner-box');
        if (bannerBox) {
            const firstChild = bannerBox.firstElementChild; // Select the first child (image container)
            const secondChild = bannerBox.children[1]; // Select the second child (content)

            if (firstChild) {
                firstChild.classList.add('banner-image'); // Add class to first child
            }
            if (secondChild) {
                secondChild.classList.add('banner-content'); // Add class to second child
            }
        }
    }
    // Select the banner-content
const bannerContent = document.querySelector('.banner-content');

// Clear existing content
bannerContent.innerHTML = '';

// Create and append the first <p> with class 'banner-heading'
const headingParagraph = document.createElement('p');
headingParagraph.classList.add('banner-heading');
headingParagraph.textContent = 'Featured Article';
bannerContent.appendChild(headingParagraph);

// Create and append the second <p> with class 'banner-tagline'
const taglineParagraph = document.createElement('p');
taglineParagraph.classList.add('banner-tagline');
taglineParagraph.textContent = 'Camping In Western Australia';
bannerContent.appendChild(taglineParagraph);

// Create and append the third <p> with class 'banner-context'
const contextParagraph = document.createElement('p');
contextParagraph.classList.add('banner-context');
contextParagraph.textContent = 'The Australian West coast is a camper’s heaven. Endless miles of desert roads leading to secret beaches, vast canyons and crystal clear rivers, and the very few people you are likely to meet on your journey will be some of the most easy-going characters you’ll find anywhere in the world.';
bannerContent.appendChild(contextParagraph);

// Create and append the <span> with class 'banner-button'
const buttonSpan = document.createElement('span');
buttonSpan.classList.add('banner-button');
buttonSpan.textContent = 'FULL ARTICLE';
bannerContent.appendChild(buttonSpan);
const recentArticles = document.getElementById('recent-articles');
const originalText = recentArticles.innerHTML;
recentArticles.innerHTML = '<span class="half-underline">Recent</span> Articles';


}

function showSlide(block, slideIndex = 0) {
    const slides = block.querySelectorAll('.carousel-slide');
    let realSlideIndex = slideIndex < 0 ? slides.length - 1 : slideIndex;
    if (slideIndex >= slides.length) realSlideIndex = 0;
    const activeSlide = slides[realSlideIndex];

    activeSlide.querySelectorAll('a').forEach((link) => link.removeAttribute('tabindex'));
    block.querySelector('.carousel-slides').scrollTo({
        top: 0,
        left: activeSlide.offsetLeft,
        behavior: 'smooth',
    });
}

function bindEvents(block) {
    const slideIndicators = block.querySelector('.carousel-slide-indicators');
    if (!slideIndicators) return;

    slideIndicators.querySelectorAll('button').forEach((button) => {
        button.addEventListener('click', (e) => {
            const slideIndicator = e.currentTarget.parentElement;
            showSlide(block, parseInt(slideIndicator.dataset.targetSlide, 10));
        });
    });

    block.querySelector('.slide-prev').addEventListener('click', () => {
        showSlide(block, parseInt(block.dataset.activeSlide, 10) - 1);
    });
    block.querySelector('.slide-next').addEventListener('click', () => {
        showSlide(block, parseInt(block.dataset.activeSlide, 10) + 1);
    });

    const slideObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) updateActiveSlide(entry.target);
        });
    }, { threshold: 0.5 });
    block.querySelectorAll('.carousel-slide').forEach((slide) => {
        slideObserver.observe(slide);
    });
}

function createSlide(row, slideIndex, carouselId) {
    const slide = document.createElement('li');
    slide.dataset.slideIndex = slideIndex;
    slide.setAttribute('id', `carousel-${carouselId}-slide-${slideIndex}`);
    slide.classList.add('carousel-slide');

    row.querySelectorAll(':scope > div').forEach((column, colIdx) => {
        column.classList.add(`carousel-slide-${colIdx === 0 ? 'image' : 'content'}`);
        slide.append(column);
    });

    const labeledBy = slide.querySelector('h1, h2, h3, h4, h5, h6');
    if (labeledBy) {
        slide.setAttribute('aria-labelledby', labeledBy.getAttribute('id'));
    }
    return slide;
}

let carouselId = 0;
export default async function decorate(block) {
    carouselId += 1;
    block.setAttribute('id', `carousel-${carouselId}`);
    const rows = block.querySelectorAll(':scope > div');
    const isSingleSlide = rows.length < 2;

    const placeholders = await fetchPlaceholders();

    block.setAttribute('role', 'region');
    block.setAttribute('aria-roledescription', placeholders.carousel || 'Carousel');

    const container = document.createElement('div');
    container.classList.add('carousel-slides-container');

    const slidesWrapper = document.createElement('ul');
    slidesWrapper.classList.add('carousel-slides');
    block.prepend(slidesWrapper);

    let slideIndicators;
    if (!isSingleSlide) {
        const slideIndicatorsNav = document.createElement('nav');
        slideIndicatorsNav.setAttribute('aria-label', placeholders.carouselSlideControls || 'Carousel Slide Controls');
        slideIndicators = document.createElement('ol');
        slideIndicators.classList.add('carousel-slide-indicators');
        slideIndicatorsNav.append(slideIndicators);
        block.append(slideIndicatorsNav);

        const slideNavButtons = document.createElement('div');
        slideNavButtons.classList.add('carousel-navigation-buttons');
        slideNavButtons.innerHTML = `
      <button type="button" class= "slide-prev" aria-label="${placeholders.previousSlide || 'Previous Slide'}"></button>
      <button type="button" class="slide-next" aria-label="${placeholders.nextSlide || 'Next Slide'}"></button>
    `;

        container.append(slideNavButtons);
    }

    rows.forEach((row, idx) => {
        const slide = createSlide(row, idx, carouselId);
        slidesWrapper.append(slide);

        if (slideIndicators) {
            const indicator = document.createElement('li');
            indicator.classList.add('carousel-slide-indicator');
            indicator.dataset.targetSlide = idx;
            indicator.innerHTML = `<button type="button" aria-label="${placeholders.showSlide || 'Show Slide'} ${idx + 1} ${placeholders.of || 'of'} ${rows.length}"></button>`;
            slideIndicators.append(indicator);
        }
        row.remove();
    });

    container.append(slidesWrapper);
    block.prepend(container);

    if (!isSingleSlide) {
        bindEvents(block);
    }
}
