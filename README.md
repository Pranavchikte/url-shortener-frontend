# LinkLoom: Frontend Interface

This is the official frontend for **LinkLoom**, a high-performance URL shortener. Built with **Next.js** and **Tailwind CSS**, this application provides a clean, modern, and responsive user interface for interacting with the LinkLoom backend API.

---

## 🚀 Functionality

- **Shorten URLs**: A simple and intuitive form to submit long URLs and receive a shortened version instantly.
- **Session History**: View a real-time list of all links created during the current browser session.
- **One-Click Copy**: Easily copy the generated short link to the clipboard for sharing.
- **Responsive Design**: A seamless user experience across all devices, from mobile to desktop.

---

## 🛠️ Technologies Used

This project leverages a modern, production-ready frontend stack to ensure performance, scalability, and an excellent developer experience.

| Technology       | Role & Justification                                                                                                                                         |
|------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **Next.js (React)**     | The core framework for building the user interface. Chosen for its powerful features like the App Router, server-side rendering, and seamless development. |
| **TypeScript**         | Used for all application code to provide robust type safety. Prevents common bugs and improves code maintainability.                                   |
| **Tailwind CSS**       | A utility-first CSS framework for rapid UI development. Enables building custom, responsive designs directly in the markup.                            |
| **Axios**              | HTTP client used to communicate with the backend API. Offers a simple, promise-based API for handling requests and responses efficiently.              |
| **Lucide React**       | Provides a clean, lightweight, and consistent set of icons used throughout the UI.                                                                    |
| **react-hot-toast**    | Library for displaying non-intrusive notifications (toasts) for immediate user feedback.                                                              |
| **Vercel**             | The designated deployment platform. Offers zero-configuration, globally distributed hosting for best performance.                                      |

---

## 🏁 Getting Started

Follow these instructions to set up and run the project locally for development.

### Prerequisites

- Node.js (version 18.x or higher)
- npm (comes with Node.js)
- Git
- The LinkLoom backend must be running locally.

### Installation

1. **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/linkloom-frontend.git
    cd linkloom-frontend
    ```

2. **Install dependencies:**
    ```bash
    npm install
    ```

3. **Configure Environment Variables:**

    Create a new file named `.env.local` in the root of your project. This file will tell your frontend where the backend is running.

    ```env
    # .env.local

    # The URL of your locally running backend server
    NEXT_PUBLIC_API_URL=http://localhost:8000
    ```

### Running the Application

1. **Start the development server:**
    ```bash
    npm run dev
    ```

2. **Open the application:**

    Open your browser and navigate to [http://localhost:3000](http://localhost:3000). You should see the application running.

---

## 🔌 API Connection

This application consumes the REST API provided by the LinkLoom backend.  
For detailed information about the API endpoints, data models, and status codes, please refer to the backend's documentation.

---



## 📄 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
