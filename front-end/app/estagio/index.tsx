import React from 'react';
import { View, SafeAreaView, Text } from 'react-native';
import { styles, estagio } from '../styles';
import { useRouter } from 'expo-router';

import CustomNavBar from '../../components/navbar/CustomNavBar';
import CustomSearch from '../../components/search/CustomSearch';
import CustomButton from '../../components/button/CustomButton';
import CustomContainer from '../../components/container/CustomContainer';

export default function Estagio() 
{

  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      
      <CustomNavBar userType="aluno" />

      <View style={styles.content}>
        <CustomSearch />

        <View style={estagio.containerButton}>
          <CustomButton 
            title="Novo Estagio" 
            type="secondary"
            onPress={() => router.push('/novoEstagio')}
          />
        </View>

        <CustomContainer title="Meus Estágios">
          <Text>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Saepe impedit delectus at, facilis repudiandae hic quam? Doloremque corporis qui, omnis eveniet atque natus nobis molestias eaque ea iusto quae quidem.</Text>
        </CustomContainer>

      </View>

    </SafeAreaView>
  );
}