// *[ ❀ YTMP4 ]*
import fetch from 'node-fetch';

let HS = async (m, { conn, text }) => {
  if (!text || !/^https?:\/\/(www\.)?(youtube\.com|youtu\.be)/i.test(text)) {
    return conn.reply(m.chat, `❀ Ingresa un enlace válido de YouTube`, m);
  }

  try {
    // Cambiar API a savefrom.net
    let api = await fetch(`https://ssyoutube.com/api/convert?url=${text}`);
    if (!api.ok) {
      throw new Error(`Error en la API: ${api.statusText} (HTTP ${api.status})`);
    }

    let json = await api.json();

    // Validar la respuesta de la API
    if (!json || !json.url[0]?.url) {
      console.error('Respuesta de la API inválida:', json);
      throw new Error('No se pudo obtener los datos del video. Verifica el enlace.');
    }

    let dl_url = json.url[0].url; // URL del video (mejor calidad)
    let title = json.meta.title || 'Dijiste';

    // Enviar el video al usuario
    await conn.sendMessage(
      m.chat,
      {
        video: { url: dl_url }, // URL del video
        fileName: `${title}.mp4`,
        caption: `❀ Aquí tienes el video descargado: ${title}.mp4`,
      },
      { quoted: m } // Mensaje citado
    );

    conn.reply(m.chat, `❀ Video enviado correctamente: ${title}.mp4`, m);

  } catch (error) {
    console.error('Error al buscar el video:', error.message);

    conn.reply(
      m.chat,
      `❀ Error al buscar el video. Por favor, verifica el enlace o intenta más tarde.`,
      m
    );
  }
};

// Comando asociado
HS.command = ['ytmp4'];

export default HS;