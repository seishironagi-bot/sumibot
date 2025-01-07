const express = require('express');
const bodyParser = require('body-parser');
const twilio = require('twilio');
const axios = require('axios');
const ytdl = require('ytdl-core'); // Para descargar el audio de YouTube
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// Cargar credenciales de Twilio y YouTube desde el archivo .env
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER;

const client = new twilio(accountSid, authToken);

// Configuración para recibir datos POST
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Ruta para recibir mensajes de WhatsApp
app.post('/webhook', async (req, res) => {
  const message = req.body.Body.trim();
  const from = req.body.From;

  if (message.toLowerCase() === '.play2') {
    // El bot pregunta por el nombre o URL del video
    await sendMessage(from, 'Por favor, envíame el nombre de la canción o la URL del video de YouTube.');
  } else {
    // Aquí verificamos si el mensaje es una URL o nombre de video
    if (isValidYouTubeUrl(message)) {
      // Si es URL, buscar el video por la URL
      await sendMessage(from, `¡Genial! Estoy buscando el video en YouTube...`);
      await downloadAudioFromYouTube(message, from);
    } else {
      // Si no es URL, buscamos el video por el nombre
      await sendMessage(from, `Estoy buscando el video por el nombre: ${message}`);
      await searchYouTubeVideoByName(message, from);
    }
  }

  res.status(200).send('<Response></Response>');
});

// Función para enviar un mensaje a WhatsApp
async function sendMessage(to, body) {
  try {
    await client.messages.create({
      body: body,
      from: twilioPhoneNumber,
      to: to,
    });
  } catch (error) {
    console.error('Error al enviar mensaje:', error);
  }
}

// Función para verificar si la URL es de YouTube
function isValidYouTubeUrl(url) {
  const regex = /^(https?\:\/\/)?(www\.youtube\.com|youtu\.be)\/.+$/;
  return regex.test(url);
}

// Función para buscar video por nombre usando la API de YouTube
async function searchYouTubeVideoByName(query, to) {
  const apiKey = process.env.YOUTUBE_API_KEY;
  const searchUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(query)}&key=${apiKey}`;

  try {
    const response = await axios.get(searchUrl);
    const videoId = response.data.items[0].id.videoId;
    const videoUrl = `https://www.youtube.com/watch?v=${videoId}`;

    await sendMessage(to, `Aquí está el video que encontré: ${videoUrl}`);
    await downloadAudioFromYouTube(videoUrl, to);
  } catch (error) {
    await sendMessage(to, 'No pude encontrar ningún video con ese nombre.');
  }
}

// Función para descargar el audio de YouTube y enviarlo por WhatsApp
async function downloadAudioFromYouTube(url, to) {
  const audioPath = path.join(__dirname, process.env.AUDIO_DOWNLOAD_PATH, 'audio.mp3');

  try {
    // Descargar el audio en formato mp3
    const stream = ytdl(url, { filter: 'audioonly', quality: 'highestaudio' });
    const file = fs.createWriteStream(audioPath);
    
    stream.pipe(file);

    stream.on('end', async () => {
      console.log('Audio descargado con éxito.');

      // Enviar el archivo de audio por WhatsApp
      await sendAudioFile(to, audioPath);
      
      // Limpiar el archivo descargado después de enviarlo
      fs.unlinkSync(audioPath);
    });
  } catch (error) {
    console.error('Error al descargar el audio:', error);
    await sendMessage(to, 'Hubo un error al intentar descargar el audio. Intenta de nuevo.');
  }
}

// Función para enviar un archivo de audio a través de WhatsApp
async function sendAudioFile(to, audioPath) {
  try {
    await client.messages.create({
      from: twilioPhoneNumber,
      to: to,
      mediaUrl: `https://your-server-url/${audioPath}`,
    });
    console.log('Audio enviado correctamente.');
  } catch (error) {
    console.error('Error al enviar el audio:', error);
    await sendMessage(to, 'No pude enviar el audio. Intenta de nuevo.');
  }
}

// Arrancar el servidor
app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});