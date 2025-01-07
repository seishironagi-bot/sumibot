const { Client } = require('whatsapp-web.js');
const fs = require('fs');
const path = require('path');

// Crear un nuevo cliente de WhatsApp
const client = new Client();

client.on('qr', (qr) => {
    console.log('Escanea el código QR:', qr);
});

client.on('ready', () => {
    console.log('El bot está listo!');
});

client.on('message', async (message) => {
    if (message.body === '.residuos') {
        // Ruta donde se encuentran los archivos
        const dir = './ruta/a/los/archivos/basura';

        fs.readdir(dir, (err, files) => {
            if (err) {
                console.error('Error al leer el directorio:', err);
                message.reply('No se pudo acceder a los archivos.');
                return;
            }

            let deletedFiles = [];

            files.forEach(file => {
                const filePath = path.join(dir, file);
                const ext = path.extname(file).toLowerCase();

                // Condiciones para identificar archivos no necesarios
                const unnecessaryExtensions = ['.tmp', '.log', '.cache', '.DS_Store'];

                if (unnecessaryExtensions.includes(ext)) {
                    fs.unlink(filePath, (err) => {
                        if (err) {
                            console.error('Error al eliminar el archivo:', err);
                        } else {
                            console.log(`Archivo eliminado: ${file}`);
                            deletedFiles.push(file);
                        }
                    });
                }
            });

            // Respuesta al usuario
            if (deletedFiles.length > 0) {
                message.reply('Papelera limpiada. Se han eliminado los archivos no necesarios.');
            } else {
                message.reply('No se encontraron archivos no necesarios para eliminar.');
            }
        });
    }
});

// Inicializar el cliente
client.initialize();