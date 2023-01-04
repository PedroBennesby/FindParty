import * as Dialog from '@radix-ui/react-dialog';
import * as Checkbox from '@radix-ui/react-checkbox';
import * as ToggleGroup from '@radix-ui/react-toggle-group';
import { Check, GameController } from 'phosphor-react';
import { Input } from './Form/Input';
import { FormEvent, useEffect, useState } from 'react';
import { Game } from '../App';
import axios from 'axios';

export const CreateAdModal = () => {
  const [games, setGames] = useState<Game[]>([]);
  const [weekDays, setWeekDays] = useState<string[]>([]);
  const [useVoiceChannel, setUseVoiceChannel] = useState(false);

  useEffect(() => {
    axios('http://localhost:3333/games').then((response) => {
      setGames(response.data);
    });
  }, []);

  const handleCreateAd = async (event: FormEvent) => {
    event.preventDefault();

    const formData = new FormData(event.target as HTMLFormElement);
    const data = Object.fromEntries(formData);

    try {
      await axios.post(`http://localhost:3333/games/${data.game}/ads`, {
        'name': data.name,
        'weekDays': weekDays.map(Number),
        'useVoiceChannel': useVoiceChannel,
        'yearsPlaying': Number(data.yearsPlaying),
        'hourStart': data.hourStart,
        'hourEnd': data.hourEnd,
        'discord': data.discord,
      });
      alert('Anúncio criado com sucesso!');
    } catch (error) {
      console.log(error);
      alert('Erro ao criar anúncio!');
    }
  };

  return (
    <Dialog.Portal>
      <Dialog.Overlay className='fixed inset-0 bg-black/60' />
      <Dialog.Content className='fixed bg-[#2A2643] py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[480px] shadow-lg shadow-black/25'>
        <Dialog.Title className='text-3xl text-white font-black'>Publique um anúncio</Dialog.Title>
        <form className='mt-8 flex flex-col gap-4' onSubmit={handleCreateAd}>
          <div className='flex flex-col gap-2'>
            <label htmlFor='game' className='font-semibold'>
              Qual o game?
            </label>
            <select name='game' id='game' className='bg-zinc-900 py-3 px-4 rounded text-sm appearance-none' defaultValue=''>
              <option disabled value=''>
                Selecione o game que deseja jogar
              </option>

              {games.map((game) => {
                return (
                  <option value={game.id} key={game.id}>
                    {game.title}
                  </option>
                );
              })}
            </select>
          </div>

          <div className='flex flex-col gap-2 '>
            <label htmlFor='name'>Seu nome (ou nickname)</label>
            <Input name='name' type='text' placeholder='Como te chamam dentro do game?' id='name' />
          </div>

          <div className='grid grid-cols-2 gap-4'>
            <div className='flex flex-col gap-2 '>
              <label htmlFor='yearsPlaying'>Joga há quantos anos?</label>
              <Input name='yearsPlaying' type='number' placeholder='Tudo bem ser ZERO' id='yearsPlaying' />
            </div>

            <div className='flex flex-col gap-2 '>
              <label htmlFor='discord'>Qual seu Discord?</label>
              <Input name='discord' type='text' placeholder='Usuario#0000' id='discord' />
            </div>
          </div>

          <div className='flex gap-6'>
            <div className='flex flex-col gap-2'>
              <label htmlFor='weekDays'>Quando costuma jogar?</label>
              <ToggleGroup.Root type='multiple' className='grid grid-cols-4 gap-2' onValueChange={setWeekDays} value={weekDays}>
                <ToggleGroup.Item value='0' title='Domingo' className={` w-8 h-8 rounded bg-zinc-900 ${weekDays.includes('0') && 'bg-violet-500'}`}>
                  D
                </ToggleGroup.Item>
                <ToggleGroup.Item value='1' title='Segunda' className={` w-8 h-8 rounded bg-zinc-900 ${weekDays.includes('1') && 'bg-violet-500'}`}>
                  S
                </ToggleGroup.Item>
                <ToggleGroup.Item value='2' title='Terça' className={` w-8 h-8 rounded bg-zinc-900 ${weekDays.includes('2') && 'bg-violet-500'}`}>
                  T
                </ToggleGroup.Item>
                <ToggleGroup.Item value='3' title='Quarta' className={` w-8 h-8 rounded bg-zinc-900 ${weekDays.includes('3') && 'bg-violet-500'}`}>
                  Q
                </ToggleGroup.Item>
                <ToggleGroup.Item value='4' title='Quinta' className={` w-8 h-8 rounded bg-zinc-900 ${weekDays.includes('4') && 'bg-violet-500'}`}>
                  Q
                </ToggleGroup.Item>
                <ToggleGroup.Item value='5' title='Sexta' className={` w-8 h-8 rounded bg-zinc-900 ${weekDays.includes('5') && 'bg-violet-500'}`}>
                  S
                </ToggleGroup.Item>
                <ToggleGroup.Item value='6' title='Sábado' className={` w-8 h-8 rounded bg-zinc-900 ${weekDays.includes('6') && 'bg-violet-500'}`}>
                  S
                </ToggleGroup.Item>
              </ToggleGroup.Root>
            </div>

            <div className='flex flex-col gap-2 flex-1'>
              <label htmlFor='hourStart'>Qual horário do dia?</label>
              <div className='grid grid-cols-2  gap-2 '>
                <Input name='hourStart' type='time' placeholder='De' id='hourStart' />
                <Input name='hourEnd' type='time' placeholder='Até' id='hourEnd' />
              </div>
            </div>
          </div>

          <label className='mt-2 flex gap-2 text-sm items-center'>
            <Checkbox.Root
              className='w-6 h-6 p-1 rounded bg-zinc-900'
              checked={useVoiceChannel}
              onCheckedChange={(checked) => {
                checked ? setUseVoiceChannel(true) : setUseVoiceChannel(false);
              }}>
              <Checkbox.Indicator>
                <Check className='w-4 h-4 text-emerald-400' />
              </Checkbox.Indicator>
            </Checkbox.Root>
            Costumo me conectar ao chat de voz
          </label>

          <footer className='mt-4 flex justify-end gap-4'>
            <Dialog.Close className='bg-zinc-500 px-5 h-12 rounded-md font-semibold hover:bg-zinc-600'>Cancelar</Dialog.Close>
            <button className='bg-violet-500 px-5 h-12 rounded-md font-semibold flex items-center gap-3 hover:bg-violet-600' type='submit'>
              <GameController size={24} />
              Encontrar duo
            </button>
          </footer>
        </form>
      </Dialog.Content>
    </Dialog.Portal>
  );
};
