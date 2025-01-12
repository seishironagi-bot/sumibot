
import fs from 'fs';
import dotenv from 'dotenv';

dotenv.config();

const obtenerDatos = () => {
    try {
        return fs.existsSync('data.json') 
            ? JSON.parse(fs.readFileSync('data.json', 'utf-8')) 
            : { usuarios: {} };
    } catch (error) {
        console.error('Error al leer data.json:', error);
        return { usuarios: {} };
    }
};

const guardarDatos = (data) => {
    try {
        fs.writeFileSync('data.json', JSON.stringify(data, null, 2));
    } catch (error) {
        console.error('Error al escribir en data.json:', error);
    }
};

const depositarRecompensa = (userId, cantidad) => {
    if (cantidad <= 0) {
        console.log(`La cantidad a depositar debe ser mayor que cero.`);
        return false; // No se puede depositar
    }
    let data = obtenerDatos();
    if (!data.usuarios[userId]) {
        data.usuarios[userId] = { bank: 0 }; // Crear usuario si no existe
    }
    data.usuarios[userId].bank += cantidad; // Aumentar el saldo del banco
    guardarDatos(data);
    console.log(`El usuario ${userId} ha depositado ${cantidad} Zekis en el banco.`);
    return true; // Depósito exitoso
};

const handler = async (m, { conn }) => {
    const sender = m.sender;
    const cantidad = Math.floor(Math.random() * (150 - 10 + 1)) + 10; // Generar una cantidad aleatoria entre 10 y 150
    const depositoExitoso = depositarRecompensa(sender, cantidad);
    
    if (!depositoExitoso) {
        return await conn.sendMessage(m.chat, {
            text: 'No se pudo realizar el depósito. Asegúrate de que la cantidad sea mayor que cero.',
            mentions: [sender]
        });
    }

    return await conn.sendMessage(m.chat, {
        text: `¡Felicidades @${sender.split('@')[0]}, has depositado ${cantidad} Zekis en tu banco!`,
        mentions: [sender]
    });
};

handler.help = ['depositar'];
handler.tags = ['banco'];
handler.command = ['depositar', 'dep'];
handler.group = true;

export default handler;
