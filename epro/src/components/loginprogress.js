import React from 'react';
import { Text, View } from 'react-native';
import * as Progress from 'react-native-progress';

const LoginProgress = (dayCurrCycle, cycleLength) => {

  const { container } = styles;

  return (
    <View style={styles.container}>
      <Progress.Bar
        progress={props.progress}
        width={300}
        height={12}
        color={'#FFBA49'}
        borderWidth={0.5}
      />
    </View>
  )
}

const styles = {
  container: {
      justifyContent: 'center',
      alignItems: 'center',
      height: 50,
  }
}

export default LoginProgress;
