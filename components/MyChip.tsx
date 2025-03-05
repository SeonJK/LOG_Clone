// ChipList.tsx
import React, { useState } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';

interface ChipProps {
  label: string;
  selected: boolean;
  onPress: () => void;
}

const Chip: React.FC<ChipProps> = ({ label, selected, onPress }) => {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.chip,
        selected ? styles.chipSelected : styles.chipUnselected,
        pressed && { opacity: 0.7 },
      ]}
    >
      <Text style={[styles.chipText, selected ? styles.chipTextSelected : styles.chipTextUnselected]}>
        {label}
      </Text>
    </Pressable>
  );
};

interface ChipListProps {
    chipList: string[],
    selectedData: string,
    onPress: (chip: string) => void
}

const ChipList: React.FC<ChipListProps> = ({ chipList, selectedData, onPress }) => {
  return (
    <View style={styles.chipListContainer}>
      {chipList.map((chip) => (
        <Chip
          key={chip}
          label={chip}
          selected={selectedData === chip}
          onPress={() => onPress(chip)}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  chipListContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 8,
  },
  chip: {
    paddingVertical: 4,
    paddingHorizontal: 14,
    borderRadius: 20,
    borderWidth: 1,
    margin: 4,
  },
  chipUnselected: {
    backgroundColor: '#fff',
    borderColor: '#ccc',
  },
  chipSelected: {
    backgroundColor: '#000',
    borderColor: '#000',
  },
  chipText: {
    fontSize: 14,
    fontWeight: 'bold'
  },
  chipTextUnselected: {
    color: '#666',
  },
  chipTextSelected: {
    color: '#fff',
  },
});

export default ChipList;
