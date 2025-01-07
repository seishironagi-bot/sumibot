// *[ ❀ YTMP4 ]*
import fetch from 'node-fetch'

let handler = async (m, { conn, command, text, usedPrefix }) => {
if (!text) return conn.reply(m.chat, `❀ Ingresa un link de youtube`, m)

try {
let api = await fetch(`https://api.vreden.web.id/api/ytmp4?url=${text}`)
let json = await api.json()
let { title, thumbnail, timestamp, ago, views, author } = json.result.metadata
let HS = `- *Titulo :* ${title}
- *Duracion :* ${timestamp}
- *Subido :* ${ago}
- *Visitas :* ${views}
- *Autor :* ${author.name}`
await conn.sendFile(m.chat, thumbnail, 'HasumiBotFreeCodes.jpg', HS, m)
await conn.sendFile(m.chat, json.result.download.url, 'HasumiBotFreeCodes.mp4', null, m)
} catch (error) {
console.error(error)
}}

handler.command = /^(ytmp4)$/i

export default handler