# Rahul Debnath Portfolio

Live site: https://megam1n4.github.io/portfolio_rahul/

A professional, data-driven portfolio website for Rahul Debnath, focused on AI-enabled geospatial analytics, IoT systems, transportation resilience, and research experience.

This project presents academic work, professional experience, technical skills, achievements, and public profiles in a polished single-page layout with smooth scrolling, reveal animations, and dark/light theme support.

## Overview

The site is built as a lightweight front-end project using HTML, CSS, and JavaScript, with Vite configured for local development and preview. Portfolio content is centralized in a single data source, making updates straightforward without changing the page structure.

## Features

- Professional single-page portfolio layout
- Dark and light theme toggle with saved preference
- Data-driven rendering from a central JavaScript file
- Sections for summary, experience, skills, education, achievements, publications, and contact
- Smooth scrolling and scroll-triggered reveal effects
- Responsive layout for desktop and mobile screens
- External profile links for GitHub, LinkedIn, Google Scholar, and ResearchGate

## Tech Stack

- HTML5
- CSS3
- Vanilla JavaScript (ES Modules)
- Vite
- Font Awesome
- Google Fonts

## Project Structure

```text
portfolio_v1/
|-- index.html
|-- styles.css
|-- script.js
|-- data.js
|-- package.json
```

## Getting Started

### Prerequisites

- Node.js 18+ recommended
- npm

### Install dependencies

```bash
npm install
```

### Start the development server

```bash
npm run dev
```

### Build for production

```bash
npm run build
```

### Preview the production build

```bash
npm run preview
```

## Customization

Most portfolio content is managed in `data.js`.

Update the following there as needed:

- Name and contact details
- Professional summary and proposed endeavor
- Work experience entries
- Education details
- Skills by category
- Achievements and presentation links
- Public profile URLs

For layout and visual styling, edit `styles.css`.

For interaction logic such as theme switching, dynamic section rendering, and animations, edit `script.js`.

## Personal Assets

The homepage references a profile image named `profile.jpg` in the project root. If that file is missing, the site falls back to a placeholder image automatically.

## Deployment

This project can be deployed easily to any static hosting platform, including:

- GitHub Pages
- Vercel
- Netlify
- Firebase Hosting

If deploying with Vite, use the production output generated in the `dist/` directory after running the build command.

## Why This Portfolio Works

This portfolio is structured to present both technical depth and professional credibility. It highlights research, engineering, systems work, publications, and academic progression in a format that is easy for recruiters, faculty, and collaborators to review quickly.

## Author

Rahul Debnath  
Master's Student in Computer Science  
Focus: AI, IoT, geospatial analytics, transportation infrastructure resilience

## License

This project is for personal portfolio use.
