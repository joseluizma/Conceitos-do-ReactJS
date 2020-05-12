import React, { useState , useEffect } from "react";
import api from './services/api';

import "./styles.css";

function App() {
  const [repositorys, setRepositorys] = useState([]);

  useEffect(()=> {
    api.get('/repositories').then(response => {
      setRepositorys(response.data); 
    });
  }, []);

  async function handleAddRepository() {

    const response = await api.post('repositories', {
      "title": `Repositório ${Date.now()}`,
      "url": "https://github.com/joseluizma/Conceitos-do-ReactJS",
      "techns": ["Node.js", "..."],
    });

    const repository = response.data;

    setRepositorys([...repositorys,repository]);
  }

  async function handleRemoveRepository(id) {

     await api.delete('/repositories/'+id);

    const repositorysFilter = repositorys.filter(repository => repository.id !== id);

    setRepositorys([...repositorysFilter]);

  }

  return (
    <div>
      <ul data-testid="repository-list">
          {repositorys.map(repository => 
          <li key={repository.id}>{repository.title}<button onClick={() => handleRemoveRepository(repository.id)}>Remover</button></li>
          )}

          
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
