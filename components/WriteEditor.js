import React from 'react';
import {View, StyleSheet, TextInput, Pressable, Text} from 'react-native';

function WriteEditor({subtitle, comment, onChangesubTitle, onChangeComment, group, onChangeGroup}) {
  return (
    <View style={styles.block}>
      <TextInput
        placeholder="Enter the title"
        style={styles.titleInput}
        returnKeyType="next"
        onChangeText={onChangesubTitle}
        value={subtitle}
      />
      <TextInput
        placeholder="Enter the Category"
        style={styles.titleInput}
        textAlignVertical="top"
        onChangeText={onChangeGroup}
        value={group}
      />
      <TextInput
        placeholder="Enter the comment"
        style={styles.bodyInput}
        multiline
        textAlignVertical="top"
        onChangeText={onChangeComment}
        value={comment}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  block: {flex: 1, padding: 16},
  titleInput: {
    paddingVertical: 0,
    fontSize: 18,
    marginBottom: 16,
    color: '#263238',
    fontWeight: 'bold',
  },
  bodyInput: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 0,
    color: '#263238',
  },
  button: {
    borderRadius: 20,
    padding: 10,
  },
});

export default WriteEditor;