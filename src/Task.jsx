import './App.css'
import React, {useState} from 'react'
import TaskService from './services/Task'

const Task = ({task, editTask, setIsPositive, setShowMessage, setMessage, reload, reloadNow}) => {

const [showInfo, setShowInfo] = useState(false)

const deleteTask = (task) => {
  // kysytään vahvistus poistoon:
let vastaus = window.confirm(`Remove Task ${task.taskName}`)
if (vastaus === true) {
  TaskService.remove(task.taskId)
  .then(res => {
      if (res.status === 200) {
      setMessage(`Successfully removed task ${task.taskName}`)
      setIsPositive(true)
      setShowMessage(true)
      window.scrollBy(0, -10000) // Scrollataan ylös jotta nähdään alert

      // Ilmoituksen piilotus
      setTimeout(() => {
      setShowMessage(false)},
      5000
      )
      reloadNow(!reload)
      }
      
      })
      
      .catch(error => {
          setMessage(error)
          setIsPositive(false)
          setShowMessage(true)
          window.scrollBy(0, -10000) // Scrollataan ylös jotta nähdään alert
  
          setTimeout(() => {
            setShowMessage(false)
           }, 6000)
        })

  } // Jos poisto halutaankin perua
  else {
  setMessage('Poisto peruttu onnistuneesti.')
      setIsPositive(true)
      setShowMessage(true)
      window.scrollBy(0, -10000) // Scrollataan ylös jotta nähdään alert

      // Ilmoituksen piilotus
      setTimeout(() => {
      setShowMessage(false)},
      5000
      )
  }
}

  return (
    <div className='taskDiv'>
        <h4 onClick={() => setShowInfo(!showInfo)}>{task.taskName}</h4>

        {showInfo && <div className='info'>{task.info}, {task.categoryId}
        <button onClick={() => deleteTask(task)}>Poista tehtävä</button>
        <button onClick={() => editTask(task)}>Muokkaa tehtävää</button>
        </div>}
    </div>
    )
}
    
export default Task