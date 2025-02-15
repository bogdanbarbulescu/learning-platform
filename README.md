# IT Skills Learning Platform

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

This is a web-based learning platform designed to help users develop intermediate-level IT skills.  It features a modular design, dynamic content loading, and a responsive user interface.  The platform is built with HTML, CSS, JavaScript, Bootstrap 5, and utilizes the Fetch API for AJAX requests.  It also incorporates `markdown-it` for rendering Markdown content and is designed to be easily extendable.

## Features

*   **No Login Required:** Access the platform without any registration or login.
*   **Dynamic Content Loading:** Learning content is loaded dynamically from a `content.json` file, making the platform scalable and easy to update.
*   **Responsive Design:** The platform is designed to work seamlessly on mobile devices, tablets, and desktops.
*   **Dark Theme:** A visually appealing dark theme enhances readability and reduces eye strain.
*   **Modular Structure:** Learning content is organized into learning paths, each consisting of multiple modules.
*   **Markdown Support:** Module content can be written in Markdown for easier content creation and management.
*   **Modern UI:** Utilizes Bootstrap 5 for a clean and modern user interface, including cards with hover effects and a responsive sidenav.

## Topics Covered

The platform currently includes learning paths on the following topics:

*   Network Fundamentals
*   DevOps Practices
*   Programming Concepts
*   Artificial Intelligence (AI) Basics

## File Structure

project/
├── assets/
│ ├── css/
│ │ └── style.css (Custom styles)
│ ├── js/
│ │ └── script.js (JavaScript logic)
│ └── img/ (Images for learning paths)
├── data/
│ ├── content.json (JSON data for learning paths and modules)
│ └── modules/ (Directory for Markdown files)
│ ├── network-basics.md
│ ├── devops-intro.md
│ └── ...
├── index.html (Main HTML file)
└── README.md (This file)

## Technologies Used

*   HTML5
*   CSS3
*   JavaScript (ES6+)
*   Bootstrap 5
*   Fetch API (for AJAX)
*   markdown-it (for Markdown rendering)

## Getting Started

1.  **Clone the repository:**

    ```bash
    git clone <repository_url>
    ```

2.  **Navigate to the project directory:**

    ```bash
    cd <project_directory>
    ```

3.  **Open `index.html` in your web browser.**  No server is required; the application runs entirely client-side.

## How to Add Content

1.  **Modify `content.json`:** Add new learning paths or modules by updating the JSON data.  Follow the existing structure:

    ```json
    {
      "learningPaths": [
        {
          "id": "unique-id",
          "title": "Learning Path Title",
          "description": "Short description.",
          "image": "assets/img/image-name.jpg",
          "modules": [
            {
              "id": "unique-module-id",
              "title": "Module Title",
              "description": "Module description.",
              "contentType": "markdown" | "html",
              "contentSrc": "data/modules/module-file.md" | "<p>Inline HTML content</p>"
            }
            // ... more modules ...
          ]
        }
        // ... more learning paths ...
      ]
    }
    ```
2. **Create Markdown Files (if needed):**  If you set `"contentType": "markdown"`, create a corresponding `.md` file in the `data/modules/` directory.

3. **Add Images (if needed):** Place any new images referenced in `content.json` in the `assets/img/` directory.

## Contributing

Contributions are welcome! If you'd like to contribute, please follow these steps:

1.  Fork the repository.
2.  Create a new branch for your feature or bug fix.
3.  Make your changes and commit them with clear messages.
4.  Push your branch to your forked repository.
5.  Submit a pull request.

## Future Enhancements (Planned)

*   Module Navigation (Next/Previous buttons or Module List)
*   Loading Indicators
*   Improved Error Handling
*   Syntax Highlighting for Code Examples
*   Search Functionality
*   Progress Tracking (Conceptual - No Backend)
*   Theming options.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details (you should create a LICENSE file in your project root and put the MIT license text in it).