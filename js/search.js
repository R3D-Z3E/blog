(function() {
    const searchInput = document.getElementById('search-input');
    const searchResults = document.getElementById('search-results');
    const searchStats = document.getElementById('search-stats');
    
    let fuse;
    
    // Fetch the search index
    fetch('/index.json')
        .then(response => response.json())
        .then(data => {
            const options = {
                keys: ['title', 'content', 'tags', 'categories', 'description'],
                threshold: 0.3,
                includeScore: true,
                minMatchCharLength: 2
            };
            fuse = new Fuse(data, options);
        })
        .catch(error => {
            console.error('Error loading search index:', error);
            searchStats.innerHTML = '<p class="error-message">Error loading search index. Please refresh the page.</p>';
        });
    
    // Search function
    function performSearch(query) {
        if (!fuse || query.length < 2) {
            searchResults.innerHTML = '';
            searchStats.innerHTML = '';
            return;
        }
        
        const results = fuse.search(query);
        
        if (results.length === 0) {
            searchResults.innerHTML = '<p class="no-results">No results found. Try different keywords.</p>';
            searchStats.innerHTML = '';
            return;
        }
        
        searchStats.innerHTML = `<p class="search-stat">Found ${results.length} result${results.length > 1 ? 's' : ''}</p>`;
        
        const resultsHTML = results.map(result => {
            const item = result.item;
            const date = new Date(item.date).toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
            });
            
            const categoryHTML = item.categories && item.categories.length > 0 ? 
                `<span class="result-category">${item.categories[0]}</span>` : '';
            
            const tagsHTML = item.tags && item.tags.length > 0 ? 
                `<div class="result-tags">${item.tags.map(tag => `<span class="result-tag">#${tag}</span>`).join(' ')}</div>` : '';
            
            const excerpt = item.description || (item.content ? item.content.substring(0, 150) + '...' : '');
            
            return `
                <article class="search-result-card">
                    <div class="result-header">
                        ${categoryHTML}
                        <span class="result-date">${date}</span>
                    </div>
                    <h2 class="result-title">
                        <a href="${item.permalink}">${item.title}</a>
                    </h2>
                    <p class="result-excerpt">${excerpt}</p>
                    ${tagsHTML}
                </article>
            `;
        }).join('');
        
        searchResults.innerHTML = resultsHTML;
    }
    
    // Event listener for input
    searchInput.addEventListener('input', (e) => {
        performSearch(e.target.value);
    });
    
    // Auto-focus on search input
    if (searchInput) {
        searchInput.focus();
    }
})();
