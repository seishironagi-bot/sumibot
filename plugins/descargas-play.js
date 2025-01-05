```javascript
// *[ ❀ PLAY ]*
import fetch from 'node-fetch'
import yts from 'yt-search'

let handler = async (m, { conn, text, args }) => {
    if (!text) {
        return m.reply("❀ Ingresa un texto de lo que quieres buscar")
    }

    // Realizar la búsqueda en YouTube
    let ytres = await search(args.join(" "))
    if (ytres.length === 0) {
        return m.reply("❀ No se encontraron resultados para tu búsqueda.")
    }

    // Formato de la respuesta
    let txt = `- *Título* : ytres[0].title
- *Duración* :{ytres[0].timestamp}
- *Publicado* : ytres[0].ago
- *Canal* :{ytres[0].author.name || 'Desconocido'}
- *Url* : https://youtu.be/ytres[0].videoId`

    // Enviar la información al usuario junto con la miniatura
    await conn.sendFile(m.chat, ytres[0].image, 'thumbnail.jpg', txt, m)

    try 
        // Obtener la URL de descarga del MP3 a través de la API externa
        let api = await fetch(`https://api.giftedtech.my.id/api/download/dlmp3?apikey=gifted   url={ytres[0].url}`)
        let json = await api.json()

        // Verificar si la respuesta de la API es válida
        if (!json.result || !json.result.download_url) {
            return m.reply("❀ No se pudo obtener el enlace de descarga.")
        }

        let { quality, title, download_url } = json.result

        // Enviar el archivo de audio al usuario
        await conn.sendMessage(m.chat, {
            audio: { url: download_url },
            fileName: `title.mp3`,
            mimetype: 'audio/mp4'
        ,  quoted: m )
     catch (error) 
        console.error(error)
        m.reply("❀ Hubo un error al intentar descargar el audio.")
    

handler.command = /^(play)/i

export default handler

       // Función para realizar la búsqueda en YouTube
async function search(query, options = {}) {
    let search = await yts.search({ query, hl: "es", gl: "ES", ...options })
    return search.videos
}
```