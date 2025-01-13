{\"import fs from 'fs';
import fetch from 'node-fetch';

var handler = async (m, { conn }) => {
    try {
        let user = conn.getName(m.sender);
        let pp = await conn.profilePictureUrl(conn.user.jid).catch(_ => 'https://telegra.ph/file/24fa902ead26340f3df2c.png');

        let menu = `❤️ ¡𝐶𝑜𝑚𝑜 𝑒𝑠𝑡𝑎𝑠! ${user}

𝑈𝑡𝑖𝑙𝑖𝑧𝑎 𝐴𝑙𝑙𝑚𝑒𝑛𝑢 𝑝𝑎𝑟𝑎 𝑣𝑒𝑟 𝑒𝑙 𝑚𝑒𝑛𝑢 🐈🌻

!reglas
*(Para ver las reglas del bot)*`;

        await conn.reply(m.chat, menu, m);
    } catch (e) {
        conn.reply(m.chat, `*🛑 Ocurrió un fallo*`, m);
        console.log(e);
    }
};

handler.help = ['menu'];
handler.tags = ['main'];
handler.command = /^(ccc|hl|dh)$/i;
export default handler;}
