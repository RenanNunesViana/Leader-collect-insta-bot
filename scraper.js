const puppeteer = require('puppeteer');
const Tesseract = require('tesseract.js');
require('dotenv').config()

async function scrapeInstagram() {
    const browser = await puppeteer.launch({ headless: false, defaultViewport: { width: 1920, height: 1080 } });
    const page = await browser.newPage();
    //await page.setViewport({ width: 1920, height: 1080 });
    await page.goto('https://www.instagram.com', { waitUntil: 'networkidle2' });

    // Login
    await page.type('input[name="username"]', process.env.LOGIN);
    await page.type('input[name="password"]', process.env.PASSWORD);
    await page.click('button[type="submit"]');
    await page.waitForNavigation({ waitUntil: 'networkidle2' });



    await page.goto(`https://www.instagram.com/${process.env.PROFILE}`, { waitUntil: 'networkidle2' });

    await page.waitForSelector('svg[aria-label="Pesquisa"]');
    await page.click('svg[aria-label="Pesquisa"]');

    await page.waitForSelector('input[aria-label="Entrada da pesquisa"]');
    await page.type('input[aria-label="Entrada da pesquisa"]', 'empregosjp')
}
// Capturar as URLs das imagens dos posts
//     const imageUrls = await page.evaluate(() => {
//         const images = Array.from(document.querySelectorAll('img'));
//         return images.map(img => img.src);
//     });

//     for (let src of imageUrls) {
//         console.log(src);

//         // Processar a imagem com Tesseract
//         Tesseract.recognize(
//             src,
//             'eng',
//             {
//                 logger: (m) => console.log(m),
//             }
//         ).then(({ data: { text } }) => {
//             console.log('Recognized text:', text);
//         });
//     }

//     await browser.close();
// }

scrapeInstagram();
