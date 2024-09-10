# Invoice Analysis App

An intuitive and user-friendly web app designed to help you upload, analyze, and visualize invoice data. This app provides a structured layout to help users easily manage file uploads, view invoice totals, and analyze invoice data across various sites.

# Table of Contents

<!--ts-->

- [Features](#Features)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Technologies Used](#technologies-used)
- [Screenshots](#screenshots)
- [Contributing](#contributing)
- [License](#license)
<!--ts-->

# Features

File Upload & Management: Upload invoice files and clear them with ease.
Invoice Overview: Displays a summary of grand totals and site-specific totals.
Dynamic Invoice Tabs: Navigate between invoice details by selecting tabs generated dynamically based on uploaded data.
API Integration: Fetches invoice data from a backend API, displays results in a tabular format.
Toast Notifications: Informative popups for actions like successful uploads and errors.
Loading Spinner: Indicates progress while fetching data from the API.
Reusability: The app is designed to promote reusability with shared components such as buttons and tables.

# Installation

To set up the app locally, follow the steps below:

1. Clone the repository:

```bash
git clone https://github.com/yourusername/invoice-analysis-app.git
cd invoice-analysis-app
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Build for production:

```bash
npm run build
```

5. Run tests:

```bash
npm run test
```

# Usage

1. Upload Invoice Files: Navigate to the home page and use the file upload section to upload invoice data.
2. Start Calculation: Once files are uploaded, click on the Start Calculation button to analyze invoice data.
3. View Results: Invoice data is displayed in the invoice section where you can toggle between a grand total and site-specific totals using the dynamically created tabs.

# Project Structure

Here's a quick overview of the folder structure:

```
src/
│
├── components/
│   ├── FileUpload/        # Handles file uploads and management
│   ├── InvoiceSection/    # Displays dynamic invoice data and tabs
│   └── common/            # Shared components like Button, Table, etc.
│
├── pages/
│   ├── Home/
│   └── Admin/
│
├── services/              # API service for interacting with the backend
│
├── App.tsx                # Main entry point for the app
├── index.tsx              # Renders the root of the React app
└── ...
```

# Technologies Used

React: For building the user interface.
TypeScript: Ensures type safety and reduces bugs during development.
Vite: For a faster and more efficient development setup.
SCSS: Provides modular and reusable styles using the BEM convention.
Axios: Handles API requests.
Shadcn UI: A clean and flexible UI framework for building custom components.
Vitest: For unit and integration testing.

# Screenshots

File Upload & Invoice Overview
<img src="path_to_screenshot_1" alt="File Upload and Invoice Overview" width="600">
Dynamic Invoice Tabs
<img src="path_to_screenshot_2" alt="Dynamic Invoice Tabs" width="600">
Invoice Data Table
<img src="path_to_screenshot_3" alt="Invoice Data Table" width="600">

# Contributing

We welcome contributions to the project! Feel free to submit a pull request or report an issue.

To contribute:

1. Fork the repository.
2. Create a new branch `(git checkout -b feature-branch-name)`.
3. Commit your changes `(git commit -m 'Add new feature')`.
4. Push to the branch `(git push origin feature-branch-name)`.
5. Open a Pull Request.

# License

This project is licensed under the MIT License. See the LICENSE file for more details.
