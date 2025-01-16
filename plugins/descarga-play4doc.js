
import { youtubedl, youtubedlv2 } from '@bochilteam/scraper';
import fetch from 'node-fetch';
import yts from 'yt-search';
import ytdl from 'ytdl-core';
import axios from 'axios';

const LimitAud = 725 * 1024 * 1024; // 700MB
const LimitVid = 425 * 1024 * 1024; // 425MB

const handler = async (m, {conn, command, args, text, usedPrefix}) => {
    if (command == 'play3' || command == 'mp3') {
        if (!text) return conn.reply(m.chat, `🦋 *Ingrese el nombre de un video de YouTube*

Ejemplo, !${command} Distancia - Kimberly Contreraxx`, m); 
        await m.react(rwait);
        conn.reply(m.chat, global.wait, m, {
            contextInfo: { externalAdReply: { mediaUrl: null, mediaType: 1, showAdAttribution: true, title: packname, body: dev, previewType: 0, thumbnail: icons, sourceUrl: channel }}
        });
        const yt_play = await search(args.join(' '));
        const texto1 = `🦋 *Título* 
        » ${yt_play[0].title}
        📆 *Publicado* 
        » ${yt_play[0].ago}
        🕑 *Duración* 
        » ${secondString(yt_play[0].duration.seconds)}
        > _Descargado el audio 🔊, aguarde un momento...._`.trim();

        await conn.sendFile(m.chat, yt_play[0].thumbnail, 'error.jpg', texto1, m);
        try {
            await m.react(rwait);
            const apiUrl = `https://deliriussapi-oficial.vercel.app/download/ytmp4?url=${encodeURIComponent(yt_play[0].url)}`;
            const apiResponse = await fetch(apiUrl);
            const delius = await apiResponse.json();
            if (!delius.status) return m.react(error);
            const downloadUrl = delius.data.download.url;
            await conn.sendMessage(m.chat, { audio: { url: downloadUrl }, mimetype: 'audio/mpeg' }, { quoted: m });
            await m.react(done);
        } catch (e1) {
            await m.react(error);
            console.log(e1);
        }
    }

    if (command == 'play4' || command == 'mp4') {
        if (!text) return conn.reply(m.chat, `🦋 *Ingrese el nombre de un video de YouTube*

Ejemplo, !${command} Distancia - Kimberly Contreraxx`, m);
        await m.react(rwait);
        conn.reply(m.chat, global.wait, m, {
            contextInfo: { externalAdReply: { mediaUrl: null, mediaType: 1, showAdAttribution: true, title: packname, body: dev, previewType: 0, thumbnail: icons, sourceUrl: channel }}
        });
        const yt_play = await search(args.join(' '));
        const downloadUrl = yt_play[0].url; // URL del video
        await conn.sendMessage(m.chat, { video: { url: downloadUrl }, mimetype: 'video/mp4' }, { quoted: m });
        await m.react(done);
    }
};