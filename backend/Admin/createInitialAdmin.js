const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const connectDB = require('../config/conn');
const userModel = require('../model/userModel'); 
require('dotenv').config(); 

const createAdmin = async () => {
    try {
        await connectDB();

        const adminExists = await userModel.findOne({ role: 'admin' });
        if (adminExists) {
            console.log('Un utilisateur admin existe déjà.');
            return;
        }
        const password = process.env.ADMIN_PASSWORD;
        const hashedPassword = await bcrypt.hash(password, 10);

        const admin = new userModel({
            username: 'adminUser',
            name: 'Admin',
            email: 'admin@example.com',
            password: hashedPassword,
            role: 'admin'
        });

        await admin.save();
        console.log('Utilisateur admin créé avec succès.');
    } catch (error) {
        console.error('Erreur lors de la création de l\'admin:', error);
    } finally {
        mongoose.connection.close();
    }
};

createAdmin();
