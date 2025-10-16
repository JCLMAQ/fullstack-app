#!/bin/bash

# 🔍 SCRIPT D'ANALYSE FRONTEND - MIGRATION IAM
# Identifie tous les appels AUTHS dans le frontend pour planifier la migration

echo "🔍 ANALYSE FRONTEND - RECHERCHE APPELS AUTHS"
echo "=============================================="

# Configuration
FRONTEND_DIR="apps/frontend"
RESULTS_FILE="frontend-auths-analysis.txt"

# Nettoyer le fichier de résultats précédent
> $RESULTS_FILE

echo "📁 Analyse du répertoire : $FRONTEND_DIR"
echo ""

# 1. Rechercher tous les fichiers contenant "/auths/"
echo "🔍 1. Recherche des appels API '/auths/'" | tee -a $RESULTS_FILE
echo "=======================================" | tee -a $RESULTS_FILE
find $FRONTEND_DIR -name "*.ts" -o -name "*.js" -o -name "*.html" | xargs grep -l "/auths/" 2>/dev/null | tee -a $RESULTS_FILE
echo "" | tee -a $RESULTS_FILE

# 2. Rechercher des endpoints spécifiques
echo "🎯 2. Endpoints AUTHS spécifiques trouvés :" | tee -a $RESULTS_FILE
echo "===========================================" | tee -a $RESULTS_FILE

# Endpoints à rechercher
endpoints=(
    "registerwithpwd"
    "loginwithpwd"
    "forgot-password"
    "new-email-validation-Account"
    "valid-account"
    "change-password"
    "check-credentials"
    "users/"
)

for endpoint in "${endpoints[@]}"; do
    echo "📍 Recherche de '$endpoint' :" | tee -a $RESULTS_FILE
    find $FRONTEND_DIR -name "*.ts" -o -name "*.js" -o -name "*.html" | xargs grep -n "$endpoint" 2>/dev/null | tee -a $RESULTS_FILE
    echo "" | tee -a $RESULTS_FILE
done

# 3. Rechercher les services d'authentification
echo "🔧 3. Services d'authentification :" | tee -a $RESULTS_FILE
echo "====================================" | tee -a $RESULTS_FILE
find $FRONTEND_DIR -name "*auth*.service.ts" | tee -a $RESULTS_FILE
find $FRONTEND_DIR -name "*login*.service.ts" | tee -a $RESULTS_FILE
find $FRONTEND_DIR -name "*register*.service.ts" | tee -a $RESULTS_FILE
echo "" | tee -a $RESULTS_FILE

# 4. Rechercher dans les composants
echo "🧩 4. Composants utilisant l'authentification :" | tee -a $RESULTS_FILE
echo "===============================================" | tee -a $RESULTS_FILE
find $FRONTEND_DIR -name "*auth*.component.ts" | tee -a $RESULTS_FILE
find $FRONTEND_DIR -name "*login*.component.ts" | tee -a $RESULTS_FILE
find $FRONTEND_DIR -name "*register*.component.ts" | tee -a $RESULTS_FILE
echo "" | tee -a $RESULTS_FILE

# 5. Rechercher les imports liés à l'auth
echo "📦 5. Imports liés à l'authentification :" | tee -a $RESULTS_FILE
echo "=========================================" | tee -a $RESULTS_FILE
find $FRONTEND_DIR -name "*.ts" | xargs grep -n "import.*auth" 2>/dev/null | head -20 | tee -a $RESULTS_FILE
echo "" | tee -a $RESULTS_FILE

# 6. Statistiques
echo "📊 6. STATISTIQUES :" | tee -a $RESULTS_FILE
echo "===================" | tee -a $RESULTS_FILE
total_files=$(find $FRONTEND_DIR -name "*.ts" -o -name "*.js" -o -name "*.html" | wc -l)
auths_files=$(find $FRONTEND_DIR -name "*.ts" -o -name "*.js" -o -name "*.html" | xargs grep -l "/auths/" 2>/dev/null | wc -l)

echo "📁 Total fichiers frontend : $total_files" | tee -a $RESULTS_FILE
echo "🎯 Fichiers avec appels AUTHS : $auths_files" | tee -a $RESULTS_FILE
echo "📈 Pourcentage d'impact : $(( auths_files * 100 / total_files ))%" | tee -a $RESULTS_FILE
echo "" | tee -a $RESULTS_FILE

# 7. Plan de migration suggéré
echo "🚀 7. PLAN DE MIGRATION SUGGÉRÉ :" | tee -a $RESULTS_FILE
echo "==================================" | tee -a $RESULTS_FILE
echo "1. Créer un nouveau service Angular pour les endpoints IAM" | tee -a $RESULTS_FILE
echo "2. Migrer endpoint par endpoint :" | tee -a $RESULTS_FILE
echo "   - registerwithpwd → register-extended" | tee -a $RESULTS_FILE
echo "   - loginwithpwd → sign-in (déjà disponible)" | tee -a $RESULTS_FILE
echo "   - forgot-password → forgot-password" | tee -a $RESULTS_FILE
echo "   - etc..." | tee -a $RESULTS_FILE
echo "3. Tester chaque migration individuellement" | tee -a $RESULTS_FILE
echo "4. Supprimer les anciens appels AUTHS" | tee -a $RESULTS_FILE
echo "" | tee -a $RESULTS_FILE

echo "✅ Analyse terminée ! Résultats sauvegardés dans : $RESULTS_FILE"
echo ""
echo "📋 PROCHAINES ÉTAPES :"
echo "1. Examiner le fichier $RESULTS_FILE"
echo "2. Identifier les services à modifier en priorité"
echo "3. Créer un service Angular pour les nouveaux endpoints IAM"
echo "4. Planifier la migration progressive"
echo ""
echo "🔍 Pour voir les résultats :"
echo "cat $RESULTS_FILE"
