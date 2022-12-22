import { useEffect, useState } from 'react';
import { TouchableOpacity, View, Image, FlatList, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRoute, useNavigation } from '@react-navigation/native';
import { Entypo } from '@expo/vector-icons';

import { styles } from './styles';
import { THEME } from '../../theme';
import logoImg from '../../assets/logo.png';
import { GameParams } from '../../types/navigation';

import { Background } from '../../components/Background';
import { Heading } from '../../components/Heading';
import { PartyCard, PartyCardProps } from '../../components/PartyCard';

export function Game() {
  const [partys, setPartys] = useState<PartyCardProps[]>([]);
  const route = useRoute();
  const navigation = useNavigation();
  const game = route.params as GameParams;

  const handleGoBack = () => {
    navigation.goBack();
  };

  useEffect(() => {
    fetch(`http://localhost:3333/games/${game.id}/ads`)
      .then((response) => response.json())
      .then((data) => setPartys(data));
  }, []);

  return (
    <Background>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={handleGoBack}>
            <Entypo name='chevron-thin-left' color={THEME.COLORS.CAPTION_300} size={20} />
          </TouchableOpacity>

          <Image source={logoImg} style={styles.logo} />
          <View style={styles.right} />
        </View>

        <Image source={{ uri: game.bannerUrl }} style={styles.cover} resizeMode='cover' />

        <Heading title={game.title} subtitle='Conecte-se e comece a jogar!' />

        <FlatList
          data={partys}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <PartyCard onConnect={() => {}} data={item} />}
          horizontal
          contentContainerStyle={[partys.length > 0 ? styles.contentList : styles.emptyListContent]}
          showsHorizontalScrollIndicator={false}
          style={styles.containerList}
          ListEmptyComponent={() => <Text style={styles.emptyListText}>Não há anúncios publicados ainda.</Text>}></FlatList>
      </SafeAreaView>
    </Background>
  );
}
