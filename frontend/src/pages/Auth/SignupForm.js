import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { accountService } from "../../_services/account.service";
import { Shirt, Lock, Mail } from 'lucide-react';
import './SignupForm.css'
const SignUpSchema = Yup.object().shape({
  email: Yup.string()
    .email('Email invalide')
    .required('Email requis'),
  password: Yup.string()
    .min(8, 'Le mot de passe doit comporter au moins 8 caractères')
    .required('Mot de passe requis'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Les mots de passe doivent correspondre')
    .required('Confirmation du mot de passe requise')
});

const SignInForm = () => {
  const navigate = useNavigate();

  const handleSubmit = async (values, { setSubmitting, setErrors }) => {
    try {
      const response = await accountService.register(values);
      console.log('Utilisateur enregistré avec succès:', response.data);
      navigate('/login');
    } catch (error) {
      setErrors({ submit: error.message });
      console.error('Erreur lors de l\'inscription:', error);
    }
    setSubmitting(false);
  };

  return (
    <div className="form-container-signup">
      <h2 className="form-title">Inscrivez-vous et commencez à laver en ligne</h2>
      <Formik
        initialValues={{
          email: '',
          password: '',
          confirmPassword: ''
        }}
        validationSchema={SignUpSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, errors }) => (
          <Form>
            <div className="form-group">
              <label className="form-label" htmlFor="email">Email</label>
              <div className="input-icon-wrapper">
                <Mail className="input-icon" size={18} />
                <Field
                  className="form-input"
                  name="email"
                  placeholder="votre@email.com"
                  type="email"
                />
              </div>
              <ErrorMessage name="email" component="div" className="form-error" />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="password">Mot de passe</label>
              <div className="input-icon-wrapper">
                <Lock className="input-icon" size={18} />
                <Field
                  className="form-input"
                  name="password"
                  placeholder="Votre mot de passe sécurisé"
                  type="password"
                />
              </div>
              <ErrorMessage name="password" component="div" className="form-error" />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="confirmPassword">Confirmer le mot de passe</label>
              <div className="input-icon-wrapper">
                <Lock className="input-icon" size={18} />
                <Field
                  className="form-input"
                  name="confirmPassword"
                  placeholder="Confirmez votre mot de passe"
                  type="password"
                />
              </div>
              <ErrorMessage name="confirmPassword" component="div" className="form-error" />
            </div>

            {errors.submit && <div className="form-error">{errors.submit}</div>}

            <div className="signin-actions">
              <button className="signin-button" type="submit" disabled={isSubmitting}>
                <Shirt className="button-icon" size={18} />
                {isSubmitting ? 'Inscription...' : "S'inscrire et commencer à laver"}
              </button>
              <p className="signin-signup-text">
                Déjà un compte de blanchisserie en ligne ?{' '}
                <Link to="/login" className="login-signup-link">Connectez-vous ici</Link>
              </p>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default SignInForm;