# ExpenseFlow - Personal Budget Manager

**ExpenseFlow** is a personal finance management application designed to help users track and manage their expenses effortlessly. With ExpenseFlow, users can categorize their spending, monitor their income, expenses, and savings, and make smarter financial decisions for a better future.

---

## Features

- **Track Expenses**: Log your daily expenses with ease.
- **Expense Categories**: Categorize your spending to better understand where your money is going.
- **Financial Summary**: View a summary of your income, expenses, and savings.
- **Charts and Visuals**: Use charts to visualize your spending trends over time.
- **Budget Limits**: Set and track your budget limits for various categories.
- **Responsive Design**: Fully responsive, works seamlessly on all devices.

---

## Installation

### Prerequisites

Ensure you have the following installed on your machine:

- **Node.js** (v16 or later recommended): [Download Node.js](https://nodejs.org/)
- **npm** (v7 or later recommended): npm is usually installed with Node.js.

---

### Setup

1. **Clone the repository** to your local machine:

   ```bash
   git clone https://github.com/Essie-wanjiru001/Personal-budget-manager.git

2. **Navigate to the project directory:**
   ```bash
   cd personal-budget-manager

3. **Install the required dependencies**
   ```bash
   npm install

4. **Start the development server**
  ```bash
  npm start

5. **Open your browser and go to http://localhost:3000 to access the app.**

## Project Structure
Here's an overview of the project structure:
/src
  /components      # Reusable components like Navbar, ExpenseSummary
  /assets          # Static assets (e.g., images, CSS)
  App.js           # Main app component
  index.js         # Entry point for React


### Key Files
LandingPage.js: Landing page component for the ExpenseFlow app. It contains a welcoming interface with an introduction to the app’s functionality.

Navbar.js: Navigation bar component, which helps users to navigate between different pages of the application.

ExpenseSummary.js: Component that shows the user's total income, expenses, savings, and budget limits using a summary and charts.

package.json: Project configuration file that contains the list of dependencies and scripts to run and build the app.

## Technologies Used
React: For building the user interface.
Chart.js: For visualizing data with charts.
React Router: For handling page routing.
CSS: For styling the application.
