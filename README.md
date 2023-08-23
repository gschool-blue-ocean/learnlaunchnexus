![icons8-javascript](https://github.com/gschool-blue-ocean/learnlaunchnexus/assets/127983785/94b414c5-02b9-4f5b-83ac-b78c38bb9c99) 
<p align="center">
<img src="logo_200x200.png"/>
</p>

# Learn Launch Nexus

Welcome to the Learn Launch Nexus README! This document provides an in-depth overview of the project's structure, files, components, and intricacies.


## Tech Stack


## Table of Contents

- [Introduction](#introduction)
- [Project Structure](#project-structure)
  - [Public Directory](#public-directory)
  - [Source Directory](#source-directory)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Configuration](#configuration)
- [Features](#features)
  - [User Authentication](#user-authentication)
  - [User Roles](#user-roles)
  - [Dashboard](#dashboard)
  - [Profile Information](#profile-information)
  - [Assignment Submissions](#assignment-submissions)
  - [Setting Dropdown](#setting-dropdown)
  - [Calendar](#calendar)
  - [Todo List](#todo-list)
  - [Responsive Design](#responsive-design)
- [Components](#components)
- [Styling](#styling)
- [API Integration](#api-integration)
- [Testing Suites](#testing-suites)
  - [Login](#login)
  - [Student and Admin Roles](#student-and-admin-roles)
  - [Todo List and Calendar Features](#todo-list-and-calendar-features)
- [Contributing](#contributing)
- [License](#license)

## Introduction

The Learn Launch Nexus Application is a web-based platform designed to assist students and administrators within a learning institution. This README provides comprehensive insights into the project's structure, features, components, and testing suites.

## Project Structure

The project adheres to a structured organization that promotes maintainability and modularity:

### Public Directory

The public directory holds static assets like images and the HTML file that serves as the entry point for the application.

### Source Directory

The src directory contains the core application code, organized into various subdirectories:

- components: Contains reusable React components grouped by their respective functionalities.
- css: Holds CSS module files for styling components.
- pages: Includes top-level pages that are rendered based on routes.
- index.js: The main entry point of the application.

## Getting Started

### Prerequisites

Before you begin, ensure you have the following tools installed:

- Node.js
- npm (Node Package Manager)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/learnlaunchnexus.git
   cd learnlaunchnexus
   ```

2. Install dependencies:

   ```bash
   npm install
    
   ```

### Running the App

1. Start the application:

   ```bash
   npm run build
   npm run dev_deploy
   ```

2. Access the application in your browser at your localhost.

### Configuration

The application uses environment variables for configuration. Create a `.env` file in the project root and configure variables such as database URLs, API endpoints, and secrets that come in the .env example file.

## Features

### User Authentication

The application provides a secure login system where users can authenticate with their email and password.

### User Roles

The application distinguishes between student and administrator roles, offering role-specific functionalities.

### Dashboard

The personalized dashboard provides users with an overview of their tasks, assignments, and settings.

### Profile Information

The dashboard displays user-specific information such as name, location, and desired location in the case of a student.

### Assignment Submissions

Students can submit assignments through a dedicated submission component,  where admin can submit feedback for those submissions.

### Setting Dropdown

Administrators have access to a setting dropdown that offers specific administrative functionalities like chaging email and making an user an admin.

### Calendar

The calendar feature allows users to view and select dates, enhancing planning and task management.

### Todo List

Users can manage their tasks using the Todo List feature, promoting organization and productivity.

### Responsive Design

The application is designed responsively, ensuring optimal user experiences across various devices.


## Styling

Styling is achieved using CSS modules, where styles are scoped to specific components. The css directory holds module files that are imported into components.

## API Integration

The application interacts with an API for data retrieval and submission, with the API base URL configured using environment variables.

## Testing Suites

The project features comprehensive testing suites that cover various functionalities, ensuring stability and reliability.

### Login

The login process is secured, allowing users to access their respective dashboards upon successful authentication.

### Student and Admin Roles

The application differentiates between student and administrator roles, granting access to functionalities based on user roles.

### Todo List and Calendar Features

The Todo List and Calendar features enhance user productivity and organization by facilitating task management and date selection.

## Contributing

To contribute, fork the repository, create a new branch, commit your changes, and open a pull request.

## License

This project is licensed under the MIT License.

Feel free to explore the project's components, features, and functionalities. For more detailed instructions or customization guidelines, refer to specific sections and files in the project.

## Contributors

| [**Sean Guerrero**](https://github.com/seang549) | [**Benjamin Schenk**](https://github.com/BenjaminSchenk) |
|--------------------------------------------------|---------------------------------------------------------|
| [**Joey Laspe**](https://github.com/joelaspe)    | [**Patrick McGinnis**](https://github.com/PatDMcG)     | 
| [**Pedro Modesto**](https://github.com/pedrovily1) 


Happy coding!
```
