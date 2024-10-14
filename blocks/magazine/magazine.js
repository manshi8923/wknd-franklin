export async function decorate(block) {
    const articlesURL = block.querySelector('a[href*=".json"]');
    console.log("manshi");
    console.log(articlesURL);
    
    // Structure for magazine-wrapper
    const magazine = document.querySelector('.magazine');
    if (magazine) {
        const firstChild = magazine.firstElementChild; // Select the first child
        if (firstChild) {
            firstChild.classList.add('magazine-box'); // Add the class
        }
        
        const magazineBox = document.querySelector('.magazine-box');
        if (magazineBox) {
            const firstChild = magazineBox.firstElementChild; // Select the first child (image container)
            const secondChild = magazineBox.children[1]; // Select the second child (content)

            if (firstChild) {
                firstChild.classList.add('magazine-image'); // Add class to first child
            }
            if (secondChild) {
                secondChild.classList.add('magazine-content'); // Add class to second child
            }
        }
    }

    // Clear existing magazine content
    const magazineContent = document.querySelector('.magazine-content');
    magazineContent.innerHTML = '';

    // Create and append elements to magazineContent
    const headingParagraph = document.createElement('p');
    headingParagraph.classList.add('magazine-heading');
    headingParagraph.textContent = 'Featured Article';
    magazineContent.appendChild(headingParagraph);

    const taglineParagraph = document.createElement('p');
    taglineParagraph.classList.add('magazine-tagline');
    taglineParagraph.textContent = 'Camping In Western Australia';
    magazineContent.appendChild(taglineParagraph);

    const contextParagraph = document.createElement('p');
    contextParagraph.classList.add('magazine-context');
    contextParagraph.textContent = 'The Australian West coast is a camper’s heaven. Endless miles of desert roads leading to secret beaches, vast canyons and crystal clear rivers, and the very few people you are likely to meet on your journey will be some of the most easy-going characters you’ll find anywhere in the world.';
    magazineContent.appendChild(contextParagraph);

    // Create button for "All Articles"
    const buttonSpan = document.createElement('span');
    buttonSpan.classList.add('magazine-button');
    buttonSpan.textContent = 'All Articles';
    magazineContent.appendChild(buttonSpan);

    

    // Find the "All Articles" heading and insert the article list after it
    const allArticlesHeader = document.getElementById('all-articles');
    allArticlesHeader.insertAdjacentElement('afterend', articleList);

    const membersOnly = document.getElementById('members-only');
    membersOnly.innerHTML = '<span class="half-underline">Members</span> Only';
}

export default decorate;
