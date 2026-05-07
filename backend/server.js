const express = require('express');
const cors = require('cors');
const { createClient } = require('@supabase/supabase-js');

const app = express();
app.use(cors());
app.use(express.json());

// Reemplaza con tus credenciales de Supabase
const supabaseUrl = 'https://xkpxuxjvcjkcxrzptmqf.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhrcHh1eGp2Y2prY3hyenB0bXFmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzgxNzc4NjAsImV4cCI6MjA5Mzc1Mzg2MH0.4J6F2aiOWVTav-OdF6zBjsThL766biQYsspH-fRRdX0';
const supabase = createClient(supabaseUrl, supabaseKey);

// Ruta para obtener todos los catálogos de un solo golpe
app.get('/catalogos', async (req, res) => {
    try {
        const [clientes, vendedores, items, condiciones, detracciones] = await Promise.all([
            supabase.from('clientes').select('*'),
            supabase.from('vendedores').select('*'),
            supabase.from('items').select('*'),
            supabase.from('condiciones_pago').select('*'),
            supabase.from('tipos_detraccion').select('*')
        ]);

        res.json({
            clientes: clientes.data,
            vendedores: vendedores.data,
            items: items.data,
            condiciones: condiciones.data,
            detracciones: detracciones.data
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor activo en puerto ${PORT}`));