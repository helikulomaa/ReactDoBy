import axios from "axios";

const baseurl = "https://localhost:7110/api/Tasks"; 

const getAll = () => {
    const request = axios.get(baseurl)
    return request.then(response => response.data)
}

const create = newTask => {
    return axios.post(baseurl, newTask)
}

const remove = id => {
    return axios.delete(`${baseurl}/${id}`)
}

const update = (object) => {
    return axios.put(`${baseurl}/${object.TaskId}`, object)
}

export default { getAll, create, remove, update }