// *[ ❀ PLAY 2 (video) ]*
import fetch from 'node-fetch'
import yts from 'yt-search'

let handler = async (m, { conn, text, args }) => {
if (!text) {
return m.reply("❀ ingresa un texto de lo que quieres buscar")
}
    
let ytres = await search(args.join(" "))
let txt = `ᚚᚚᩳᚚ͜ᩬᚚᷤ͜ᚚᷴ͜ᚚᷟ͜ᚚᷝ͜ᚚ͜ᚚᷤ͜ᚚᷧ͜ᚚᷜ͜ᚚᷴ͜ᚚᷢ͜ᚚᷧ͜ᚚᷦ͜ᚚᷧ͜ᚚᷱ͜ᚚᷴ͜ᚚᷧ͜ᚚᩬᚚᩳᚚᚚ
꒷꒦꒷꒦꒷꒦꒷꒦꒷꒦꒷꒦꒷꒦꒷꒦꒷꒦꒷꒦꒷꒦꒷꒦꒷꒦
- *Título* : ${ytres[0].title}
- *Duración* : ${ytres[0].timestamp}
- *Publicado* : ${ytres[0].ago}
- *Canal* : ${ytres[0].author.name || 'Desconocido'}
- *Url* : ${'https://youtu.be/' + ytres[0].videoId}`
await conn.sendFile(m.chat, ytres[0].image, 'thumbnail.jpg', txt, m)
    
try {
let api = await fetch(`https://api.host-bot.store/api/dl/yt2?url=${ytres[0].url}&apikey=0a2cc90e`)
let json = await api.json()
let { title, mp4 } = json.data
await conn.sendMessage(m.chat, { video: { url: mp4 }, caption: `${title}`, mimetype: 'video/mp4', fileName: `${title}` + `.mp4`}, {quoted: m })
} catch (error) {
console.error(error)
}}
handler.command = /^(play2)$/i

export default handler

async function search(query, options = {}) {
  let search = await yts.search({ query, hl: "es", gl: "ES", ...options })
  return search.videos
}