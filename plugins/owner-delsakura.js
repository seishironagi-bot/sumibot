/* Codigo hecho por @Fabri115 y mejorado por EnderJs*/

import { readdirSync, unlinkSync, existsSync, promises as fs, rmSync } from 'fs'
import path from 'path'

var handler = async (m, { conn, usedPrefix }) => {

if (global.conn.user.jid !== conn.user.jid) {
return conn.reply(m.chat, '🌹 *Ejecuta el comando en el bot principal*', m, fake, )
}
await conn.reply(m.chat, '🌹 *Iniciando proceso de eliminación de todos los archivos de sesión, excepto el archivo creds.json...*', m, fake, )
m.react(rwait)

let session = './session/'

try {

if (!existsSync(session)) {
return await conn.reply(m.chat, '🏴 *La carpeta escrita está vacía*', m, fake, )
}
let files = await fs.readdir(session)
let filesDeleted = 0
for (const file of files) {
if (file !== 'creds.json') {
await fs.unlink(path.join(session, file))
filesDeleted++;
}
}
if (filesDeleted === 0) {
await conn.reply(m.chat, '🏴 *La carpeta escrita esta vacía*',  m, fake, )
} else {
m.react(done)
await conn.reply(m.chat, `🌹 *Se eliminaron ${filesDeleted} archivos de sesión, excepto el archivo creds.json*`,  m, fake, )
conn.reply(m.chat, `🎉 *¡Hola! Elimine los desechos, ¿Puedes leerme?*`, m, fake, )

}
} catch (err) {
console.error('Error al leer la carpeta o los archivos de sesión:', err);
await conn.reply(m.chat, '🏴 *Ocurrió un fallo Null*',  m, fake, )
}

}
handler.help = ['dsowner']
handler.tags = ['own']
handler.command = /^(del_reg_in_session_owner|delsakura|clearallsession)$/i

handler.rowner = true

export default handler
