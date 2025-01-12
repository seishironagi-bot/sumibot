import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';
import dotenv from 'dotenv';

dotenv.config();
const obtenerDatos = () => {
    try {
        return fs.existsSync('data.json') 
            ? JSON.parse(fs.readFileSync('data.json', 'utf-8')) 
            : { usuarios: {}, personajesReservados: [] };
    } catch (error) {
        console.error('Error al leer data.json:', error);
        return { usuarios: {}, personajesReservados: [] };
    }
};

const guardarDatos = (data) => {
    try {
        fs.writeFileSync('data.json', JSON.stringify(data, null, 2));
    } catch (error) {
        console.error('Error al escribir en data.json:', error);
    }
};

const manejarConfirmacion = async (personaje, sender, usuarios, conn, m) => {
    if (!usuarios[sender]) {
        usuarios[sender] = { characters: [], characterCount: 0, totalRwcoins: 0 };
    }
    usuarios[sender].characters.push({
        name: personaje.name,
        url: personaje.url,
        value: personaje.value
    });
    guardarDatos({ usuarios });

    const mentions = [sender];
    return await conn.sendMessage(m.chat, { 
        text: `¡Felicidades @${sender.split('@')[0]}, confirmaste a ${personaje.name}!`, 
        mentions 
    });
};

let cooldowns = {};
const COOLDOWN_TIME = 1 * 60 * 1000; // 1 minuto

const handler = async (m, { conn }) => {
    if (!m.quoted) return;

    const sender = m.sender;
    const match = m.quoted.text.match(/\`ID:\`\s*-->\s*\`([a-zA-Z0-9-]+)\`/);
    const id = match && match[1];
    if (!match) {
        return await conn.sendMessage(m.chat, {
            text: 'No se encontró un ID válido en el mensaje citado.',
            mentions: [sender]
        });
    }

    const personajeId = id;
    const data = obtenerDatos();
    const personaje = data.personajesReservados.find(p => p.id === personajeId);
    if (!personaje) {
        return await conn.sendMessage(m.chat, {
            text: 'El personaje citado no está disponible.',
            mentions: [sender]
        });
    }

    const tiempoRestante = cooldowns[sender] ? COOLDOWN_TIME - (Date.now() - cooldowns[sender]) : 0;
    if (tiempoRestante > 0) {
        return await conn.sendMessage(m.chat, {
            text: `Debes esperar antes de confirmar otro personaje.
Tiempo restante: ${Math.floor(tiempoRestante / 60000)} minutos y ${(tiempoRestante % 60000) / 1000} segundos.`,
            mentions: [sender]
        });
    }

    cooldowns[sender] = Date.now();
    return manejarConfirmacion(personaje, sender, data.usuarios, conn, m);
};

handler.help = ['cofirmarwaifu'];
handler.tags = ['rw'];
handler.command = ['confirmar', 'c'];
handler.group = true;

export default handler;
