// *[ ❀ PLAY 2 ]*
import fetch from 'node-fetch';
import yts from 'yt-search';

let HS = async (m, { conn, text }) => {
    if (!text) return conn.reply(m.chat, `❀ Ingresa el nombre de la canción o video que deseas buscar.`, m);

    // Buscar el video en YouTube
    let res = await yts(text);
    if (!res.videos || res.videos.length === 0) {
        return conn.reply(m.chat, `❀ No se encontraron resultados para "${text}".`, m);
    }
    let vid = res.videos[0]; // Primer resultado relevante

    try {
        // Llamada a la API de descarga (usando el URL del video encontrado)
        let api = await fetch(`https://api.betabotz.eu.org/api/download/ytmp4?url=${vid.url}&apikey=btzKiyoEditz`);
        let json = await api.json();

        if (!json.result) {
            throw new Error('Error en la respuesta de la API de descarga.');
        }

        let { title, thumb, mp3, mp4 } = json.result;

        // Enviar el audio (mp3)
        await conn.sendMessage(
            m.chat,
            {
                audio: { url: mp3 },
                mimetype: "audio/mp4",
                fileName: `${title}.mp3`,
                contextInfo: {
                    externalAdReply: {
                        showAdAttribution: true,
                        mediaType: 2,
                        mediaUrl: vid.url,
                        sourceUrl: vid.url,
                        title: title,
                        thumbnailUrl: thumb,
                    }
                }
            },
            { quoted: m }
        );

        // Enviar el video (mp4)
        await conn.sendMessage(
            m.chat,
            {
                video: { url: mp4 },
                mimetype: 'video/mp4',
                fileName: `${title}.mp4`,
                caption: `🎥 *Título:* ${title}\n🔗 *URL:* ${vid.url}`,
            },
            { quoted: m }
        );
    } catch (error) {
        console.error(error);
        conn.reply(m.chat, `❀ Ocurrió un error al descargar el video. Por favor, intenta nuevamente.`, m);
    }
};

HS.command = ['play2']; // Comando definido como 'play2'

export default HS;