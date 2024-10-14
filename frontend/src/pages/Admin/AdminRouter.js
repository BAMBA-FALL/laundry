import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AuthGuard from '../../_helpers/AuthGuard'; // Assurez-vous que le chemin est correct
import  AdminLayout from '../Admin/AdminLayout';
import Error from '../../_Utiles/Error';


const AdminRouter = () => {
    return (
        <div className='grid-container'>
            <Routes>
                <Route element={<AuthGuard requiredRole="admin"><AdminLayout /></AuthGuard>}>
                    <Route path='*' element={<Error />} />
                </Route>
            </Routes>
        </div>
    );
};

export default AdminRouter;
