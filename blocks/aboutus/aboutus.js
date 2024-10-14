document.querySelectorAll('.aboutus picture img').forEach(function (img) {
    img.style.width = '200px';
    img.style.height = '200px';
    img.style.borderRadius = '50%';
    img.style.objectFit = 'cover'; // Ensures the image covers the entire area
});

const aboutUsParagraph = document.querySelector('.aboutus-container p:first-of-type');

// Add a class name to the selected <p> tag
if (aboutUsParagraph) {
    aboutUsParagraph.classList.add('about-us-title');
}

// Select the second <p> tag inside the aboutus-container
const ourContributorsParagraph = document.querySelector('.aboutus-container p:nth-of-type(2)');

// Check if the paragraph exists
if (ourContributorsParagraph) {
    // Add a class to the paragraph for targeting
    ourContributorsParagraph.classList.add('our-contributors');

    // Replace the text with a new one where "Our" is wrapped in a <span>
    ourContributorsParagraph.innerHTML = ourContributorsParagraph.innerHTML.replace(
        'Our',
        '<span class="underline">Our</span>'
    );
}

// Select the <h2> tag with the text "WKND Guides"
const wkndGuidesHeading = document.querySelector('#wknd-guides');

// Check if the heading exists
if (wkndGuidesHeading) {
    // Add a class to the heading for targeting
    wkndGuidesHeading.classList.add('wknd-guides');

    // Replace the text with a new one where "WKND" is wrapped in a <span>
    wkndGuidesHeading.innerHTML = wkndGuidesHeading.innerHTML.replace(
        'WKND',
        '<span class="underline">WKND</span>'
    );
}



const aboutusBlocks = document.querySelectorAll('.aboutus.block > div');

aboutusBlocks.forEach(block => {
    // Create the social icons container
    const socialDiv = document.createElement('div');
    socialDiv.classList.add('social-icons');

    // Create the icon bar
    const iconBar = document.createElement('div');
    iconBar.classList.add('icon-bar');

    // Define Font Awesome icons
    const icons = {
        facebook: 'fab fa-facebook',
        twitter: 'fab fa-twitter',
        instagram: 'fab fa-instagram'
    };

    for (const [key, value] of Object.entries(icons)) {
        const iconDiv = document.createElement('div');
        iconDiv.classList.add('icon');

        // Create the Font Awesome icon element
        const iconElement = document.createElement('i');
        iconElement.className = value;

        // Append the icon to the icon div
        iconDiv.appendChild(iconElement);
        iconBar.appendChild(iconDiv);
    }

    // Append the icon bar to the social div
    socialDiv.appendChild(iconBar);

    // Append the social div below the profession
    block.appendChild(socialDiv);
});