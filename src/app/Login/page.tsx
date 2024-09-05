"use client";
import axios from "axios";
import styles from "./Login.module.css";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";


const Login = () => {

    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    
      // Função para lidar com o envio do formulário
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault(); // Previne o comportamento padrão de recarregar a página
    
    // Captura os valores diretamente dos inputs no momento do submit
    const form = event.target as HTMLFormElement;
    const emailInput = form.email as HTMLInputElement;
    const passwordInput = form.password as HTMLInputElement;

    setEmail(emailInput.value);
    setPassword(passwordInput.value);

    console.log("Email:", emailInput.value);
    console.log("Senha:", passwordInput.value);

    axios.post('http://localhost:3001/login', {
        email: emailInput.value,
        password: passwordInput.value
      })
      .then(function (response) {
        const accessToken = response.data.accessToken
        const refreshToken = response.data.refreshToken
        console.log(response);
        router.push('/HomeScreen')
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
      })
      .catch(function (error) {
        alert('E-mail ou Senha incorretos')
        console.error(error);
        emailInput.value = '';
        passwordInput.value = '';
      });
  };

    return ( 
        <main>
            <nav className={styles.menu}>
                <div><h2>Gerenciador de tarefas</h2></div>
                <div className={styles.menu_options}>
                    <Link href="#">Login</Link>
                    <Link href="/Register">Registrar</Link>
                </div>
            </nav>
            <section className = {styles.login_container}>
                <form className={styles.login_form} onSubmit={handleSubmit}>
                <h2>Login</h2>
                
                <label htmlFor="email">Email</label>
                <input type="email" id="email" name="email" placeholder="Digite seu email" required />
                
                <label htmlFor="password">Senha</label>
                <input type="password" id="password" name="password" placeholder="Digite sua senha" required />
                
                <button type="submit">Entrar</button>
                
                <a href="" className={styles.forgot_password}>Esqueceu sua senha?</a>
                </form>
        </section>
        </main>
    );
}

export default Login;