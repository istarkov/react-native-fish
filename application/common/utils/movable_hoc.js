'use strict';
var _ = require('lodash');

var React = require('react-native');

var {
  StyleSheet,
  View,
} = React;

function movable_hoc(Component) {
  return React.createClass({ 
    render() {
      var {x, y, ...other} = this.props;
      return (      
        <View style={[styles.movable, {left: x, top: y}]}>
          <Component {...other} />
        </View>
      );
    }
  });
}

var styles = StyleSheet.create({  
  movable: {
    position: 'absolute',
    left: 0,
    top: 0,
  },
});

module.exports = movable_hoc;
