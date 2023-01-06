import './App.css'
import React, {useState} from 'react'
import TaskService from './services/Task'

const TaskEdit= ({setMuokkaustila, setIsPositive, setMessage, setShowMessage, muokattavaTask}) => {

  const [newTaskId, setNewTaskId] = useState(muokattavaTask.taskId)
  const [newTaskName, setNewTaskName] = useState(muokattavaTask.taskName)
  const [newDoByDate, setNewDoByDate] = useState(muokattavaTask.doByDate)
  const [newDone, setNewDone] = useState(muokattavaTask.done)
  const [newLink, setNewLink] = useState(muokattavaTask.link)
  const [newInfo, setNewInfo] = useState(muokattavaTask.info)
  const [newCategoryId, setNewCategoryId] = useState(muokattavaTask.categoryId)
  const [newUserId, setNewUserId] = useState(muokattavaTask.userId)

  const handleSubmit = (event) => {
    event.preventDefault()
    var newTask = {
      taskId: newTaskId,
      taskName: newTaskName,
      doByDate: newDoByDate,
      done: newDone,
      link: newLink,
      info: newInfo,
      categoryId: newCategoryId,
      userId: newUserId
  }

  TaskService.update(newTask)
  .then(response => {
    if (response.status === 200) {
     setMessage("Edited Task: " + newTask.taskName)
     setIsPositive(true)
     setShowMessage(true)
    
     setTimeout(() => {
      setShowMessage(false)
     }, 5000)

     setMuokkaustila(false)
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
    <div id="edit">
       <h2>Tehtävän muokkaus</h2>

       <form onSubmit={handleSubmit}>
            <div>
                <input type="text" value={newTaskId} disabled />
            </div>
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
            
         
         <input type='submit' value='save' />
         <input type='button' value='back' onClick={() => setMuokkaustila(false)} />
       </form>

    </div>
    )
}
    
export default TaskEdit