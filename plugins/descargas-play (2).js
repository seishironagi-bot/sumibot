try {
    let api = await fetch(`https://api.giftedtech.my.id/api/download/ytdl?apikey=gifted&url=${vid.url}`);
    let json = await api.json();

    // Verifica que la API devuelva un resultado válido
    if (!json.result || (!json.result.audio_url && !json.result.video_url)) {
        return conn.reply(m.chat, '❀ No se pudo descargar el contenido. Intenta de nuevo más tarde.', m);
    }

    let dl_url = feature.includes('mp3') ? json.result.audio_url : json.result.video_url;
    let fileType = feature.includes('mp3') ? 'audio/mp3' : 'video/mp4';
    let fileName = `${json.result.title}.${feature.includes('mp3') ? 'mp3' : 'mp4'}`;

    // Verifica si debe enviarse como documento
    let isDoc = feature.includes('doc');
    let file = { url: dl_url };

    await conn.sendMessage(
        m.chat,
        {
            document: file, // Siempre lo envía como documento
            mimetype: fileType, // Tipo de archivo
            fileName: fileName, // Nombre del archivo
        },
        { quoted: m }
    );
} catch (error) {
    console.error(error);
    conn.reply(m.chat, '❀ Hubo un error al procesar tu solicitud.', m);
}