// FrontEnd/src/context/UserContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext();

export function UserProvider({ children }) {
  // 1. Iniciamos o estado ignorando o localStorage totalmente
  const [perfil, setPerfil] = useState({
    nome: 'Antônio',
    papel: 'Paciente',
  });

  // 2. Sobrescrevemos o cache do navegador à força sempre que o app carregar
  useEffect(() => {
    localStorage.setItem('iris_perfil', JSON.stringify(perfil));
  }, [perfil]);

  const atualizarPerfil = (novosDados) => {
    setPerfil((prev) => ({ ...prev, ...novosDados }));
  };

  return (
    <UserContext.Provider value={{ perfil, atualizarPerfil }}>
      {children}
    </UserContext.Provider>
  )
}

export const useUser = () => useContext(UserContext);