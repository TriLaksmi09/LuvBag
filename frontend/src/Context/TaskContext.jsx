
import { createContext, useState, useEffect } from "react";

export const TaskContext = createContext();

export function TaskProvider({ children }) {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    async function ambilTugas() {
      try {
        const token = localStorage.getItem("token");

        const response = await fetch(
          "http://127.0.0.1:8000/api/tasks",
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

        if (!response.ok) {
          throw new Error("Gagal mengambil data dari Laravel");
        }

        const hasil = await response.json();

        console.log("RESPONS LARAVEL:", hasil);

        const dataTugas = hasil.data.map((item) => ({
          id: item.id,
          matkul: item["Mata Kuliah"],
          judul: item["Judul"],
          keterangan: item["Keterangan"],
          tanggal: item["Tanggal"],
          jam: item["Jam"],
          prioritas: item["Prioritas"],
          status: item["Status"],
        }));

        setTasks(dataTugas);
        console.log("Data tugas dari Laravel:", dataTugas);
      } catch (error) {
        console.error("Gagal mengambil tugas:", error);
      }
    }

    ambilTugas();
  }, []);

  const selesaiTugas = (id) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, status: "Selesai" } : task
      )
    );
  };

  const editTugas = (id, dataBaru) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id
          ? { ...task, ...dataBaru, id: task.id }
          : task
      )
    );
  };

  const hapusTugas = (id) => {
    setTasks((prevTasks) =>
      prevTasks.filter((task) => task.id !== id)
    );
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        setTasks,
        selesaiTugas,
        editTugas,
        hapusTugas,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}
