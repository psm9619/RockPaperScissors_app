import React, {Fragment} from 'react';
import { StyleSheet, Text, View } from 'react-native';

class Greeting extends React.Component {
    render() {
        return(
            <View style={styles.container}>
            <Text>{this.props.content}</Text>
            </View>
        );
    }
}

export default Greeting;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  }
});