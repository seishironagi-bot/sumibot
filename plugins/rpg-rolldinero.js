import fs from 'fs';
import dotenv from 'dotenv';

dotenv.config();

const obtenerDatos = () => {
    try {
        return fs.existsSync('data.json') 
            ? JSON.parse(fs.readFileSync('data.json', 'utf-8')) 
            : { usuarios: {} };
    } catch (error) {
        console.error('Error al leer data.json:', error);
        return { usuarios: {} };
    }
};

const guardarDatos = (data) => {
    try {
        fs.writeFileSync('data.json', JSON.stringify(data, null, 2));
    } catch (error) {
        console.error('Error al escribir en data.json:', error);
    }
};

let handler = async (m, { conn, args, participants }) => {
    let users = Object.entries(global.db.data.users).map(([key, value]) => {
        return {...value, jid: key};
    });
    let sortedLim = users.map(toNumber('zenis')).sort(sort('zenis'));
    let len = args[0] && args[0].length > 0 ? Math.min(5, Math.max(parseInt(args[0]), 5)) : Math.min(5, sortedLim.length);

    const cantidadZenis = Math.floor(Math.random() * (150 - 10 + 1)) + 10; // Generar cantidad aleatoria entre 10 y 150
    let userId = m.sender;
    let data = obtenerDatos();

    if (!data.usuarios[userId]) {
        data.usuarios[userId] = { bank: 0, zenis: 0 }; // Crear usuario si no existe
    }
    data.usuarios[userId].zenis += cantidadZenis; // Aumentar la cantidad de zenis
    data.usuarios[userId].bank += cantidadZenis; // Guardar en el banco también
    guardarDatos(data);

    let text = `
╭───═[ *Top ${len} Zenis 💴* ]═────⋆
│╭───────────────···
✩│ Tú eres el *${usersLim.indexOf(userId) + 1}* de *${usersLim.length}*
✩│ ${sortedLim.slice(0, len).map(({ jid, zenis }, i) => `${i + 1}. ${participants.some(p => jid === p.jid) ? `(${conn.getName(jid)}) wa.me/` : '@'}${jid.split`@`[0]} *${zenis} 💴*`).join`
✩│ `}
│╰────────────────···
╰───────────═┅═──────────`.trim();
  m.reply(text, null, { mentions: conn.parseMention(text) });
};

handler.help = ['lb'];
handler.tags = ['rpg'];
handler.command = ['zenis', 'minarzenis']; 
handler.register = true; 
handler.fail = null;
handler.exp = 0;

export default handler;

function sort(property, ascending = true) {
  if (property) return (...args) => args[ascending & 1][property] - args[!ascending & 1][property];
  else return (...args) => args[ascending & 1] - args[!ascending & 1];
}

function toNumber(property, _default = 0) {
  if (property) return (a, i, b) => {
    return {...b[i], [property]: a[property] === undefined ? _default : a[property]};
  } else return a => a === undefined ? _default : a;
}

function enumGetKey(a) {
  return a.jid;
}
