import React, { useEffect } from 'react';
import { Button } from 'react-native';
import Quiet from 'react-native-quiet';

const UltrasoundButton: React.FC = () => {
  useEffect(() => {
    (async () => {
      await Quiet.start("ultrasonic-experimental");
    })();
  }, []);

  const handlePress = () => {
    Quiet.send("hello, world!");
  };

  return <Button title="Emit Ultrasound" onPress={handlePress} />;
};

export default UltrasoundButton;