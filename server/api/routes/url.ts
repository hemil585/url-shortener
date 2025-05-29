import express from "express";
import { nanoid } from 'nanoid'
import { Url } from "../model/url";
import http from 'http'
import https from 'https'

export const urlRouter = express.Router()

urlRouter.get("/check-url", async (req, res) => {
    const encodedUrl = req.query.url;
    const urlString = decodeURIComponent(String(encodedUrl));

    try {
        const url = new URL(urlString)
        const client = url.protocol === 'https:' ? https : http;

        const request = client.get(url, { timeout: 5000 }, (response) => {
            setTimeout(() => {
                request.destroy();
            }, 1000);

            const finalUrl = response.headers.location || response.responseUrl || url.href;

            res.json({ success: true, url: finalUrl });
        });

        request.on('error', (err: Error) => {
            if (err.code !== 'ECONNRESET') {
                console.log('Request error:', err.message);
                res.json({ success: false, error: "Request failed or invalid URL." });
            }
        });

        request.setTimeout(5000, () => {
            request.destroy();
            res.json({ success: false, error: "URL not found! The link does not exist or is unreachable." });
        });

    } catch (error) {
        res.json({ success: false, error: "URL not found! The link does not exist or is unreachable." });
    }
});

urlRouter.post('/getUrl', async (req, res) => {
    const { encodedUrl } = req.body

    const originalUrl = decodeURIComponent(String(encodedUrl));

    const originalUrlExists = await Url.findOne({ originalUrl })
    if (originalUrlExists) {
        res.status(200).json({
            shortenedUrl: process.env.CLIENT_URL + originalUrlExists.shortCode
        })
        return
    }

    let shortCode = nanoid(5)
    let url
    let shortCodeExists

    while (1) {
        shortCodeExists = await Url.findOne({ shortCode })
        if (!shortCodeExists) {
            url = await Url.create({
                originalUrl, shortCode
            })
            res.status(200).json({
                shortenedUrl: process.env.CLIENT_URL + url.shortCode
            })
            break
        } else {
            shortCode = nanoid(5)
        }
    }

})

urlRouter.get(`/:shortCode`, async (req, res) => {
    try {
        const { shortCode } = req.params
        const url = await Url.findOne({
            shortCode
        })

        if (url == null) {
            throw new Error('url does not exist')
        }
        res.status(200).json({ redirectUrl: url.originalUrl })
    } catch (error: any) {
        res.status(404).json({ msg: error.message, success: false })
    }
})