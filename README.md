# 📚 StudyFlow - Smart Task Management with AI

<p align="center">
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React"/>
  <img src="https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js"/>
  <img src="https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB"/>
  <img src="https://img.shields.io/badge/Google_Gemini-8E75B2?style=for-the-badge&logo=google&logoColor=white" alt="Gemini AI"/>
  <img src="https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white" alt="Docker"/>
  <img src="https://img.shields.io/badge/Kubernetes-326CE5?style=for-the-badge&logo=kubernetes&logoColor=white" alt="Kubernetes"/>
</p>

**StudyFlow** is a full-stack task management application that uses AI (Google Gemini) to automatically break down complex tasks and suggest priorities. It includes a complete task management system, calendar view, dashboard analytics, and CI/CD deployment with auto-scaling Kubernetes.


---

## 📚 Table of Contents

- [Overview](#overview)
- [✨ Features](#-features)
- [🛠️ Tech Stack](#️-tech-stack)
- [📁 Project Structure](#-project-structure)
- [🚀 Getting Started](#-getting-started)
- [🔧 Environment Variables](#-environment-variables)
- [🐳 Docker Deployment](#-docker-deployment)
- [☸️ Kubernetes Deployment](#️-kubernetes-deployment)
- [⚡ Auto-Scaling](#-auto-scaling)
- [🔌 API Endpoints](#-api-endpoints)
- [🔥 Load Testing](#-load-testing)
- [🔍 Troubleshooting](#-troubleshooting)
- [👨‍💻 Author](#-author)

---

## Overview

StudyFlow lets teams and individuals manage tasks efficiently with AI-powered assistance. Drag-and-drop task management, AI task breakdown, priority suggestions, calendar view, and dashboard analytics — all in one place. Every task can be broken down into subtasks using Google Gemini AI, and priorities are suggested based on task content and due dates.

### 🎯 Live Access

| Service | URL |
|---------|-----|
| **Application** | <a href="http://localhost:8081">http://localhost:8081</a> |
| **Backend API** | <a href="http://localhost:5000">http://localhost:5000</a> |
| **Health Check** | <a href="http://localhost:5000/health">http://localhost:5000/health</a> |

---

## ✨ Features

### 🔹 Core Features

| Feature | Description |
|---------|-------------|
| 🔐 **User Authentication** | JWT-based signup/login with secure password hashing |
| 📝 **Task Management** | Full CRUD operations for tasks with status tracking |
| 📊 **Task Dashboard** | Overview of all tasks with status counts and priority indicators |
| 📅 **Calendar View** | Visual task scheduling with due dates |
| 🤖 **AI Task Breakdown** | Google Gemini AI breaks down complex tasks into subtasks |
| 🎯 **Priority Suggestions** | AI suggests priority (Low/Medium/High) based on task content |
| 📱 **Responsive Design** | Tailwind CSS for mobile-first responsive UI |

### 🔹 Unique Features

| Feature | Description |
|---------|-------------|
| ★ **AI-Powered Breakdown** | One-click AI task breakdown using Google Gemini API |
| ★ **Smart Priority** | AI analyzes task content and suggests appropriate priority |
| ★ **Real-Time Updates** | Task changes reflect immediately across all views |
| ★ **Dark/Light Theme** | Full theme toggle with preference saved |
| ★ **Task Filtering** | Filter tasks by status, priority, and date |
| ★ **Auto-Scaling** | Kubernetes HPA automatically scales based on load |

---

## 🛠️ Tech Stack

### Frontend

| Technology | Version | Purpose |
|------------|---------|---------|
| <img src="https://img.shields.io/badge/React-20232A?style=flat&logo=react&logoColor=61DAFB" width="80"/> | 18.x | UI Framework |
| <img src="https://img.shields.io/badge/Vite-646CFF?style=flat&logo=vite&logoColor=white" width="60"/> | 4.x | Build Tool |
| <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat&logo=tailwind-css&logoColor=white" width="100"/> | 3.x | Styling |

### Backend

| Technology | Version | Purpose |
|------------|---------|---------|
| <img src="https://img.shields.io/badge/Node.js-43853D?style=flat&logo=node.js&logoColor=white" width="80"/> | 18.x | Runtime |
| <img src="https://img.shields.io/badge/Express.js-404D59?style=flat&logo=express&logoColor=white" width="90"/> | 4.x | Web Framework |
| <img src="https://img.shields.io/badge/JWT-000000?style=flat&logo=json-web-tokens&logoColor=white" width="70"/> | 9.x | Authentication |

### Database

| Technology | Version | Purpose |
|------------|---------|---------|
| <img src="https://img.shields.io/badge/MongoDB-4EA94B?style=flat&logo=mongodb&logoColor=white" width="90"/> | 6.0 | Database |

### AI & Machine Learning

| Technology | Version | Purpose |
|------------|---------|---------|
| <img src="https://img.shields.io/badge/Google_Gemini-8E75B2?style=flat&logo=google&logoColor=white" width="130"/> | Latest | AI Task Breakdown |

### Containerization & Orchestration

| Technology | Version | Purpose |
|------------|---------|---------|
| <img src="https://img.shields.io/badge/Docker-2496ED?style=flat&logo=docker&logoColor=white" width="80"/> | Latest | Containerization |
| <img src="https://img.shields.io/badge/Kubernetes-326CE5?style=flat&logo=kubernetes&logoColor=white" width="110"/> | 1.28+ | Orchestration |
| <img src="https://img.shields.io/badge/Minikube-326CE5?style=flat&logo=kubernetes&logoColor=white" width="100"/> | 1.38+ | Local Cluster |

### DevOps & Monitoring

| Technology | Version | Purpose |
|------------|---------|---------|
| <img src="https://img.shields.io/badge/Nginx-009639?style=flat&logo=nginx&logoColor=white" width="80"/> | Latest | Reverse Proxy |
| <img src="https://img.shields.io/badge/HPA-326CE5?style=flat&logo=kubernetes&logoColor=white" width="80"/> | Latest | Auto-Scaling |
| <img src="https://img.shields.io/badge/Metrics_Server-326CE5?style=flat&logo=kubernetes&logoColor=white" width="130"/> | Latest | Resource Monitoring |


---

## 🚀 Getting Started

### 📋 Prerequisites

| Tool | Version | Check Command |
|------|---------|---------------|
| Docker | Latest | `docker --version` |
| Minikube | v1.38+ | `minikube version` |
| kubectl | Latest | `kubectl version` |
| Node.js | 18+ | `node --version` |
| npm | Latest | `npm --version` |
| MongoDB | 6.0+ | `mongod --version` |

### 🔧 Installation

#### 1. Clone the Repository

```bash

git clone https://github.com/Arulraj25/StudyFlow---Smart-Task-Management-with-AI.git
cd StudyFlow---Smart-Task-Management-with-AI
```


#### 2. Set Up Environment Variables
📝 Backend:

```bash
cp backend/.env.example backend/.env
nano backend/.env
```

Required values in backend/.env:

  PORT=5000
  
  NODE_ENV=development

  MONGO_URI=mongodb://127.0.0.1:27017/studyflow

  JWT_SECRET=your-super-secret-jwt-key-min-32-characters

  GEMINI_API_KEY=your-gemini-api-key-from-ai-studio

  FRONTEND_URL=http://localhost:8081

📝 Frontend:

```bash
cp frontend/.env.example frontend/.env
```
# Default works for most cases

#### 3. Start the Application
☸️ Option A: Minikube (Recommended)

# Make scripts executable
```bash
chmod +x start.sh stop.sh status.sh
```
# Start the application
```bash
./start.sh
```
# Wait 1-2 minutes for pods to be ready
# Access: http://localhost:8081

# Check status
```bash
./status.sh
```
# Stop
```bash
./stop.sh
```
🐳 Option B: Docker Compose
```bash
docker-compose up -d
docker-compose logs -f
docker-compose down
```
💻 Option C: Local Development

# Backend (Terminal 1)
```bash
cd backend
npm install
npm start
```
# Frontend (Terminal 2)
```bash
cd frontend
npm install
npm run dev
```

#### 4. Access the Application

Service	          URL	                          Description
Frontend	        http://localhost:8081	        Main application UI
BackendAPI	      http://localhost:5000	        REST API
Health Check    	http://localhost:5000/health	Service status

#### 5. Test the Application

# Health Check
```bash
curl http://localhost:5000/health
```
# Signup
```bash
curl -X POST http://localhost:8081/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@test.com","password":"Test@123"}'
```
# Login
```bash
curl -X POST http://localhost:8081/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","password":"Test@123"}'
```

🔧 Environment Variables

Backend (backend/.env)

|Variable      	|Description	                      |Example|
|---------------|-----------------------------------|-------|
|PORT	          |Server port	                      |5000|
|NODE_ENV      	|Environment                      	|development|
|MONGO_URI      |MongoDB connection string	        |mongodb://127.0.0.1:27017/studyflow|
|JWT_SECRET	    |JWT signing secret (min 32 chars)	|your-super-secret-jwt-key|
|GEMINI_API_KEY |Google Gemini API Key	            |AIza...|
|FRONTEND_URL	  |CORS allowed origin	              |http://localhost:8081|


Frontend (frontend/.env)

|Variable          |	Description      	|Example|
|------------------|--------------------|-------|
|VITE_API_URL	     |  Backend API URL	  |/api|
|VITE_APP_NAME	   |  Application name	|StudyFlow|

🐳 Docker Deployment
Build Images

# Build backend
```bash
docker build -t studyflow-backend:latest -f backend/Dockerfile ./backend
```
# Build frontend
```bash
docker build -t studyflow-frontend:latest -f frontend/Dockerfile ./frontend
```
# Build both for Minikube
```bash
docker build -t studyflow-backend:latest -f backend/Dockerfile ./backend && \
docker build -t studyflow-frontend:latest -f frontend/Dockerfile ./frontend
```
Docker Compose Commands

# Start all services
```bash
docker-compose up -d
```
# View logs
```bash
docker-compose logs -f backend
docker-compose logs -f frontend
```
# Stop services
```bash
docker-compose down
```
# Remove volumes (clears database)
```bash
docker-compose down -v
```

📊 Kubernetes Resources

|Resource	      |File	                |Description|
|---------------|---------------------|------------|
|Namespace	     | k8s/namespace.yaml	 | studyflow namespace|
|ConfigMap	     | k8s/configmap.yaml	 | Environment variables|
|Secrets	       | k8s/secrets.yaml    |	Sensitive data (JWT, API keys)|
|MongoDB	       | k8s/mongodb/	       | Database deployment + service + storage|
|Backend        |	k8s/backend/	       | API deployment + service|
|Frontend	     | k8s/frontend/        |	UI deployment + service|
|HPA	          |  k8s/hpa.yaml	       | Auto-scaling configuration|
|Ingress        |	k8s/ingress.yaml	   | HTTP routing|


🔧 Useful Commands

## Start application
```bash
./start.sh
```
## Check status
```bash
./status.sh
```
## View pods
```bash
kubectl get pods -n studyflow
```
## View services
```bash
kubectl get svc -n studyflow
```
## View logs
```bash
kubectl logs -f -n studyflow deployment/backend
kubectl logs -f -n studyflow deployment/frontend
```
## Manual scaling
```bash
kubectl scale deployment backend -n studyflow --replicas=5
```
## Port forward
```bash
kubectl port-forward -n studyflow svc/frontend-service 8081:80
kubectl port-forward -n studyflow svc/backend-service 5000:5000
```
# ⚡ Auto-Scaling

📊 HPA Configuration
The application uses Horizontal Pod Autoscaler (HPA) for automatic scaling:

Backend HPA:
  Min Replicas: 2
  Max Replicas: 5
  CPU Threshold: 70%
  Memory Threshold: 80%

Frontend HPA:
  Min Replicas: 2
  Max Replicas: 5
  CPU Threshold: 70%

📈 Monitoring Scaling

## Watch HPA status
```bash
kubectl get hpa -n studyflow -w
```
## Watch pod scaling
```bash
kubectl get pods -n studyflow -l app=backend -w
```
## View scaling events
```bash
kubectl get events -n studyflow --watch | grep -i scaling
```
## Check resource usage
```bash
kubectl top pods -n studyflow
```

# 🔌 API Endpoints

## 🔐 Authentication

|Method	  |Endpoint	          |Description|
|---------|-------------------|------------|
|POST	   | /api/auth/signup	 | Register new user|
|POST	   | /api/auth/register	|Alias for signup|
|POST	   | /api/auth/login	  |  Login user|
|GET	    |  /api/auth/me	     | Get current user|

## 📝 Tasks

|Method	  |Endpoint      |	Description|
|---------|--------------|--------------|
|GET	     | /api/tasks	  |  Get all tasks|
|POST     |	/api/tasks	   | Create task|
|PUT	   |  /api/tasks/:id	|Update task|
|DELETE	 | /api/tasks/:id	|Delete task|

## 🤖 AI

|Method	  |Endpoint        |	Description|
|---------|-----------------|-------------|
|POST	   | /api/ai/suggest	|  Get AI task breakdown|
|POST	   | /api/ai/priority	|Get AI priority suggestion|

## 💚 Health

|Method	 | Endpoint	|Description|
|---------|----------|----------|
|GET	     | /health	|  Service health check|


👨‍💻 Author

Arulraj

GitHub: github.com/Arulraj25

Project: StudyFlow - Smart Task Management with AI

📝 License
This project is licensed under the MIT License - see the LICENSE file for details.

🙏 Acknowledgments
Google Gemini AI - AI-powered task breakdown

React - Frontend framework

Node.js - Backend runtime

MongoDB - Database

Kubernetes - Container orchestration

Tailwind CSS - UI styling


📊 Project Status

|Component	       | Technology    	         | Version|
|------------------|--------------------------|-------|
|Frontend	        |React + Vite + Tailwind	  |18.x|
|Backend	         | Node.js + Express	     |  18.x|
|Database	        |MongoDB	                  |6.0|
|AI	              |Google Gemini	            |Latest|
|Containerization	|Docker	                  |Latest|
|Orchestration	  |  Kubernetes + Minikube	 |   1.28+|
|Auto-Scaling	   | HPA	                      |Latest|
|Proxy	         |   Nginx	                   | Latest|


🏗️ Architecture Flow

  GitHub → Docker Build → Minikube → Kubernetes → Application

  Code is pushed to GitHub → Docker images built → Deployed to Minikube → Kubernetes runs the application → Auto-scaling based on load

🎯 Access

|Service      |	URL|
|-------------|-----|
|Frontend	   | http://localhost:8081|
|Backend      | API	http://localhost:5000|
|Health Check	|http://localhost:5000/health|

<p align="center">Made with ❤️ by <a href="https://github.com/Arulraj25">Arulraj</a></p> 
