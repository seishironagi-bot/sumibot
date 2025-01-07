import fetch from 'node-fetch'
import yts from 'yt-search'

let handler = async (m, { conn, text, args }) => {
    if (!text) {
        return m.reply("❀ ingresa un texto de lo que quieres buscar")
    }
    
    let ytres = await search(args.join(" "))
    let txt = `- Título : ${ytres[0].title}
- Duración : ${ytres[0].timestamp}
- Publicado : ${ytres[0].ago}
- Canal : ${ytres[0].author.name || 'Desconocido'}
- Url : ${'https://youtu.be/' + ytres[0].videoId}`
    
    await conn.sendFile(m.chat, ytres[0].image, 'thumbnail.jpg', txt, m)
    
    try {
        // Descarga de video
        let apiVideo = await fetch(`https://api.giftedtech.my.id/api/download/dlmp4?apikey=gifted&url=${ytres[0].url}`)
        let jsonVideo = await apiVideo.json()
        let { title: videoTitle, download_url: videoDownloadUrl } = jsonVideo.result
        
        await conn.sendMessage(m.chat, { video: { url: videoDownloadUrl }, caption: `${videoTitle}`, mimetype: 'video/mp4', fileName: `${videoTitle}.mp4` }, { quoted: m })
        
        // Descarga de audio
        let apiAudio = await fetch(`https://api.giftedtech.my.id/api/download/dlaudio?apikey=gifted&url=${ytres[0].url}`)
        let jsonAudio = await apiAudio.json()
        let { title: audioTitle, download_url: audioDownloadUrl } = jsonAudio.result
        
        await conn.sendMessage(m.chat, { audio: { url: audioDownloadUrl }, caption: `${audioTitle}`, mimetype: 'audio/mp4', fileName: `${audioTitle}.mp3` }, { quoted: m })
        
    } catch (error) {
        console.error(error)
        m.reply("❀ Ocurrió un error al intentar descargar el contenido.")
    }
}

handler.command = /^(play2)$/i

export default handler

async function search(query, options = {}) {
    let search = await yts.search({ query, hl: "es", gl: "ES", ...options })
    return search.videos
}