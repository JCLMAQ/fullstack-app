#!/bin/bash

# 🎯 SCRIPT DE VALIDATION - MIGRATION FRONTEND COMPLETÉE

echo "🎯 VALIDATION DE LA MIGRATION FRONTEND AUTHS → IAM"
echo "=================================================="

# Configuration
BACKEND_URL="http://localhost:3100/api"
FRONTEND_DIR="apps/frontend/jcm-app/src/app/features/auth/Services"

# Couleurs
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m'

echo -e "${BLUE}📁 Répertoire analysé: $FRONTEND_DIR${NC}"
echo ""

echo "🔍 1. VÉRIFICATION DES MIGRATIONS DE CODE"
echo "========================================="

# Vérifier que les anciens endpoints AUTHS ont été remplacés
echo -e "${BLUE}🔍 Recherche d'anciens endpoints AUTHS...${NC}"

auths_count=$(find $FRONTEND_DIR -name "*.ts" | xargs grep -c "api/auths/" 2>/dev/null | awk -F: '{sum += $2} END {print sum+0}')
iam_count=$(find $FRONTEND_DIR -name "*.ts" | xargs grep -c "api/authentication/" 2>/dev/null | awk -F: '{sum += $2} END {print sum+0}')

echo "📊 Statistiques de migration :"
echo "   - Anciens appels AUTHS restants : $auths_count"
echo "   - Nouveaux appels IAM : $iam_count"
echo ""

if [ "$auths_count" -eq 0 ]; then
    echo -e "   ${GREEN}✅ Aucun appel AUTHS restant - Migration complète !${NC}"
elif [ "$auths_count" -lt 3 ]; then
    echo -e "   ${YELLOW}⚠️  Quelques appels AUTHS restants ($auths_count) - À finaliser${NC}"
else
    echo -e "   ${RED}❌ Beaucoup d'appels AUTHS restants ($auths_count) - Migration incomplète${NC}"
fi

if [ "$iam_count" -gt 0 ]; then
    echo -e "   ${GREEN}✅ Nouveaux endpoints IAM détectés ($iam_count)${NC}"
else
    echo -e "   ${RED}❌ Aucun endpoint IAM détecté${NC}"
fi

echo ""

echo "🔍 2. DÉTAIL DES FICHIERS MIGRÉS"
echo "================================"

# Analyser chaque service
services=("auth.service.ts" "register.service.ts" "old.auth.service.ts")

for service in "${services[@]}"; do
    file_path="$FRONTEND_DIR/$service"
    if [ -f "$file_path" ]; then
        echo -e "${BLUE}📄 $service${NC}"

        auths_in_file=$(grep -c "api/auths/" "$file_path" 2>/dev/null || echo "0")
        iam_in_file=$(grep -c "api/authentication/" "$file_path" 2>/dev/null || echo "0")

        echo "   - Appels AUTHS : $auths_in_file"
        echo "   - Appels IAM : $iam_in_file"

        if [ "$auths_in_file" -eq 0 ] && [ "$iam_in_file" -gt 0 ]; then
            echo -e "   ${GREEN}✅ Migré vers IAM${NC}"
        elif [ "$auths_in_file" -gt 0 ] && [ "$iam_in_file" -eq 0 ]; then
            echo -e "   ${YELLOW}⚠️  Utilise encore AUTHS${NC}"
        elif [ "$auths_in_file" -gt 0 ] && [ "$iam_in_file" -gt 0 ]; then
            echo -e "   ${YELLOW}⚠️  Migration partielle${NC}"
        else
            echo -e "   ${RED}❌ Aucun endpoint détecté${NC}"
        fi
        echo ""
    else
        echo -e "${YELLOW}⚠️  $service non trouvé${NC}"
        echo ""
    fi
done

echo "🔍 3. NOUVEAUX SERVICES IAM CRÉÉS"
echo "================================="

new_services=("iam-auth.service.ts" "iam-register.service.ts")

for service in "${new_services[@]}"; do
    file_path="$FRONTEND_DIR/$service"
    if [ -f "$file_path" ]; then
        echo -e "${GREEN}✅ $service créé${NC}"

        iam_in_file=$(grep -c "api/authentication/" "$file_path" 2>/dev/null || echo "0")
        echo "   - Endpoints IAM : $iam_in_file"
    else
        echo -e "${YELLOW}⚠️  $service non créé${NC}"
    fi
