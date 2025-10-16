#!/bin/bash

# 🚀 Script de Test - Migration IAM
# Test des nouvelles routes IAM vs routes AUTHS legacy

echo "🔥 Démarrage des tests de migration IAM..."

# Configuration
BASE_URL="${BASE_URL:-http://localhost:3100/api}"
TEST_EMAIL="test-migration@example.com"
TEST_PASSWORD="testPassword123!"

echo "📡 Base URL: $BASE_URL"
echo "📧 Test Email: $TEST_EMAIL"
echo ""

# Fonction de test HTTP
test_endpoint() {
    local method=$1
    local endpoint=$2
    local data=$3
    local description=$4

    echo "🧪 Test: $description"
    echo "   → $method $endpoint"

    if [ -n "$data" ]; then
        response=$(curl -s -w "\n%{http_code}" -X $method "$BASE_URL$endpoint" \
            -H "Content-Type: application/json" \
            -d "$data")
    else
        response=$(curl -s -w "\n%{http_code}" -X $method "$BASE_URL$endpoint")
    fi

    http_code=$(echo "$response" | tail -n1)
    body=$(echo "$response" | sed '$d')

    if [ "$http_code" -eq 200 ] || [ "$http_code" -eq 201 ]; then
        echo "   ✅ Success ($http_code)"
        echo "   📄 Response: $body"
    else
        echo "   ❌ Failed ($http_code)"
        echo "   📄 Error: $body"
    fi
    echo ""
}

echo "🔍 ==================== TESTS REGISTRATION ===================="

# Test nouveau endpoint IAM
test_endpoint "POST" "/authentication/register-extended" \
    '{"email":"'$TEST_EMAIL'","password":"'$TEST_PASSWORD'","verifyPassword":"'$TEST_PASSWORD'","firstName":"Test","lastName":"User"}' \
    "Nouveau endpoint IAM - Registration étendue"

# Test ancien endpoint AUTHS (doit coexister)
test_endpoint "POST" "/auths/auth/registerwithpwd" \
    '{"email":"legacy-'$TEST_EMAIL'","password":"'$TEST_PASSWORD'","verifyPassword":"'$TEST_PASSWORD'","firstName":"Legacy","lastName":"User"}' \
    "Ancien endpoint AUTHS - Registration legacy"

echo "🔍 ==================== TESTS FORGOT PASSWORD ===================="

# Test nouveau endpoint IAM
test_endpoint "POST" "/authentication/forgot-password" \
    '{"email":"'$TEST_EMAIL'"}' \
    "Nouveau endpoint IAM - Forgot Password"

# Test ancien endpoint AUTHS
test_endpoint "POST" "/auths/auth/email/forgot-password" \
    '{"email":"'$TEST_EMAIL'"}' \
    "Ancien endpoint AUTHS - Forgot Password legacy"

echo "🔍 ==================== TESTS ACCOUNT VALIDATION ===================="

# Test nouveau endpoint IAM
test_endpoint "POST" "/authentication/request-account-validation" \
    '{"email":"'$TEST_EMAIL'"}' \
    "Nouveau endpoint IAM - Request Account Validation"

# Test ancien endpoint AUTHS
test_endpoint "POST" "/auths/auth/new-email-validation-Account" \
    '{"email":"'$TEST_EMAIL'"}' \
    "Ancien endpoint AUTHS - Request Account Validation legacy"

echo "🔍 ==================== TESTS BASIQUES ===================="

# Test endpoints de base
test_endpoint "POST" "/authentication/sign-in" \
    '{"email":"'$TEST_EMAIL'","password":"'$TEST_PASSWORD'"}' \
    "Endpoint IAM standard - Sign In"

test_endpoint "POST" "/auths/auth/loginwithpwd" \
    '{"email":"'$TEST_EMAIL'","password":"'$TEST_PASSWORD'"}' \
    "Endpoint AUTHS legacy - Login with Password"

echo "📊 ==================== RÉSUMÉ ===================="
echo "✅ Tests de coexistence terminés"
echo "🎯 Les deux systèmes (IAM + AUTHS) doivent fonctionner en parallèle"
echo "🚀 Si tous les tests passent, la migration est prête!"
echo ""
echo "📝 Prochaines étapes:"
echo "   1. Corriger les erreurs identifiées"
echo "   2. Tester avec de vraies données"
echo "   3. Migrer le frontend endpoint par endpoint"
echo "   4. Supprimer le module AUTHS legacy"
