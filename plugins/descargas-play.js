/* 



// *[ ❀ PLAY ]*
import fetch from 'node-fetch';
import yts from 'yt-search'

let HS = async (m, { conn, text }) => {
if (!text) return conn.reply(m.chat, `❀ Ingresa un link de mediafire`, m)
let res = await yts(text)
let vid = res.videos[0]

try {

let api = await fetch(`https://api.betabotz.eu.org/api/download/ytmp4?url=${vid.url}&apikey=btzKiyoEditz`)
let json = await api.json()
let { title, description, id, thumb, source, mp3, mp4 } = json.result
let audio = {
audio: { url: mp3 }, mimetype: "audio/mp4", fileName: `${title}`,
contextInfo: { externalAdReply: { showAdAttribution: true, mediaType: 2,
mediaUrl: vid.url, sourceUrl: vid.url,
title: vid.title, body: null,
thumbnailUrl: thumb
}}}
await conn.sendMessage(m.chat, audio, { quoted: m })

await conn.sendMessage(m.chat, { video: { url: mp4 }, mimetype: 'video/mp4', fileName: `${title}.mp4`, caption: null }, { quoted: m })    
    
} catch (error) {
console.error(error)
}}

HS.command = ['play']

export default HS