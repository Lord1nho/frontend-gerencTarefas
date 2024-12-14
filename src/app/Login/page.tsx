"use client";
import axios from "axios";
import styles from "./Login.module.css";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import FormBox from "@/components/Formbox/FormBox";


const Login = () => {

    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    
      // Função para lidar com o envio do formulário
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault(); // Previne o comportamento padrão de recarregar a páginaj
    
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
        const userId = response.data.user.id
        console.log(response);
        router.push('/HomeScreen')
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
        localStorage.setItem('userId', userId);
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
            <FormBox handleSubmit={handleSubmit} formType="login" />;
        </main>
    );
}

export default Login;