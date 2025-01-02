// *[ ❀ PLAY ]*
import fetch from 'node-fetch'
import yts from 'yt-search'

let handler = async (m, { conn, text, args }) => {
if (!text) {
return m.reply("❀ ingresa un texto de lo que quieres buscar")
}
    
let ytres = await search(args.join(" "))
let txt = ` ᚚᚚᩳᚚ͜ᩬᚚᷤ͜ᚚᷴ͜ᚚᷟ͜ᚚᷝ͜ᚚ͜ᚚᷤ͜ᚚᷧ͜ᚚᷜ͜ᚚᷴ͜ᚚᷢ͜ᚚᷧ͜ᚚᷦ͜ᚚᷧ͜ᚚᷱ͜ᚚᷴ͜ᚚᷧ͜ᚚᩬᚚᩳᚚᚚ
꒷꒦꒷꒦꒷꒦꒷꒦꒷꒦꒷꒦꒷꒦꒷꒦꒷꒦꒷꒦꒷꒦꒷꒦꒷꒦
❥⏤͟͟͞͞Título♥︎ : ${ytres[0].title}
❥⏤͟͟͞͞Duración♥︎ : ${ytres[0].timestap} ❥⏤͟͟͞͞Publicado♥︎ : ${ytres[0].ago}
❥⏤͟͟͞͞Canal♥︎ : ${ytres[0].author.name || 'Desconocido'}
❥⏤͟͟͞͞Url♥︎ : ${'https://youtu.be/' + ytres[0].videoId}
꒷꒦꒷꒦꒷꒦꒷꒦꒷꒦꒷꒦꒷꒦꒷꒦꒷꒦꒷꒦꒷꒦꒷꒦꒷꒦

🌸 *Su Audio se está enviando, espere un momento...*`
await conn.sendFile(m.chat, ytres[0].image, 'thumbnail.jpg', txt, m)
    
try {
let api = await fetch(`https://api.giftedtech.my.id/api/download/dlmp3?apikey=gifted&url=${ytres[0].url}`)
let json = await api.json()
let { quality, title, download_url } = json.result
await conn.sendMessage(m.chat, { audio: { url: download_url }, fileName: `${title}.mp3`, mimetype: 'audio/mp4' }, { quoted: m })
} catch (error) {
console.error(error)
}}

handler.command = /^(play)$/i

export default handler

async function search(query, options = {}) {
  let search = await yts.search({ query, hl: "es", gl: "ES", ...options })
  return search.videos
}