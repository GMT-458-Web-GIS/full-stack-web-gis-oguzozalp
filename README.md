# 🌍 GeoGame - Full Stack Web GIS Project

https://unattractive-raguel-hoverfly.ngrok-free.dev

**GeoGame** is an interactive, web-based geography quiz application integrated with spatial data. The project is built using a **Node.js** backend, **MongoDB** database, and **Leaflet.js** for frontend mapping.

This project was developed over a **5-day sprint**, covering Full-Stack development principles including API design, Database management, Authentication, and Spatial CRUD operations.

---

## 🚀 Development Journey (5-Day Log)

This project was built step-by-step to meet all technical requirements:

### **Day 1: Project Initialization & Backend Structure**
* **Goal:** Set up the Node.js environment and serve the frontend.
* **Actions:**
    * Initialized the project with `npm init`.
    * Set up **Express.js** server structure.
    * Integrated **Leaflet.js** for the map interface.
    * Created the basic game logic using static JSON data.

### **Day 2: Database Integration (MongoDB) & API**
* **Goal:** Migrate from static files to a cloud database.
* **Actions:**
    * Connected the application to **MongoDB Atlas (Cloud)** using Mongoose.
    * Designed the **Question Schema** (storing text, coordinates, options).
    * Developed RESTful API Endpoints:
        * `GET /api/questions`: Fetch spatial data.
        * `GET /seed`: Populate database with initial data.

### **Day 3: Admin Panel & CRUD Operations**
* **Goal:** Enable dynamic management of spatial data.
* **Actions:**
    * Built a dedicated **Admin Dashboard**.
    * Implemented **Map-Click Interaction**: Admins can click on the map to get coordinates automatically.
    * Added **POST /api/questions**: Create new geographic questions.
    * Added **DELETE /api/questions/:id**: Remove questions from the database.

### **Day 4: Authentication & User Roles**
* **Goal:** Secure the application and manage user types.
* **Actions:**
    * Designed **User Schema** (Username, Password, Role).
    * Implemented **Login & Register** system (`POST /api/login`, `POST /api/register`).
    * Created **Role-Based Access Control (RBAC)**:
        * **Admin:** Can access `/admin` and modify data.
        * **Player:** Can only access `/game`.
        * **Guest:** Restricted access.

### **Day 5: API Documentation (Swagger/OpenAPI)**
* **Goal:** Document the backend infrastructure professionally.
* **Actions:**
    * Integrated **Swagger UI** (`swagger-ui-express`).
    * Documented all API endpoints (GET, POST, DELETE) with request/response examples.
    * Finalized code cleanup and performed system tests.

---

## 🛠️ Technologies Used

* **Backend:** Node.js, Express.js
* **Database:** MongoDB Atlas (NoSQL)
* **Frontend:** HTML5, CSS3, JavaScript (Vanilla), Leaflet.js
* **Documentation:** Swagger UI
* **Tools:** Git, Postman

---

## 📂 API Documentation

The API is fully documented using Swagger.
Once the server is running, you can access the documentation at:

👉 **http://localhost:3000/api-docs**

---

## ⚙️ How to Run

1.  **Clone the Repository**
    ```bash
    git clone [https://github.com/GMT-458-Web-GIS/full-stack-web-gis-oguzozalp.git](https://github.com/GMT-458-Web-GIS/full-stack-web-gis-oguzozalp.git)
    cd full-stack-web-gis-oguzozalp
    ```

2.  **Install Dependencies**
    ```bash
    npm install
    ```

3.  **Start the Server**
    ```bash
    node server.js
    ```

4.  **Access the Application**
    * **Game:** `http://localhost:3000`
    * **Admin Panel:** Login as admin to access.

---

## 👤 Author

**Oğuz Baran Özalp**
* Hacettepe University - Department of Geomatics Engineering

* Course: GMT 458 - Web GIS Design
