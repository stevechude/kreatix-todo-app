import React, { useEffect, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { ColorRing } from "react-loader-spinner";
import Todo from "./components/Todo";
import { db } from "./firebase";
import {
  query,
  collection,
  onSnapshot,
  updateDoc,
  doc,
  addDoc,
  deleteDoc,
} from "firebase/firestore";

const style = {
  bg: `h-screen w-screen p-4 bg-gradient-to-r from-[#2f80ed] to-[#1cb5e0]`,
  container: `bg-slate-100 max-w-[500px] w-full m-auto rounded-md shadow-xl p-4`,
  heading: `text-3xl font-bold text-center text-gray-800 p-2`,
  form: `flex justify-between`,
  input: `border p-2 w-5/12 text-xl`,
  button: `border p-2 ml-2 bg-green-500 text-slate-100`,
  count: `text-center p-2`,
};

function App() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");

  // LOADER
  const [isLoading, setIsLoading] = useState(false);
  const [isPlusLoading, setIsPlusLoading] = useState(false);

  // Create todo
  const createTodo = async (e) => {
    e.preventDefault();
    if (title === "") {
      alert("Please enter a title for your todo!");
      return;
    }

    if (desc === "") {
      alert("Please enter a description of your todo!");
      return;
    }
    setIsPlusLoading(true);

    await addDoc(collection(db, "todo-app"), {
      title: title,
      description: desc,
      completed: false,
    });
    setIsPlusLoading(false);
    setTitle("");
    setDesc("");
  };

  // Read todo from firebase
  useEffect(() => {
    const que = query(collection(db, "todo-app"));
    setIsLoading(true);
    const unsubscribe = onSnapshot(que, (querySnapshot) => {
      let todosArray = [];
      
      querySnapshot.forEach((document) => {
        todosArray.push({ ...document.data(), id: document.id });
        setIsLoading(false);
      });
      setTodos(todosArray);
    });
    return () => unsubscribe();
  }, []);

  // Update todo in firebase
  const toggleComplete = async (todo) => {
    await updateDoc(doc(db, "todo-app", todo.id), {
      completed: !todo.completed,
    });
  };

  // Delete todo
  const deleteTodo = async (id) => {
    await deleteDoc(doc(db, "todo-app", id));
  };

  return (
    <div className={style.bg}>
      <div className={style.container}>
        <h3 className={style.heading}>Kreatix Todo App</h3>
        <form onSubmit={createTodo} className={style.form}>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={style.input}
            type="text"
            placeholder="Title"
          />
          <div />
          <input
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            className={style.input}
            type="text"
            placeholder="Description"
          />
          {isPlusLoading ? (
            <ColorRing
              visible={true}
              height="40"
              width="40"
              ariaLabel="blocks-loading"
              wrapperStyle={{ marginLeft: "1rem" }}
              wrapperClass="blocks-wrapper"
              colors={["#29C5F6", "#29C5F6", "#29C5F6", "#29C5F6", "#29C5F6"]}
            />
          ) : (
            <button className={style.button}>
              <AiOutlinePlus size={30} />
            </button>
          )}
        </form>
        {isLoading ? (
          <ColorRing
            visible={true}
            height="80"
            width="80"
            ariaLabel="blocks-loading"
            wrapperStyle={{ marginLeft: "11rem" }}
            wrapperClass="blocks-wrapper"
            colors={["#29C5F6", "#29C5F6", "#29C5F6", "#29C5F6", "#29C5F6"]}
          />
        ) : (
          <ul>
            {todos.map((todo, index) => (
              <Todo
                key={index}
                todo={todo}
                toggleComplete={toggleComplete}
                deleteTodo={deleteTodo}
              />
            ))}
          </ul>
        )}

        {todos.length < 1 ? null : (
          <p className={style.count}>{`You have ${todos.length} todos`}</p>
        )}
      </div>
    </div>
  );
}

export default App;
