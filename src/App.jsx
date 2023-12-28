import { useState } from "react"

export default function App(){

  const [newItem, setNewItem] = useState("");
  const [todos, setTodos] = useState([]);

  function handleSubmit(e){
    e.preventDefault();
    
    
    setTodos(currentTodos => {
      return [
        ...currentTodos,
        {id: crypto.randomUUID(), title: newItem, completed:false}
      ]
    })
    
    setNewItem("");
    
  }

  function toggleTodo(id, completed){
    setTodos(currentTodos => {
      return currentTodos.map(todo => {
        if(todo.id === id){
          return { ...todo, completed}
        }
        return todo
      })
    })
  }

  function deleteTodos(){
    setTodos(currentTodos => {
      return currentTodos.filter(todo =>{
        if(todo.completed === false){
          return {...todo}
        }
      })
    });
  }

  console.log(todos)

  return(
    <>

    <header>
      <h1>Todo</h1>
      <img src="#" alt="" />
    </header>

    <main>

      <form onSubmit={handleSubmit}>
        <input 
          value={newItem} 
          onChange={(e) => setNewItem(e.target.value)}
          type="text" 
        />
      </form>

      <section>
        {todos.length === 0 && <h2>No todos today 😘</h2>}
        <ul>
          {todos.map((todo) => {
            return (
                <li key={todo.id}>
                  <label>
                    <input 
                      type="checkbox" 
                      checked={todo.completed} 
                      onChange={e => toggleTodo(todo.id, e.target.checked)}
                    />
                    {todo.title}
                  </label>
                </li>
                )
            })}
        </ul>

        <div>
          <p><span>{todos.length} </span>items left</p>
            <div>
              <p>All</p>
              <p>Active</p>
              <p>Completed</p>
            </div>
            <button onClick={deleteTodos}>Clear Completed</button>
        </div>
      </section>
    </main>

    <footer>
      <div>Drag and drop to reorder list</div>
    </footer>
    
    </>
  )
}