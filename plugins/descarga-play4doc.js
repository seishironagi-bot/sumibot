import { youtubedl, youtubedlv2 } from '@bochilteam/scraper'
import fetch from 'node-fetch'
import yts from 'yt-search'
import axios from 'axios'

const LimitAud = 725 * 1024 * 1024; //700MB
const LimitVid = 425 * 1024 * 1024; //425MB

const handler = async (m, { conn, command, args, text, usedPrefix }) => {
    if (command == 'play' || command == 'mp3') {
        if (!text) return conn.reply(m.chat, `🦋 *Ingrese el nombre de un video de YouTube*\n\nEjemplo, !${command} Distancia - Kimberly Contreraxx`, m);

        await m.react('⏳');  // Mostrar esperando
        conn.reply(m.chat, global.wait, m);

        const yt_play = await search(args.join(' '));
        const texto1 = `🦋 *Título* 
» ${yt_play[0].title}

📆 *Publicado* 
» ${yt_play[0].ago}

🕑 *Duración* 
» ${secondString(yt_play[0].duration.seconds)}

> _Descargado el audio 🔊, aguarde un momento...._`.trim();

        await conn.sendFile(m.chat, yt_play[0].thumbnail, 'thumbnail.jpg', texto1, m);

        try {
            await m.react('⏳');  // Mostrar esperando
            const apiUrl = `https://deliriussapi-oficial.vercel.app/download/ytmp4?url=${encodeURIComponent(yt_play[0].url)}`;
            const apiResponse = await fetch(apiUrl);
            const delius = await apiResponse.json();
            if (!delius.status) return m.react('❌');  // Error en la descarga
            const downloadUrl = delius.data.download.url;

            await conn.sendMessage(m.chat, { audio: { url: downloadUrl }, mimetype: 'audio/mpeg' }, { quoted: m });
            await m.react('✅');  // Proceso completado
        } catch (e) {
            try {
                let q = '128kbps';
                const yt = await youtubedl(yt_play[0].url).catch(async () => await youtubedlv2(yt_play[0].url));
                const dl_url = await yt.audio[q].download();
                const ttl = await yt.title;
                const size = await yt.audio[q].fileSizeH;
                
                await conn.sendFile(m.chat, dl_url, ttl + '.mp3', null, m, false, { mimetype: 'audio/mp4' });
                await m.react('✅');
            } catch (e2) {
                await m.react('❌');
                console.log(e2);
            }
        }
    }

    if (command == 'play2' || command == 'mp4') {
        if (!text) return conn.reply(m.chat, `🦋 *Ingrese el nombre de un video de YouTube*\n\nEjemplo, !${command} Distancia - Kimberly Contreraxx`, m);

        await m.react('⏳');  // Mostrar esperando
        conn.reply(m.chat, global.wait, m);

        const yt_play = await search(args.join(' '));
        const texto1 = `🦋 *Título* 
» ${yt_play[0].title}

📆 *Publicado* 
» ${yt_play[0].ago}

🕑 *Duración* 
» ${secondString(yt_play[0].duration.seconds)}

> _Descargado su video 📽, aguarde un momento...._`.trim();

        await conn.sendFile(m.chat, yt_play[0].thumbnail, 'thumbnail.jpg', texto1, m);

        try {
            await m.react('⏳');  // Mostrar esperando
            const apiUrl = `https://deliriussapi-oficial.vercel.app/download/ytmp4?url=${encodeURIComponent(yt_play[0].url)}`;
            const apiResponse = await fetch(apiUrl);
            const delius = await apiResponse.json();
            if (!delius.status) return m.react('❌');  // Error en la descarga
            const downloadUrl = delius.data.download.url;
            const fileSize = await getFileSize(downloadUrl);

            if (fileSize > LimitVid) {
                await conn.sendMessage(m.chat, { document: { url: downloadUrl }, fileName: `${yt_play[0].title}.mp4`, caption: `❤️‍🔥 Aquí está tu video.` }, { quoted: m });
            } else {
                await conn.sendMessage(m.chat, { video: { url: downloadUrl }, fileName: `${yt_play[0].title}.mp4`, caption: `❤️‍🔥 Aquí está tu video.`, thumbnail: yt_play[0].thumbnail, mimetype: 'video/mp4' }, { quoted: m });
            }
            await m.react('✅');  // Proceso completado
        } catch (e1) {
            try {
                let qu = args[1] || '360';
                let q = qu + 'p';
                const yt = await youtubedl(yt_play[0].url).catch(async () => await youtubedlv2(yt_play[0].url));
                const dl_url = await yt.video[q].download();
                const ttl = await yt.title;

                await conn.sendMessage(m.chat, { video: { url: dl_url }, fileName: `${ttl}.mp4`, mimetype: 'video/mp4', caption: `❤️‍🔥 Aquí está tu video.`, thumbnail: await fetch(yt.thumbnail) }, { quoted: m });
                await m.react('✅');
            } catch (e2) {
                await m.react('❌');
                console.log(e2);
            }
        }
    }

    // Funciones auxiliares
    async function search(query, options = {}) {
        const search = await yts.search({ query, hl: 'es', gl: 'ES', ...options });
        return search.videos;
    }

    function secondString(seconds) {
        seconds = Number(seconds);
        const d = Math.floor(seconds / (3600 * 24));
        const h = Math.floor((seconds % (3600 * 24)) / 3600);
        const m = Math.floor((seconds % 3600) / 60);
        const s = Math.floor(seconds % 60);
        const dDisplay = d > 0 ? d + (d == 1 ? ' día, ' : ' días, ') : '';
        const hDisplay = h > 0 ? h + (h == 1 ? ' hora, ' : ' horas, ') : '';
        const mDisplay = m > 0 ? m + (m == 1 ? ' minuto, ' : ' minutos, ') : '';
        const sDisplay = s > 0 ? s + (s == 1 ? ' segundo' : ' segundos') : '';
        return dDisplay + hDisplay + mDisplay + sDisplay;
    }

    async function getFileSize(url) {
        try {
            const response = await fetch(url, { method: 'HEAD' });
            const contentLength = response.headers.get('content-length');
            return contentLength ? parseInt(contentLength, 10) : 0;
        } catch (error) {
            console.error("Error al obtener el tamaño del archivo", error);
            return 0;
        }
    }
}

