// filepath: c:\Users\rohit\OneDrive\Desktop\22nd Bday\birthday-website\src\data\galleryData.js
// Example image paths - replace with your actual image locations in public/assets/images/gallery/
const galleryData = Array.from({ length: 40 }, (_, i) => ({
  id: i + 1,
  url: `/assets/images/gallery/gallery_${i + 1}.jpg`, // Ensure these images exist
  alt: `Gallery Memory ${i + 1}`,
}));

export default galleryData;