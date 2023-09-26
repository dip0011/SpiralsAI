const express = require('express');
const Replicate = require("replicate");
const router = express.Router();
const {upload} = require("../utils/uploadToS3");


// Route for AI Image generation via Replicate
router.post('/prompt', async (req, res) => {
  try {
    const { prompt } = req.body;
    const replicate = new Replicate({
      auth: process.env.REPLICATE_API_TOKEN,
    });

    const output = await replicate.run(
      process.env.REPLICATE_SDK_URL,
      {
        input: {
          prompt: prompt,
          qr_code_content: process.env.REPLICATE_CONTENT,
          negative_prompt: 'ugly, disfigured, low quality, blurry, nsfw',
          controlnet_conditioning_scale: 1,
          image: process.env.REPLICATE_IMAGE
        }
      }
    );
    try{
      const url = await upload(output[0], prompt);
      return res.status(200).json({ url });
    }catch(error){
      res.status(200).json({ url:output[0] });
    }
  } catch (error) {
    console.error('Error generating Image:', error);
    res.status(500).json({ error: 'Error generating Image' });
  }
});

module.exports = router;