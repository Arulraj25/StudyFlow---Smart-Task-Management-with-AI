#!/bin/bash

echo "📊 StudyFlow Status"
echo "=================="

# Check Minikube
if minikube status > /dev/null 2>&1; then
    echo "✅ Minikube: Running"
else
    echo "❌ Minikube: Not running"
    exit 1
fi

# Check pods
echo ""
echo "📦 Pods:"
kubectl get pods -n studyflow 2>/dev/null || echo "  No pods found"

# Check services
echo ""
echo "🔌 Services:"
kubectl get svc -n studyflow 2>/dev/null || echo "  No services found"

# Health check
echo ""
echo "🔍 Health Check:"
if curl -s http://localhost:5000/health > /dev/null 2>&1; then
    echo -e "  Backend: ✅ OK"
else
    echo -e "  Backend: ❌ Not accessible"
fi

if curl -s http://localhost:8081 > /dev/null 2>&1; then
    echo -e "  Frontend: ✅ OK"
else
    echo -e "  Frontend: ❌ Not accessible"
fi

echo ""
echo "🌐 Access:"
echo "  Frontend: http://localhost:8081"
echo "  Backend:  http://localhost:5000"