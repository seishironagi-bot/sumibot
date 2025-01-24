conn.sendMessage(m.chat, {
  image: {url:`${thumbnail}`},
  caption: `${txt}`, // Mención al usuario
  footer: "Please Wait",
  buttons: [
    {
      buttonId: `.yta ${enlace}`,
      buttonText: {
        displayText: "Audio",
      },
      type: 1,
    },
    {
      buttonId: `.play2 ${enlace}`,
      buttonText: {
        displayText: "Vídeo",
      },
      type: 1,
    },
  ],
  viewOnce: true,
  headerType: 4
  }, { quoted: m });