# Image Search App

### Starta applikationen:

#### Kilent:
1. `cd client`
2. `npm install`
3. `npm run dev`

#### server:
1. `cd server`
2. `npm install`
3. `nodemon server`

#### Test
- username: test@gmail.com
- password: ThisIsTest!

---

## Beskrivning
I den här uppgiften skall ni skapa en fullstack applikation och integrera två tredjepart-system; Google Custom Search och Auth0. 
Applikationen skall byggas headless med en React-frontend och en Node(express)-backend. 

På sidan skall man kunna logga in med sitt Google eller GitHub konto. Väl inloggad skall man kunna söka efter bilder och se resultatet. 

Man skall kunna spara en bild som läggs till i sin lista av favoritbilder. När man sparar en bild skickas ett anrop till servern som lagrar informationen i en JSON-fil. 

Sidan skall även kunna visa en lista över ”mina favoritbilder”. Varje användare har sin egna lista över favoritbilder. 

## Kravlista

### Klient:
1. Man skall kunna logga in med sitt Google eller GitHub konto (Auth0)  
2. Man skall (endast om man är inloggad) kunna söka efter bilder och se resultatet, max 10 bilder. (Google Custom Search)  
3. Om man har stavat lite fel i sin sökning skall man få upp ”Menade du...” och kunna trycka på det rätt-stavade sökordet och göra en ny sökning.  
4. Man skall se hur lång tid sökningen tog  
5. Man skall kunna spara en bild och lägga till i sin lista över favoritbilder  
6. Någonstans på sidan skall man kunna se sin lista över favoritbilder  
7. Varje användare har sin egna unika lista över favoritbilder  

### Server:
1. I en JSON-fil på servern lagras en lista över användare och deras favoritbilder.    
2. Servern har en endpoint som sparar en favoritbild. Datan skall valideras med Joi innan den sparas.  
3. Servern har en endpoint som svarar med en lista över favoritbilder tillhörande en specifik användare  
4. JSON-filen har denna datastruktur:  
```
[
    "user": "fakeuser",
    "favoriteMovies": [
        {
            "title": "faketitle",
            "byteSize": 2832098,
            "url": "http://.........."
        }
    ]
]
```
    
### Allmänt:
1. Uppgiften skall lämnas in i tid  
2. Git och GitHub har använts  
3. Readme skall finnas med information om hur projekten byggs  
4. node_modules ska ej finnas med  

