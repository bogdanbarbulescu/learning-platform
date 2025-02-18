document.addEventListener('DOMContentLoaded', function() {
    const md = window.markdownit(); // Initialize markdown-it

    fetch('data/content.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok: ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            const dashboard = document.getElementById('dashboard');
            const moduleContentDiv = document.getElementById('module-content');
            const loadingIndicator = document.getElementById('loading-indicator');
            const sidenavLinksContainer = document.getElementById('sidenav-links'); // Get the ul

            // --- Helper Functions ---

            // Display a single module's content
            function displayModule(module) {
                moduleContentDiv.innerHTML = `<h3>${module.title}</h3>`;

                if (module.contentType === 'markdown') {
                    loadingIndicator.style.display = 'flex'; // Show and style the indicator
                    fetch(module.contentSrc)
                        .then(response => {
                            if (!response.ok) {
                                throw new Error(`Failed to fetch Markdown: ${response.statusText}`);
                            }
                            return response.text();
                        })
                        .then(markdownText => {
                            const htmlContent = md.render(markdownText);
                            moduleContentDiv.innerHTML += htmlContent;
                            hljs.highlightAll(); // Initialize highlight.js AFTER rendering Markdown

                        })
                        .catch(error => {
                            console.error('Error fetching or rendering Markdown:', error);
                            moduleContentDiv.innerHTML += `<p>Error loading content for ${module.title}.</p>`;
                        })
                        .finally(() => {
                            loadingIndicator.style.display = 'none'; // Hide the indicator
                        });
                } else if (module.contentType === 'html') {
                    //  This should no longer happen, but it's good to have it for safety.
                    moduleContentDiv.innerHTML += module.contentSrc;
                }
            }


           // --- Populate Sidenav with Learning Paths and Modules ---
            function populateSidenav(learningPaths) {
                sidenavLinksContainer.innerHTML = ''; // Clear existing links

                learningPaths.forEach(path => {
                    // Create a heading for the Learning Path
                    const pathHeading = document.createElement('h6');
                    pathHeading.textContent = path.title;
                    pathHeading.classList.add('sidebar-heading'); // Add a class for styling
                    sidenavLinksContainer.appendChild(pathHeading);

                    // Now, create the module links *within* this learning path
                    path.modules.forEach(module => {
                        const listItem = document.createElement('li');
                        listItem.classList.add('nav-item');

                        const link = document.createElement('a');
                        link.classList.add('nav-link');
                        link.href = '#';
                        link.setAttribute('data-module-id', module.id);
                        link.textContent = module.title;

                        listItem.appendChild(link);
                        sidenavLinksContainer.appendChild(listItem);

                        link.addEventListener('click', function(event) {
                            event.preventDefault();
                            const allLinks = document.querySelectorAll('#sidenav-links .nav-link');
                            allLinks.forEach(l => l.classList.remove('active'));
                            this.classList.add('active');
                            displayModule(module);

                            const offcanvas = document.getElementById('sidebar');
                            const bsOffcanvas = bootstrap.Offcanvas.getInstance(offcanvas);
                            if (bsOffcanvas) {
                                bsOffcanvas.hide();
                            }
                        });
                    });
                });
            }


            // --- Initial Setup ---
            populateSidenav(data.learningPaths); // Populate sidenav on load

        })
        .catch(error => {
            console.error('Error fetching or parsing data:', error);
            document.getElementById('dashboard').innerHTML = '<p>Error loading content.</p>';
        });
});
