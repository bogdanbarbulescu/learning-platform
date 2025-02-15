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
                    moduleContentDiv.innerHTML += module.contentSrc;
                }
            }


            // Display all modules within a learning path, with navigation
            function displayModules(modules) {
                moduleContentDiv.innerHTML = ''; // Clear previous content

                // Create a container for module navigation
                const moduleNav = document.createElement('div');
                moduleNav.classList.add('module-nav', 'mb-3'); // Add some margin-bottom

				// Create "Previous" Button.
                const prevButton = document.createElement('button');
                prevButton.classList.add('btn', 'btn-secondary', 'me-2');
                prevButton.textContent = 'Previous';
                prevButton.disabled = true; // Initially disabled

				// Create "Next" Button.
                const nextButton = document.createElement('button');
                nextButton.classList.add('btn', 'btn-primary');
                nextButton.textContent = 'Next';

				//Create Module List
                const moduleList = document.createElement('select');
                moduleList.classList.add('form-select'); //Bootstrap class for select.

                modules.forEach((module, index) => {
                     const option = document.createElement('option');
                     option.value = index;
                     option.textContent = module.title;
                     moduleList.appendChild(option);
                });

                // Add event listeners for navigation
                let currentModuleIndex = 0;

                function updateModuleDisplay() {
                    displayModule(modules[currentModuleIndex]);
                    // Update button states
                    prevButton.disabled = currentModuleIndex === 0;
                    nextButton.disabled = currentModuleIndex === modules.length - 1;
                    //Update selected option in the dropdown
                    moduleList.value = currentModuleIndex;
                }

                prevButton.addEventListener('click', () => {
                    if (currentModuleIndex > 0) {
                        currentModuleIndex--;
                        updateModuleDisplay();
                    }
                });

                nextButton.addEventListener('click', () => {
                    if (currentModuleIndex < modules.length - 1) {
                        currentModuleIndex++;
                        updateModuleDisplay();
                    }
                });

                moduleList.addEventListener('change', () => {
                    currentModuleIndex = parseInt(moduleList.value);
                    updateModuleDisplay();
                })

                // Add buttons to the navigation container
                moduleNav.appendChild(prevButton);
                moduleNav.appendChild(nextButton);
                moduleNav.appendChild(moduleList);
                moduleContentDiv.appendChild(moduleNav);

                // Initially display the first module
                updateModuleDisplay();
            }

            // --- Event Listeners ---

            // Sidenav event listener
            const sidenavLinks = document.querySelectorAll('#sidebar .nav-link');
            sidenavLinks.forEach(link => {
                link.addEventListener('click', function(event) {
                    event.preventDefault();

                    // Remove active class from all links
                    sidenavLinks.forEach(l => l.classList.remove('active'));
                    // Add active class to the clicked link
                    this.classList.add('active');

                    const pathId = this.getAttribute('data-path');
                    const selectedPath = data.learningPaths.find(path => path.id === pathId);

                    if (selectedPath) {
                        displayModules(selectedPath.modules);
                    }

                    // Close the offcanvas after clicking a link (for mobile)
                    const offcanvas = document.getElementById('sidebar');
                    const bsOffcanvas = bootstrap.Offcanvas.getInstance(offcanvas);
                    if (bsOffcanvas) {
                        bsOffcanvas.hide();
                    }
                });
            });
        })
        .catch(error => {
            console.error('Error fetching or parsing data:', error);
            document.getElementById('dashboard').innerHTML = '<p>Error loading content.</p>'; //Keep error message.
        });
});
