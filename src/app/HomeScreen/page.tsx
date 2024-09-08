"use client";

import Link from "next/link";
import stylesGeneral from "../Login/Login.module.css";
import styles from "./HomeScreen.module.css";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

interface Task {
  id: number,
  title: string;
  description: string,
  isDone: boolean
}

const ManageScreen = () => {
  const router = useRouter();
  const [refreshToken, setAccessToken] = useState("");
  const [tasks, setTasks] = useState<Task[]>([]); // Definindo o tipo das tarefas

  useEffect(() => {
    const token = localStorage.getItem("refreshToken") || "";
    setAccessToken(token);

    // Fazer a requisição apenas se o token existir
    if (token) {
      axios
        .post("http://localhost:3001/refreshToken", {
          refreshToken: token,
        })
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.error(error);
          alert(
            "Sua sessão Encerrou. Entre novamente para usufruir dos serviços <3"
          );
          logout();
        });
    } else {
      alert("Você Precisa estar logado para Acessar aos Nossos serviços :/");
      router.push("/Login");
    }
    getTasks();
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

    const taskValue = taskInput.value;
    const descriptionValue = descriptiontaskInput.value;

    const userId = localStorage.getItem("userId");

    axios
      .post(`http://localhost:3001/user/${userId}/createTask`, {
        title: taskValue,
        description: descriptionValue,
      })
      .then(function (response) {
        console.log(response);
        form.reset();
        getTasks(); // Atualiza a lista de tarefas após criar uma
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  useEffect(() => {
    getTasks();
  }, []);

  // Função para buscar tarefas
  const getTasks = () => {
    const userId = localStorage.getItem("userId");
    axios
      .get(`http://localhost:3001/user/${userId}/getTaskByUserId`)
      .then(function (response) {
        console.log(response.data);
        setTasks(response.data); // Armazena as tarefas no estado
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  const updateTaskStatus = (taskId: number, isDone: boolean) => {
    const userId = localStorage.getItem("userId");
  
    axios
      .patch(`http://localhost:3001/user/${userId}/${taskId}/updateTask`, {
        isDone
      })
      .then(response => {
        console.log(response.data);
        // Atualize o estado das tarefas localmente
        setTasks(prevTasks =>
          prevTasks.map(task =>
            task.id === taskId ? { ...task, isDone } : task
          )
        );
      })
      .catch(error => {
        console.error(error);
      });
  };

  const deleteTask = (taskId: number) => {
    const userId = localStorage.getItem("userId");
    const isConfirmed = window.confirm("Tem certeza de que deseja excluir esta tarefa?");
    if (isConfirmed){
      axios
      .delete(`http://localhost:3001/user/${userId}/${taskId}/deleteTask`)
      .then(response => {
        console.log(response.data);
        // Atualize a lista de tarefas após excluir
        setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
        alert('Tarefa Excluída com Sucesso!')
      })
      .catch(error => {
        console.error(error);
      });
    }
  };

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
          <h2>ToDoList</h2>
          <form className={styles.todolist_input} onSubmit={createTask}>
            <input
              type="text"
              id="task"
              name="task"
              placeholder="Digite a Tarefa"
              required
            />
            <input
              type="text"
              id="description_task"
              name="description_task"
              placeholder="Descrição"
            />
            <div className={styles.todoList_button}>
              <button type="submit">Adicionar Tarefa</button>
            </div>
          </form>
          <div className={styles.todoList_tasks}>
            <h2>Tarefas</h2>
            <section className={styles.tasks_section}>
              <ul>
                {(
                  tasks.map((task, index) => (
                    <li key={index}>
                      <div className={styles.task_unique}>
                        <div className={styles.task_info}>
                          <b>Tarefa: {task.title}</b>
                          <i>Descrição: {task.description}</i>
                        </div>
                        <input 
                         type="checkbox"
                         checked={task.isDone}
                         onChange={(e) => updateTaskStatus(task.id, e.target.checked)} />
                        <button type="button" onClick={() => deleteTask(task.id)}>
                          <img
                            src="/images/lixeira-de-reciclagem.png"
                            alt="Excluir tarefa"
                          />
                        </button>
                      </div>
                    </li>
                  ))
                )

                }
              </ul>
            </section>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ManageScreen;