handler.help = ['play', 'mp3', 'mp4'];
handler.tags = ['descargas'];
handler.command = ['play', 'mp3', 'mp4'];
handler.group = true;

export default handler;import { youtubedl, youtubedlv2 } from '@bochilteam/scraper'
import fetch from 'node-fetch'
import yts from 'yt-search'
import axios from 'axios'

const LimitAud = 725 * 1024 * 1024; //700MB
const LimitVid = 425 * 1024 * 1024; //425MB

const handler = async (m, { conn, command, args, text, usedPrefix }) => {
    if (command == 'play' || command == 'mp3') {
        if (!text) return conn.reply(m.chat, `🦋 *Ingrese el nombre de un video de YouTube*\n\nEjemplo, !${command} Distancia - Kimberly Contreraxx`, m);

        await m.react('⏳');  // Mostrar esperando
        conn.reply(m.chat, global.wait, m);

        const yt_play = await search(args.join(' '));
        const texto1 = `🦋 *Título* 
» ${yt_play[0].title}

📆 *Publicado* 
» ${yt_play[0].ago}

🕑 *Duración* 
» ${secondString(yt_play[0].duration.seconds)}

> _Descargado el audio 🔊, aguarde un momento...._`.trim();

        await conn.sendFile(m.chat, yt_play[0].thumbnail, 'thumbnail.jpg', texto1, m);

        try {
            await m.react('⏳');  // Mostrar esperando
            const apiUrl = `https://deliriussapi-oficial.vercel.app/download/ytmp4?url=${encodeURIComponent(yt_play[0].url)}`;
            const apiResponse = await fetch(apiUrl);
            const delius = await apiResponse.json();
            if (!delius.status) return m.react('❌');  // Error en la descarga
            const downloadUrl = delius.data.download.url;

            await conn.sendMessage(m.chat, { audio: { url: downloadUrl }, mimetype: 'audio/mpeg' }, { quoted: m });
            await m.react('✅');  // Proceso completado
        } catch (e) {
            try {
                let q = '128kbps';
                const yt = await youtubedl(yt_play[0].url).catch(async () => await youtubedlv2(yt_play[0].url));
                const dl_url = await yt.audio[q].download();
                const ttl = await yt.title;
                const size = await yt.audio[q].fileSizeH;
                
                await conn.sendFile(m.chat, dl_url, ttl + '.mp3', null, m, false, { mimetype: 'audio/mp4' });
                await m.react('✅');
            } catch (e2) {
                await m.react('❌');
                console.log(e2);
            }
        }
    }

    if (command == 'play2' || command == 'mp4') {
        if (!text) return conn.reply(m.chat, `🦋 *Ingrese el nombre de un video de YouTube*\n\nEjemplo, !${command} Distancia - Kimberly Contreraxx`, m);

        await m.react('⏳');  // Mostrar esperando
        conn.reply(m.chat, global.wait, m);

        const yt_play = await search(args.join(' '));
        const texto1 = `🦋 *Título* 
» ${yt_play[0].title}

📆 *Publicado* 
» ${yt_play[0].ago}

🕑 *Duración* 
» ${secondString(yt_play[0].duration.seconds)}

> _Descargado su video 📽, aguarde un momento...._`.trim();

        await conn.sendFile(m.chat, yt_play[0].thumbnail, 'thumbnail.jpg', texto1, m);

        try {
            await m.react('⏳');  // Mostrar esperando
            const apiUrl = `https://deliriussapi-oficial.vercel.app/download/ytmp4?url=${encodeURIComponent(yt_play[0].url)}`;
            const apiResponse = await fetch(apiUrl);
            const delius = await apiResponse.json();
            if (!delius.status) return m.react('❌');  // Error en la descarga
            const downloadUrl = delius.data.download.url;
            const fileSize = await getFileSize(downloadUrl);

            if (fileSize > LimitVid) {
                await conn.sendMessage(m.chat, { document: { url: downloadUrl }, fileName: `${yt_play[0].title}.mp4`, caption: `❤️‍🔥 Aquí está tu video.` }, { quoted: m });
            } else {
                await conn.sendMessage(m.chat, { video: { url: downloadUrl }, fileName: `${yt_play[0].title}.mp4`, caption: `❤️‍🔥 Aquí está tu video.`, thumbnail: yt_play[0].thumbnail, mimetype: 'video/mp4' }, { quoted: m });
            }
            await m.react('✅');  // Proceso completado
        } catch (e1) {
            try {
                let qu = args[1] || '360';
                let q = qu + 'p';
                const yt = await youtubedl(yt_play[0].url).catch(async () => await youtubedlv2(yt_play[0].url));
                const dl_url = await yt.video[q].download();
                const ttl = await yt.title;

                await conn.sendMessage(m.chat, { video: { url: dl_url }, fileName: `${ttl}.mp4`, mimetype: 'video/mp4', caption: `❤️‍🔥 Aquí está tu video.`, thumbnail: await fetch(yt.thumbnail) }, { quoted: m });
                await m.react('✅');
            } catch (e2) {
                await m.react('❌');
                console.log(e2);
            }
        }
    }

    // Funciones auxiliares
    async function search(query, options = {}) {
        const search = await yts.search({ query, hl: 'es', gl: 'ES', ...options });
        return search.videos;
    }

    function secondString(seconds) {
        seconds = Number(seconds);
        const d = Math.floor(seconds / (3600 * 24));
        const h = Math.floor((seconds % (3600 * 24)) / 3600);
        const m = Math.floor((seconds % 3600) / 60);
        const s = Math.floor(seconds % 60);
        const dDisplay = d > 0 ? d + (d == 1 ? ' día, ' : ' días, ') : '';
        const hDisplay = h > 0 ? h + (h == 1 ? ' hora, ' : ' horas, ') : '';
        const mDisplay = m > 0 ? m + (m == 1 ? ' minuto, ' : ' minutos, ') : '';
        const sDisplay = s > 0 ? s + (s == 1 ? ' segundo' : ' segundos') : '';
        return dDisplay + hDisplay + mDisplay + sDisplay;
    }

    async function getFileSize(url) {
        try {
            const response = await fetch(url, { method: 'HEAD' });
            const contentLength = response.headers.get('content-length');
            return contentLength ? parseInt(contentLength, 10) : 0;
        } catch (error) {
            console.error("Error al obtener el tamaño del archivo", error);
            return 0;
        }
    }
}

handler.help = ['play', 'mp3', 'mp4'];
handler.tags = ['descargas'];
handler.command = ['play3', 'play4', 'mp4'];
handler.group = true;

export default handler;