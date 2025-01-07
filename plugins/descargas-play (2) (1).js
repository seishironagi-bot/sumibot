const fs = require('fs');
const ytdl = require('ytdl-core'); // Para descargar YouTube

// Función para descargar el video completo y enviarlo
async function downloadVideoFromYouTube(url, to) {
  const videoPath = path.join(__dirname, process.env.AUDIO_DOWNLOAD_PATH, 'video.mp4');

  try {
    // Descargar el video en formato mp4
    const stream = ytdl(url, { quality: 'highestvideo' });
    const file = fs.createWriteStream(videoPath);
    
    stream.pipe(file);

    stream.on('end', async () => {
      console.log('Video descargado con éxito.');

      // Enviar el archivo de video por WhatsApp
      await sendVideoFile(to, videoPath);

      // Limpiar el archivo descargado después de enviarlo
      fs.unlinkSync(videoPath);
    });
  } catch (error) {
    console.error('Error al descargar el video:', error);
    await sendMessage(to, 'Hubo un error al intentar descargar el video. Intenta de nuevo.');
  }
}

// Función para enviar un archivo de video a través de WhatsApp
async function sendVideoFile(to, videoPath) {
  try {
    // Reemplaza con la URL pública de tu servidor. Si usas ngrok, usa la URL generada por ngrok.
    const publicUrl = `https://your-ngrok-url/${videoPath}`;
    
    await client.messages.create({
      from: twilioPhoneNumber,
      to: to,
      mediaUrl: publicUrl,
    });
    console.log('Video enviado correctamente.');
  } catch (error) {
    console.error('Error al enviar el video:', error);
  }
}