import axios from "axios";

const baseUrl = "http://localhost:3001/api/persons";

const getAll = () => {
  return axios.get(baseUrl).then((res) => res.data);
};

const create = (person) => {
  return axios.post(baseUrl, person).then((res) => res.data);
};

const deletePerson = (id) => {
  return axios.delete(`${baseUrl}/${id}`).then((res) => res.data);
};

const update = (person) => {
  return axios.put(`${baseUrl}/${person.id}`, person).then((res) => res.data);
};

export default { getAll, create, deletePerson, update };
