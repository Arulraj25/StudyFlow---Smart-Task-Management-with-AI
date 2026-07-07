#!/bin/bash

echo "🛑 Stopping StudyFlow Application"

# Kill port forwarding
pkill -f "kubectl port-forward" 2>/dev/null
echo "✅ Port forwarding stopped"

# Delete namespace
kubectl delete namespace studyflow --ignore-not-found=true
echo "✅ Kubernetes resources deleted"

# Ask about Minikube
read -p "Stop Minikube? (y/n): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    minikube stop
    echo "✅ Minikube stopped"
fi

echo "✅ StudyFlow stopped!"