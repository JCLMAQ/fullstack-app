# 🚀 MIGRATION IAM - ANALYSE DES ENDPOINTS

## 📊 Mapping des Fonctionnalités

### ✅ DÉJÀ PRÉSENT DANS IAM

| AUTHS Endpoint | IAM Equivalent | Status |
|---------------|----------------|---------|
| `POST /auths/auth/loginwithpwd` | `POST /authentication/sign-in` | ✅ Compatible |
| `POST /auths/auth/registerwithpwd` | `POST /authentication/sign-up` | ✅ Compatible |

### ❌ MANQUANT DANS IAM - À IMPLÉMENTER

| AUTHS Endpoint | Fonctionnalité | Priorité |
|---------------|----------------|----------|
| `GET /auths/auth/loggedUser/:emailId` | Get user profile by email | 🔴 HIGH |
| `GET /auths/auth/checkCredential/:emailCheck` | Check if user exists | 🔴 HIGH |
| `POST /auths/auth/logoutwithpwd` | Logout with password | 🟡 MEDIUM |
| `POST /auths/auth/changepwd` | Change password | 🟡 MEDIUM |
| `GET /auths/auth/valid-account/:token` | Validate account via token | 🔴 HIGH |
| `POST /auths/auth/new-email-validation-Account` | Request new validation email | 🔴 HIGH |
| `POST /auths/auth/email/forgot-password` | Send forgot password email | 🔴 HIGH |
| `GET /auths/auth/email/reset-password/:token` | Validate reset token | 🔴 HIGH |
| `POST /auths/auth/email/reset-password/:token` | Reset password with token | 🔴 HIGH |

### 🔄 FONCTIONNALITÉS UNIQUEMENT DANS IAM

| IAM Endpoint | Fonctionnalité | Avantage |
|-------------|----------------|----------|
| `POST /authentication/sign-in-cookies` | Cookie-based auth | 🚀 Modern |
| `POST /authentication/refresh-tokens` | Token refresh | 🚀 Sécurité |
| `POST /authentication/2fa/generate` | 2FA QR Code | 🚀 Sécurité |

## 🎯 PLAN DE MIGRATION - PHASE 1

### Étape 1 : Implémenter les fonctionnalités manquantes dans IAM

1. **Account Validation System**
   - Service de validation email
   - Routes de validation de compte
   - Gestion des tokens de validation

2. **Password Reset System**
   - Service forgot password
   - Routes reset password
   - Gestion des tokens de reset

3. **User Profile System**
   - Routes user profile/check
   - Service user lookup

4. **Password Management**
   - Route change password
   - Logout service

### Étape 2 : Créer des DTOs compatibles

- Adapter les DTOs AUTHS vers IAM
- Conserver les interfaces pour le frontend
- Ajouter validation moderne

### Étape 3 : Migration progressive

- Désactiver guards IAM pour routes legacy
- Tester endpoint par endpoint
- Valider compatibilité frontend

## 📋 SERVICES À MIGRER VERS IAM

### 🔧 Services AUTHS à porter
- `AccountValidationService` → IAM
- `LoginwithpwdService` (reset pwd) → IAM
- `UserAuthUtilityService` → IAM
- `TokenService` → IAM integration

### 🏗️ Architecture cible
```
libs/backend/iam/src/lib/
├── authentication/
│   ├── account-validation/
│   ├── password-reset/
│   ├── user-profile/
│   └── password-management/
└── services/
    ├── email-validation.service.ts
    ├── password-reset.service.ts
    └── user-lookup.service.ts
```
