StudyFlow - Smart Task Management with AI
StudyFlow is a full-stack task management application that uses AI (Google Gemini) to automatically break down complex tasks and suggest priorities. It includes a complete task management system, calendar view, dashboard analytics, and CI/CD deployment with auto-scaling Kubernetes.

Live Demo: http://localhost:8081

📚 Table of Contents
Overview

Features

Tech Stack

Project Structure

Getting Started

Environment Variables

Docker Deployment

Kubernetes Deployment

Auto-Scaling

API Endpoints

Load Testing

Troubleshooting

Author

Overview
StudyFlow lets teams and individuals manage tasks efficiently with AI-powered assistance. Drag-and-drop task management, AI task breakdown, priority suggestions, calendar view, and dashboard analytics — all in one place. Every task can be broken down into subtasks using Google Gemini AI, and priorities are suggested based on task content and due dates.

Live Access:

Application: http://localhost:8081

Backend API: http://localhost:5000

Health Check: http://localhost:5000/health

Features
Core Features
Feature	Description
User Authentication	JWT-based signup/login with secure password hashing
Task Management	Full CRUD operations for tasks with status tracking
Task Dashboard	Overview of all tasks with status counts and priority indicators
Calendar View	Visual task scheduling with due dates
AI Task Breakdown	Google Gemini AI breaks down complex tasks into subtasks
Priority Suggestions	AI suggests priority (Low/Medium/High) based on task content
Responsive Design	Tailwind CSS for mobile-first responsive UI
Unique Features
Feature	Description
★ AI-Powered Breakdown	One-click AI task breakdown using Google Gemini API
★ Smart Priority	AI analyzes task content and suggests appropriate priority
★ Real-Time Updates	Task changes reflect immediately across all views
★ Dark/Light Theme	Full theme toggle with preference saved
★ Task Filtering	Filter tasks by status, priority, and date
★ Auto-Scaling	Kubernetes HPA automatically scales based on load
Tech Stack
Layer	Technology	Purpose
Frontend	React 18 · Vite · Tailwind CSS	SPA with fast build and responsive UI
Backend	Node.js 18 · Express.js	REST API with JWT authentication
Database	MongoDB 6.0	Persistent storage for users and tasks
AI	Google Gemini API	Task breakdown and priority suggestions
Container	Docker	Reproducible production containers
Orchestration	Kubernetes (Minikube)	Container orchestration with auto-scaling
Auto-Scaling	HPA (Horizontal Pod Autoscaler)	Automatic scaling based on CPU/Memory
Proxy	Nginx	Reverse proxy and static file serving
Project Structure
text
studyflow/
│
├── backend/
│   ├── config/
│   │   └── db.js                    # MongoDB connection
│   ├── controllers/
│   │   ├── authController.js        # Authentication logic
│   │   ├── taskController.js        # Task CRUD operations
│   │   └── aiController.js          # AI features (Gemini)
│   ├── middleware/
│   │   └── auth.js                  # JWT verification
│   ├── models/
│   │   ├── User.js                  # User schema
│   │   └── Task.js                  # Task schema
│   ├── routes/
│   │   ├── authRoutes.js            # Auth endpoints
│   │   ├── taskRoutes.js            # Task endpoints
│   │   └── aiRoutes.js              # AI endpoints
│   ├── utils/
│   │   ├── gemini.js                # Gemini API integration
│   │   └── priority.js              # Priority helpers
│   ├── .env.example                 # Environment template
│   ├── Dockerfile                   # Backend container
│   ├── package.json                 # Dependencies
│   └── server.js                    # Entry point
│
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   │   └── api.js              # API service layer
│   │   ├── components/
│   │   │   ├── Navbar.jsx          # Navigation
│   │   │   ├── PrivateRoute.jsx    # Protected routes
│   │   │   ├── TaskCard.jsx        # Task display
│   │   │   └── TaskForm.jsx        # Create/Edit form
│   │   ├── context/
│   │   │   └── AuthContext.jsx     # Auth state
│   │   ├── pages/
│   │   │   ├── Dashboard.jsx       # Analytics dashboard
│   │   │   ├── Tasks.jsx           # Task list
│   │   │   ├── Calendar.jsx        # Calendar view
│   │   │   ├── Login.jsx           # Login page
│   │   │   └── Signup.jsx          # Signup page
│   │   ├── App.jsx                 # Main App
│   │   ├── index.css               # Tailwind styles
│   │   └── main.jsx                # Entry point
│   ├── .env.example                # Environment template
│   ├── Dockerfile                  # Frontend container
│   ├── nginx.conf                  # Nginx configuration
│   ├── package.json                # Dependencies
│   ├── tailwind.config.js          # Tailwind config
│   └── vite.config.js              # Vite config
│
├── k8s/
│   ├── mongodb/
│   │   ├── deployment.yaml         # MongoDB deployment
│   │   ├── service.yaml            # MongoDB service
│   │   └── persistent-volume.yaml  # Storage
│   ├── backend/
│   │   ├── deployment.yaml         # Backend deployment
│   │   └── service.yaml            # Backend service
│   ├── frontend/
│   │   ├── deployment.yaml         # Frontend deployment
│   │   └── service.yaml            # Frontend service
│   ├── configmap.yaml              # Environment variables
│   ├── secrets.yaml                # Sensitive data
│   ├── hpa.yaml                    # Auto-scaling config
│   └── ingress.yaml                # HTTP routing
│
├── start.sh                        # Start application
├── stop.sh                         # Stop application
├── status.sh                       # Check status
├── extreme-load.sh                 # Load testing
├── docker-compose.yml              # Docker Compose config
├── .gitignore
└── README.md
Getting Started
Prerequisites
Tool	Version	Check
Docker	Latest	docker --version
Minikube	v1.38+	minikube version
kubectl	Latest	kubectl version
Node.js	18+	node --version
npm	Latest	npm --version
MongoDB	6.0+	mongod --version
Installation
1. Clone the Repository
bash
git clone https://github.com/yourusername/studyflow.git
cd studyflow
2. Set Up Environment Variables
Backend:

