import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { accountService } from '../../_services/account.service';
import { Mail, Lock, Shirt } from 'lucide-react';
import './Login.css'
const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email('Email invalide')
    .required('Email requis'),
  password: Yup.string()
    .min(6, 'Le mot de passe doit comporter au moins 6 caractères')
    .required('Mot de passe requis')
});

const Login = () => {
  const navigate = useNavigate();

  const handleSubmit = async (values, { setSubmitting, setErrors }) => {
    try {
      await accountService.login(values);
      console.log('Connecté avec succès');
      
      const role = accountService.getUserRole();
      console.log('Rôle décodé:', role);
      if (role === 'admin') {
        navigate('/home');
      } else {
        navigate('/home');
      }
    } catch (error) {
      setErrors({ submit: 'Erreur lors de la connexion. Veuillez vérifier vos identifiants.' });
      console.error('Erreur lors de la connexion:', error);
    }
    setSubmitting(false);
  };

  return (
    <div className="login-container">
      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={LoginSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, errors }) => (
          <Form className="login-form">
            <h2 className="login-title">Connexion à votre compte de blanchisserie en ligne</h2>
            
            <div className="form-group">
              <label className="login-label" htmlFor="email">Email</label>
              <div className="input-icon-wrapper">
                <Mail className="input-icon" size={18} />
                <Field
                  type="email"
                  name="email"
                  id="email"
                  placeholder="votre@email.com"
                  className="login-input-field"
                />
              </div>
              <ErrorMessage name="email" component="div" className="login-error" />
            </div>

            <div className="form-group">
              <label className="login-label" htmlFor="password">Mot de passe</label>
              <div className="input-icon-wrapper">
                <Lock className="input-icon" size={18} />
                <Field
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Votre mot de passe"
                  className="login-input-field"
                />
              </div>
              <ErrorMessage name="password" component="div" className="login-error" />
            </div>

            {errors.submit && <div className="login-error">{errors.submit}</div>}

            <div className="login-actions">
              <button type="submit" className="login-button" disabled={isSubmitting}>
                <Shirt className="button-icon" size={18} />
                {isSubmitting ? 'Connexion...' : 'Se connecter et commencer à laver'}
              </button>
              <p className="login-signup-text">
                Pas encore de compte de blanchisserie en ligne ?{' '}
                <Link to="/signupform" className="login-signup-link">Inscrivez-vous ici</Link>
              </p>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Login;