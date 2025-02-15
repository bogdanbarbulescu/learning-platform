document.addEventListener('DOMContentLoaded', function() {
    const md = window.markdownit(); // Initialize markdown-it
    hljs.highlightAll(); // Initialize highlight.js

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
                    loadingIndicator.style.display = 'block';
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
                        })
                        .catch(error => {
                            console.error('Error fetching or rendering Markdown:', error);
                            moduleContentDiv.innerHTML += `<p>Error loading content for ${module.title}.</p>`;
                        })
                        .finally(() => {
                            loadingIndicator.style.display = 'none';
                        });
                } else if (module.contentType === 'html') {
                    //  This should no longer happen, but it's good to have it for safety.
                    moduleContentDiv.innerHTML += module.contentSrc;
                }
            }

            // --- Populate Sidenav with MODULES ---
            function populateSidenav(learningPaths) {
                sidenavLinksContainer.innerHTML = ''; // Clear any existing links

                learningPaths.forEach(path => {
                    // Add a heading for the learning path
                    const pathHeading = document.createElement('h6');
                    pathHeading.classList.add('sidebar-heading', 'd-flex', 'justify-content-between', 'align-items-center', 'px-3', 'mt-4', 'mb-1', 'text-muted');
                    pathHeading.textContent = path.title;
                    sidenavLinksContainer.appendChild(pathHeading);


                    path.modules.forEach(module => { // Iterate through MODULES
                        const listItem = document.createElement('li');
                        listItem.classList.add('nav-item');

                        const link = document.createElement('a');
                        link.classList.add('nav-link');
                        link.href = '#';
                        link.setAttribute('data-module-id', module.id); // Use module ID
                        link.textContent = module.title; // Module title

                        listItem.appendChild(link);
                        sidenavLinksContainer.appendChild(listItem);

                        // --- Event Listener for Module Links ---
                        link.addEventListener('click', function(event) {
                            event.preventDefault();

                            // Remove active class from all links
                            const allLinks = document.querySelectorAll('#sidenav-links .nav-link');
                            allLinks.forEach(l => l.classList.remove('active'));

                            // Add active class to the clicked link
                            this.classList.add('active');

                            // Display the clicked module directly
                            displayModule(module);


                            // Close the offcanvas (for mobile)
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
