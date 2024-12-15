import {WAMessageStubType} from '@whiskeysockets/baileys'
import fetch from 'node-fetch'

export async function before(m, {conn, participants, groupMetadata}) {
  if (!m.messageStubType || !m.isGroup) return !0;
const user = global.db.data.users[m.sender];
const taguser = '@' + m.sender.split('@s.whatsapp.net')[0];
    let pp = await conn.profilePictureUrl(m.messageStubParameters[0], 'image').catch(_ => 'https://qu.ax/SpdFn.jpg')
    let pp2 = await conn.profilePictureUrl(m.messageStubParameters[0], 'image').catch(_ => 'https://qu.ax/SpdFn.jpg')
  let img = await (await fetch(`${pp}`)).buffer()
  let img2 = await (await fetch(`${pp2}`)).buffer()

  let chat = global.db.data.chats[m.chat]

  if (chat.welcome && m.messageStubType == 27) {
    let wel = `🌸Hola🌸@${m.messageStubParameters[0].split`@`[0]}\n\nBienvenido a ${groupMetadata.subject}`
await conn.sendFile(m.chat, img, "Thumbnail.jpg", wel, null,null, rcanal)
  }

  if (chat.welcome && m.messageStubType == 28) {
   let bye = `Adios perra nunca te quisimos aqui😂 @${m.messageStubParameters[0].split`@`[0]}`
await conn.sendFile(m.chat, img2, "Thumbnail.jpg", bye, null, rcanal)
  }

  if (chat.welcome && m.messageStubType == 32) {
    let kick = `Adios perra nunca te quisimos aqui😂@${m.messageStubParameters[0].split`@`[0]}`
await conn.sendFile(m.chat, img, "Thumbnail.jpg", kick, null, rcanal)
}}