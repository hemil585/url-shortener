import express from "express";
import { nanoid } from 'nanoid'
import { Url } from "../model/url";
import axios from "axios";

export const urlRouter = express.Router()

urlRouter.get("/check-url", async (req, res) => {
    const encodedUrl = req.query.url;
    const url = decodeURIComponent(String(encodedUrl));
    try {
        const response = await axios.head(url, { timeout: 3000 });
        res.json({ success: true, url: response.request.res.responseUrl });
    } catch (error) {
        res.json({ success: false, error: "URL not found! The link does not exist or is unreachable." });
    }
});

urlRouter.post('/getUrl', async (req, res) => {
    const { encodedUrl } = req.body

    const originalUrl = decodeURIComponent(String(encodedUrl));
    const response = await axios.head(originalUrl, { timeout: 3000 });

    const originalUrlExists = await Url.findOne({ originalUrl: response.request.res.responseUrl })
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
                originalUrl: response.request.res.responseUrl, shortCode
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