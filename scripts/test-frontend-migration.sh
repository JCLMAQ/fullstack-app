#!/bin/bash

# 🧪 SCRIPT DE TEST - NOUVEAUX SERVICES IAM FRONTEND

echo "🧪 TEST DES NOUVEAUX SERVICES IAM FRONTEND"
echo "==========================================="

# Configuration
BACKEND_URL="http://localhost:3100/api"
echo "📡 Backend URL: $BACKEND_URL"
echo ""

# Couleurs pour les résultats
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Fonction pour tester un endpoint
test_endpoint() {
    local method=$1
    local endpoint=$2
    local data=$3
    local description=$4

    echo -e "${BLUE}🔍 Test: $description${NC}"
    echo "   $method $BACKEND_URL$endpoint"

    if [ -z "$data" ]; then
        response=$(curl -s -w "\n%{http_code}" -X $method "$BACKEND_URL$endpoint" 2>/dev/null)
    else
        response=$(curl -s -w "\n%{http_code}" -X $method "$BACKEND_URL$endpoint" \
                       -H "Content-Type: application/json" \
                       -d "$data" 2>/dev/null)
    fi

    # Séparer le code de statut du body
    http_code=$(echo "$response" | tail -n1)
    body=$(echo "$response" | sed '$d')

    if [ "$http_code" -eq 200 ] || [ "$http_code" -eq 201 ]; then
        echo -e "   ${GREEN}✅ Status: $http_code${NC}"
    elif [ "$http_code" -eq 401 ] || [ "$http_code" -eq 404 ]; then
        echo -e "   ${YELLOW}⚠️  Status: $http_code (Attendu - pas de données test)${NC}"
    else
        echo -e "   ${RED}❌ Status: $http_code${NC}"
    fi

    echo "   Response: $(echo "$body" | jq -r . 2>/dev/null || echo "$body")"
    echo ""
}

echo "🚀 TESTS DES NOUVEAUX ENDPOINTS IAM"
echo "===================================="

# Test 1: Sign-in (login) IAM
test_endpoint "POST" "/authentication/sign-in" \
'{"email":"test@example.com","password":"testpassword"}' \
"Login IAM (remplace loginwithpwd)"

# Test 2: Register Extended IAM
test_endpoint "POST" "/authentication/register-extended" \
'{"email":"test@example.com","password":"testpassword","verifyPassword":"testpassword"}' \
"Register Extended IAM (remplace registerwithpwd)"

# Test 3: Get User IAM
test_endpoint "GET" "/authentication/user/test@example.com" \
"" \
"Get User IAM (remplace loggedUser)"

# Test 4: Check Credentials IAM
test_endpoint "POST" "/authentication/check-credentials/test@example.com" \
'{"password":"testpassword"}' \
"Check Credentials IAM (remplace checkCredential)"

echo "🔄 COMPARAISON AVEC ENDPOINTS AUTHS LEGACY"
echo "==========================================="

# Test 5: Login AUTHS (legacy)
test_endpoint "POST" "/auths/auth/loginwithpwd" \
'{"email":"test@example.com","password":"testpassword"}' \
"Login AUTHS Legacy"

# Test 6: Register AUTHS (legacy)
test_endpoint "POST" "/auths/auth/registerwithpwd" \
'{"email":"test@example.com","password":"testpassword","verifyPassword":"testpassword"}' \
"Register AUTHS Legacy"

echo "📊 RÉSUMÉ DES TESTS"
echo "=================="
echo "✅ Si les codes 201/200 : Endpoints fonctionnels"
echo "⚠️  Si les codes 401/404 : Normal (pas de données test)"
echo "❌ Si autres codes : Problème à investiguer"
echo ""

echo "📋 PROCHAINES ÉTAPES RECOMMANDÉES :"
echo "1. Si les endpoints IAM répondent correctement → Migrer le frontend"
echo "2. Si problèmes → Déboguer les endpoints backend"
echo "3. Créer des comptes de test pour validation complète"
echo ""
