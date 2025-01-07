const express = require('express');
const bodyParser = require('body-parser');
const twilio = require('twilio');
const axios = require('axios');

const app = express();
const port = process.env.PORT || 3000;

// Twilio Credentials (reemplaza con tus credenciales)
const accountSid = 'YOUR_TWILIO_ACCOUNT_SID';
const authToken = 'YOUR_TWILIO_AUTH_TOKEN';
const twilioPhoneNumber = 'whatsapp:+14155238886'; // Número de Twilio

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
    await sendMessage(from, 'Por favor, envíame el nombre del video o la URL de YouTube.');
  } else {
    // Aquí verificamos si el mensaje es una URL o nombre de video
    if (isValidYouTubeUrl(message)) {
      // Si es URL, buscar el video por la URL
      await sendMessage(from, `¡Genial! Estoy buscando el video en YouTube...`);
      await searchYouTubeVideo(message, from);
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

// Función para buscar video por URL (puedes expandir con la API de YouTube)
async function searchYouTubeVideo(url, to) {
  try {
    const videoId = extractVideoId(url); // Función para extraer el ID del video de la URL
    const videoUrl = `https://www.youtube.com/watch?v=${videoId}`;

    await sendMessage(to, `Aquí está el video: ${videoUrl}`);
  } catch (error) {
    await sendMessage(to, 'No pude encontrar el video. Intenta con otro enlace.');
  }
}

// Función para buscar video por nombre usando la API de YouTube
async function searchYouTubeVideoByName(query, to) {
  const apiKey = 'YOUR_YOUTUBE_API_KEY'; // Obtén tu API Key de YouTube
  const searchUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(query)}&key=${apiKey}`;

  try {
    const response = await axios.get(searchUrl);
    const videoId = response.data.items[0].id.videoId;
    const videoUrl = `https://www.youtube.com/watch?v=${videoId}`;

    await sendMessage(to, `Aquí está el video que encontré: ${videoUrl}`);
  } catch (error) {
    await sendMessage(to, 'No pude encontrar ningún video con ese nombre.');
  }
}

// Función para extraer el ID del video de la URL
function extractVideoId(url) {
  const videoIdMatch = url.match(/[?&]v=([^&]+)/);
  return videoIdMatch ? videoIdMatch[1] : null;
}

// Arrancar el servidor
app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});