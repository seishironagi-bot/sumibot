import { googleImage } from '@bochilteam/scraper';

let handler = async (m, { conn, text, usedPrefix, command }) => {
    if (!global.db.data.chats[m.chat].nsfw) {
        return conn.reply(m.chat, `🚩 El grupo no admite contenido *Nsfw.*\n\n> Para activarlo un *Administrador* debe usar el comando */nsfw on*`, m, rcanal);
    }

    await m.react('🕓');
    try {
        let res = await googleImage('Imagen hentai');
        let image = res[Math.floor(Math.random() * res.length)];
        if (image && image.url) {
            await conn.sendFile(m.chat, image.url, 'thumbnail.jpg', `*» Hentai*`, m, null, rcanal);
            await m.react('✅');
        } else {
            throw new Error('No se encontró una imagen válida.');
        }
    } catch (e) {
        console.error(e);
        await m.react('✖️');
    }
};