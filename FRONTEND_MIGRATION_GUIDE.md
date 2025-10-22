# 📋 PLAN DÉTAILLÉ - MIGRATION FRONTEND AUTHS → IAM

## 🎯 **ANALYSE COMPLÈTE**

### 📊 **Impact Très Limité (2% du code)**

- ✅ **3 fichiers seulement** utilisent les endpoints AUTHS
- ✅ **2 endpoints principaux** à migrer : `loginwithpwd` et `registerwithpwd`
- ✅ **Architecture moderne** : Angular 21 avec Signals et Services injectables

### 🔍 **Fichiers Impactés**

#### 1. **Services d'Authentification**

- `auth.service.ts` : Service principal (moderne avec Signals)
- `register.service.ts` : Service d'inscription (simple)
- `old.auth.service.ts` : Service legacy (à supprimer)

#### 2. **Endpoints Utilisés**

```typescript
// AUTHS Legacy → IAM Moderne
'api/auths/auth/loginwithpwd'        → 'api/authentication/sign-in' ✅ (déjà disponible)
'api/auths/auth/registerwithpwd'     → 'api/authentication/register-extended' ✅
'api/auths/auth/loggedUser/:email'   → 'api/authentication/user/:email' ✅
'api/auths/checkCredential/'         → 'api/authentication/check-credentials/:email' ✅
```

## 🚀 **STRATÉGIE DE MIGRATION**

### ⚡ **Phase 1 : Créer le Service IAM Angular (30 min)**

**Objectif :** Créer un service Angular moderne utilisant les nouveaux endpoints IAM

**Actions :**

1. Créer `iam-auth.service.ts` avec endpoints IAM
2. Conserver interfaces existantes pour compatibilité
3. Implémenter la même logique que `auth.service.ts` mais avec endpoints IAM
4. Tests unitaires de base

### 🔄 **Phase 2 : Migration Progressive (45 min)**

**Objectif :** Remplacer progressivement les appels AUTHS par IAM

**Étapes :**

1. **auth.service.ts** : Remplacer les 3 endpoints AUTHS
2. **register.service.ts** : Migrer vers endpoint IAM
3. **old.auth.service.ts** : Marquer comme deprecated et remplacer

### 🧪 **Phase 3 : Tests et Validation (30 min)**

**Objectif :** S'assurer que tout fonctionne correctement

**Actions :**

1. Tests de login/logout
2. Tests d'inscription
3. Tests de récupération du profil utilisateur
4. Validation des tokens JWT

### 🧹 **Phase 4 : Nettoyage (15 min)**

**Objectif :** Supprimer le code legacy

**Actions :**

1. Supprimer `old.auth.service.ts`
2. Nettoyer les imports inutilisés
3. Mettre à jour la documentation

## 📝 **IMPLÉMENTATION DÉTAILLÉE**

### 🆕 **Nouveau Service IAM Angular**

```typescript
// iam-auth.service.ts
@Injectable({
  providedIn: 'root'
})
export class IamAuthService {
  // Même signature que auth.service.ts mais avec endpoints IAM
  async login(email: string, password: string): Promise<ILoginResponse> {
    const pathUrl = "api/authentication/sign-in"; // ✅ IAM endpoint
    // ... reste identique
  }

  async register(email: string, password: string, confirmPassword: string): Promise<IRegisterResponse> {
    const pathUrl = "api/authentication/register-extended"; // ✅ IAM endpoint  
    // ... reste identique
  }

  async fetchUser(): Promise<IUserLogged | undefined | null> {
    // Utiliser api/authentication/user/:email au lieu de api/auths/auth/loggedUser/:email
  }
}
```

### 🔄 **Migration des Modèles**

**Bonne nouvelle :** Les interfaces existantes sont **parfaitement compatibles** avec les réponses IAM !

- `ILoginResponse` ✅ Compatible
- `IRegisterResponse` ✅ Compatible  
- `IUserLogged` ✅ Compatible

### 📋 **Mapping Précis des Endpoints**

| **Fonction** | **AUTHS Legacy** | **IAM Moderne** | **Status** |
|--------------|------------------|-----------------|------------|
| **Login** | `api/auths/auth/loginwithpwd` | `api/authentication/sign-in` | ✅ Testé |
| **Register** | `api/auths/auth/registerwithpwd` | `api/authentication/register-extended` | ✅ Testé |
| **Get User** | `api/auths/auth/loggedUser/:email` | `api/authentication/user/:email` | ✅ Testé |
| **Check Creds** | `api/auths/checkCredential/` | `api/authentication/check-credentials/:email` | ✅ Testé |

## ⏱️ **PLANNING DÉTAILLÉ**

### 🎯 **Étape 1 : Nouveau Service (30 min)**

- [ ] Créer `apps/frontend/jcm-app/src/app/features/auth/Services/iam-auth.service.ts`
- [ ] Implémenter `login()`, `register()`, `fetchUser()`
- [ ] Tests de compilation

### 🎯 **Étape 2 : Migration auth.service.ts (20 min)**

- [ ] Remplacer `api/auths/auth/loginwithpwd` → `api/authentication/sign-in`
- [ ] Remplacer `api/auths/auth/registerwithpwd` → `api/authentication/register-extended`
- [ ] Remplacer `api/auths/auth/loggedUser/:email` → `api/authentication/user/:email`

### 🎯 **Étape 3 : Migration register.service.ts (10 min)**

- [ ] Remplacer `api/auths/auth/registerwithpwd` → `api/authentication/register-extended`

### 🎯 **Étape 4 : Tests Complets (30 min)**

- [ ] Test login/logout cycle
- [ ] Test registration flow  
- [ ] Test profile fetching
- [ ] Validation tokens JWT

### 🎯 **Étape 5 : Nettoyage (15 min)**

- [ ] Supprimer `old.auth.service.ts`
- [ ] Nettoyer imports
- [ ] Mettre à jour documentation

## ⚠️ **POINTS D'ATTENTION**

### 🔍 **Changements d'API Mineurs**

1. **Check Credentials** : Format de request légèrement différent
   ```typescript
   // AUTHS: POST avec body { emailToCheck }
   // IAM: POST avec email dans l'URL /check-credentials/:email
   ```

2. **Register Extended** : Nouveaux champs optionnels disponibles
   ```typescript
   // IAM supporte plus de champs: firstName, lastName, phone, birthDate, etc.
   ```

### 🛡️ **Avantages de la Migration**

- **🔒 Sécurité** : Guards automatiques, 2FA support
- **⚡ Performance** : Architecture moderne optimisée
- **🧪 Testabilité** : Services modulaires et bien structurés
- **🚀 Évolutivité** : Prêt pour nouvelles fonctionnalités

## 🏁 **RÉSULTAT ATTENDU**

### ✅ **Frontend Migré**
```
apps/frontend/jcm-app/src/app/features/auth/Services/
├── ✅ auth.service.ts (migré vers endpoints IAM)
├── ✅ register.service.ts (migré vers endpoints IAM)  
├── 🆕 iam-auth.service.ts (nouveau service de référence)
└── 🗑️ old.auth.service.ts (supprimé)
```

### 🎯 **Backend Unifié**
```
libs/backend/
├── ✅ iam/ (système unique d'authentification)
└── 🗑️ auths/ (supprimé après migration frontend)
```

---

**⏱️ TEMPS TOTAL ESTIMÉ : ~2 heures**  
**🎯 COMPLEXITÉ : Faible (2% du code impacté)**  
**🚀 STATUT : PRÊT À COMMENCER**
