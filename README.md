# Digital Library

**Aplikacja webowa – Cyfrowa Biblioteka**

---

## Krótki opis projektu

Digital Library to nowoczesna aplikacja internetowa służąca do zarządzania książkami i autorami. Umożliwia przechowywanie, wyszukiwanie, sortowanie, edycję i usuwanie danych dotyczących książek oraz autorów. System powstał w celu demonstracji architektury MVC oraz integracji Node.js, Express i MongoDB.

---

## Lista i opis funkcjonalności

- Dodawanie, edycja i usuwanie książek oraz autorów (pełny CRUD)
- Wyszukiwanie książek i autorów (live search)
- Sortowanie książek i autorów po wybranych polach
- Paginacja (stronicowanie) długich list
- Przeglądanie wszystkich książek wybranego autora
- Autocomplete (podpowiedzi) przy wyborze autora i gatunku książki
- Obsługa stron 404 oraz błędów serwera
- Seedowanie bazy przykładowymi danymi
- Nowoczesny, responsywny interfejs (EJS + CSS)

---

## Instrukcja uruchomienia aplikacji

### 1. Wymagania

- Node.js (wersja min. 18.x)
- MongoDB (lokalnie lub MongoDB Atlas)

### 2. Instalacja zależności

W terminalu, w katalogu głównym projektu:
```bash
npm install
```

### 3. Konfiguracja bazy danych

W katalogu głównym utwórz plik `.env` o treści:
```
MONGO_URI = <Twój_connection_string_do_MongoDB>
```

### 4. Uruchomienie aplikacji

```bash
npm start
```
Aplikacja domyślnie uruchomi się na porcie:  
`http://localhost:3000/`

---

## Wersja Node.js

- Projekt testowany na Node.js 18.x oraz 20.x  
- Możliwe uruchomienie na nowszych wersjach (np. Node.js 22.x)

---

## Wykorzystane biblioteki zewnętrzne

- **express** — serwer HTTP i obsługa tras
- **mongoose** — połączenie z MongoDB i modele danych
- **ejs** — szablonowanie widoków
- **dotenv** — obsługa zmiennych środowiskowych (.env)
- **connect-flash** oraz **express-session** — powiadomienia
- **nodemon** — wygodny development

---

## Opis struktury aplikacji

```
digital-library/
│
├── controllers/           # Logika (kontrolery, przetwarzanie żądań)
│   ├── bookController.js
│   └── authorController.js
├── models/                # Modele danych do MongoDB (Mongoose)
│   ├── Book.js
│   └── Author.js
├── routes/                # Trasy (mapowanie URL na kontrolery)
│   ├── books.js
│   └── authors.js
├── views/                 # Widoki (szablony EJS)
│   ├── books/
│   ├── authors/
│   └── partials/
│   └── home.ejs
├── public/
│   └── css/
│       └── main.css
├── data/                  # Przykładowe dane wejściowe
│   ├── authors.json
│   └── books.json
├── seed.js                # Skrypt seedujący (zasilający bazę przykładowymi danymi)
├── app.js / server.js     # Główny plik uruchomieniowy
├── package.json
└── .env
```
**Opis głównych części:**
- **Modele:** opisują strukturę dokumentów w MongoDB (`Book`, `Author`)
- **Kontrolery:** logika biznesowa, obsługa zapytań i odpowiedzi
- **Widoki:** generowanie HTML na podstawie EJS i danych
- **Trasy:** mapują adresy URL na odpowiednie kontrolery
- **Public:** statyczne pliki CSS
- **Seed.js:** automatycznie wypełnia bazę przykładowymi danymi

---

## Przykładowe dane wejściowe

Pliki `data/authors.json` oraz `data/books.json` zawierają przykładowych autorów i książki.

**Aby zainicjować bazę danymi:**
1. Sprawdź konfigurację `.env` (adres do bazy MongoDB)
2. W terminalu uruchom:
   ```bash
   node seed.js
   ```
3. Otwórz aplikację — zobaczysz gotowe dane do testów!