import React, { useState, useEffect } from "react";
import api from './services/api';

import "./styles.css";

function App() {

  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositories(response.data)
    });
  }, []);

  async function handleAddRepository() {
    let novoRepositorio = {
      title: `Back-end com Python ${Date.now()}`,
      url: `http://www.git.com/repo02 ${Date.now()}`,
      techs: ["Python", "Django"],
      likes: 0
    }
    const response = await api.post('repositories', novoRepositorio);
    setRepositories([...repositories, response.data]);
  }

  async function handleRemoveRepository(id) {
    const response = await api.delete('repositories/' + id);
    if(response.status === 204)
    {
      const repositorieIndex = repositories.findIndex(repositorie => repositorie.id === id);
      repositories.splice(repositorieIndex, 1);
      setRepositories([...repositories]);
    }
    console.log(response);
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => <li key={repository.id}>
            {repository.title}
              <button onClick={() => handleRemoveRepository(repository.id)}>
                Remover
              </button>
            </li>)}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
