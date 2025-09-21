This document provides a comprehensive overview and documentation for the **QuickOffer AI** project, a full-stack web application designed to streamline the creation of business proposals using artificial intelligence.

### Project Overview

QuickOffer AI is a powerful tool that enables users to generate professional business proposals quickly and efficiently. It combines a modern React frontend with a robust Python backend, leveraging the capabilities of various AI and OCR services to automate the proposal creation process. Users can upload document templates, input client and product data, and let the AI generate a polished proposal, which can then be downloaded in various formats.

### Features

  * **User Authentication:** Secure user registration and login functionality, with profile management capabilities.
  * **AI-Powered Proposal Generation:** Utilizes services like OpenAI, DeepSeek, and Yandex to generate proposal text based on user-provided templates and data.
  * **OCR (Optical Character Recognition):** Extracts text from uploaded documents (PDF, images) using services like EasyOCR, Google Vision, and Tesseract.
  * **File Management:** Allows users to upload and manage templates and product data files in various formats (PDF, DOCX, XLSX, CSV, images).
  * **Dashboard and Analytics:** Provides users with a dashboard to view key metrics and charts related to their proposals and sales activities.
  * **Responsive UI:** A modern and responsive user interface built with React, TypeScript, and Tailwind CSS, ensuring a seamless experience across different devices.

### Technologies Used

**Frontend:**

  * **Framework/Library:** React 18
  * **Language:** TypeScript
  * **Build Tool:** Vite
  * **Styling:** Tailwind CSS
  * **Routing:** React Router v7
  * **HTTP Client:** Axios
  * **UI Components:** Material-UI (MUI), Font Awesome
  * **File Handling:** React Dropzone, pdf-lib, docx

**Backend:**

  * [cite\_start]**Framework:** FastAPI [cite: 4]
  * [cite\_start]**Language:** Python [cite: 16]
  * [cite\_start]**Database:** PostgreSQL (inferred from `psycopg2` dependency) [cite: 4]
  * [cite\_start]**ORM:** SQLAlchemy [cite: 4]
  * [cite\_start]**Authentication:** JWT with `python-jose` and `passlib` [cite: 4]
  * [cite\_start]**AI/OCR Services:** OpenAI [cite: 4][cite\_start], DeepSeek [cite: 4][cite\_start], Google Cloud Vision [cite: 4][cite\_start], Yandex Cloud ML SDK [cite: 4][cite\_start], EasyOCR [cite: 4]

-----

### Setup and Installation

To set up and run the project locally, follow these steps:

1.  **Clone the repository.**
2.  **Set up the backend:**
      * [cite\_start]Navigate to the `backend` directory[cite: 5].
      * [cite\_start]Create and activate a virtual environment[cite: 5]:
        ```bash
        python -m venv venv
        .\venv\Scripts\activate
        ```
      * [cite\_start]Install the required Python packages[cite: 5]:
        ```bash
        pip install -r requirements.txt
        ```
      * [cite\_start]Create a `.env` file in the root directory and add the necessary environment variables (database URL, API keys, etc.), as defined in `env.example`[cite: 20].
      * [cite\_start]Run the backend server[cite: 5]:
        ```bash
        uvicorn app.main:app --reload
        ```
3.  **Set up the frontend:**
      * Navigate to the root project directory.
      * Install the required npm packages:
        ```bash
        npm install
        ```
      * [cite\_start]Create a `.env` file in the root directory and add the `VITE_API_BASE_URL` variable, pointing to the backend API[cite: 18].
      * Run the frontend development server:
        ```bash
        npm run dev
        ```

[cite\_start]The application should now be running locally, with the frontend accessible at `http://localhost:5173` and the backend at `http://localhost:8000`[cite: 16].

-----

### Frontend Documentation

#### Project Structure

The frontend is organized into a standard React project structure:

  * `src/api/`: Contains the Axios instance for making API requests.
  * `src/components/`: Reusable UI components.
  * [cite\_start]`src/context/`: React context providers (e.g., for theme and sidebar management)[cite: 9, 10].
  * `src/hooks/`: Custom React hooks.
  * [cite\_start]`src/icons/`: SVG icons used in the application[cite: 13, 14, 15, 16, 17, 18, 19, 20].
  * [cite\_start]`src/layout/`: Components related to the application layout (header, sidebar, etc.)[cite: 1, 2, 3, 4].
  * [cite\_start]`src/pages/`: Top-level page components[cite: 5, 6, 7, 8].
  * `src/routes/`: API service files for different features.
  * `src/utils/`: Utility functions.

#### Components

The application is built with a modular component architecture. Key components include:

  * **Authentication:** `SignInForm.tsx` and `SignUpForm.tsx` handle user login and registration.
  * [cite\_start]**AI Form:** `OfferAIForm.tsx` [cite: 7] is the main component for generating proposals, with sub-components for handling templates (`TemplateTab.tsx`), products (`ProductsTab.tsx`), and history (`HistoryTab.tsx`).
  * [cite\_start]**OCR:** `OCRPage.tsx` [cite: 8] manages the OCR process, with step-by-step components (`StepOne.tsx`, `StepTwo.tsx`, `StepThree.tsx`).
  * **UI Elements:** A rich set of UI components are available in `src/components/ui/`, including alerts, avatars, badges, buttons, dropdowns, modals, and more.

#### Routing

Routing is managed by `react-router-dom`. The main routing logic is in `src/App.tsx`, which defines public and private routes. `PrivateRoute.tsx` and `PublicRoute.tsx` are used to protect routes based on authentication status.

#### State Management

[cite\_start]The application utilizes React's built-in state management (`useState`, `useEffect`) and context API for global state management (e.g., `ThemeContext.tsx`[cite: 9], `SidebarContext.tsx`).

#### API Interaction

API requests to the backend are handled by a centralized Axios instance in `src/api/axios.ts`. Service files in `src/routes/` encapsulate the API calls for different features, such as authentication (`auth_api.ts`), OCR (`OCR_api.tsx`), and proposal generation (`proposal_api.tsx`).

-----

### Backend Documentation

#### Project Structure

The backend follows a standard FastAPI project structure:

  * `main.py`: The entry point of the application.
  * `core/`: Core application logic, including configuration (`config.py`) and security (`security.py`).
  * `api/`: API endpoints.
  * `db/`: Database session management and initialization.
  * `services/`: Business logic.
  * `schemas/`: Pydantic models for data validation.

#### API Endpoints

The API endpoints are defined in `app/api/v1/endpoints/`. Key endpoints include:

  * `/users/`: User management (CRUD operations).
  * `/users/token`: User authentication (token generation).
  * `/files/upload-ocr/`: Handles file uploads for OCR.
  * `/files/cancel-ocr/`: Cancels an ongoing OCR task.
  * `/proposal/generate`: Generates a business proposal.
  * `/proposal/save-pdf`: Saves a generated proposal as a PDF.
  * `/proposal/send-email`: Sends a proposal via email.

#### Authentication

Authentication is implemented using JWTs. The backend generates an access token upon successful login, which is then used to authenticate subsequent requests. The `auth_api.ts` file on the frontend handles token storage and validation.

#### Database

The application uses a PostgreSQL database with SQLAlchemy as the ORM. The database is initialized on startup, and a default admin user is created if one does not exist.

#### AI & OCR Services

The backend integrates with various AI and OCR services to provide its core functionality. [cite\_start]The `requirements.txt` file lists the specific libraries used for this purpose, including `openai` [cite: 4][cite\_start], `deepseek` [cite: 4][cite\_start], `google-cloud-vision` [cite: 4][cite\_start], and `yandex-cloud-ml-sdk`[cite: 4].
