import { UltimateTextToImage } from "ultimate-text-to-image";
import { v4 as uuid } from 'uuid';
import express from 'express';
import fs from "fs"
import ffmpeg from 'fluent-ffmpeg';
import { path as ffmpegPath } from '@ffmpeg-installer/ffmpeg';
import __dirname from "./dirname.js"

ffmpeg.setFfmpegPath(ffmpegPath)


const app = express();
const porta = process.env.PORT || 5000

app.set('json spaces', 4)

let randomName = (ext) => './output/' + uuid().split('-')[0] + (ext ? ext : '');

app.listen(porta, function () {
    console.log("Listening on port ", porta)
    if (porta == 5000) { console.log('rodando localmente em http://localhost:5000') }
});

app.get('/', (req, res) => {

    res.sendFile('index.html', { root: __dirname })
})

app.get('/ttp', (req, res) => {
    let { cor, texto } = req.query

    let imagem = ttp(texto, cor)

    res.sendFile(imagem, { root: __dirname })
})

app.get('/attp', async (req, res) => {
    let { texto } = req.query

    let imagem = await attp(texto)

    res.sendFile(imagem, { root: __dirname })
})

export function ttp(text, color = '#ffffff', name = randomName('.png')) {
    new UltimateTextToImage(text, {
        width: 500,
        height: 500,
        fontColor: color,
        fontFamily: "Noto Sans",
        fontSize: 300,
        minFontSize: 10,
        lineHeight: 50,
        autoWrapLineHeightMultiplier: 1.2,
        margin: 15,
        // marginBottom: 40,
        align: "center",
        valign: "middle",
    })
        .render()
        .toFile(name);

    return name
}

async function attp(text) {
    let nome = randomName('')
    let cores = [
        '#ff0000',
        '#ffa600',
        '#ffee00',
        '#2bff00',
        '#00ffea',
        '#3700ff',
        '#ff00ea',
    ]

    const lista = cores.map((cor, index) => {
        return ttp(text, cor, nome + index + '.png')
    })

    return new Promise(function (resolve, reject) {
        // gerar webp
        ffmpeg()
            .addInput((nome + '%d.png'))
            .addOutputOptions([
                '-vcodec', 'libwebp', '-vf',
                'scale=500:500:force_original_aspect_ratio=decrease,setsar=1, pad=500:500:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse',
                '-loop', '0', '-preset', 'default'
            ])
            //.outputFPS(15)
            .toFormat('webp')
            .on('end', () => {
                for (let img of lista) {
                    delFile(img)
                }
                resolve(nome + '.webp')
            })
            .on('error', (err) => {
                for (let img of lista) {
                    delFile(img)
                }
                reject(('erro ffmpeg ' + err))
            })
            .save((nome + '.webp'))
    })
}

function delFile(file) {
    try {
        fs.unlinkSync(file)
    } catch (error) {

    }
}