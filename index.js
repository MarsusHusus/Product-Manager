// Web-Framework für Node.js, hilft bei erstellung von API'S
import express from 'express';
// Middleware-Tool, analysiert JSON daten, macht sie für das Backend verarbeitbar
import bodyParser from 'body-parser';
// Importiert die Product.js Datei
import productRoutes from './routes/products.js'; // Changed from users.js to products.js

// Express Instanz wird erstellt, Dieser fungiert als Server den man konfigurieren wird
const app = express();
// Port auf der der Server laufen soll
const PORT = 5000;

// fügt bodyparser als Middleware hinzu, Server ist nun in der Lage JSON_Daten die der Client sendet (zmb POST anfrage) zu verstehen
app.use(bodyParser.json());

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Routing
app.use('/products', productRoutes); // Changed from /users to /products

app.get('/', (req, res) => {
    console.log('TEST');
    res.send('Hello from Homepage.');
});

app.get('/marvin', (req, response) => {
    console.log('TEST');
    response.send('hi ' + PORT);
});

// Server wird gestartet, er hört auf denn PORT 5000, und gibt einen Console.log aus
app.listen(PORT, () => console.log(`Server running on port: http://localhost:${PORT}`));