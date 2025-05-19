# Jonnikapp - Location Viewer

Jonnikapp is a full-stack web application designed to display a list of locations. It features a Laravel backend serving a React frontend, all containerized with Docker for easy setup and deployment.

[![Made with Laravel](https://img.shields.io/badge/Made%20with-Laravel-FF2D20.svg?style=for-the-badge&logo=laravel)](https://laravel.com)
[![Made with React](https://img.shields.io/badge/Made%20with-React-61DAFB.svg?style=for-the-badge&logo=react)](https://reactjs.org)
[![Powered by Docker](https://img.shields.io/badge/Powered%20by-Docker-2496ED.svg?style=for-the-badge&logo=docker)](https://www.docker.com/)
[![Nginx](https://img.shields.io/badge/Nginx-009639.svg?style=for-the-badge&logo=nginx)](https://nginx.org/)
[![MySQL](https://img.shields.io/badge/MySQL-4479A1.svg?style=for-the-badge&logo=mysql)](https://www.mysql.com/)

## ✨ Features

*   Displays a list of locations with details (name, image, creation date).
*   Responsive design for various screen sizes.
*   API for fetching location data.
*   Containerized setup for easy development and deployment.

## 🛠️ Technology Stack

*   **Backend:** PHP 8.x, Laravel 10.x
*   **Frontend:** Node.js, React 18.x, TypeScript, Material UI
*   **Web Server:** Nginx
*   **Database:** MySQL 8.0 (currently not utilized by the core feature but available)
*   **Containerization:** Docker, Docker Compose

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

*   [Docker](https://www.docker.com/get-started)
*   [Docker Compose](https://docs.docker.com/compose/install/) (usually included with Docker Desktop)

## 🚀 Getting Started

Follow these steps to get the Jonnikapp application up and running on your local machine.

### 1. Clone the Repository (if you haven't already)

```bash
git clone <your-repository-url>
cd Jonnikapp
```

### 2. Environment Configuration

The application uses a hardcoded API key for the frontend to communicate with the backend. For the database, credentials are set in the [`docker-compose.yml`](docker-compose.yml:1) file:

*   `MYSQL_DATABASE`: `jonnik_app_bd`
*   `MYSQL_ROOT_PASSWORD`: `123456789`
*   `MYSQL_USER`: `admin`
*   `MYSQL_PASSWORD`: `123456789`

The backend expects an API key for its `/api/locations` endpoint. The frontend currently uses a hardcoded key: `pf1dzmic348jub4qxcww`. This is defined in [`frontend/src/components/LocationList.tsx`](frontend/src/components/LocationList.tsx:22).

### 3. Build and Run with Docker Compose

From the root directory of the project (`Jonnikapp`), run the following command:

```bash
docker-compose up -d --build
```

This command will:
*   Build the Docker images for the `backend` and `frontend` services if they don't exist or if their Dockerfiles have changed.
*   Pull the `nginx` and `mysql` images from Docker Hub.
*   Create and start all the containers defined in the [`docker-compose.yml`](docker-compose.yml:1) file in detached mode (`-d`).

### 4. Accessing the Application

Once the containers are up and running:

*   **Frontend Application:** Open your web browser and navigate to `http://localhost:3000`
    *   This is served by the `frontend` service.
*   **Backend API (Locations):** You can access the locations API endpoint at `http://localhost:85/api/locations` (requires `x-api-key: pf1dzmic348jub4qxcww` header).
    *   This is served by `nginx`, which proxies requests to the `backend` service.
*   **Backend (Direct - if needed for dev/debug):** The Laravel backend service is directly accessible on `http://localhost:9000` (though Nginx on port 85 is the intended entry point for API calls).
*   **MySQL Database:** The MySQL service is accessible on port `3307` on your host machine.

### 5. Stopping the Application

To stop all running containers, execute:

```bash
docker-compose down
```

To stop and remove volumes (like database data), use:
```bash
docker-compose down -v
```

## 📂 Project Structure

The project is organized into two main directories:

```
.
├── backend/         # Laravel Backend Application
│   ├── app/
│   ├── config/
│   ├── database/
│   ├── public/
│   │   └── locations.json  # Static data for locations
│   ├── routes/
│   │   └── web.php         # API routes
│   ├── ...
│   └── Dockerfile
├── frontend/        # React Frontend Application
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   └── LocationList.tsx # Component to display locations
│   │   └── App.tsx
│   ├── ...
│   └── Dockerfile
├── docker-compose.yml # Docker Compose configuration
├── nginx.conf         # Nginx configuration
└── README.md          # This file
```

## ⚙️ API Endpoints

### Get Locations

*   **URL:** `/api/locations`
*   **Method:** `GET`
*   **Host (via Nginx):** `http://localhost:85`
*   **Headers:**
    *   `x-api-key`: `pf1dzmic348jub4qxcww` (Required)
*   **Success Response (200 OK):**
    ```json
    {
        "data": [
            {
                "code": 1,
                "name": "Sede Central",
                "image": "https://via.placeholder.com/150",
                "creationDate": "2024-01-01"
            },
            {
                "code": 2,
                "name": "Sede Norte",
                "image": "https://via.placeholder.com/150",
                "creationDate": "2024-02-01"
            }
        ]
    }
    ```
*   **Error Response (500 Internal Server Error):**
    ```json
    {
        "error": "Error en la ejecución",
        "details": "Specific error message"
    }
    ```

## 📄 Environment Variables & Configuration

*   **Backend API Key:** The API key `pf1dzmic348jub4qxcww` is currently hardcoded in the frontend ([`frontend/src/components/LocationList.tsx`](frontend/src/components/LocationList.tsx:22)) and expected by the backend's [`ApiKeyMiddleware`](backend/app/Http/Middleware/ApiKeyMiddleware.php:1). For a production environment, this should be managed via environment variables.
*   **MySQL Credentials:** Defined in [`docker-compose.yml`](docker-compose.yml:1) for the `mysql` service.
    *   `MYSQL_DATABASE`: `jonnik_app_bd`
    *   `MYSQL_ROOT_PASSWORD`: `123456789`
    *   `MYSQL_USER`: `admin`
    *   `MYSQL_PASSWORD`: `123456789`
*   **Nginx Configuration:** The [`nginx.conf`](nginx.conf:1) file dictates how Nginx proxies requests to the backend and frontend services.

## 💡 Contributing

Contributions are welcome! If you have suggestions or improvements, please feel free to:
1. Fork the repository.
2. Create a new branch (`git checkout -b feature/YourFeature`).
3. Commit your changes (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature/YourFeature`).
5. Open a Pull Request.

## 📜 License

This project is licensed under the MIT License. See the `LICENSE` file for details (if one is created).