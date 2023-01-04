import { useEffect, useState } from 'react';
import './styles/main.css';
import logoImg from './assets/logo.svg';
import { GameBanner } from './components/GameBanner';
import { AdBanner } from './components/AdBanner';
import * as Dialog from '@radix-ui/react-dialog';
import { CreateAdModal } from './components/CreateAdModal';
import axios from 'axios';

export interface Game {
  id: number;
  bannerUrl: string;
  title: string;
  _count: {
    ads: number;
  };
}

function App() {
  const [games, setGames] = useState<Game[]>([]);

  useEffect(() => {
    axios('http://localhost:3333/games').then((response) => {
      setGames(response.data);
    });
  }, []);

  return (
    <div className='max-w-[1344px] mx-auto flex flex-col items-center my-20 '>
      <img src={logoImg} />
      <h1 className='text-6xl text-white font-black mt-20'>
        Seu <span className='bg-gradient bg-clip-text text-transparent'>duo</span> está aqui!
      </h1>
      <div className='grid grid-cols-6 gap-6 mt-16'>
        {games.map((game) => (
          <GameBanner bannerUrl={game.bannerUrl} title={game.title} ads={game._count.ads} key={game.id} />
        ))}
      </div>
      <Dialog.Root>
        <AdBanner />
        <CreateAdModal />
      </Dialog.Root>
    </div>
  );
}

export default App;
