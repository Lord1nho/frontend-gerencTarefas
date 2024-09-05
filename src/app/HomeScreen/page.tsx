"use client";

import Link from "next/link";
import styles from "../Login/Login.module.css";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

const ManageScreen = () => {
  const router = useRouter();
  const [refreshToken, setAccessToken] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("refreshToken") || "";
    setAccessToken(token);

    // Fazer a requisição apenas se o token existir
    if (token) {
      axios
      .post("http://localhost:3001/refreshToken", {
        refreshToken: token // Coloque o token diretamente aqui
      })
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.error(error);
        alert('Sua sessão Encerrou. Entre novamente para usufruir dos serviços <3')
        logout();
      });
    }
  }, []);

  const logout = () => {
    localStorage.clear();
    router.push("/Login");
  };

  return (
    <main>
      <nav className={styles.menu}>
        <div>
          <h2>Gerenciador de tarefas</h2>
        </div>
        <div className={styles.menu_options}>
          <Link href="#">name</Link>
          <a href="#" onClick={logout}>
            Logout
          </a>
        </div>
      </nav>
      <section className={styles.login_container}>
        <h2>Tarefas</h2>
        <div className=""></div>
      </section>
    </main>
  );
};

export default ManageScreen;