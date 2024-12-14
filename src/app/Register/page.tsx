"use client";

import Link from "next/link";
import styles from "../Login/Login.module.css";
import { useReducer, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import FormBox from "../../components/Formbox/FormBox";

const Register = () => {
    
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

    axios.post('http://localhost:3001/user', {
        email: emailInput.value,
        password: passwordInput.value
      })
      .then(function (response) {
        console.log(response);
        alert('Conta Criada com sucesso. Realize o Login agora <3.')
        router.push('/Login');
      })
      .catch(function (error) {
        console.error(error);
      });
  }

    return (
        
        <main>
            <nav className={styles.menu}>
                <div><h2>Gerenciador de tarefas</h2></div>
                <div className={styles.menu_options}>
                <Link href="/Login">Login</Link>
                <Link href="#">Registrar</Link>
                </div>
            </nav>
            <FormBox handleSubmit={handleSubmit} formType="register" />;
        </main>
    );
}

export default Register;