# InspireAI

Welcome to InspireAI, your personal companion to build better habits and live a more inspired life. This project is a full-stack web application that allows users to track their habits, monitor their progress, and gain insights to help them stay motivated.

## Tech Stack

- **Framework**: [Next.js](https://nextjs.org/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Database**: [SQLite](https://www.sqlite.org/index.html)
- **ORM**: [Prisma](https://www.prisma.io/)

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

- Node.js (v18 or later)
- npm

### Installation

1.  Clone the repo
    ```sh
    git clone https://github.com/your_username/InspireAI.git
    ```
2.  Navigate to the `web-app` directory
    ```sh
    cd InspireAI/web-app
    ```
3.  Install NPM packages
    ```sh
    npm install
    ```
4.  Set up the database
    ```sh
    npx prisma db push
    ```
5.  Run the development server
    ```sh
    npm run dev
    ```
6.  Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Current Features

- **Habit Creation**: Users can create new habits, specifying a name, description, and whether it's a "good" or "bad" habit.
- **Habit Dashboard**: Users can view all their habits in a clean, card-based layout.
- **Full-Stack Architecture**: A modern setup using Next.js for both the frontend and API routes.
- **Database Persistence**: Habit data is stored in a SQLite database via Prisma.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
