import admin from 'firebase-admin'
import axios from 'axios'
import crypto from 'crypto'
import { fileTypeFromBuffer } from 'file-type'
import dotenv from 'dotenv'
dotenv.config()

const serviceAccount = JSON.parse(
    process.env.FIREBASE_SERVICE_ACCOUNT_KEY
);

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET_URL
});

export default function uploadFiles() {
    return async function uploadFiles(req, res, next) {
        const tempStoragePath = 'temp/'
        const { previewSource } = req.body;
        const uploadedFiles = []

        // Reference to the Firebase Storage bucket
        const bucket = admin.storage().bucket();
        try {
            await Promise.all(previewSource.map(async (base64Url) => {
                const response = await axios.get(base64Url, { responseType: 'arraybuffer' });
                const fileBuffer = Buffer.from(response.data, 'base64');

                // Detect file type
                const detectedFileType = await fileTypeFromBuffer(fileBuffer);
                const contentType = detectedFileType ? detectedFileType.mime : 'application/pdf';
                // Create a unique filename using UUID
                const filename = `${tempStoragePath}${crypto.randomUUID()}`;

                // Upload the file to Firebase Storage
                const file = bucket.file(filename);
                await file.save(fileBuffer, {
                    metadata: {
                        contentType: contentType
                    }
                });

                uploadedFiles.push(file)
            }))

            const finalStoragePath = 'uploads/'
            await Promise.all(
                uploadedFiles.map(async (file) => {
                    const newFilename = file.name.replace(tempStoragePath, finalStoragePath)
                    await file.move(newFilename)
                })
            )

            const downloadUrls = uploadedFiles.map(file => {
                const finalFilename = file.name.replace(tempStoragePath, finalStoragePath);
                return `https://storage.googleapis.com/${bucket.name}/${finalFilename}`;
            });

            req.files = downloadUrls
            next()
        } catch (error) {
            console.error('Error uploading files:', error);
            // Delete all files uploaded to temporary location on error
            await Promise.all(
                uploadedFiles.map(async (file) => {
                    try {
                        await file.delete();
                    } catch (deleteError) {
                        console.error('Error deleting file:', deleteError);
                    }
                })
            );
            return res.json({ success: false, message: "Error uploading files, Error details:\n" + error.message }).status(500)
        }
    }
}