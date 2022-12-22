import { TouchableOpacity, View, Text } from 'react-native';
import { GameController } from 'phosphor-react-native';
import { PartyInfo } from '../PartyInfo';

import { THEME } from '../../theme';
import { styles } from './styles';

export interface PartyCardProps {
  id: string;
  hourEnd: string;
  hourStart: string;
  name: string;
  useVoiceChannel: boolean;
  weekDays: string[];
  yearsPlaying: number;
}

interface Props {
  data: PartyCardProps;
  onConnect: () => void;
}

export function PartyCard({ data, onConnect }: Props) {
  return (
    <View style={styles.container}>
      <PartyInfo label='Nome' value={data.name} />
      <PartyInfo label='Tem de jogo' value={`${data.yearsPlaying} ano(s)`} />
      <PartyInfo label='Disponibilidade' value={`${data.weekDays.length} dias \u2022 ${data.hourStart} - ${data.hourEnd}`} />
      <PartyInfo
        label='Chamada de áudio'
        value={data.useVoiceChannel ? 'Sim' : 'Não'}
        colorValue={data.useVoiceChannel ? THEME.COLORS.SUCCESS : THEME.COLORS.ALERT}
      />

      <TouchableOpacity style={styles.button} onPress={onConnect}>
        <GameController color={THEME.COLORS.TEXT} size={20} />
        <Text style={styles.buttonTitle}>Conectar</Text>
      </TouchableOpacity>
    </View>
  );
}