done

echo ""

echo "🧪 4. TESTS DES ENDPOINTS"
echo "========================"

# Test rapide des endpoints IAM
echo -e "${BLUE}🔍 Test de base des endpoints IAM...${NC}"

# Test Register (devrait fonctionner)
register_response=$(curl -s -o /dev/null -w "%{http_code}" -X POST "$BACKEND_URL/authentication/register-extended" \
                           -H "Content-Type: application/json" \
                           -d '{"email":"migration-test@example.com","password":"test123","verifyPassword":"test123"}' 2>/dev/null)

if [ "$register_response" -eq 201 ]; then
    echo -e "   ${GREEN}✅ Register Extended : $register_response${NC}"
elif [ "$register_response" -eq 400 ] || [ "$register_response" -eq 409 ]; then
    echo -e "   ${YELLOW}⚠️  Register Extended : $register_response (Conflit/Validation - Normal)${NC}"
else
    echo -e "   ${RED}❌ Register Extended : $register_response${NC}"
fi

# Test Login (401 attendu car utilisateur n'existe pas)
login_response=$(curl -s -o /dev/null -w "%{http_code}" -X POST "$BACKEND_URL/authentication/sign-in" \
                        -H "Content-Type: application/json" \
                        -d '{"email":"migration-test@example.com","password":"test123"}' 2>/dev/null)

if [ "$login_response" -eq 401 ]; then
    echo -e "   ${YELLOW}⚠️  Sign-in : $login_response (Attendu - utilisateur inexistant)${NC}"
elif [ "$login_response" -eq 200 ]; then
    echo -e "   ${GREEN}✅ Sign-in : $login_response${NC}"
else
    echo -e "   ${RED}❌ Sign-in : $login_response${NC}"
fi

echo ""

echo "📊 5. RÉSUMÉ DE LA MIGRATION"
echo "============================"

# Calculer le score de migration
total_score=0
max_score=4

if [ "$auths_count" -eq 0 ]; then
    total_score=$((total_score + 1))
fi

if [ "$iam_count" -gt 0 ]; then
    total_score=$((total_score + 1))
fi

if [ "$register_response" -eq 201 ] || [ "$register_response" -eq 400 ] || [ "$register_response" -eq 409 ]; then
    total_score=$((total_score + 1))
fi

if [ "$login_response" -eq 401 ] || [ "$login_response" -eq 200 ]; then
    total_score=$((total_score + 1))
fi

percentage=$((total_score * 100 / max_score))

echo "🎯 Score de migration : $total_score/$max_score ($percentage%)"

if [ "$total_score" -eq "$max_score" ]; then
    echo -e "${GREEN}🎉 MIGRATION RÉUSSIE ! Tous les critères sont validés${NC}"
    echo ""
    echo "📋 PROCHAINES ÉTAPES :"
    echo "1. ✅ Tester l'application complète en mode dev"
    echo "2. ✅ Valider les flux d'authentification utilisateur"
    echo "3. ✅ Supprimer old.auth.service.ts si plus utilisé"
    echo "4. ✅ Nettoyer les imports inutilisés"
elif [ "$total_score" -ge 3 ]; then
    echo -e "${YELLOW}⚠️  MIGRATION QUASI-COMPLÈTE. Quelques ajustements mineurs nécessaires${NC}"
    echo ""
    echo "📋 ACTIONS REQUISES :"
    echo "1. Finaliser les dernières migrations d'endpoints"
    echo "2. Tester les cas d'usage critiques"
    echo "3. Corriger les derniers problèmes détectés"
else
    echo -e "${RED}❌ MIGRATION INCOMPLÈTE. Travail supplémentaire requis${NC}"
    echo ""
    echo "📋 ACTIONS URGENTES :"
    echo "1. Terminer la migration des endpoints AUTHS restants"
    echo "2. Valider que les nouveaux services IAM fonctionnent"
    echo "3. Déboguer les problèmes de connectivité"
fi

echo ""
echo -e "${BLUE}🔍 Pour plus de détails, examiner les fichiers dans :${NC}"
echo "   $FRONTEND_DIR"
