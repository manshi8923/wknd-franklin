export async function decorate(block) {
    // Hide the button container
    const buttonContainer = block.querySelector('.button-container');
    if (buttonContainer) {
        buttonContainer.style.display = 'none';
    }

    // Find the JSON URL
    const articlesURL = block.querySelector('a[href*=".json"]');
    
    if (articlesURL) {
        // Fetch data from the JSON URL
        const response = await fetch(articlesURL.href);
        const articlesData = await response.json();
        
        // Filter the articles
        const magazineArticles = articlesData.data.filter(article => 
            article.path.startsWith('/magazine/') && article.path !== '/magazine/'
        );
        //filter the articles based on the templates
        const data=articlesData.data.filter(article=>article.template==='magazine');
        // Create a wrapper for article cards
        const articleList = document.createElement('div');
        articleList.classList.add('article-list-wrapper');

        // Create article cards
        magazineArticles.forEach(article => {
            const articleCard = document.createElement('div');
            articleCard.classList.add('article-card');

            const link = document.createElement('a');
            link.href = article.path;
            link.classList.add('article-card-link');

            const img = document.createElement('img');
            img.src = article.image;
            img.alt = article.title;
            img.classList.add('article-card-image');

            const title = document.createElement('h2');
            title.classList.add('article-card-title');
            title.textContent = article.title;

            const description = document.createElement('p');
            description.classList.add('article-card-description');
            description.textContent = article.description || article.title;

            link.appendChild(img);
            link.appendChild(title);
            link.appendChild(description);
            articleCard.appendChild(link);
            articleList.appendChild(articleCard);
        });

        // Append the article list to the block
        block.appendChild(articleList);
    } else {
        console.error('No JSON URL found in the block');
    }
}

export default decorate;
