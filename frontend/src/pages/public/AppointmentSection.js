import React, { useState, useEffect } from 'react';
import { DatePicker, TimePicker, Button, message } from 'antd';
import { useAppointment } from './context/AppointmentContext';
import moment from 'moment'; 
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import './Appointment.css';

const AppointmentSection = () => {
    const { bookAppointment, cancelAppointment, updateUserAppointment, fetchUserAppointments, loading, error } = useAppointment();
    const [date, setDate] = useState(null);
    const [time, setTime] = useState(null);
    const [confirmed, setConfirmed] = useState(false);
    const [currentAppointment, setCurrentAppointment] = useState(null);
    const [appointments, setAppointments] = useState([]);

    const userId = localStorage.getItem('userId');

    useEffect(() => {
        const fetchAppointments = async () => {
            if (userId) {
                try {
                    const fetchedAppointments = await fetchUserAppointments(userId);
                    if (Array.isArray(fetchedAppointments) && JSON.stringify(fetchedAppointments) !== JSON.stringify(appointments)) {
                        setAppointments(fetchedAppointments);
                    }
                } catch (error) {
                    console.error('Erreur lors de la récupération des rendez-vous:', error);
                }
            } else {
                console.error("Aucun ID d'utilisateur trouvé.");
            }
        };
        fetchAppointments();
    }, [userId]);

    useEffect(() => {
        if (appointments && appointments.length > 0) {
            const latestAppointment = appointments[appointments.length - 1];
            setDate(moment(latestAppointment.date));
            setTime(moment(latestAppointment.date));
            setConfirmed(true);
            setCurrentAppointment(latestAppointment);
        }
    }, [appointments]);

    const handleAppointment = async () => {
        if (date && time) {
            const selectedDateTime = moment(date).set({
                hour: time.hour(),
                minute: time.minute(),
            });

            try {
                await bookAppointment(userId, selectedDateTime.format('YYYY-MM-DD HH:mm'));
                setConfirmed(true);
                message.success('Rendez-vous confirmé avec succès !');
            } catch (err) {
                message.error('Erreur lors de la prise de rendez-vous. Veuillez réessayer.');
            }
        } else {
            message.warning('Veuillez sélectionner une date et une heure.');
        }
    };

    const handleEditAppointment = async () => {
        if (currentAppointment) {
            const updatedDateTime = moment(date).set({
                hour: time.hour(),
                minute: time.minute(),
            });

            try {
                await updateUserAppointment(currentAppointment.id, { date: updatedDateTime.format('YYYY-MM-DD HH:mm') });
                message.success('Rendez-vous mis à jour avec succès !');
            } catch (err) {
                message.error('Erreur lors de la mise à jour du rendez-vous. Veuillez réessayer.');
            }
        }
    };

    const handleDeleteAppointment = async () => {
        if (currentAppointment && window.confirm('Êtes-vous sûr de vouloir annuler votre rendez-vous ?')) {
            try {
                await cancelAppointment(currentAppointment.id);
                setDate(null);
                setTime(null);
                setConfirmed(false);
                setCurrentAppointment(null);
                message.success('Votre rendez-vous a été annulé.');
            } catch (err) {
                message.error('Erreur lors de l\'annulation du rendez-vous. Veuillez réessayer.');
            }
        }
    };

    if (loading) return <div>Chargement...</div>;
    if (error) return <div>Erreur: {error}</div>;

    return (
        <div className="appointment-section">
            {!confirmed ? (
                <>
                    <h2>Prendre un Rendez-vous</h2>
                    <DotLottieReact
                        autoplay
                        loop
                        src="/assets/status/rendez_vous.lottie"
                        style={{ height: '200px', width: '200px', marginBottom: '20px' }}
                    />
                    <DatePicker
                        style={{ marginBottom: '10px', width: '100%' }}
                        onChange={(date) => setDate(date)}
                        placeholder="Sélectionner une date"
                        disabledDate={(current) => current && current < moment().endOf('day')}
                    />
                    <TimePicker
                        style={{ marginBottom: '10px', width: '100%' }}
                        onChange={(time) => setTime(time)}
                        placeholder="Sélectionner une heure"
                        format="HH:mm"
                        minuteStep={30}
                        disabledHours={() => {
                            const hoursToDisable = [];
                            for (let i = 0; i < 24; i++) {
                                if (i < 9 || i > 20) {
                                    hoursToDisable.push(i);
                                }
                            }
                            return hoursToDisable;
                        }}
                        hideDisabledOptions
                    />
                    <Button
                        type="primary"
                        onClick={handleAppointment}
                        style={{ marginTop: '20px' }}
                    >
                        Confirmer le Rendez-vous
                    </Button>
                </>
            ) : (
                <div className="appointment-confirmation">
                    <h2>Rendez-vous confirmé !</h2>
                    <p>
                        Votre rendez-vous est prévu pour le {moment(date).format('LL')} à{' '}
                        {moment(time).format('HH:mm')}.
                    </p>
                    <p>Nous vous remercions pour votre confiance.</p>
                    <div className="appointment-actions">
                        <Button type="primary" onClick={handleEditAppointment}>
                            Modifier le rendez-vous
                        </Button>
                        <Button
                            type="danger"
                            onClick={handleDeleteAppointment}
                            style={{ marginLeft: '10px' }}
                        >
                            Annuler le rendez-vous
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AppointmentSection;
