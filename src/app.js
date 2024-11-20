const express = require("express");
const cors = require("cors");
const path = require("path");
const authRoutes = require("./routes/authRoutes");
const productRoutes = require('./routes/productRoutes');
const cartRoutes = require('./routes/cartRoutes');
// Añadir esta línea a las importaciones
const billRoutes = require('./routes/billsRoutes');

// Añadir esta línea a las configuraciones de rutas

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Servir archivos estáticos
app.use(express.static(path.join(__dirname, "../public")));

// Configurar rutas de la API
app.use("/api/auth", authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);

app.use('/api/bills', billRoutes);

// ... otras rutas
// Ruta para manejar las vistas HTML
app.get(["/", "/admin", "/login", "/register"], (req, res) => {
    const page = req.path === "/" ? "login" : req.path.slice(1);
    res.sendFile(path.join(__dirname, `../public/views/${page}.html`));
});

// Manejador de errores
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ 
        message: 'Algo salió mal!',
        error: process.env.NODE_ENV === 'development' ? err.message : {}
    });
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});