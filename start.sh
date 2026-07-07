#!/bin/bash

echo "🚀 Starting StudyFlow Application"

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m'

# Start Minikube if not running
if ! minikube status > /dev/null 2>&1; then
    echo "Starting Minikube..."
    minikube start --cpus=4 --memory=4096 --disk-size=20g
fi

# Enable ingress
minikube addons enable ingress &>/dev/null

# Build images if needed
echo "Building and loading images..."
docker build -t studyflow-backend:latest -f backend/Dockerfile ./backend 2>/dev/null
docker build -t studyflow-frontend:latest -f frontend/Dockerfile ./frontend 2>/dev/null
minikube image load studyflow-backend:latest
minikube image load studyflow-frontend:latest

# Deploy
echo "Deploying to Kubernetes..."
kubectl apply -f k8s/namespace.yaml
kubectl apply -f k8s/configmap.yaml
kubectl apply -f k8s/secrets.yaml
kubectl apply -f k8s/mongodb/
kubectl apply -f k8s/backend/
kubectl apply -f k8s/frontend/
kubectl apply -f k8s/hpa.yaml
kubectl apply -f k8s/ingress.yaml

# Wait for services
echo "⏳ Waiting for services to be ready..."
sleep 30
kubectl wait --namespace=studyflow --for=condition=ready pod --all --timeout=120s 2>/dev/null

# Kill old port forwarding
pkill -f "kubectl port-forward.*8081" 2>/dev/null
pkill -f "kubectl port-forward.*5000" 2>/dev/null

# Start port forwarding
echo "Starting port forwarding..."
kubectl port-forward -n studyflow svc/frontend-service 8081:80 &
kubectl port-forward -n studyflow svc/backend-service 5000:5000 &

sleep 5

# Health check
echo ""
echo "🔍 Health Check:"
if curl -s http://localhost:5000/health > /dev/null 2>&1; then
    echo -e "  Backend: ${GREEN}✅ OK${NC}"
else
    echo -e "  Backend: ${RED}❌ Failed${NC}"
fi

if curl -s http://localhost:8081 > /dev/null 2>&1; then
    echo -e "  Frontend: ${GREEN}✅ OK${NC}"
else
    echo -e "  Frontend: ${RED}❌ Failed${NC}"
fi

echo ""
echo -e "${GREEN}✅ StudyFlow is running!${NC}"
echo ""
echo "🌐 Frontend: http://localhost:8081"
echo "🔗 Backend:  http://localhost:5000"
echo ""
echo "📊 Status:"
kubectl get pods -n studyflow