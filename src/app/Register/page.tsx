"use client";

import Link from "next/link";
import styles from "../Login/Login.module.css";

const Register = () => {
    return (
        <main>
            <nav className={styles.menu}>
                <div><h2>Gerenciador de tarefas</h2></div>
                <div className={styles.menu_options}>
                <Link href="/Login">Login</Link>
                <Link href="#">Registrar</Link>
                </div>
            </nav>
            <section className = {styles.login_container}>
                <form className={styles.login_form}>
                <h2>Registrar</h2>
                
                <label htmlFor="email">Email</label>
                <input type="email" id="email" name="email" placeholder="Digite seu email" required />
                
                <label htmlFor="password">Senha</label>
                <input type="password" id="password" name="password" placeholder="Digite sua senha" required />
                
                <button type="submit">Entrar</button>
                
                </form>
        </section>
        </main>
    );
}

export default Register;