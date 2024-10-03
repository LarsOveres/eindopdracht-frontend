# Frontend eindopdracht

Dit project is een webapplicatie gebouwd met React voor het beheren, afspelen en uploaden van MP3-bestanden. Het bevat
JWT-gebaseerde authenticatie, rol-gebaseerde toegang en het bijhouden van statistieken zoals de playCount van
audiobestanden.

Link naar de repository: https://github.com/LarsOveres/eindopdracht-frontend

# Inhoudsopgave
- Overzicht
- Functies
- Installatie
- Gebruik
- Authenticatie
- Rollen en Toegangscontrole
- API Endpoints
- Projectstructuur
- Toekomstige verbeteringen
- Bijdragen
- Licentie

# Overzicht

Deze applicatie biedt een platform voor gebruikers om MP3-bestanden te uploaden, af te spelen en te beheren.
Afhankelijk van de gebruikersrol kunnen verschillende functionaliteiten worden gebruikt. Beheerders (admins) kunnen
bijvoorbeeld bestanden en gebruikers beheren, terwijl normale gebruikers bestanden kunnen beluisteren en statistieken
kunnen inzien.

# Functies

- Authenticatie: JWT-gebaseerde login en registratie.
- Bestandsbeheer: MP3-bestanden kunnen worden geüpload en afgespeeld.
- Download Count: Houdt bij hoe vaak een MP3-bestand is gedownload.
- Rollen-gebaseerde toegang: Verschillende rechten voor gebruikers en admins.
- Commentaar Systeem: Alleen admins kunnen opmerkingen plaatsen, terwijl alle gebruikers opmerkingen kunnen bekijken.
- API-integratie: Communicatie met een Spring Boot backend voor gegevensbeheer.

# Installatie

Volg de onderstaande stappen om het project lokaal te draaien.

### **Vereisten**

- Node.js (versie 14 of hoger)
- NPM
- Backend API (Spring Boot)

### **Stap 1: Clone de repository**

`git clone https://github.com/LarsOveres/eindopdracht-frontend`

`cd mp3-file-management`

### Stap 2: Installeer de dependencies

Gebruik NPM om de benodigde pakketten te installeren.

`npm install`

### Stap 3: Start de development server

Zorg ervoor dat de backend API actief is en start vervolgens de React-applicatie.

`npm start`

De applicatie zal standaard draaien op http://localhost:3000.

# Gebruik

1. Navigeer naar http://localhost:3000 in je browser.
2. Registreer of log in met bestaande accountgegevens.
3. Als admin kun je opmerkingen plaatsen.
4. Normale gebruikers kunnen bestanden uploaden en statistieken bekijken.

# Authenticatie

De applicatie maakt gebruik van JWT-token authenticatie. Na het inloggen wordt een JWT-token opgeslagen in de
`localStorage` en bij elk verzoek meegestuurd om de identiteit van de gebruiker te verifiëren.

# Rollen en Toegangscontrole

### Er zijn twee hoofdrollen:

- **Admin:** Heeft toegang tot alle bestanden, kan opmerkingen plaatsen, en bestanden beheren.
- **Gebruiker:** Kan alleen zijn eigen bestanden zien, bestanden afspelen, en opmerkingen bekijken.

# API Endpoints

### De applicatie communiceert met de Spring Boot backend via verschillende API-endpoints. Hier zijn enkele belangrijke:

`POST /files/upload` Upload een MP3-bestand.

`GET /files/{id}` Mp3 bestand opvragen.

`POST /files/{id}/comment` Plaats een opmerking bij een MP3-bestand (admin-only).

`GET /files/{id}/comments` Haal alle opmerkingen bij een MP3-bestand op.

# Voorbeeld API-verzoek

```markdown
fetch('http://localhost:8080/files/upload', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'multipart/form-data'
  },
  body: formData
});
```

# Projectstructuur

```markdown
/src
  /components        # Bevat alle React-componenten zoals CommentForm, FileDetails, etc.
  /pages             # Bevat de pagina's zoals Home, Login, etc.
  /services          # Bevat API-verzoeken en helperfuncties
  /assets            # Bevat statische bestanden zoals afbeeldingen of logo's
  App.js             # Hoofdapplicatiecomponent
  index.js           # Toegangspunt voor de applicatie
```