// middleware/isAdmin.js
const userModel = require('../model/userModel');

const isAdmin = async (req, res, next) => {
  try {
    // Assurez-vous que l'utilisateur est authentifié
    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: 'Utilisateur non authentifié' });
    }

    // Trouvez l'utilisateur dans la base de données
    const user = await userModel.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }

    // Vérifiez si l'utilisateur est un administrateur
    if (user.role !== 'admin') {
      return res.status(403).json({ message: 'Accès refusé. Vous devez être un administrateur.' });
    }

    // Si tout est OK, passez au middleware suivant
    next();
  } catch (error) {
    console.error('Erreur lors de la vérification du rôle:', error);
    res.status(500).json({ message: 'Erreur interne du serveur.' });
  }
};

module.exports = isAdmin;
