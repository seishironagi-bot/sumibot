import { youtubedl, youtubeSearch, youtubedlv2, tiktokdl } from '@bochilteam/scraper'
import { codeToEmoji, flagToCountry } from 'emoji-country-flags'
import uploader from '../lib/uploadImage.js'
const regex = /(?:https|git)(?::\/\/|@)github\.com[\/:]([^\/:]+)\/(.+)/i;
import { facebook } from "@xct007/frieren-scraper"
import { googleImage, mediafiredl } from '@bochilteam/scraper'
import fetch from "node-fetch"
import yts from "yt-search"
import ytdl from 'ytdl-core'
import { pipeline } from 'stream'
import { promisify } from 'util'
import os from 'os'
import axios from 'axios'
import Spotify from "spotifydl-x"
const LimitAud = 725 * 1024 * 1024; //700MB
const LimitVid = 425 * 1024 * 1024; //425MB

let handler = async (m, { conn, text, usedPrefix, command, args }) => {
let q, v, yt, dl_url, ttl, size, lolhuman, lolh, n, n2, n3, n4, cap, qu, currentQuality
const isCommand1 = /^(gimage|imagen?)$/i.test(command)
const isCommand2 = /^(play|play2)$/i.test(command)
//const isCommand3 = /^(play2)$/i.test(command)
const isCommand4 = /^(fgmp3|dlmp3|getaud|yt(a|mp3)?)$/i.test(command)
const isCommand5 = /^(ytmp3doc|ytadoc)$/i.test(command)
const isCommand6 = /^(fgmp4|dlmp4|getvid|yt(v|mp4)?)$/i.test(command)
const isCommand7 = /^(ytmp4doc|ytvdoc|play4|play3)$/i.test(command)
const isCommand8 = /^(facebook|fb|facebookdl|fbdl)$/i.test(command)
const isCommand9 = /^(mediafire(dl)?|dlmediafire)$/i.test(command)
const isCommand10 = /^(ytmax)$/i.test(command)
const isCommand11 = /^(tkdl|tiktok)$/i.test(command)
const isCommand12 = /^(ytmaxdoc)$/i.test(command)
const isCommand13 = /^(dalle|openiamage|aiimage|aiimg|aimage|iaimagen|openaimage|openaiimage)$/i.test(command)
const isCommand14 = /^(openjourney|journey|midjourney)$/i.test(command)
const isCommand15 = /^(spotify|music)$/i.test(command)
const isCommand16 = /^(spot(ify)?search)$/i.test(command)
const isCommand17 = /^(i(nsta)?g(ram)?(dl)?|igimage|igdownload)$/i.test(command)
const isCommand18 = /^((dl)?tw(it(ter(dl|x)?)?)?|x|t?tx)$/i.test(command)
const isCommand19 = /^(gitclone|clonarepo|clonarrepo|repoclonar)$/i.test(command)
const isCommand20 = /^(bardimg|bardimage|geminiimg|geminiimage|geminimg|geminimage)$/i.test(command)

async function reportError(e) {
let errb = await m.reply(lenguajeGB['smsMalError3']() + '\n*' + lenguajeGB.smsMensError1() + '*\n*' + usedPrefix + `${lenguajeGB.lenguaje() == 'es' ? 'reporte' : 'report'}` + '* ' + `${lenguajeGB.smsMensError2()} ` + usedPrefix + command)
await console.log(`❗❗ ${lenguajeGB['smsMensError2']()} ${usedPrefix + command} ❗❗`)
await console.log(e)
let faultkey = await conn.sendMessage(m.chat, { react: { text: fault, key: errb.key }})
await m.react(notsent)
//setTimeout(() => { faultkey, m.react(notsent) }, 1000)
}

switch (true) {     
case isCommand1:
if (!text) return m.reply(lenguajeGB.smsMalused2() + `\n*${usedPrefix + command} Gata*`)
const prohibited = ['caca', 'polla', 'porno', 'porn', 'gore', 'cum', 'semen', 'puta', 'puto', 'culo', 'putita', 'putito','pussy', 'hentai', 'pene', 'coño', 'asesinato', 'zoofilia', 'mia khalifa', 'desnudo', 'desnuda', 'cuca', 'chocha', 'muertos', 'pornhub', 'xnxx', 'xvideos', 'teta', 'vagina', 'marsha may', 'misha cross', 'sexmex', 'furry', 'furro', 'furra', 'xxx', 'rule34', 'panocha', 'pedofilia', 'necrofilia', 'pinga', 'horny', 'ass', 'nude', 'popo', 'nsfw', 'femdom', 'futanari', 'erofeet', 'sexo', 'sex', 'yuri', 'ero', 'ecchi', 'blowjob', 'anal', 'ahegao', 'pija', 'verga', 'trasero', 'violation', 'violacion', 'bdsm', 'cachonda', '+18', 'cp', 'mia marin', 'lana rhoades', 'cepesito', 'hot']
if (prohibited.some(word => m.text.toLowerCase().includes(word))) return m.reply('⚠️😾')      
try{
    
const res = await googleImage(text)
let image = res.getRandom()
let link = image
conn.sendFile(m.chat, link, 'error.jpg', `${lenguajeGB.smsImageGg()} ${text}`, m)
} catch (e) {
reportError(e)
} 
break
    
case isCommand2:
let q, v, yt, dl_url, ttl, size, lolhuman, lolh, n, n2, n3, n4, cap, qu, currentQuality;
if (!text) return m.reply(lenguajeGB.smsMalused2() + `*${usedPrefix + command} Billie Eilish - Bellyache*`);

try {
const yt_play = await search(args.join(" "));
let additionalText = '';
if (command === 'play') { 
additionalText = '⬇️ A U D I O ⬇️';
} else if (command === 'play2') {
additionalText = '⬇️ V I D E O ⬇️';
}

let caption = `*◜⋯ ⋯ ⋯ Y O U T U B E ⋯ ⋯ ⋯◞*
*◎ ${lenguajeGB.smsYT1()}*
${yt_play[0].title}

*◎ ${lenguajeGB.smsYT3()}*
${secondString(yt_play[0].duration.seconds)}

*◎ ${lenguajeGB.smsYT4()}*
${MilesNumber(yt_play[0].views)}

*◎ URL*
${yt_play[0].url}
*◜⋯ ⋯ ⋯ ${additionalText} ⋯ ⋯ ⋯◞*`;

let message = await conn.sendMessage(m.chat, {text: caption, contextInfo: { externalAdReply: {title: wm, body: wait2.replace(/\*/g, ''), thumbnailUrl: yt_play[0].thumbnail, sourceUrl: md, mediaType: 1, showAdAttribution: false, renderLargerThumbnail: true }}});
await m.react(sending);
await message.react(waitemot);
setTimeout(() => { message.react(waitemot2); }, 1000);

if (command == 'play') {
try {
const apiUrl = `https://deliriussapi-oficial.vercel.app/download/ytmp3?url=${encodeURIComponent(yt_play[0].url)}`;
const apiResponse = await fetch(apiUrl);
const delius = await apiResponse.json();
if (!delius.status) return m.react("❌");
const downloadUrl = delius.data.download.url;
await conn.sendMessage(m.chat, { audio: { url: downloadUrl }, mimetype: 'audio/mpeg' }, { quoted: m });
await m.react(sent);
await message.react(correct);
} catch (e1) {
try {
const res = await fetch(`https://api.zenkey.my.id/api/download/ytmp3?apikey=zenkey&url=${yt_play[0].url}`);
const audioData = await res.json();
if (audioData.status && audioData.result?.downloadUrl) {
await conn.sendMessage(m.chat, { audio: { url: audioData.result.downloadUrl }, mimetype: 'audio/mpeg' }, { quoted: m });
await m.react(sent);
await message.react(correct);
}} catch {
try {
let q = '128kbps';
let v = yt_play[0].url;
const yt = await youtubedl(v).catch(async () => await youtubedlv2(v));
const dl_url = await yt.audio[q].download();
const ttl = await yt.title;
const size = await yt.audio[q].fileSizeH;
await conn.sendMessage(m.chat, {audio: { url: dl_url }, mimetype: 'audio/mpeg', contextInfo: {externalAdReply: {title: ttl, body: "", thumbnailUrl: yt_play[0].thumbnail, mediaType: 1, showAdAttribution: true, renderLargerThumbnail: true }}}, { quoted: m });
await m.react(sent);
await message.react(correct);
} catch {
try {
const dataRE = await fetch(`https://api.akuari.my.id/downloader/youtube?link=${yt_play[0].url}`);
const dataRET = await dataRE.json();
await conn.sendMessage(m.chat, {audio: { url: dataRET.mp3[1].url }, mimetype: 'audio/mpeg', contextInfo: {externalAdReply: { title: yt_play[0].title, body: "", thumbnailUrl: yt_play[0].thumbnail,
 mediaType: 1, showAdAttribution: true, renderLargerThumbnail: true }}}, { quoted: m });
await m.react(sent);
await message.react(correct);
} catch {
try {
let humanLol = await fetch(`https://api.lolhuman.xyz/api/ytplay?apikey=${lolkeysapi}&query=${yt_play[0].title}`);
let humanRET = await humanLol.json();
await conn.sendMessage(m.chat, {
audio: { url: humanRET.result.audio.link },
mimetype: 'audio/mpeg',
contextInfo: {externalAdReply: {
title: yt_play[0].title,
body: "",
thumbnailUrl: yt_play[0].thumbnail,
mediaType: 1,
showAdAttribution: true,
renderLargerThumbnail: true
}}}, { quoted: m });
await m.react(sent);
await message.react(correct);
} catch {
try {
let lolhuman = await fetch(`https://api.lolhuman.xyz/api/ytaudio2?apikey=${lolkeysapi}&url=${yt_play[0].url}`);
let lolh = await lolhuman.json();
let n = lolh.result.title || 'error';
await conn.sendMessage(m.chat, {
audio: { url: lolh.result.link },
mimetype: 'audio/mpeg',
contextInfo: { externalAdReply: {
title: n,
body: "",
thumbnailUrl: yt_play[0].thumbnail,
mediaType: 1,
showAdAttribution: true,
renderLargerThumbnail: true
}}}, { quoted: m });
await m.react(sent);
await message.react(correct);
} catch {
try {
let searchh = await yts(yt_play[0].url);
let __res = searchh.all.filter(v => v.type == "video");
let infoo = await ytdl.getInfo('https://youtu.be/' + __res[0].videoId);
let ress = await ytdl.chooseFormat(infoo.formats, { filter: 'audioonly' });
await conn.sendMessage(m.chat, {
audio: { url: ress.url },
mimetype: 'audio/mpeg',
contextInfo: { externalAdReply: {
title: __res[0].title,
body: "",
thumbnailUrl: yt_play[0].thumbnail,
mediaType: 1,
showAdAttribution: true,
renderLargerThumbnail: true
}}}, { quoted: m });
await m.react(sent);
await message.react(correct);
} catch {
reportError(e);
}}}}}}}}

if (command == 'play2') {
try {
const apiUrl = `https://deliriussapi-oficial.vercel.app/download/ytmp4?url=${encodeURIComponent(yt_play[0].url)}`;
const apiResponse = await fetch(apiUrl);
const delius = await apiResponse.json();
if (!delius.status) return m.react("❌");
const downloadUrl = delius.data.download.url;
const fileSize = await getFileSize(downloadUrl);
if (fileSize > LimitVid) {
await conn.sendMessage(m.chat, { document: { url: downloadUrl }, fileName: `${yt_play[0].title}.mp4`, caption: `${yt_play[0].title}` }, { quoted: m });
} else {
await conn.sendMessage(m.chat, {video: { url: downloadUrl }, fileName: `${yt_play[0].title}.mp4`, caption: `${yt_play[0].title}`, thumbnail: yt_play[0].thumbnail, mimetype: 'video/mp4' }, { quoted: m });
await m.react(sent);
await message.react(correct);
}
} catch (e1) {
try {
let d2 = await fetch(`https://exonity.tech/api/ytdlp2-faster?apikey=adminsepuh&url=${yt_play[0].url}`);
let dp = await d2.json();
const audiop = await getBuffer(dp.result.media.mp4);
const fileSize = await getFileSize(dp.result.media.mp4);
if (fileSize > LimitVid) {
await conn.sendMessage(m.chat, { document: { url: audiop }, fileName: `${yt_play[0].title}.mp4`, caption: `${yt_play[0].title}` }, { quoted: m });
} else {
await conn.sendMessage(m.chat, { video: { url: audiop }, caption: `${yt_play[0].title}`, thumbnail: yt_play[0].thumbnail, mimetype: 'video/mp4' }, { quoted: m });
await m.react(sent);
await message.react(correct);
}} catch (e2) {
reportError(e2);
}}}} catch (error) {
reportError(error);
}
break;
            
case isCommand4:
if (!args[0]) return m.reply(lenguajeGB.smsMalused2() + `*${usedPrefix + command} https://youtu.be/ejemplo*\n*${usedPrefix + command} https://www.youtube.com/ejemplo*`)
await conn.reply(m.chat, lenguajeGB.smsAvisoEG() + '*' + lenguajeGB.smsYTA1() + '*', m)
try {
let q = '128kbps'
let v = text
const yt = await youtubedl(v).catch(async _ => await youtubedlv2(v))
const ttl = await yt.title    
let audioBuffer = await getBuffer(`https://api.cafirexos.com/api/v1/ytmp3?url=${text.trim()}`)
await conn.sendMessage(m.chat, { audio: audioBuffer, mimetype: 'audio/mpeg', fileName: ttl + `.mp3`}, {quoted: m})
} catch (e) {
reportError(e)
}       
break
        
case isCommand5:
if (!args[0]) return m.reply(lenguajeGB.smsMalused2() + `*${usedPrefix + command} https://youtu.be/ejemplo*\n*${usedPrefix + command} https://www.youtube.com/ejemplo*`)
await conn.reply(m.chat, lenguajeGB.smsAvisoEG() + '*' + lenguajeGB.smsYTA2() + '*', m)
try {
let streamPipeline = promisify(pipeline)
let videoUrl = text
let videoInfo = await ytdl.getInfo(videoUrl)
let { videoDetails } = videoInfo
let { title, thumbnails, lengthSeconds, viewCount, uploadDate } = videoDetails
let thumbnail = thumbnails[0].url
let audioStream = ytdl(videoUrl, { filter: 'audioonly', quality: 'highestaudio', })
let tmpDir = os.tmpdir()
let writableStream = fs.createWriteStream(`${tmpDir}/${title}.mp3`)
await streamPipeline(audioStream, writableStream)
let audioD = `${tmpDir}/${title}.mp3`
let info = `Título: ${title}\nTiempo: ${lengthSeconds}s\nVistas: ${viewCount}\nSubido: ${uploadDate}`
await conn.sendMessage(m.chat, { document: { url: audioD }, mimetype: 'audio/mpeg', fileName: title, caption: null }, { quoted: m })
} catch (e) {
reportError(e)
}         
break
        
case isCommand6:
if (!args[0]) return m.reply(lenguajeGB.smsMalused2() + `*${usedPrefix + command} https://youtu.be/ejemplo*\n*${usedPrefix + command} https://www.youtube.com/ejemplo*`)
await conn.reply(m.chat, lenguajeGB.smsAvisoEG() + '*' + lenguajeGB.smsYTV1() + '*', m)
try {
const yt_play = await search(args.join(" "))
let q = '128kbps'
let v = text.trim()
const yt = await youtubedl(v).catch(async _ => await youtubedlv2(v))
const ttl = await yt.title    
let videoURL = await conn.getFile(`https://api.cafirexos.com/api/v1/ytmp4?url=${v}`)
await conn.sendMessage(m.chat, { video: videoURL.data, fileName: `${ttl}.mp4`, mimetype: 'video/mp4', caption: `${wm}`, thumbnailUrl: yt_play[0].thumbnail }, { quoted: m })
} catch (e) {
reportError(e)}     
break

case isCommand7:
if (!args[0]) return m.reply(lenguajeGB.smsMalused2() + `*${usedPrefix + command} https://youtu.be/ejemplo*\n*${usedPrefix + command} https://www.youtube.com/ejemplo*`)
await conn.reply(m.chat, lenguajeGB.smsAvisoEG() + '*' + lenguajeGB.smsYTV2() + '*', m)
try { 
const streamPipeline = promisify(pipeline)
const videoUrl = text
const videoInfo = await ytdl.getInfo(videoUrl)
const { videoDetails } = videoInfo
const { title, thumbnails, lengthSeconds, viewCount, uploadDate } = videoDetails
const thumbnail = thumbnails[0].url
const videoStream = ytdl(videoUrl, { filter: 'audioandvideo', quality: 'lowest', })
//const writableStream = fs.createWriteStream(`tmp/${title}.mp4`)
//await streamPipeline(videoStream, writableStream)  
//await conn.sendMessage(m.chat, { document: { url: `tmp/${title}.mp4` }, mimetype: 'video/mp4', fileName: title, caption: null }, { quoted: m })
async function crearWritableStreamAsync() {
const filePath = `tmp/${title}.mp4`
const writableStream = fs.createWriteStream(filePath)
return writableStream
}
async function transferirDatos(videoStream, writableStream) {
await streamPipeline(videoStream, writableStream)
}
async function fileVideo() {
const writableStream = await crearWritableStreamAsync(title)
await transferirDatos(videoStream, writableStream)
}
let message
async function enviarMensaje() {
message = await conn.sendMessage(m.chat, { document: { url: `tmp/${title}.mp4` }, mimetype: 'video/mp4', fileName: title, caption: null }, { quoted: m })
}
async function videoResult(m) {
await fileVideo()
await enviarMensaje()
await m.react(sent)
await message.react(correct)
}
videoResult(m)
} catch (e) {
reportError(e)
}
break
        
case isCommand8:
if (!text) return m.reply(lenguajeGB.smsMalused2() + `\n*${usedPrefix}${command}* https://fb.watch/kAOXy3wf2L/?mibextid=Nif5oz\n\n*${usedPrefix}${command}* https://www.facebook.com/reel/1662783117489590?s=yWDuG2&fs=e&mibextid=Nif5oz`)
if (!args[0].match(/www.facebook.com|fb.watch|web.facebook.com|business.facebook.com|video.fb.com/g)) throw lenguajeGB.smsAvisoFG() + lenguajeGB.smsyFBvid1()
await m.reply(wait)
let messageType = checkMessageType(args[0])
let message = ''
switch (messageType) {
case "groups":
message = lenguajeGB.smsyFBvid2()
break
case "reel":
message = lenguajeGB.smsyFBvid3()
break
case "stories":
message = lenguajeGB.smsyFBvid4()
break
case "posts":
message = lenguajeGB.smsyFBvid5()
break
default:
message = lenguajeGB.smsyFBvid6()
break
}  
try {
let res = await fetch(`https://api.lolhuman.xyz/api/facebook?apikey=${lolkeysapi}&url=${args[0]}`)
let _json = await res.json()
vid = _json.result[0]
if (vid == '' || !vid || vid == null) vid = _json.result[1]
await conn.sendFile(m.chat, vid, 'error.mp4', `*${message}*`, m)
} catch (error1) {
try {
const d2ata = await facebook.v1(args[0])
let r2es = ''
if (d2ata.urls && d2ata.urls.length > 0) {
r2es = `${d2ata.urls[0]?.hd || d2ata.urls[1]?.sd || ''}`
}
await conn.sendFile(m.chat, r2es, 'error.mp4', `*${message}*`, m)
} catch (error2) {
try {
var get = await fetch(`https://api.botcahx.live/api/dowloader/fbdown?url=${args[0]}&apikey=QaepQXxR`)
var js = await get.json()
await conn.sendFile(m.chat, js.result.HD, 'error.mp4', `*${message}*`, m)
} catch (e) {
reportError(e)} 
}}    
break
        
case isCommand9:
if (!args[0]) return m.reply(lenguajeGB.smsMalused2() + `*${usedPrefix + command} https://www.mediafire.com/file/04kaaqx9oe3tb8b/DOOM_v13_CLONE%255BCOM.FM%255D.apk/file*`)
m.react("✨") 
try {  
const res = await fetch(`https://deliriussapi-oficial.vercel.app/api/mediafire?url=${args[0]}`);
if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
const data = await res.json();
const fileDataArray = data.data;
fileDataArray.forEach((fileData) => {
const caption = `🗂️ ${fileData.filename}
⚖️ ${fileData.size}
📡 ${fileData.mime}

${lenguajeGB.smsMediaFr()}`.trim();
m.reply(caption);
conn.sendFile(m.chat, fileData.link, fileData.filename, '', m, null, {mimetype: fileData.mime, asDocument: true, 
});
m.react(`✅`);
});
} catch (error) {
try {
let res = await mediafiredl(args[0])  
let res2 = await mediafireDl(args[0])  
let { filename:name, ext:mime, url, filesizeH:peso } = res
let { date } = res2   
let caption = `
🗂️ ${name}
⌛ ${date}
⚖️ ${peso}
📡 ${mime}

${lenguajeGB.smsMediaFr()}`.trim()
await m.reply(caption)
//await conn.sendFile(m.chat, link, name, '', m, null, { mimetype: mime, asDocument: true })  
await conn.sendFile(m.chat, url, name, '', m, null, { mimetype: mime, asDocument: true })
m.react(`✅`);
} catch (e) {
await m.reply(lenguajeGB['smsMalError3']() + '\n*' + lenguajeGB.smsMensError1() + '*\n*' + usedPrefix + `${lenguajeGB.lenguaje() == 'es' ? 'reporte' : 'report'}` + '* ' + `${lenguajeGB.smsMensError2()} ` + usedPrefix + command)
console.log(`❗❗ ${lenguajeGB['smsMensError2']()} ${usedPrefix + command} ❗❗`)
console.log(e)
m.react(`❌`)}}   
async function mediafireDl(url) {
const res = await axios.get(`https://www-mediafire-com.translate.goog/${url.replace('https://www.mediafire.com/','')}?_x_tr_sl=en&_x_tr_tl=fr&_x_tr_hl=en&_x_tr_pto=wapp`)
const $ = cheerio.load(res.data)
const link = $('#downloadButton').attr('href')
const name = $('body > main > div.content > div.center > div > div.dl-btn-cont > div.dl-btn-labelWrap > div.promoDownloadName.notranslate > div').attr('title').replaceAll(' ','').replaceAll('\n','')
const date = $('body > main > div.content > div.center > div > div.dl-info > ul > li:nth-child(2) > span').text()
const size = $('#downloadButton').text().replace('Download', '').replace('(', '').replace(')', '').replace('\n', '').replace('\n', '').replace('                         ', '').replaceAll(' ','')
let mime = ''
let rese = await axios.head(link)
mime = rese.headers['content-type']
return { name, size, date, mime, link }
}
break 
        
case isCommand10:
if (!args[0]) return m.reply(lenguajeGB.smsMalused2() + `*${usedPrefix + command} https://youtu.be/ejemplo*\n*${usedPrefix + command} https://www.youtube.com/ejemplo*`)
await conn.reply(m.chat, lenguajeGB.smsAvisoEG() + '*' + lenguajeGB.smsYTV1() + '*', m)
try { 
const streamPipeline = promisify(pipeline)
const videoUrl = text
const videoInfo = await ytdl.getInfo(videoUrl)
const { videoDetails } = videoInfo
const { title, thumbnails, lengthSeconds, viewCount, uploadDate } = videoDetails
const thumbnail = thumbnails[0].url
const videoStream = ytdl(videoUrl, { filter: 'audioandvideo', quality: 'highest', })
async function crearWritableStreamAsync() {
const filePath = `tmp/${title}.mp4`
const writableStream = fs.createWriteStream(filePath)
return writableStream
}
async function transferirDatos(videoStream, writableStream) {
await streamPipeline(videoStream, writableStream)
}
async function fileVideo() {
const writableStream = await crearWritableStreamAsync(title)
await transferirDatos(videoStream, writableStream)
}
let message
async function enviarMensaje() {
message = await conn.sendMessage(m.chat, { video: { url: `tmp/${title}.mp4` }, mimetype: 'video/mp4', fileName: title, caption: null }, { quoted: m })
}
async function videoResult(m) {
await fileVideo()
await enviarMensaje()
await m.react(sent)
await message.react(correct)
}
try {
videoResult(m)
} catch (e) {
reportError(e)
}} catch (e) {
reportError(e)
}
break

case isCommand11:
if (!text) return conn.reply(m.chat, `${lenguajeGB['smsMalused2'