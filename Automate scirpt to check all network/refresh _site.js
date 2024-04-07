const puppeteer = require('puppeteer');
const fs = require('fs');

async function saveHtml(url, filename) {
    console.log("tart copy html page")
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    try {
        await page.goto(url, { waitUntil: 'networkidle0', timeout: 3000000 }); // Attend que le réseau soit inactif

        // Attend que le contenu dynamique soit chargé (vous pouvez ajuster le sélecteur selon vos besoins)
        await page.waitForSelector('#result');

        // Récupère le HTML de la page
        let html = await page.content();

        // Supprimer la ligne 4 (index 3) en divisant la chaîne en lignes, supprimant la quatrième ligne, puis rejoignant les lignes
        const lines = html.split('\n');
        lines.splice(1, 1);
        html = lines.join('\n');

        // Enregistrer le HTML modifié dans un fichier
        fs.writeFileSync(filename, html);
        console.log(`HTML saved to ${filename}`);
    } catch (error) {
        console.error('An error occurred:', error);
    } finally {
        await browser.close();
    }
}

async function main() {
    const url = 'http://127.0.0.1:5000/refrech-site';
    const filename = 'templates/index.html';
    await saveHtml(url, filename);
}

main();

setInterval(main, 5 * 60 * 1000);