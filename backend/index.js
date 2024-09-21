import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import { connectDB } from './db/connect.js';
import postsRouter from './routes/posts.js';
import { v4 as uuidv4 } from 'uuid';
import multer from 'multer';
import firebaseAdmin from './firebase/admin.js';

const app = express();

console.log(firebaseAdmin);

const dbName = 'blog-app';

app.use(express.json());

app.use('/api/v1/posts', postsRouter);

connectDB(process.env.MONGO_URI).then(() => {
  app.listen(8000, () => {
    console.log(`App is listening on port 8000`);
  });
});

const bucket = firebaseAdmin.storage().bucket();
const upload = multer({
  storage: multer.memoryStorage(),
});

// Upload multiple images (accept up to 5 files)
app.post('/upload-multiple', upload.array('images', 5), async (req, res) => {
  try {
    const files = req.files;
    if (!files || files.length === 0) {
      return res.status(400).json({ message: 'No files uploaded' });
    }

    const uploadedFiles = [];

    // Loop through all files and upload them to Firebase Storage
    for (const file of files) {
      const fileName = `${uuidv4()}-${file.originalname}`;
      const blob = bucket.file(fileName);

      const blobStream = blob.createWriteStream({
        metadata: {
          contentType: file.mimetype,
        },
      });

      await new Promise((resolve, reject) => {
        blobStream.on('error', (err) => {
          console.error('Error uploading file:', err);
          reject(err);
        });

        blobStream.on('finish', async () => {
          const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
          uploadedFiles.push(publicUrl); // Store the uploaded file's URL
          resolve();
        });

        // End the stream by sending the buffer
        blobStream.end(file.buffer);
      });
    }

    // Respond with an array of URLs of all uploaded images
    res.status(200).json({ imageUrls: uploadedFiles });
  } catch (error) {
    console.error('Error uploading files:', error);
    res.status(500).json({ message: 'Error uploading files', error });
  }
});
