# CopyNiche - AI SaaS for E-commerce Copywriting

CopyNiche est un micro-SaaS générateur de fiches produits propulsé par l'IA (Claude Sonnet), conçu pour les e-commerçants Shopify et WooCommerce. Fonctionnalités de streaming, freemium, paiements Stripe et interface premium.

## 🚀 Fonctionnalités
- **Génération IA en temps réel** : Prompt avancé basé sur AIDA et les biais cognitifs.
- **Authentification** : NextAuth v5 avec Google Provider et Magic Links (Resend).
- **Base de données** : PostgreSQL + Prisma ORM.
- **Paiements** : Stripe Checkout (One-time payment).
- **Design System** : Custom TailwindCSS, thématique Dark Premium.

## 📦 Stack Technique
- Next.js 14 (App Router)
- TypeScript Strict
- Tailwind CSS
- Prisma (v5)
- Anthropic SDK & Vercel AI SDK
- Stripe

## 🛠 Installation Locale

1. **Cloner le projet**
   \`\`\`bash
   git clone <repo>
   cd copyniche
   \`\`\`

2. **Installer les dépendances**
   \`\`\`bash
   npm install
   \`\`\`

3. **Variables d'environnement**
   Copiez le fichier \`.env.example\` vers \`.env\` et remplissez les valeurs.
   \`\`\`bash
   cp .env.example .env
   \`\`\`

4. **Base de données**
   Assurez-vous d'avoir une instance PostgreSQL qui tourne et renseignez l'URL dans `.env`.
   Ensuite, synchronisez le schéma :
   \`\`\`bash
   npx prisma db push
   npx prisma generate
   \`\`\`

5. **Lancer le serveur de développement**
   \`\`\`bash
   npm run dev
   \`\`\`
   L'application tourne sur \`http://localhost:3000\`.

## 💳 Configuration Stripe
Pour tester les paiements en dev :
1. Créez des produits `Starter` et `Pro` en mode One-Time.
2. Récupérez les IDs des Price (ex: `price_xxxxxxxx`).
3. Renseignez-les dans le `.env`.
4. Écoutez les webhooks localement avec le Stripe CLI :
   \`\`\`bash
   stripe listen --forward-to localhost:3000/api/webhooks/stripe
   \`\`\`
   Récupérez le secret du webhook fourni par le terminal et ajoutez-le dans `.env`.

## 🌍 Déploiement Vercel
Le projet est prêt pour Vercel. 
1. Poussez votre code sur GitHub.
2. Importez le projet dans Vercel.
3. Ajoutez toutes les variables d'environnement dans les settings Vercel.
4. Assurez-vous d'avoir ajouté l'addon Vercel Postgres ou une base externe (Supabase/Neon).
Le fichier `vercel.json` étend le `maxDuration` de l'API de génération à 60s pour palier aux descriptions longues.
