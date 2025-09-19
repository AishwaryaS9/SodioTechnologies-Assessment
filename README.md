# Dashboard for a Book Management App

## 🚀 Project Overview

A responsive React.js with Typescript dashboard for managing books — built with React Query, Formik, Tailwind CSS, and Redux Toolkit.
Supports CRUD operations via a mock API [https://crudcrud.com/](https://crudcrud.com/)

**Note**: The [https://crudcrud.com/](https://crudcrud.com/) API allows only 100 requests per API key. Once the key expires, you will need to generate a new API key and re-add books to test the workflow.

---

## 🌐 Live URL & Repository

- **Live Application**: [https://book-management-dashboard-assessmen.vercel.app/](https://book-management-dashboard-assessmen.vercel.app/)

- **GitHub Repository**: [https://github.com/AishwaryaS9/SodioTechnologies-Assessment.git](https://github.com/AishwaryaS9/SodioTechnologies-Assessment.git)

---

## ✨ Features

### 📊 Dashboard

- Displays books in a responsive grid layout.

- Supports search by title/author, filter by genre and availability, and pagination (10 books per page).

- Optimized to be fully responsive across all screen sizes.

- Skeleton loaders provide smooth UX while fetching data.

### 📖 Add New Book

- Add new books effortlessly using a Formik-powered form.

- Ensure data integrity with comprehensive Yup validation for all fields.

- Automatically redirect users back to the dashboard upon successful submission.

- Real-time validation feedback and error handling improve user experience.

### 📝 Edit Book

- Modify existing book details quickly through a user-friendly modal.

- Opens an edit modal pre-filled with selected book details for easy updates.

- Submits changes via a PUT request to the backend, ensuring data consistency.

- Displays success or error notifications immediately after submission.

- Smooth modal transitions and validation feedback improve usability.

### 🗑️ Delete Book

- Each book card features a Delete button for quick removal.

- Clicking delete opens a confirmation alert modal to prevent accidental deletions.

- Users must explicitly confirm deletion before any data is removed.

- Sends a DELETE request to the backend upon confirmation.

- Automatically refreshes the book list after successful deletion.

- Provides toast notifications for both success and error scenarios.

### 🛠️ Tech Stack

- **Frontend**: React.js, TypeScript, Vite

- **State Management**: Redux Toolkit

- **Styling**: Tailwind CSS

- **Icons**: react-icons

- **Data Fetching**: React Query, Axios

- **Notifications**: react-hot-toast

- **Routing**: React Router

### 📌 Deployment

Hosted on [Vercel](https://vercel.com/) for fast, reliable, and scalable deployment.

---

## 📂 Project Structure

```
book-management-app/
├── .env
├── .gitignore
├── eslint.config.js
├── index.html
├── package-lock.json
├── package.json
├── public/
├── README.md
├── src/
│   ├── api/
│   │   ├── endpoint.ts
│   ├── App.tsx
│   ├── assets/
│   ├── components/
│   │   ├── BookCard.tsx
│   │   ├── DeleteAlert.tsx
│   │   ├── EditBookModal.tsx
│   │   ├── layout/
│   │   │   ├── DashboardLayout.tsx
│   │   │   ├── Navbar.tsx
│   │   │   ├── SideMenu.tsx
│   │   ├── Pagination.tsx
│   │   ├── SelectDropdown.tsx
│   │   ├── SkeletonLoader/
│   │   │   ├── BookCardSkeleton.tsx
│   ├── index.css
│   ├── main.tsx
│   ├── pages/
│   │   ├── AddBook.tsx
│   │   ├── Dashboard.tsx
│   ├── redux/
│   │   ├── store/
│   │   │   ├── hooks.ts
│   │   │   ├── index.ts
│   │   │   ├── slice/
│   │   │   │   ├── bookSlice.ts
│   ├── utils/
│   │   ├── data.ts
│   │   ├── interface.ts
│   ├── vite-env.d.ts
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.node.json
├── vercel.json
├── vite.config.ts
```

## 🚀 Getting Started

### Setup:

1.  Clone the repository:

    ```bash
    git clone https://github.com/AishwaryaS9/SodioTechnologies-Assessment.git
    ```

2.  Navigate to the project directory:
    ```bash
    cd SodioTechnologies-Assessment-main
    ```
3.  Install dependencies:

    ```bash
    npm install
    ```

4.  Set up environment variables:

    Create a .env file and add the following:

    ```bash
    VITE_CRUDCRUD_API_KEY=your_crudcrud_api_key
    ```

5.  Run the application:

    ```bash
    npm run dev
    ```

6.  Open [http://localhost:5173](http://localhost:5173) in your browser to see the app.

## 🎯 Conclusion

The Book Management Dashboard is a clean, scalable, and user-friendly solution for efficiently managing a collection of books. It highlights how modern tools like React, Redux Toolkit, React Query, and Formik can be seamlessly combined to build a production-ready CRUD application with powerful features like real-time search, dynamic filtering, and smooth pagination.
