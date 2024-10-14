// services/user-service/routes/appointmentRoutes.js
const express = require('express');
const Appointment = require('../model/appointment');
const isAuthenticated = require ('../middleware/auth')
const router = express.Router();

// Créer un rendez-vous
router.post('/create-appointment',isAuthenticated, async (req, res) => {
  const { userId, date, status } = req.body;

  try {
      const appointment = new Appointment({
          userId,
          date,
          status
      });
      await appointment.save();
      res.status(201).json({ message: 'Rendez-vous créé avec succès', appointment });
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erreur lors de la création du rendez-vous' });
  }
});

router.get('/appointments', isAuthenticated, async (req, res) => {
  try {
    console.log('Récupération des rendez-vous pour l\'utilisateur:', req.user.id); // Log l'utilisateur
    const appointments = await Appointment.find().populate('userId', 'firstName lastName');
    console.log('Rendez-vous récupérés:', appointments);
    res.status(200).json(appointments);
  } catch (error) {
    console.error('Erreur lors de la récupération des rendez-vous:', error);
    res.status(500).json({ message: 'Erreur lors de la récupération des rendez-vous' });
  }
});



// Mettre à jour un rendez-vous
router.put('/appointments/:id',isAuthenticated, async (req, res) => {
  try {
    const { id } = req.params;
    const { date, status } = req.body; // Inclure le champ status

    const appointment = await Appointment.findById(id);
    if (!appointment) {
      return res.status(404).json({ message: 'Rendez-vous non trouvé' });
    }

    // Met à jour la date et le statut
    if (date) appointment.date = date; // Mettre à jour seulement si une nouvelle date est fournie
    if (status) appointment.status = status; // Mettre à jour seulement si un nouveau statut est fourni

    await appointment.save();

    res.status(200).json(appointment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur lors de la mise à jour du rendez-vous' });
  }
});

// Supprimer un rendez-vous
router.delete('/appointments/:id', isAuthenticated, async (req, res) => {
  try {
    const { id } = req.params;

    const appointment = await Appointment.findById(id);
    if (!appointment) {
      return res.status(404).json({ message: 'Rendez-vous non trouvé' });
    }

    await appointment.remove();
    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur lors de la suppression du rendez-vous' });
  }
});

// Route pour obtenir les rendez-vous d'un utilisateur spécifique
router.get('/appointment/:userId', isAuthenticated, async (req, res) => {
  try {
    const { userId } = req.params;
    const appointments = await Appointment.find({ userId }).populate('userId', 'email');
    res.status(200).json(appointments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur lors de la récupération des rendez-vous de l\'utilisateur' });
  }
});

module.exports = router;
