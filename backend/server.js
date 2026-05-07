const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors()); // Permite que tu frontend se comunique con el backend
app.use(express.json());

app.post('/cotizar', (req, res) => {
    console.log("Datos recibidos:", req.body);
    // Aquí es donde luego conectaremos con Supabase
    res.status(200).send({ mensaje: "Recibido en el servidor" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`);
});