# 📘 Cahier des Charges

## Application Web SPA – Génération et Partage Sécurisé de PDF à partir d’Images

### TFE – Formation Front-End Developer IFAPME

**Étudiant : Loïc**  
**Technologies : React – Vite – TypeScript**

---

# 1. Contexte du projet

Dans le cadre du Travail de Fin d’Études (TFE) de la formation Front-End Developer à l’IFAPME, ce projet consiste à développer une application web monopage (Single Page Application – SPA) permettant :

- L’importation d’images depuis un appareil local (ordinateur ou smartphone)
- La capture d’images via appareil photo
- La réorganisation des images
- La génération d’un PDF (1 image par page)
- Le partage du PDF via les fonctionnalités natives du terminal

L’application est destinée à un usage **interne gouvernemental**, impliquant des exigences strictes en matière de sécurité et de conformité RGPD.

---

# 2. Objectifs du projet

## 2.1 Objectif principal

Développer une application web 100% client-side permettant la création et le partage sécurisé de documents PDF à partir d’images importées ou capturées.

## 2.2 Objectifs secondaires

- Garantir une conformité RGPD stricte
- Assurer une excellente expérience utilisateur mobile
- Optimiser les performances (compression et gestion mémoire)
- Développer une architecture React moderne, maintenable et typée
- Déployer une Progressive Web App (PWA)

---

# 3. Contraintes

## 3.1 Contraintes techniques

- Aucune base de données
- Aucun backend
- Aucune API serveur
- Aucune persistance de données (LocalStorage, IndexedDB interdits)
- Toutes les données doivent rester en mémoire volatile (RAM)

## 3.2 Contraintes légales

- Conformité stricte RGPD
- Aucune donnée transmise à un tiers
- Aucune collecte ou tracking
- Aucune analytics
- Aucune externalisation

## 3.3 Contraintes UX

- Utilisable immédiatement sans authentification
- Accessible sur smartphone
- Compatible desktop
- Interface intuitive pour utilisateurs non techniques

---

# 4. Périmètre Fonctionnel

L’application devra permettre à un utilisateur :

1. D’importer des images
2. De capturer des images via caméra
3. De visualiser les images en miniature
4. De réorganiser leur ordre
5. De les modifier (rotation)
6. De générer un PDF
7. De partager ou télécharger le PDF
8. De supprimer les images

---

# 5. Fonctionnalités – Méthode MoSCoW

## 5.1 MUST HAVE (Indispensable)

### 📂 Import d’images

- Drag & Drop
- Sélection via explorateur
- Support multi-fichiers
- Formats autorisés : JPG, PNG, WEBP

---

### 📷 Capture via appareil photo

- Utilisation API `getUserMedia`
- Ajout automatique à la liste
- Possibilité de reprendre la photo

---

### 🖼️ Affichage des images

- Preview miniature
- Nom du fichier
- Taille estimée
- Indication de compression

---

### 🔁 Réorganisation

- Drag & Drop (dnd-kit)
- Compatible mobile
- Mise à jour dynamique

---

### 🔄 Rotation image

- Rotation 90° droite/gauche
- Mise à jour preview

---

### 📄 Génération PDF

- 1 image = 1 page
- Format A4
- Respect ratio image
- Pas de déformation
- Centrage automatique

---

### 📤 Export & Partage

- Bouton Export (download)
- Bouton Partager
  - Mobile → Web Share API
  - Desktop → fallback téléchargement

---

### 🗑️ Suppression

- Supprimer image individuelle
- Bouton “Tout supprimer”
- Confirmation avant suppression globale

---

### 🔐 RGPD

- Aucune persistance
- Nettoyage au refresh
- Pas de cookies
- Pas de stockage

---

## 5.2 SHOULD HAVE (Important)

### 📉 Compression automatique

- Compression configurable
- Optimisation taille PDF
- Indicateur de qualité

---

### 📊 Indicateur taille PDF estimée

- Estimation dynamique
- Affichage en MB

---

### ♿ Accessibilité

- Navigation clavier
- ARIA labels
- Contraste suffisant
- Focus states visibles

---

### 📱 Responsive complet

