import { useState } from "react"

export default function App(){

  const [newItem, setNewItem] = useState("");
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState('all'); 

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

  function deleteTodo(id){
    setTodos(currentTodos => {
      return currentTodos.filter(todo => {
        if(todo.id !== id){
          return {...todo}
        }
      })
    })
  }

  function displayActiveTodos(){
    setFilter('active'); 
  }

  function displayCompleteTodos(){
    setFilter('completed'); 
  }

  function allTodo(){
    setFilter('all'); 
  }

  function clearCompleteTodo(){
    setTodos(todos.filter(todo => !todo.completed));
  }

  function getVisibleTodos() {
    if (filter === 'active') {
      return todos.filter(todo => !todo.completed);
    } else if (filter === 'completed') {
      return todos.filter(todo => todo.completed);
    } else if(filter === 'none'){
      clearCompleteTodo();
    }else{
      return todos;
    }
  }

  const visibleTodos = getVisibleTodos();

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
          {visibleTodos.map((todo) => {
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
                  <button onClick={() => deleteTodo(todo.id)}>Delete</button>
                </li>
                )
            })}
        </ul>

        <div>
          <p><span>{todos.length} </span>items left</p>
            <div>
              <button onClick={allTodo}>All</button>
              <button onClick={displayActiveTodos}>Active</button>
              <button onClick={displayCompleteTodos}>Completed</button>
            </div>
            <button onClick={clearCompleteTodo}>Clear Completed</button>
        </div>
      </section>
    </main>

    <footer>
      <div>Drag and drop to reorder list</div>
    </footer>
    
    </>
  )
}