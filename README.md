# GeoGame - Full Stack Web GIS Project

## 1. Project Overview
GeoGame is an interactive, map-based geography quiz application designed to test users' knowledge of world locations. The project integrates **Leaflet.js** for mapping and features a gamified progression system with increasing difficulty levels (Forest, Sea, Sky, Space).

This project is developed as the final assignment for **GMT 458 - Web GIS**. It transitions a static frontend game into a complete **Full Stack Web Application**.

## 2. Technical Architecture
The project utilizes a modern web stack to ensure performance, scalability, and ease of management.

* **Frontend:** HTML5, CSS3, JavaScript (Vanilla), Leaflet.js
* **Backend:** Node.js, Express.js
* **Database:** MongoDB (NoSQL) *[Planned]*
* **Testing:** Artillery / JMeter *[Planned]*

## 3. Key Features & Implementation Plan

### ✅ User Roles & Management
The system will support three distinct user types:
1.  **Admin:** Can add/edit/delete questions via the map interface.
2.  **Player:** Can play the game and save scores.
3.  **Guest:** Can play the demo version (Level 1 only).

### ✅ CRUD Operations (Spatial Data)
An admin dashboard will allow users to:
* **Create:** Add a new question pin by clicking on the map.
* **Read:** View existing questions.
* **Update:** Modify question text or coordinates.
* **Delete:** Remove outdated questions.

### ✅ NoSQL Database Integration
Data (questions, user scores) will be migrated from static JSON files to **MongoDB**. This demonstrates the handling of heterogeneous data structures in web-based systems.

### ✅ API Development
A RESTful API will be developed to serve spatial data:
* `GET /api/questions`: Retrieve game questions.
* `POST /api/questions`: Add new spatial content.

## 4. Installation & Setup
1.  Clone the repository.
2.  Run `npm install` to install dependencies.
3.  Start the server with `node server.js`.
4.  Visit `http://localhost:3000`.

---
*Developed by Oguz Ozalp for GMT 458 Final Assignment.*