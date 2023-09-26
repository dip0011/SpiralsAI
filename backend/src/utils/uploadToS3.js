const AWS = require('aws-sdk');
const axios = require('axios');
const Photo = require("../db/models/photo");

AWS.config.update({
    accessKeyId: process.env.AWS_KEY,
    secretAccessKey: process.env.AWS_SECRET,
    region: process.env.AWS_REGION,
});

const s3 = new AWS.S3();

async function downloadImageFromURL(imageUrl) {
    try {
        const response = await axios.get(imageUrl, {
            responseType: "arraybuffer",
        });
        return Buffer.from(response.data, "binary");
    } catch (err) {
        console.error("Error downloading the image:", err);
        throw err;
    }
}

async function upload(output, prompt) {
    const buffer = await downloadImageFromURL(output);
    const key = prompt.slice(0, 5) + Math.floor(Math.random() * (5 * 100000)) + '.png';

    const params = {
        Bucket: process.env.AWS_S3_BUCKET_NAME,
        Key: key,
        Body: buffer,
    };

    return new Promise((resolve, reject) => {
        s3.upload(params, async (err, data) => {
            if (err) {
                console.error('Error uploading Photo to S3:', err);
                reject(err);
            } else {
                const s3ImageUrl = data.Location;
                try {
                    await Photo.create({
                        name: key,
                        prompt:prompt,
                        url: s3ImageUrl
                    });
                    resolve(s3ImageUrl);
                } catch (error) {
                    console.error('Error creating Photo record:', error);
                    reject(error);
                }
            }
        });
    });
}

module.exports = { upload }