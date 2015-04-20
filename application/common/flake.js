'use strict';

var React = require('react-native');
var {
  StyleSheet,
  View,
} = React;

var mt4_identity = require('./utils/mt4_identity.js');
var mt4 = require('gl-matrix').mat4;

var connectStaticAnimationRunnerInsideNavigator = require('./utils/static_animation_runner_inside_navigator.js');

var Flake = React.createClass({
  propTypes: {
    x: React.PropTypes.number,
    y: React.PropTypes.number,
    scale: React.PropTypes.number,
    opacity: React.PropTypes.number,
    active: React.PropTypes.bool,
    flake_type: React.PropTypes.number,
  },

  render: function() {
    var mt = mt4_identity.create();    
    mt4.translate(mt, mt, [this.props.x - 10, this.props.y - 10, 0]);    
    mt4.scale(mt, mt, [this.props.scale, this.props.scale, 1]);

    var flake_bg_color = this.props.colors.get(0);
    var flake_border_color = this.props.colors.get(1);

    var flake_int_bg_color = this.props.colors.get(2);
    var flake_int_border_color = this.props.colors.get(3);
    
    return (
      <View style={[
          styles.flake, 
          {
            transformMatrix: mt,
            opacity: this.props.opacity,
            backgroundColor: flake_bg_color,
            borderColor: flake_border_color,
          }
        ]}>
        <View style={[
            styles.flake_internal,
            {
              backgroundColor: flake_int_bg_color,
              borderColor: flake_int_border_color,
            }
          ]}>
        </View>
      </View>
    );
  }
});

Flake = connectStaticAnimationRunnerInsideNavigator(
  Flake, 
  [
    props => ({
      duration: 100000,
      easing: (t) => t,
      property: 'rotation',
      toValue: 1000 * props.rotation_speed,
    }),
  ],
  {});

var styles = StyleSheet.create({
  flake: {
    
    position: 'absolute',
    width: 20,
    height: 20,
    
    borderWidth: 2
  },
  flake_internal: {
    position: 'absolute',
    width: 10,
    height: 10,
    left: 3,
    top: 3,
    backgroundColor: '#FFFF00',
    borderColor: '#0000FF',
    borderWidth: 2
  },
});

module.exports = Flake;
