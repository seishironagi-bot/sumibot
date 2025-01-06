// *[ ❀ PLAY ]*
import fetch from 'node-fetch'

let handler = async (m, { conn, command, text, usedPrefix }) => {
if (!text) return conn.reply(m.chat, `❀ Ingresa el nombre de la cancion que quieras buscar`, m)

try {
let api = await fetch(`https://api.vreden.web.id/api/ytplaymp3?query=${text}`)
let json = await api.json()
let { title, thumbnail, timestamp, ago, views, author } = json.result.metadata
let HS = `⚘ᚚᩳᚚ͜ᩬᚚᷤ͜ᚚᷴ͜ᚚᷟ͜ᚚᷝ͜ᚚ͜ᚚᷤ͜ᚚᷧ͜ᚚᷜ͜ᚚᷴ͜ᚚᷢ͜ᚚᷧ͜ᚚᷦ͜ᚚᷧ͜ᚚᷱ͜ᚚᷴ͜ᚚᷧ͜ᚚᩬᚚᩳ⚘
꒷꒦꒷꒦꒷꒦꒷꒦꒷꒦꒷꒦꒷꒦꒷꒦꒷꒦꒷꒦꒷꒦꒷꒦꒷꒦
✿⏤͟͟͞͞Titulo✿ : ${title}
✿⏤͟͟͞͞Duracion✿ : ${timestamp}
✿⏤͟͟͞͞Subido✿ : ${ago}
✿⏤͟͟͞͞Visitas✿ : ${views}
✿⏤͟͟͞͞Autor✿ : ${author.name}
꒷꒦꒷꒦꒷꒦꒷꒦꒷꒦꒷꒦꒷꒦꒷꒦꒷꒦꒷꒦꒷꒦꒷꒦꒷꒦`
await conn.sendFile(m.chat, thumbnail, 'HasumiBotFreeCodes.jpg', HS, m)
await conn.sendFile(m.chat, json.result.download.url, 'HasumiBotFreeCodes.mp3', null, m)
} catch (error) {
console.error(error)
}}

handler.command = /^(play)$/i

export default handler