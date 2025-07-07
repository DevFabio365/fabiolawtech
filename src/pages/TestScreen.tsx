import React, { useState } from "react";

const TestScreen: React.FC = () => {
  const [nome, setNome] = useState("");
  const [pokemon, setPokemon] = useState<any>(null);
  const [erro, setErro] = useState("");

  const buscarPokemon = async () => {
    try {
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${nome.toLowerCase()}`);
      if (!res.ok) throw new Error("Não encontrado");
      const data = await res.json();
      setPokemon(data);
      setErro("");
    } catch {
      setPokemon(null);
      setErro("Pokémon não encontrado");
    }
  };

  return (
    <div>
      <h1>Buscar Pokémon</h1>
      <input
        id="nome-input"
        placeholder="Digite o nome do Pokémon"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
      />
      <button id="buscar-btn" onClick={buscarPokemon}>Buscar</button>

      {erro && <p id="erro">{erro}</p>}
      {pokemon && (
        <div id="resultado">
          <p><strong>Nome:</strong> {pokemon.name}</p>
          <img src={pokemon.sprites.front_default} alt="Sprite" />
        </div>
      )}
    </div>
  );
};

export default TestScreen;