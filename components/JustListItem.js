import React, { useContext } from 'react';
import {Platform, Pressable, StyleSheet, Text, View, Image} from 'react-native';
import {formatDistanceToNow, format} from 'date-fns';
import {enGB} from 'date-fns/locale';
import {useNavigation} from '@react-navigation/native';

function formatDate(date) {
  const d = new Date(date);
  return format(d, 'PPP', {locale: enGB});
}

function truncate(text) {
  // 정규식을 사용해 모든 줄 바꿈 문자 제거
  const replaced = text.replace(/\n/g, ' ');
  if (replaced.length <= 100) {
    return replaced;
  }
  return replaced.slice(0, 100).concat('...');
}

function JustListItem({log,onSelect}) {
  const navigation = useNavigation();
  const {id, subtitle,selected, date} = log;
  const onPress = () => {
    navigation.navigate('Write', {
      log,
    });
  };
  return (
    <Pressable
      style={({pressed}) => [
        styles.block,
        Platform.OS === 'ios' && pressed && {backgroundColor: '#efefef'},
      ]}
      android_ripple={{color: '#ededed'}}
      onPress={() => onSelect(id)}>

      <View style={styles.bblock}>
      <View style ={[styles.circle, selected && styles.filled]}>
        {selected && (<Image source = {require('../assets/outline_cancel_white_24dp.png')}/>)}
      </View>
      <Text style={[styles.title, selected && styles.lineThrough]}>{subtitle}</Text>
      </View>
      <Text style={[styles.body]}>{formatDate(date)}</Text>   
    </Pressable>
  );
}

const styles = StyleSheet.create({
  block: {
    backgroundColor: 'white',
    paddingHorizontal: 16,
    paddingVertical: 24,
  },
  date: {
    fontSize: 12,
    color: '#546e7a',
    marginBottom: 8,
  },
  title: {
    color: '#263238',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  body: {
    color: '#37474f',
    fontSize: 16,
    lineHeight: 21,
  },
  circle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderColor: '#26a69a',
    borderWidth: 1,
    marginRight: 16,
  },
  filled:{
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#26a69a',
  },
  lineThrough: {
    color: '#9e9e9e',
    textDecorationLine: 'line-through',
  },
  bblock:{
    flexDirection: 'row',
  },
});

export default JustListItem;