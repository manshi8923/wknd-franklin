const headerWrapper = document.querySelector('.header-wrapper');
const header = document.querySelector('.header');

// Create the upper header div
const upperHeader = document.createElement('div');
upperHeader.className = 'upper-header';

// Create text nodes to avoid printing HTML entities directly
const signInText = document.createTextNode('SIGN IN');
const enUsText = document.createTextNode('EN-US');

// Create a span for spacing
const space1 = document.createElement('span');
space1.innerHTML = '&nbsp;&nbsp;'; // Two non-breaking spaces
const space2 = document.createElement('span');
space2.innerHTML = '&nbsp;&nbsp;'; // Two non-breaking spaces after EN-US

// Append the elements to upperHeader
upperHeader.appendChild(signInText);
upperHeader.appendChild(space1);
upperHeader.appendChild(enUsText);
upperHeader.appendChild(space2);

// Insert the upper header before the existing header
headerWrapper.parentNode.insertBefore(upperHeader, headerWrapper);

// Create the logo link
const logoLink = document.createElement('a');
logoLink.href = '/'; // Redirect to the home page
logoLink.className = 'logo';
logoLink.textContent = 'WKND';

logoLink.style.color = 'black'; // Set text color to black
logoLink.style.textDecoration = 'none'; // Remove underline
// Append the logo to the header
header.prepend(logoLink); // Add logo to the left side

const hamburger = document.createElement('div');
hamburger.className = 'hamburger';
hamburger.innerHTML = '<div></div><div></div><div></div>';
header.appendChild(hamburger);

const nav = document.createElement('nav');
nav.className = 'nav';
nav.innerHTML = `
    <a href="/magazine">MAGAZINE</a>
    <a href="https://wknd.site/us/en/adventures.html">ADVENTURES</a>
    <a href="https://wknd.site/us/en/faqs.html">FAQS</a>
    <a href="/aboutus">ABOUT US</a>
`;
header.appendChild(nav);

const searchContainer = document.createElement('div');
searchContainer.className = 'search-container';
const searchInput = document.createElement('input');
searchInput.type = 'text';
searchInput.className = 'search-input';
searchInput.placeholder = 'Search';
const searchIcon = document.createElement('div');
searchIcon.className = 'search-icon';
searchIcon.innerHTML = '<i class="fas fa-search"></i>'; // Font Awesome search icon
searchContainer.appendChild(searchInput);
searchContainer.appendChild(searchIcon);
header.appendChild(searchContainer);

// Toggle navigation on hamburger click
hamburger.addEventListener('click', function () {
    nav.classList.toggle('active');
});

// Search functionality
searchIcon.addEventListener('click', function () {
    const query = searchInput.value.trim(); // Get the search input value
    if (query) {
        window.location.href = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
    }
});

// Also, handle pressing "Enter" in the search input
searchInput.addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
        const query = searchInput.value.trim();
        if (query) {
            window.location.href = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
        }
    }
});

// Scroll behavior
window.addEventListener('scroll', function () {
    if (window.scrollY > 0) {
        headerWrapper.classList.add('fixed');
    } else {
        headerWrapper.classList.remove('fixed');
    }
});

// Adjust CSS styles for search bar on window resize
function adjustSearchStyles() {
    if (window.innerWidth > 448) {
        searchInput.style.width = '150px'; // Default width
        searchContainer.style.marginLeft = 'auto'; // Push to the right
        searchContainer.style.flexDirection = 'row'; // Default alignment
    }
}

// Initial adjustment
adjustSearchStyles();
// Adjust on resize
window.addEventListener('resize', adjustSearchStyles);

// Create the modal container
// Create the modal container
const modal = document.createElement('div');
modal.className = 'modal';
modal.style.display = 'none'; // Initially hidden
modal.style.position = 'fixed';
modal.style.top = '0';
modal.style.left = '0';
modal.style.width = '100%';
modal.style.height = '100%';
modal.style.backgroundColor = 'rgba(0, 0, 0, 0.8)'; // Black background with opacity
modal.style.color = 'white';
modal.style.zIndex = '1000';
modal.style.justifyContent = 'center';
modal.style.alignItems = 'center';

// Create modal content
const modalContent = document.createElement('div');
modalContent.style.backgroundColor = 'black';
modalContent.style.padding = '20px';
modalContent.style.borderRadius = '8px';
modalContent.style.textAlign = 'center';

// Create the sign-in text
const signInHeader = document.createElement('h1');
signInHeader.textContent = 'SIGN IN';
signInHeader.style.fontSize = '28px';
signInHeader.style.textDecoration = 'underline';
signInHeader.style.textDecorationColor = 'yellow'; // Yellow underline
signInHeader.style.textDecorationThickness = '3px'; // Thickness of underline

// Add the sign-in header to the modal content
modalContent.appendChild(signInHeader);

// Add welcome message
const welcomeMessage = document.createElement('h2');
welcomeMessage.textContent = 'Welcome Back';
modalContent.appendChild(welcomeMessage);

// Create the username input
const usernameInput = document.createElement('input');
usernameInput.type = 'text';
usernameInput.placeholder = 'Username';
usernameInput.style.margin = '10px 0';
modalContent.appendChild(usernameInput);

// Create the password input
const passwordInput = document.createElement('input');
passwordInput.type = 'password';
passwordInput.placeholder = 'Password';
passwordInput.style.margin = '10px 0';
modalContent.appendChild(passwordInput);

// Create the sign-in button
const signInButton = document.createElement('button');
signInButton.textContent = 'SIGN IN';
signInButton.style.backgroundColor = 'yellow';
signInButton.style.color = 'black';
signInButton.style.border = 'none';
signInButton.style.padding = '6px';
signInButton.style.width = '100px';
signInButton.style.cursor = 'pointer';
signInButton.style.marginTop='20px';
modalContent.appendChild(signInButton);

// Append content to modal
modal.appendChild(modalContent);
document.body.appendChild(modal);

// Show modal when SIGN IN is clicked
signInText.parentNode.addEventListener('click', function () {
    modal.style.display = 'flex'; // Show modal
});

// Close modal on clicking outside the modal content
modal.addEventListener('click', function (event) {
    if (event.target === modal) {
        modal.style.display = 'none'; // Hide modal
    }
});

// Handle sign in button click
signInButton.addEventListener('click', function () {
    // Implement your sign-in logic here
    const username = usernameInput.value;
    const password = passwordInput.value;
    console.log('Username:', username);
    console.log('Password:', password);
    // Close modal after attempting sign-in
    modal.style.display = 'none';
});
