import './App.css'
import React, {useState} from 'react'
import TaskService from './services/Task'

const TaskAdd = (setLisäystila, setIsPositive, setShowMessage, setMessage) => {
  const [newTaskId, setNewTaskId] = useState('')
  const [newTaskName, setNewTaskName] = useState('')
  const [newDoByDate, setNewDoByDate] = useState('')
  const [newDone, setNewDone] = useState(false)
  const [newLink, setNewLink] = useState('')
  const [newInfo, setNewInfo] = useState('')
  const [newCategoryId, setNewCategoryId] = useState('')
  const [newUserId, setNewUserId] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    var newTask = {
      taskName: newTaskName,
      doByDate: newDoByDate,
      done: newDone,
      link: newLink,
      info: newInfo,
      categoryId: parseInt(newCategoryId),
      userId: parseInt(newUserId)
  }

  TaskService.create(newTask)
  .then(response => {
    if (response.status === 200) {
      alert("Lisätty tehtävä " + newTask.taskName)
     setMessage("Added Task: " + newTask.taskName)
     setIsPositive(true)
     setShowMessage(true)
    
     setTimeout(() => {
      setShowMessage(false)
     }, 5000)

     setLisäystila(false)
  }

    })
    .catch(error => {
      setMessage(error)
      setIsPositive(false)
      setShowMessage(true)

      setTimeout(() => {
        setShowMessage(false)
       }, 6000)
    })
  }

  return (
    <div id='addNew'>
      <h2>Lisää uusi tehtävä</h2>
      <form onSubmit={handleSubmit}>
            <div>
                <label>Tehtävä</label>
            </div>
                <div>
            <input type="text" value={newTaskName}
                    onChange={({ target }) => setNewTaskName(target.value)} required />
            </div>
            <div>
                <label>Tehtävä viimeistään</label>
            </div>
            <div>
                <input type="date" value={newDoByDate}
                    onChange={({ target }) => setNewDoByDate(target.value)} />
            </div>
            <div>
                <label>Lisätiedot</label>
            </div>
            <div>
                <input type="text" value={newInfo}
                    onChange={({ target }) => setNewInfo(target.value)} />
            </div>
            <div>
                <label>Mahdollinen linkki</label>
            </div>
            <div>
                <input type="text" value={newLink}
                    onChange={({ target }) => setNewLink(target.value)} />
            </div>
            <div>
                <label>Kurssikoodi</label>
            </div>
            <div>
                <input type="number" value={newCategoryId}
                    onChange={({ target }) => setNewCategoryId(target.value)} />
            </div>
            <div>
                <label>UserId</label>
            </div>
            <div>
                <input type="number" value={newUserId}
                    onChange={({ target }) => setNewUserId(target.value)} />
            </div>
         
         <input type='submit' value='save' />
         <input type='button' value='back' onClick={() => setLisäystila(false)} />
       </form>
    </div>
    )
}
    
export default TaskAdd