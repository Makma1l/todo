import { useState } from "react";

const init = [];

export default function App() {
  const [todos, setTodos] = useState(init);
  const [text, setText] = useState("");

  const deleteTodo = (id) => {
    const newTodos = todos.filter((t) => t.id !== id);
    setTodos(newTodos);
  };

  const toggleDone = (id) => {
    const newTodos = todos.map((t) => {
      if (t.id === id) {
        return { ...t, done: !t.done };
      }
      return t;
    });
    setTodos(newTodos);
  };

  const addNewTodo = () => {
    const newTodo = {
      id: Date.now(),
      title: text,
      done: false,
    };

    setTodos([...todos, newTodo]);
    setText(""); // Clear the input after adding a new task
  };

  return (
    <div className="flex flex-col items-center bg-gray-900 rounded-lg p-6 w-full min-h-screen text-white">
      <h1 className="text-3xl font-bold mb-4">Todo List</h1>
      <div className="flex flex-row justify-center items-center mb-4 w-full max-w-md">
        <input
          type="text"
          placeholder="Add a new task"
          value={text}
          onChange={(event) => setText(event.target.value)}
          className="border  border-gray-600 h-10 rounded-lg p-2 mr-2 "
        />
        <button
          id="insBtn"
          disabled={text === ""}
          onClick={addNewTodo}
          className="w-10 h-10 bg-purple-700 text-white rounded-lg flex items-center justify-center"
        >
          +
        </button>
      </div>

      <div className="w-full max-w-md">
        <p className="text-left mb-2 text-purple-400">
          Tasks to do - {todos.filter((t) => !t.done).length}
        </p>
        <ul className="flex flex-col gap-2 p-0 mb-4">
          {todos
            .filter((t) => !t.done)
            .map((t) => (
              <li
                key={t.id}
                className="bg-gray-800 list-none flex p-4 rounded-lg relative"
              >
                <span className="flex-grow">{t.title}</span>
                <button
                  id="doneBtn"
                  onClick={() => toggleDone(t.id)}
                  className="border-none rounded-lg h-8 absolute right-4 top-1/2 transform -translate-y-1/2 bg-purple-600 p-2 text-white"
                >
                  ✓
                </button>
                <button
                  id="delBtn"
                  onClick={() => deleteTodo(t.id)}
                  className="border-none rounded-lg absolute right-6 top-1/2 transform -translate-y-1/2 bg-purple-600 p-2 text-white"
                >
                  🗑️
                </button>
              </li>
            ))}
        </ul>

        <p className="text-left mb-2 text-purple-400">
          Done - {todos.filter((t) => t.done).length}
        </p>
        <ul className="flex flex-col gap-2 p-0">
          {todos
            .filter((t) => t.done)
            .map((t) => (
              <li
                key={t.id}
                className="bg-gray-800 list-none flex p-4 rounded-lg relative"
              >
                <span className="flex-grow line-through text-gray-500">
                  {t.title}
                </span>
                <button
                  id="doneBtn"
                  onClick={() => toggleDone(t.id)}
                  className="border-none rounded-lg h-8 absolute right-4 top-1/2 transform -translate-y-1/2 bg-purple-600 p-2 text-white"
                >
                  ↩
                </button>
                <button
                  id="delBtn"
                  onClick={() => deleteTodo(t.id)}
                  className="border-none rounded-lg absolute right-6 top-1/2 transform -translate-y-1/2 bg-purple-600 p-2 text-white"
                >
                  🗑️
                </button>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
}
