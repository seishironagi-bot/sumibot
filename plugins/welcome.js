export async function before(m, { conn, participants, groupMetadata }) {
    const fkontak = { key: { fromMe: false, participant: '0@s.whatsapp.net' }, message: { conversation: '¡Hola!' } };
    
    if (!m.messageStubType || !m.isGroup) return true;

    let userId = m.messageStubParameters[0];

    const welcomeImage = 'https://qu.ax/JKgtT.jpg'; // Imagen de bienvenida
    const goodbyeImage = 'https://qu.ax/JKgtT.jpg'; // Imagen de despedida

    let pp;
    try {
        pp = await conn.profilePictureUrl(userId, 'image');
    } catch (error) {
        pp = null;
    }

    let img;
    try {
        img = await (await fetch(pp || welcomeImage)).buffer();
    } catch (fetchError) {
        img = await (await fetch(welcomeImage)).buffer();
    }

    let chat = global.db.data.chats[m.chat];

    if (chat.welcome && m.messageStubType === 27) {
        let wel = `┌─★${await conn.getName(m.chat)}\n│「 𝐁𝐈𝐄𝐍𝐕𝐄𝐍𝐈𝐃𝐎 」\n└┬★ 「 @${userId.split`@`[0]} 」\n   │  ✨𝐁𝐈𝐄𝐍𝐕𝐄𝐍𝐈𝐃𝐎✨/𝐀\n   │ ${groupMetadata.subject}\n   └───────────────┈ ⳹`;
        try {
            //await conn.sendMini(m.chat, packname, dev, wel, img, img, channel, fkontak);
await conn.sendFile(m.chat, img, "Thumbnail.jpg", wel, null)
        } catch (sendError) {
            console.error('Error al enviar mensaje de bienvenida:', sendError);
        }
    }

    // Mensaje de despedida (cuando se sale)
    if (chat.welcome && m.messageStubType === 28) {
        let bye = `┌─${await conn.getName(m.chat)} \n│「 𝐀𝐃𝐈Ó𝐒 🗣️‼️ 」\n└┬★ 「 @${userId.split`@`[0]} 」\n   │SE SALIO UNA GONORREA😂\n   │📌𝐍𝐮𝐧𝐜𝐚 𝐓𝐞 𝐐𝐮𝐢𝐬𝐢𝐦𝐨𝐬 𝐀𝐪𝐮í\n   └───────────────┈ ⳹`;
        let img2;
        try {
            img2 = await (await fetch(goodbyeImage)).buffer(); 
            //await conn.sendMini(m.chat, packname, dev, bye, img2, img2, channel, fkontak);
await conn.sendFile(m.chat, img2, "Thumbnail.jpg", bye, null)
        } catch (sendError) {
            console.error('Error al enviar mensaje de despedida:', sendError);
        }
    }

    // Mensaje de expulsión (cuando se echa a alguien)
    if (chat.welcome && m.messageStubType === 32) {
        let kick = `┌─★${await conn.getName(m.chat)} \n│「 𝐀𝐃𝐈Ó𝐒 🗣️‼️ 」\n└┬★ 「 @${userId.split`@`[0]} 」\n   │SE SALIO UNA GONORREA 😂\n   │📌𝐍𝐮𝐧𝐜𝐚 𝐓𝐞 𝐐𝐮𝐢𝐬𝐢𝐦𝐨𝐬 𝐀𝐪𝐮í\n   └───────────────┈ ⳹`;
        let img3;
        try {
            img3 = await (await fetch(goodbyeImage)).buffer();
            //await conn.sendMini(m.chat, packname, dev, kick, img3, img3, channel, fkontak);
await conn.sendFile(m.chat, img3, "Thumbnail.jpg", kick, null)
        } catch (sendError) {
            console.error('Error al enviar mensaje de expulsión:', sendError);
        }
    }
}