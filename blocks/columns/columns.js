// Adjust font sizes and colors of the text
const textDiv = document.querySelector('.columns-wrapper .columns > div > div:last-child');
const paragraphs = textDiv.querySelectorAll('p');

if (paragraphs.length > 0) {
    paragraphs[0].style.fontSize = '18px';
    paragraphs[0].style.fontWeight = 'normal'; // Remove strong styling

    if (paragraphs.length > 1) {
        paragraphs[1].style.fontSize = '15px';
        paragraphs[1].style.color = 'gray';
        paragraphs[1].style.fontWeight = 'normal'; // Remove strong styling
    }
}

// Add margin left to the text div
textDiv.style.marginLeft = '20px';

// Remove existing images (assumes they are in the same div)
const existingImages = textDiv.querySelectorAll('picture');
existingImages.forEach(img => img.remove());

// Create a div for social media icons
const socialContainer = document.createElement('div');
socialContainer.className = 'social-icons'; // Assign class for styling
socialContainer.style.display = 'flex'; // Align icons in a row
socialContainer.style.marginTop = '10px'; // Optional: Add some margin at the top

// Define the social links
const socialLinks = [
    { href: 'https://facebook.com', iconClass: 'fab fa-facebook-f' },
    { href: 'https://instagram.com', iconClass: 'fab fa-instagram' },
    { href: 'https://twitter.com', iconClass: 'fab fa-twitter' }
];

// Create icons
socialLinks.forEach(link => {
    const a = document.createElement('a');
    a.href = link.href;
    a.target = '_blank'; // Open link in a new tab

    const div = document.createElement('div');
    div.className = 'icon-container'; // Container for the icon
    div.innerHTML = `<i class="${link.iconClass}" style="color: white; font-size: 24px;"></i>`; // Add Font Awesome icon

    div.style.width = '40px'; // Set width
    div.style.padding='10px';
    div.style.height = '10px'; // Set height
    div.style.backgroundColor = 'black'; // Background color
    div.style.display = 'flex'; // Allow flex display for centering
    div.style.justifyContent = 'center'; // Center the icon
    div.style.alignItems = 'center'; // Center vertically
    div.style.marginRight = '10px'; // Add space between icons

    a.appendChild(div);
    socialContainer.appendChild(a);
});

// Append the social icons to the existing div
textDiv.appendChild(socialContainer);