- Mobile first
- Optimisation tactile
- UI adaptée tablette

---

### 🕒 Nettoyage automatique

- Suppression si inactivité > X minutes
- Avertissement avant purge

---

## 5.3 COULD HAVE (Amélioration)

- Mode sombre
- Prévisualisation PDF avant export
- Indicateur mémoire utilisée
- Installation PWA

---

## 5.4 WON’T HAVE (Hors périmètre)

- Backend
- Authentification
- Sauvegarde cloud
- Base de données
- Historique utilisateur
- Multi-utilisateurs
- OCR
- Signature électronique

---

# 6. Architecture Technique

## 6.1 Stack

- React 18
- Vite
- TypeScript
- Tailwind CSS
- dnd-kit
- react-dropzone
- pdf-lib
- browser-image-compression
- Web Share API
- Vite PWA Plugin

---

## 6.2 Structure du Projet

src/
├── components/
├── hooks/
├── utils/
├── types/
├── context/
└── App.tsx

---

## 6.3 Gestion d’État

- State lifting via Context API
- Stockage en mémoire uniquement
- Pas de persistance

---

# 7. Architecture UX

## 7.1 Flow Utilisateur

1. Arrive sur page
2. Ajoute images ou prend photo
3. Réorganise
4. Exporte ou partage
5. Quitte → données supprimées

---

## 7.2 Principes UX

- Minimaliste
- Boutons clairs
- Feedback visuel immédiat
- Confirmation actions critiques

---

# 8. Sécurité & RGPD

## 8.1 Données personnelles

Les images peuvent contenir des données sensibles.

### Mesures :

- Aucun envoi serveur
- Aucun stockage
- Traitement local uniquement
- Suppression mémoire à la fermeture

---

## 8.2 Analyse des risques

| Risque              | Mesure                 |
| ------------------- | ---------------------- |
| Perte appareil      | Données non persistées |
| Interception réseau | Aucun transit réseau   |
| Fuite serveur       | Aucun serveur          |

---

# 9. Performance

- Compression image
- Optimisation taille PDF
- Lazy rendering previews
- Nettoyage mémoire après export

---

# 10. Accessibilité

- WCAG AA minimum
- ARIA roles
- Keyboard drag support
- Labels explicites

---

# 11. Compatibilité

| Navigateur     | Support |
| -------------- | ------- |
| Chrome         | Oui     |
| Edge           | Oui     |
| Firefox        | Oui     |
| Safari         | Oui     |
| iOS Safari     | Oui     |
| Android Chrome | Oui     |

---

# 12. Tests

## 12.1 Tests fonctionnels

- Upload multiple
- Rotation
- Réorganisation
- Export correct
- Share mobile

## 12.2 Tests de charge

- 50 images max
- Taille max 10MB/image

## 12.3 Tests UX

- Mobile réel
- Desktop
- Tablette

---

# 13. Planning Prévisionnel

| Phase            | Durée     |
| ---------------- | --------- |
| Conception       | 1 semaine |
| Setup projet     | 2 jours   |
| Upload & preview | 1 semaine |
| Drag & Drop      | 1 semaine |
| PDF generation   | 1 semaine |
| Camera           | 3 jours   |
| Compression      | 3 jours   |
| PWA              | 2 jours   |
| Tests            | 1 semaine |
| Documentation    | 1 semaine |

---

# 14. Livrables

- Code source Git
- Application déployée
- Documentation technique
- Rapport TFE complet
- Cahier des charges
- Manuel utilisateur

---

# 15. Critères d’Acceptation

- PDF correct (1 image/page)
- Aucun stockage persistant
- Fonctionne mobile
- Partage opérationnel
- Interface accessible
- Performance acceptable

---

# 16. Indicateurs de Réussite

- Respect RGPD
- Fluidité UX
- Stabilité
- Code maintenable
- Architecture claire

---

# Conclusion

Ce projet répond :

- Aux exigences académiques
- Aux contraintes gouvernementales
- Aux standards modernes du développement web
- Aux principes de sécurité et confidentialité

Il constitue un démonstrateur technique complet des compétences acquises durant la formation.
