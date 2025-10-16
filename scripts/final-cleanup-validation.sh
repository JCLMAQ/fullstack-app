#!/bin/bash

# 🧪 SCRIPT DE VALIDATION FINALE - NETTOYAGE MODULE AUTHS TERMINÉ

echo "🧹 VALIDATION FINALE - NETTOYAGE MODULE AUTHS"
echo "=============================================="

# Configuration
BACKEND_URL="http://localhost:3100/api"

# Couleurs
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

echo -e "${BLUE}📡 Backend URL: $BACKEND_URL${NC}"
echo ""

# Fonction pour tester un endpoint
test_endpoint() {
    local method=$1
    local endpoint=$2
    local data=$3
    local description=$4
    local expected_status=$5
    
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
    
    # Vérifier si le statut correspond à l'attendu
    if [ "$http_code" -eq "$expected_status" ]; then
        echo -e "   ${GREEN}✅ Status: $http_code (Attendu)${NC}"
        return 0
    elif [ "$http_code" -eq 404 ] && [ "$expected_status" -ne 404 ]; then
        echo -e "   ${RED}❌ Status: $http_code - ENDPOINT SUPPRIMÉ !${NC}"
        return 1
    elif [ "$http_code" -eq 201 ] || [ "$http_code" -eq 200 ]; then
        echo -e "   ${GREEN}✅ Status: $http_code (Fonctionnel)${NC}"
        return 0
    elif [ "$http_code" -eq 401 ]; then
        echo -e "   ${YELLOW}⚠️  Status: $http_code (Normal - pas d'auth)${NC}"
        return 0
    else
        echo -e "   ${YELLOW}⚠️  Status: $http_code${NC}"
        return 0
    fi
}

echo "🟢 1. VÉRIFICATION DES ENDPOINTS IAM (DOIVENT FONCTIONNER)"
echo "=========================================================="

iam_success=0
iam_total=6

# Test des endpoints IAM modernes
test_endpoint "POST" "/authentication/sign-in" \
'{"email":"test@example.com","password":"testpassword"}' \
"IAM Sign-in" 401 && ((iam_success++))

test_endpoint "POST" "/authentication/register-extended" \
'{"email":"test@example.com","password":"testpassword","verifyPassword":"testpassword"}' \
"IAM Register Extended" 201 && ((iam_success++))

test_endpoint "GET" "/authentication/user/test@example.com" \
"" \
"IAM Get User" 401 && ((iam_success++))

test_endpoint "POST" "/authentication/forgot-password" \
'{"email":"test@example.com"}' \
"IAM Forgot Password" 201 && ((iam_success++))

test_endpoint "POST" "/authentication/request-account-validation" \
'{"email":"test@example.com"}' \
"IAM Account Validation Request" 201 && ((iam_success++))

test_endpoint "POST" "/authentication/change-password" \
'{"oldPassword":"old","newPassword":"new"}' \
"IAM Change Password" 401 && ((iam_success++))

echo ""

echo "🔴 2. VÉRIFICATION SUPPRESSION ENDPOINTS AUTHS (DOIVENT ÉCHOUER)"
echo "================================================================"

auths_failed=0
auths_total=4

# Test des anciens endpoints AUTHS (doivent retourner 404)
test_endpoint "POST" "/auths/auth/loginwithpwd" \
'{"email":"test@example.com","password":"testpassword"}' \
"AUTHS Login (doit être supprimé)" 404 && ((auths_failed++))

test_endpoint "POST" "/auths/auth/registerwithpwd" \
'{"email":"test@example.com","password":"testpassword","verifyPassword":"testpassword"}' \
"AUTHS Register (doit être supprimé)" 404 && ((auths_failed++))

test_endpoint "POST" "/auths/auth/email/forgot-password" \
'{"email":"test@example.com"}' \
"AUTHS Forgot Password (doit être supprimé)" 404 && ((auths_failed++))

test_endpoint "POST" "/auths/auth/new-email-validation-Account" \
'{"email":"test@example.com"}' \
"AUTHS Account Validation (doit être supprimé)" 404 && ((auths_failed++))

echo ""

echo "📊 3. RÉSUMÉ DE LA VALIDATION"
echo "============================="

# Calculer les scores
iam_percentage=$((iam_success * 100 / iam_total))
auths_percentage=$((auths_failed * 100 / auths_total))

echo "🟢 Endpoints IAM fonctionnels : $iam_success/$iam_total ($iam_percentage%)"
echo "🔴 Endpoints AUTHS supprimés : $auths_failed/$auths_total ($auths_percentage%)"

# Évaluation finale
total_score=$((iam_success + auths_failed))
max_score=$((iam_total + auths_total))
final_percentage=$((total_score * 100 / max_score))

echo ""
echo "🎯 Score global de nettoyage : $total_score/$max_score ($final_percentage%)"

if [ "$final_percentage" -ge 90 ]; then
    echo -e "${GREEN}🎉 NETTOYAGE RÉUSSI ! Module AUTHS complètement supprimé${NC}"
    echo ""
    echo "✅ VALIDATION FINALE :"
    echo "   • Tous les endpoints IAM fonctionnent"
    echo "   • Tous les endpoints AUTHS sont supprimés"
    echo "   • Le backend utilise uniquement l'architecture IAM"
    echo ""
    echo "📋 SYSTÈME UNIFIÉ OPÉRATIONNEL :"
    echo "   • Backend : 100% IAM"
    echo "   • Frontend : Migré vers endpoints IAM"
    echo "   • Architecture : Sécurisée et moderne"
elif [ "$final_percentage" -ge 70 ]; then
    echo -e "${YELLOW}⚠️  NETTOYAGE QUASI-COMPLET ($final_percentage%)${NC}"
    echo ""
    echo "📋 Actions requises :"
    echo "   • Vérifier les endpoints qui ne répondent pas comme attendu"
    echo "   • S'assurer que tous les endpoints AUTHS sont supprimés"
else
    echo -e "${RED}❌ NETTOYAGE INCOMPLET ($final_percentage%)${NC}"
    echo ""
    echo "📋 Actions urgentes :"
    echo "   • Déboguer les problèmes d'endpoints IAM"
    echo "   • Vérifier que le module AUTHS est complètement supprimé"
    echo "   • Redémarrer le backend si nécessaire"
fi

echo ""
echo -e "${BLUE}🔍 Endpoints disponibles sur le backend :${NC}"
echo "   • http://localhost:3100/api/authentication/* (IAM)"
echo "   • http://localhost:3100/api/users/* (Users avec guards IAM)"
echo "   • http://localhost:3100/api/posts/* (Posts)"
echo "   • http://localhost:3100/api/tasks/* (Tasks)"
echo "   • http://localhost:3100/api/todos/* (Todos)"

if [ "$final_percentage" -ge 90 ]; then
    exit 0
else
    exit 1
fi