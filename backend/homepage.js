const express = require('express');
const router = express.Router();
const HomepageConfig = require('../model/homepageConfigModel');
const Category = require('../model/categoryModel');
const isAuthenticated = require('../middleware/auth');
const upload = require('../multer/multerConfig');
const { check, validationResult } = require('express-validator');

// Middleware pour vérifier si l'utilisateur est administrateur
const isAdmin = (req, res, next) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Accès refusé.' });
    }
    next();
};

// Validation des données
const validateHomepageConfig = [
    check('sectionTitle').not().isEmpty().withMessage('Le titre de la section est requis.'),
    check('order').isInt({ min: 1 }).withMessage('L\'ordre doit être un entier positif.')
];

// Ajouter une nouvelle configuration de page d'accueil
router.post('/homepage-config', isAuthenticated, isAdmin, upload.array('images'), validateHomepageConfig, async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { sectionTitle, order, categoryId, subcategoryId } = req.body;

        const images = req.files.map(file => ({
            filename: file.filename,
            width: parseInt(req.body[`width_${file.originalname}`], 10) || 0,
            height: parseInt(req.body[`height_${file.originalname}`], 10) || 0
        }));

        const newConfig = new HomepageConfig({
            sectionTitle,
            order,
            categoryId: categoryId || undefined,
            subcategoryId: subcategoryId || undefined,
            images: images.map(img => img.filename),
            imageSizes: images
        });

        await newConfig.save();
        res.status(201).json(newConfig);
    } catch (error) {
        console.error('Erreur lors de l\'ajout de la configuration:', error);
        res.status(500).json({ message: 'Erreur lors de l\'ajout de la configuration.' });
    }
});

// Obtenir toutes les configurations de la page d'accueil avec pagination
router.get('/homepage-config', async (req, res) => {
    const { page = 1, limit = 10, order = 'asc' } = req.query;

    try {
        const configs = await HomepageConfig.find()
            .sort({ order: order === 'asc' ? 1 : -1 })
            .skip((page - 1) * limit)
            .limit(parseInt(limit))
            .populate('subcategoryId');

        res.status(200).json(configs);
    } catch (error) {
        console.error('Erreur lors de la récupération des configurations:', error.message);
        res.status(500).json({ message: 'Erreur lors de la récupération des configurations.', error: error.message });
    }
});

// Obtenir une configuration spécifique
router.get('/homepage-config/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const config = await HomepageConfig.findById(id);
        if (!config) {
            return res.status(404).json({ message: 'Configuration non trouvée' });
        }
        res.status(200).json(config);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la récupération de la configuration', error: error.message });
    }
});

// Mettre à jour une configuration existante
router.put('/homepage-config/:id', isAuthenticated, isAdmin, upload.array('images'), validateHomepageConfig, async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { id } = req.params;
        const { sectionTitle, order, categoryId, subcategoryId } = req.body;

        const config = await HomepageConfig.findById(id);
        if (!config) {
            return res.status(404).json({ message: 'Configuration non trouvée.' });
        }

        // Mise à jour des champs
        config.sectionTitle = sectionTitle || config.sectionTitle;
        config.order = order || config.order;
        config.categoryId = categoryId || config.categoryId;
        config.subcategoryId = subcategoryId || config.subcategoryId;

        // Mise à jour des images si fournies
        if (req.files.length > 0) {
            const oldImages = config.images;
            config.images = req.files.map(file => file.filename);
            config.imageSizes = req.files.map(file => ({
                filename: file.filename,
                width: parseInt(req.body[`width_${file.originalname}`], 10) || 0,
                height: parseInt(req.body[`height_${file.originalname}`], 10) || 0
            }));

            // Suppression des anciennes images du système de fichiers (optionnel, à implémenter)
            oldImages.forEach(image => {
                if (!config.images.includes(image)) {
                    // Code pour supprimer `image` du système de fichiers
                }
            });
        }

        await config.save();
        res.status(200).json(config);
    } catch (error) {
        console.error('Erreur lors de la mise à jour:', error);
        res.status(500).json({ message: 'Erreur lors de la mise à jour de la configuration.', error: error.message });
    }
});

// Supprimer une configuration de la page d'accueil
router.delete('/homepage-config/:id', isAuthenticated, isAdmin, async (req, res) => {
    try {
        const { id } = req.params;
        await HomepageConfig.findByIdAndDelete(id);
        res.status(200).json({ message: 'Configuration supprimée avec succès.' });
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la suppression de la configuration.', error: error.message });
    }
});

module.exports = router;
