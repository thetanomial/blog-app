import admin from 'firebase-admin';

// Function to get a signed URL
const getSignedUrl = async (filePath) => {
  const bucket = admin.storage().bucket();
  const file = bucket.file(filePath);
  const options = {
    version: 'v4',
    action: 'read',
    expires: Date.now() + 15 * 60 * 1000, // URL expires in 15 minutes
  };

  const [url] = await file.getSignedUrl(options);
  return url;
};

export default getSignedUrl
