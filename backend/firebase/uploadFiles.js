// uploadFiles.js
import { v4 as uuidv4 } from 'uuid';
import firebaseAdmin from './admin.js';

const bucket = firebaseAdmin.storage().bucket();

export const uploadFiles = async (files) => {
  const uploadedFiles = [];

  for (const file of files) {
    const fileName = `${uuidv4()}-${file.originalname}`;
    const blob = bucket.file(fileName);

    await new Promise((resolve, reject) => {
      const blobStream = blob.createWriteStream({
        metadata: {
          contentType: file.mimetype,
        },
      });

      blobStream.on('error', (err) => {
        console.error('Error uploading file:', err);
        reject(err);
      });

      blobStream.on('finish', () => {
        const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
        uploadedFiles.push(publicUrl); // Store the uploaded file's URL
        resolve();
      });

      // End the stream by sending the buffer
      blobStream.end(file.buffer);
    });
  }

  return uploadedFiles;
};
