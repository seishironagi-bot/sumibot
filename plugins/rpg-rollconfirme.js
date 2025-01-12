import fs from 'fs';
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

const comprarPersonaje = (userId, character) => {
    let data = obtenerDatos();
    if (data.usuarios[userId].bank < character.value) {
        console.log(`El usuario ${userId} no tiene suficiente dinero para comprar a ${character.name}.`);
        return false; // No se puede comprar
    }

    // Descontar el dinero del banco
    data.usuarios[userId].bank -= character.value;
    data.usuarios[userId].characters = data.usuarios[userId].characters || [];
    data.usuarios[userId].characters.push(character);
    guardarDatos(data);
    console.log(`El usuario ${userId} ha comprado a ${character.name} por ${character.value} Zekis!`);
    return true; // Compra exitosa
};

const handler = async (m, { conn }) => {
    if (!m.quoted) return;

    const sender = m.sender;
    const match = m.quoted.text.match(/\\`ID:\\`\\s*-->\\s*\\`([a-zA-Z0-9-]+)\\`/);
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

    const compraExitosa = comprarPersonaje(sender, personaje);
    if (!compraExitosa) {
        return await conn.sendMessage(m.chat, {
            text: `No tienes suficiente dinero para comprar a ${personaje.name}.`,
            mentions: [sender]
        });
    }

    return await conn.sendMessage(m.chat, {
        text: `¡Felicidades @${sender.split('@')[0]}, has comprado a ${personaje.name} por ${personaje.value} Zekis!`,
        mentions: [sender]
    });
};

handler.help = ['comprarwaifu'];
handler.tags = ['rw'];
handler.command = ['comprar', 'c'];
handler.group = true;

export default handler;
