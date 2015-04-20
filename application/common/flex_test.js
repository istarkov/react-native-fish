'use strict';

//TODO: REMOVE THIS


var React = require('react-native');
var {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  PixelRatio,
} = React;

var Dimensions = require('Dimensions');
var kSCREEN_WIDTH = Dimensions.get('window').width;
var kSCREEN_HEIGHT = Dimensions.get('window').height;

var AnimationExperimental = require('AnimationExperimental');

var easeInQuad = function(t: number): number {
  return t * t;
};

var FlexTest = React.createClass({
  componentWillMount () {
    this.press = true;
  },

  componentWillUnmount() {
  },
  
  componentWillReceiveProps(props) {
  },

  shouldComponentUpdate() {
    return false;
  },

  on_press() {
    AnimationExperimental.startAnimation({
      node: this.refs['text'],
      duration: 10000,
      easing: 'linear',
      property: 'rotation',
      toValue: 2,
    }, (v) => console.log('v', v));
    
    var ease_duration = 300;
    var infinite_duration = 100000;
    AnimationExperimental.startAnimation({
      node: this.refs['internal'],      
      duration: infinite_duration,
      easing: (t) => easeInQuad(Math.min(1, t*infinite_duration/ease_duration)),
      property: 'scaleXY',
      toValue: this.press ? [2,2] : [1,1],
    });

    this.press = !this.press;
    

  },

  render: function() {
    var text = React.createElement(Text, {style: styles.welcome}, 'Touch me !');
    return (
      <View style={styles.container}>
        <View ref="internal" style={styles.welcome_holder}>          
         <TouchableHighlight 
            underlayColor={'#FFF000'} 
            activeOpacity={0.1} 
            style={styles.touchable} 
            ref="text" onPress={this.on_press}>
          <View style={styles.text_holder}>
            {text}
          </View>
         </TouchableHighlight>
        </View>
      </View>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#05FCFF',
    //marginLeft: -20,
    //marginRight: -20,
  },
  text_holder: {
    flex: 0,
    backgroundColor: '#F0FFF0',
    margin: 10,
  },
  touchable: {
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'stretch',
    //backgroundColor: 'yellow'
  },

  welcome_holder: {
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    //borderBottomWidth: 1 / PixelRatio.get(), //very thin line
    //borderBottomColor: '#000000',
    backgroundColor: '#FF0000',
    padding: 20,
  },

  welcome: {
    backgroundColor: '#00FF0F',
    fontSize: 20,
    textAlign: 'center',
    margin: 5,
  },
});

module.exports = FlexTest;

