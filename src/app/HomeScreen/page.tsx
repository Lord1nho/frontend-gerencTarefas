"use client";

import Link from "next/link";
import stylesGeneral from "../Login/Login.module.css";
import styles from "./HomeScreen.module.css"
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

const ManageScreen = () => {
  const router = useRouter();
  const [refreshToken, setAccessToken] = useState("");
  const [task, settask] = useState("");
  const [description, setdescription] = useState("");

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
    else {
      alert('Você Precisa estar logado para Acessar aos Nossos serviços :/')
      router.push("/Login");
    }
  }, []);

  const logout = () => {
    localStorage.clear();
    router.push("/Login");
  };


  const createTask = (event: React.FormEvent) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const taskInput = form.task as HTMLInputElement;
    const descriptiontaskInput = form.description_task as HTMLInputElement;

    settask(taskInput.value);
    setdescription(descriptiontaskInput.value);

    localStorage.setItem('task', task);
    localStorage.setItem('description', description);
  }


  return (
    <main>
      <nav className={stylesGeneral.menu}>
        <div>
          <h2>Gerenciador de tarefas</h2>
        </div>
        <div className={stylesGeneral.menu_options}>
          <Link href="#">name</Link>
          <a href="#" onClick={logout}>
            Logout
          </a>
        </div>
      </nav>
      <section className={styles.todolist_container}>
      <div className={styles.todolist_content}>
      <h2>Tarefas</h2>
              <form className={styles.todolist_input} onSubmit={createTask}>
              <input type="text" id="task" name="task" placeholder="Digite a Tarefa" required />
                <input type="text" id="description_task" name="description_task" placeholder="Descrição" />
                <div className={styles.todoList_button}>
                <button type="submit">+</button>
                </div>
              </form >
      </div>
      </section>
    </main>
  );
};

export default ManageScreen;