import cloudinary from '../config/cloudinary.js';

export default function uploadImages(options) {

    return async (req, res, next) => {
        const { previewSource } = req.body;

        let imageURLs = []
        try {
            await Promise.all(previewSource.map(async (fileStr) => {
                const callResult = await cloudinary.uploader.upload(fileStr, {
                    upload_preset: 'CMS',
                    folder: `CMS/${options.folder}`
                })

                imageURLs.push({ url: callResult.secure_url, publicId: callResult.public_id })
            }))

            req.files = imageURLs
            next()
        } catch (err) {
            console.error("Error uploading images:", err);
            await Promise.all(imageURLs.map(async (image) => {
                if (image.publicId) {
                    await cloudinary.uploader.destroy(image.publicId);
                }
            }));
            return res.json({ success: false, message: "Error uploading images, Error details:\n" + err.message }).status(500)
        }
    }

}