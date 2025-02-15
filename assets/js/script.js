// Sidebar Toggle (Keep this part)
let sidebarOpen = false;
const sidebar = document.getElementById('sidebar');

function toggleSidebar() {
    if (!sidebarOpen) {
        sidebar.classList.add('active');
        sidebarOpen = true;
    } else {
        sidebar.classList.remove('active');
        sidebarOpen = false;
    }
}

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
            // const dashboard = document.getElementById('dashboard'); // No longer needed
            const moduleContentDiv = document.getElementById('module-content');

            // Function to display modules (modified to handle Markdown)
            function displayModules(modules) {
              moduleContentDiv.innerHTML = ''; // Clear previous content

              modules.forEach(module => {
                const moduleElement = document.createElement('div');
                moduleElement.innerHTML = `<h3>${module.title}</h3>`;

                if (module.contentType === 'markdown') {
                  // Fetch and render Markdown content
                  fetch(module.contentSrc)
                    .then(response => {
                      if (!response.ok) {
                        throw new Error(`Failed to fetch Markdown: ${response.statusText}`);
                      }
                      return response.text();
                    })
                    .then(markdownText => {
                      const htmlContent = md.render(markdownText); // Convert Markdown to HTML
                      moduleElement.innerHTML += htmlContent;
                      moduleContentDiv.appendChild(moduleElement);
                    })
                    .catch(error => {
                      console.error('Error fetching or rendering Markdown:', error);
                      moduleElement.innerHTML += '<p>Error loading Markdown content.</p>';
                      moduleContentDiv.appendChild(moduleElement);
                    });
                } else if (module.contentType === 'html') {
                  // Directly display HTML content
                  moduleElement.innerHTML += module.contentSrc;
                  moduleContentDiv.appendChild(moduleElement);
                }
              });
            }



            // Sidenav event listener (no changes needed here)
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
                });
            });
        })
        .catch(error => {
            console.error('Error fetching or parsing data:', error);
           // document.getElementById('dashboard').innerHTML = '<p>Error loading content.</p>'; No longer needed
           moduleContentDiv.innerHTML = '<p>Error loading content.</p>';
        });
});