bash
cp backend/.env.example backend/.env
nano backend/.env
Required values in backend/.env:

env
PORT=5000
NODE_ENV=development
MONGO_URI=mongodb://127.0.0.1:27017/studyflow
JWT_SECRET=your-super-secret-jwt-key-min-32-characters
GEMINI_API_KEY=your-gemini-api-key-from-ai-studio
FRONTEND_URL=http://localhost:8081
Frontend:

bash
cp frontend/.env.example frontend/.env
# Default works for most cases
3. Start the Application
Option A: Minikube (Recommended)

bash
# Make scripts executable
chmod +x start.sh stop.sh status.sh

# Start the application
./start.sh

# Wait 1-2 minutes for pods to be ready
# Access: http://localhost:8081

# Check status
./status.sh

# Stop
./stop.sh
Option B: Docker Compose

bash
docker-compose up -d
docker-compose logs -f
docker-compose down
Option C: Local Development

bash
# Backend (Terminal 1)
cd backend
npm install
npm start

# Frontend (Terminal 2)
cd frontend
npm install
npm run dev
4. Access the Application
Service	URL	Description
Frontend	http://localhost:8081	Main application UI
Backend API	http://localhost:5000	REST API
Health Check	http://localhost:5000/health	Service status
5. Test the Application
bash
# Health Check
curl http://localhost:5000/health

# Signup
curl -X POST http://localhost:8081/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@test.com","password":"Test@123"}'

# Login
curl -X POST http://localhost:8081/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","password":"Test@123"}'
Environment Variables
Backend (backend/.env)
Variable	Description	Example
PORT	Server port	5000
NODE_ENV	Environment	development
MONGO_URI	MongoDB connection string	mongodb://127.0.0.1:27017/studyflow
JWT_SECRET	JWT signing secret (min 32 chars)	your-super-secret-jwt-key
GEMINI_API_KEY	Google Gemini API Key	AIza...
FRONTEND_URL	CORS allowed origin	http://localhost:8081
Frontend (frontend/.env)
Variable	Description	Example
VITE_API_URL	Backend API URL	/api
VITE_APP_NAME	Application name	StudyFlow
Docker Deployment
Build Images
bash
# Build backend
docker build -t studyflow-backend:latest -f backend/Dockerfile ./backend

# Build frontend
docker build -t studyflow-frontend:latest -f frontend/Dockerfile ./frontend

# Build both for Minikube
docker build -t studyflow-backend:latest -f backend/Dockerfile ./backend && \
docker build -t studyflow-frontend:latest -f frontend/Dockerfile ./frontend
Docker Compose Commands
bash
# Start all services
docker-compose up -d

# View logs
docker-compose logs -f backend
docker-compose logs -f frontend

# Stop services
docker-compose down

# Remove volumes (clears database)
docker-compose down -v
Kubernetes Deployment
Architecture
text
┌─────────────────────────────────────────────────────────┐
│                    Minikube Cluster                     │
│                                                         │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐ │
│  │   Frontend   │  │   Backend    │  │   MongoDB    │ │
│  │   (nginx)    │──│  (Node.js)   │──│   (Database) │ │
│  │  Replicas: 2 │  │  Replicas: 2 │  │  Replicas: 1 │ │
│  └──────────────┘  └──────────────┘  └──────────────┘ │
│         │                 │                  │          │
│         └─────────────────┼──────────────────┘          │
│                           │                             │
│                    ┌──────▼──────┐                      │
│                    │  Ingress    │                      │
│                    │  (nginx)    │                      │
│                    └─────────────┘                      │
└─────────────────────────────────────────────────────────┘
Kubernetes Resources
Resource	File	Description
Namespace	k8s/namespace.yaml	studyflow namespace
ConfigMap	k8s/configmap.yaml	Environment variables
Secrets	k8s/secrets.yaml	Sensitive data (JWT, API keys)
MongoDB	k8s/mongodb/	Database deployment + service + storage
Backend	k8s/backend/	API deployment + service
Frontend	k8s/frontend/	UI deployment + service
HPA	k8s/hpa.yaml	Auto-scaling configuration
Ingress	k8s/ingress.yaml	HTTP routing
Useful Commands
bash
# Start application
./start.sh

