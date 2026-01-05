const sharp = require("sharp");
const cloudinary = require("./cloudinary-config");

// Middleware de traitement d'image : optimise, convertit en WebP et upload sur Cloudinary
module.exports = async (req, res, next) => {
  // Si aucun fichier n'est présent dans la requête, on passe au middleware suivant
  if (!req.file) return next();

  try {
    // Nettoyage du nom de fichier pour éviter les caractères problématiques
    const nameWithoutExt = req.file.originalname
      .replace(/\.[^/.]+$/, "")
      .split(" ")
      .join("_");

    // Génère un nom de fichier unique
    const filename = `${Date.now()}-${nameWithoutExt}`;

    // Conversion de l'image en WebP avec compression
    const optimizedBuffer = await sharp(req.file.buffer)
      .webp({ quality: 50 })
      .toBuffer();

    // Upload sur Cloudinary
    const uploadResult = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: "mon-vieux-grimoire",
          public_id: filename,
          format: "webp",
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );
      uploadStream.end(optimizedBuffer);
    });

    // Stocke l'URL Cloudinary et le public_id pour utilisation ultérieure
    req.file.cloudinaryUrl = uploadResult.secure_url;
    req.file.cloudinaryPublicId = uploadResult.public_id;

    next();
  } catch (error) {
    console.error("Erreur lors du traitement de l'image:", error);
    res.status(500).json({ error: "Erreur lors du traitement de l'image" });
  }
};
