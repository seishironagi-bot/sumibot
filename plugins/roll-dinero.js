import fs from 'fs';
import dotenv from 'dotenv';
import db from '../lib/database.js';

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

let cooldowns = {};
const COOLDOWN_TIME = 10 * 60 * 1000; // 10 minutos

const ganarZekis = (userId, cantidad) => {
    let data = obtenerDatos();
    if (!data.usuarios[userId]) {
        data.usuarios[userId] = { bank: 0 }; // Crear usuario si no existe
    }
    data.usuarios[userId].bank += cantidad; // Aumentar el saldo del banco
    guardarDatos(data);
    console.log(`El usuario ${userId} ha ganado ${cantidad} Zekis.`);
};

const handler = async (m, { conn }) => {
    const sender = m.sender;
    const tiempoRestante = cooldowns[sender] ? COOLDOWN_TIME - (Date.now() - cooldowns[sender]) : 0;
    if (tiempoRestante > 0) {
        return await conn.sendMessage(m.chat, {
            text: `Debes esperar ${Math.floor(tiempoRestante / 60000)} minutos y ${(tiempoRestante % 60000) / 1000} segundos antes de ganar más Zekis.`,
            mentions: [sender]
        });
    }

    const cantidad = Math.floor(Math.random() * (150 - 10 + 1)) + 10; // Generar una cantidad aleatoria entre 10 y 150
    ganarZekis(sender, cantidad);
    cooldowns[sender] = Date.now(); // Reiniciar el temporizador

    return await conn.sendMessage(m.chat, {
        text: `¡Felicidades @${sender.split('@')[0]}, has ganado ${cantidad} Zekis y se han guardado en tu banco!`,
        mentions: [sender]
    });
};

handler.help = ['ganarzekis'];
handler.tags = ['banco'];
handler.command = ['ganar', 'g'];
handler.group = true;

export default handler;
