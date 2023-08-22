'use client';
import { CardPokemon } from '@/app/Components/Fragments/CardPokemon';
import { Header } from '@/app/Components/Fragments/Header';
import { fetchPokemon } from '@/app/Services/fetchPokemon.service';
import Link from 'next/link';
import { ArrowLeft } from '@phosphor-icons/react';
import { useEffect, useState } from 'react';
const page = ({ params }) => {
  const [pokemon, setPokemon] = useState([]);
  const [favorites, setFavorites] = useState([]);
  useEffect(() => {
    fetchPokemon((results) => {
      Promise.all(results).then((res) =>
        setPokemon(res.find((v) => v.name === params.id))
      );
    });
    setFavorites(JSON.parse(localStorage.getItem('favorite')) || []);
  }, []);

  const handleFavorite = (id) => {
    if (favorites.length !== 0) {
      if (favorites.find((item) => item.id === id)) {
        const aunth = favorites.filter((item) => item.id !== id);
        setFavorites(aunth);
        localStorage.setItem('favorite', JSON.stringify(aunth));
      } else {
        setFavorites([...favorites, { id }]);
        localStorage.setItem(
          'favorite',
          JSON.stringify([...favorites, { id }])
        );
      }
    } else {
      setFavorites([...favorites, { id }]);
      localStorage.setItem('favorite', JSON.stringify([...favorites, { id }]));
    }
  };
  return (
    <>
      <Header>Pokemon</Header>
      <article className="max-w-5xl bg-slate-50 mx-auto h-auto p-2 lg:p-4 rounded-lg">
        <Link
          className="flex bg-white rounded-md shadow-md w-20 p-2 text-black "
          href="/"
        >
          <ArrowLeft size={23} />
          Back
        </Link>
        <div className="max-w-2xl z-20 mx-auto">
          <CardPokemon pokemon={pokemon} handleToFavorite={handleFavorite}>
            <CardPokemon.Details pokemon={pokemon} />
          </CardPokemon>
          <div></div>
        </div>
      </article>
    </>
  );
};
export default page;