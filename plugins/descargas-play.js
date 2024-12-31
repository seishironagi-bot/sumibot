/*// *[ ❀ PLAY] *
traer de importación de 'nodo-fetch';
importar yts de 'yt-search'

dejar HS = async (m, {conn, texto}) => {
si (! texto) regrese conn.reply (m.chat, `❀ Ingresa un enlace de mediafire`, m)
dejar res = esperar yts (texto)
deja vid = res.videos [0]

intentar {

let api = wait fetch (`https://api.betabotz.eu.org/api/download/ytmp4?url=${vid.url}&apikey=btzKiyoEditz`)
deje que json = espere api.json() 
sea { título, descripción, id, miniatura, fuente, mp3, mp4 } = json.result 
deja audio = {
audio: {url: mp3}, mimetype: "audio / mp4", fileName: `$ {title}`,
contexInfo: { externalAdReply: { showAdAtribution: true, mediaType: 2,
mediaUrl: vid.url, sourceUrl: vid.url,
título: vid.title, cuerpo: nulo,
thumbnailUrl: pulgar
}}}
espera conn.sendMessage (m.chat, audio, {quoted: m})

espera conn.sendMessage (m.chat, {video: {url: mp4}, mimetype: 'video / mp4', fileName: `$ {title} .mp4`, subtítulo: nulo}, {citado: m})
    
} captura (error) {
consola.error(error)
}}

HS.command = ['reproducir'] 

exportar HS predeterminado



