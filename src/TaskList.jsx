import './App.css'
import React, {useState, useEffect} from 'react'
import TaskService from './services/Task'
import Task from './Task'
import TaskAdd from './TaskAdd'
import TaskEdit from './TaskEdit'

const TaskList = ({setIsPositive, setShowMessage, setMessage}) => {

const [tasks, setTasks] = useState([])
const [showTasks, setShowTasks] = useState(false)
const [lisäystila, setLisäystila] = useState(false)
const [muokkaustila, setMuokkaustila] = useState(false)
const [reload, reloadNow] = useState(false)
const [muokattavaTask, setMuokattavaTask] = useState(false)
const [search, setSearch] = useState("")

useEffect(() => {
  
//   const token = localStorage.getItem('token')
//   TaskService.setToken(token)

  TaskService.getAll()
  .then(data => {
    setTasks(data)
})
},[]
)

// yllä olevien hakasulkujen sisältä: lisäystila, reload, muokkaustila, showTasks 

//Hakukentän onChange-tapahtumankäsittelijä
const handleSearchInputChange = (event) => {
  setShowTasks(true)
  setSearch(event.target.value.toLowerCase())
}

const editTask = (task) => {
  setMuokattavaTask(task)
  setMuokkaustila(true)
}

  return (
    <>
        <h2 onClick={() => setShowTasks(!showTasks)}>Tehtävät</h2>

        {!lisäystila && <button className="nappi" onClick={() => setLisäystila(true)}>Lisää uusi tehtävä</button>}
            
        {!lisäystila && !muokkaustila && <input placeholder='Hae tehtävää' value={search} onChange={handleSearchInputChange}></input>}
                
        {lisäystila && <TaskAdd setLisäystila={setLisäystila} 
        setIsPositive={setIsPositive} setMessage={setMessage} setShowMessage={setShowMessage}
        />}

        {muokkaustila && <TaskEdit setMuokkaustila={setMuokkaustila} 
        setIsPositive={setIsPositive} setMessage={setMessage} setShowMessage={setShowMessage}
        muokattavaTask={muokattavaTask}
        />}

        {!lisäystila && !muokkaustila && showTasks && tasks && tasks.map(t => 
        {
          const lowerCaseName = t.taskName.toLowerCase()
          if (lowerCaseName.indexOf(search) > -1) {
          return(
          <Task key={t.taskId} task={t} reloadNow={reloadNow} reload={reload}
          setIsPositive={setIsPositive} setMessage={setMessage} setShowMessage={setShowMessage}
          editTask={editTask}
          />
            )}}

              )
            }   
        </>
      )
    }
    
    export default TaskList