# Check status
./status.sh

# View pods
kubectl get pods -n studyflow

# View services
kubectl get svc -n studyflow

# View logs
kubectl logs -f -n studyflow deployment/backend
kubectl logs -f -n studyflow deployment/frontend

# Manual scaling
kubectl scale deployment backend -n studyflow --replicas=5

# Port forward
kubectl port-forward -n studyflow svc/frontend-service 8081:80
kubectl port-forward -n studyflow svc/backend-service 5000:5000
Auto-Scaling
HPA Configuration
The application uses Horizontal Pod Autoscaler (HPA) for automatic scaling:

yaml
Backend HPA:
  Min Replicas: 2
  Max Replicas: 5
  CPU Threshold: 70%
  Memory Threshold: 80%

Frontend HPA:
  Min Replicas: 2
  Max Replicas: 5
  CPU Threshold: 70%
Monitoring Scaling
bash
# Watch HPA status
kubectl get hpa -n studyflow -w

# Watch pod scaling
kubectl get pods -n studyflow -l app=backend -w

# View scaling events
kubectl get events -n studyflow --watch | grep -i scaling

# Check resource usage
kubectl top pods -n studyflow
API Endpoints
Authentication
Method	Endpoint	Description
POST	/api/auth/signup	Register new user
POST	/api/auth/register	Alias for signup
POST	/api/auth/login	Login user
GET	/api/auth/me	Get current user
Tasks
Method	Endpoint	Description
GET	/api/tasks	Get all tasks
POST	/api/tasks	Create task
PUT	/api/tasks/:id	Update task
DELETE	/api/tasks/:id	Delete task
AI
Method	Endpoint	Description
POST	/api/ai/suggest	Get AI task breakdown
POST	/api/ai/priority	Get AI priority suggestion
Health
Method	Endpoint	Description
GET	/health	Service health check
Load Testing
Extreme Load Test (5000+ req/sec)
bash
# Run the load test
./extreme-load.sh

# This will:
# - Generate 5000+ requests per second
# - Trigger HPA to scale up
# - Show real-time scaling
# - Display final results
Manual Load Testing
bash
# Simple load test
for i in {1..1000}; do
  curl -s http://localhost:5000/health > /dev/null &
done
wait

# Check scaling
kubectl get pods -n studyflow -l app=backend
Troubleshooting
Common Issues
1. Port Forwarding Issues
bash
# Kill existing port forwarding
pkill -f "kubectl port-forward"

# Restart
kubectl port-forward -n studyflow svc/frontend-service 8081:80 &
kubectl port-forward -n studyflow svc/backend-service 5000:5000 &
2. Pods Not Starting
bash
# Check logs
kubectl logs -n studyflow deployment/backend

# Describe pod
kubectl describe pod -n studyflow -l app=backend

# Check events
kubectl get events -n studyflow --sort-by='.lastTimestamp'
3. MongoDB Connection Issues
bash
# Check MongoDB status
kubectl get pods -n studyflow -l app=mongodb

# View logs
kubectl logs -n studyflow deployment/mongodb

# Test connection
kubectl exec -n studyflow deployment/mongodb -- mongosh -u admin -p password123 --eval "db.runCommand({ping:1})"
4. HPA Not Scaling
bash
# Check metrics-server
kubectl get pods -n kube-system | grep metrics-server

# Enable metrics-server
minikube addons enable metrics-server

# Check HPA status
kubectl describe hpa backend-hpa -n studyflow
5. Reset Everything
bash
# Stop and delete everything
./stop.sh

# Delete Minikube
minikube delete

# Start fresh
minikube start --cpus=4 --memory=4096 --disk-size=20g
./start.sh
Author
Arulraj
GitHub: github.com/yourusername/studyflow

StudyFlow v1.0 · React · Node.js · MongoDB · Gemini AI · Docker · Kubernetes · Minikube

Containerization: Docker
Orchestration: Kubernetes (Minikube)
Auto-Scaling: HPA (Horizontal Pod Autoscaler)
AI: Google Gemini API
Proxy: Nginx

Architecture Flow
text
GitHub → Docker Build → Minikube → Kubernetes → Application
Code is pushed to GitHub → Docker images built → Deployed to Minikube → Kubernetes runs the application → Auto-scaling based on load

Access
Frontend: http://localhost:8081

Backend API: http://localhost:5000

Health Check: http://localhost:5000/health