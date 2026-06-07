# MoneyXchange - Projektarbete

Det här är en React applikation som vi har byggt för att hantera valutor på olika sätt. Den använder ett externt API för att hämta växelkurser i realtid.

# Sidor och Funktioner

Appen är uppdelad i två huvudsidor via React Router:

# Första sidan "/"

Convert.jsx: Här kan man skriva in ett belopp och växla från en valuta till en annan. De 5 senaste sökningarna sparas i en lista med hjälp av localStorage.

GetList.jsx: Visar en lista med alla världens valutaförkortningar och namn. Det finns också ett sökfält så man lätt kan filtrera listan.

Graf.jsx Visar en linjegraf över hur en vald valuta har rört sig mot dollarn under de senaste 30 dagarna. Valutan kommer alltid att börja med SEK.

# Andra sidan "/trading"

En spelsida där man startar med 1 000 kr.
Man kan välja att trycka på Buy om man tror USD/SEK ska stiga eller Sell om man tror den ska sjunka.
När man trycker på Close Trade räknas vinsten eller förlusten ut baserat på hur kursen har ändrats, och saldot uppdateras. Statusen sparas i localStorage så att spelet kommer ihåg var man var

# API nycklar

Skapa en .env fil som ska ligga i moenyxchange filen men utanför src.
sprara API nyckeln så VITE_API_KEY=nyckeln_här
API nyckeln vi har är GHbEXMDOsioAFV41ZibTnI0QFY1dVtsU
Om den inte funkar kan du antigen kontakta abdullahalshammari12 eller ibbe5413 på dc
