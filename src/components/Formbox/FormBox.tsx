import React from 'react';
import styles from  './Formbox.module.css'

type FormType = 'register' | 'login';

interface FormBoxProps {
    handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
    formType: FormType;
}




const FormBox:React.FC<FormBoxProps> = ({ handleSubmit, formType }) => {

    let title;

    if (formType === 'register') {
        title = 'Registrar';
    } else if (formType === 'login') {
        title = 'Login';
    }


    return (
        <section className = {styles.login_container}>
        <form className={styles.login_form} onSubmit={handleSubmit}>
        <h2>
            {title}
            </h2>
        
        <label htmlFor="email">Email</label>
        <input type="email" id="email" name="email" placeholder="Digite seu email" required />
        
        <label htmlFor="password">Senha</label>
        <input type="password" id="password" name="password" placeholder="Digite sua senha" required />
        {formType === 'login' && (
        <a href="#" className={styles.forgot_password}>
            Esqueceu sua senha?
        </a>
        )}

        <button type="submit">Entrar</button>
        </form>
        </section>  
    )
}

export default FormBox;