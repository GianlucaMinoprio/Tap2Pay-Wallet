import React, { useState } from 'react';
import { View, Text } from 'react-native';

const DataConsole: React.FC = () => {
  const [data, setData] = useState<string>('');

  // Assume onDataReceived is a function that gets called whenever new data is received
  const onDataReceived = (newData: string) => {
    setData(previousData => `${previousData}\n${newData}`);
  };

  return (
    <View>
      <Text>{data}</Text>
    </View>
  );
};

export default DataConsole;
