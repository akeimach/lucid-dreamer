import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Easing,
  TouchableWithoutFeedback } from 'react-native';
import CircleTransition from './components/CircleTransition.js';


export default class App extends React.Component {

  state = {
    customLeftMargin: 0,
    customTopMargin: 0,
    backgroundColorState: '#FCF9F4'
  };

  handleNav = (id, event) => {
    console.log(event.nativeEvent);
    this.setState({
      customLeftMargin: event.nativeEvent.pageX,
      customTopMargin: event.nativeEvent.pageY
    }, this.circleTransition.start());
  };

  render() {

    styles.container.backgroundColor = this.state.backgroundColorState;
    const progressButton = [styles.circleButton];
    const realityButton = [styles.circleButton];
    const journalButton = [styles.circleButton];
    const dreamsButton = [styles.circleButton];
    progressButton.push({ top: '25%' });
    realityButton.push({ right: '10%' });
    journalButton.push({ bottom: '25%' });
    dreamsButton.push({ left: '10%' });

    return (
      <View style={styles.container}>

        <TouchableOpacity
          onPress={(e) => this.handleNav(1, e)}
          title="Progress"
          accessibilityLabel="Open your progress"
          style={progressButton}
        >
          <Text style={styles.text}>Progress</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={(e) => this.handleNav(2, e)}
          title="Reality"
          accessibilityLabel="Open your reality"
          style={realityButton}
        >
          <Text style={styles.text}>Reality</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={(e) => this.handleNav(3, e)}
          title="Journal"
          accessibilityLabel="Open your journal"
          style={journalButton}
        >
          <Text style={styles.text}>Journal</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={(e) => this.handleNav(4, e)}
          title="Dreams"
          accessibilityLabel="Open your dreams"
          style={dreamsButton}
        >
          <Text style={styles.text}>Dreams</Text>
        </TouchableOpacity>

        <CircleTransition
          ref={(circle) => { this.circleTransition = circle }}
          color={'#C1C1C1'}
          expand
          customTopMargin={this.state.customTopMargin}
          customLeftMargin={this.state.customLeftMargin}
          transitionBuffer={15}
          duration={1200}
          easing={Easing.linear}
          position={'custom'}
        />

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FCF9F4',
    alignItems: 'center',
    justifyContent: 'center',
  },
  circleButton: {
    borderWidth:0,
    borderColor:'rgba(0,0,0,0.2)',
    alignItems:'center',
    justifyContent:'center',
    width:100,
    height:100,
    backgroundColor:'#FFC97C',
    borderRadius:100,
    position: 'absolute',
  },
  text: {
    color:'#EA7659',
  },
});
