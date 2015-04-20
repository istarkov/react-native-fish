'use strict';

var React = require('react-native');
var {
  StyleSheet,
  View,
} = React;

var kEYE_TOP = -20;
var kEYE_WIDTH = 25;
var kEYE_SPACE_BETWEEN = 0;

var mt4_identity = require('../../common/utils/mt4_identity.js');
var mt4 = require('gl-matrix').mat4;

var connectStaticAnimationRunnerInsideNavigator = require('../../common/utils/static_animation_runner_inside_navigator.js');
var movable_hoc = require('../../common/utils/movable_hoc.js');

var Eyes = React.createClass({
  propTypes: {
    x: React.PropTypes.number,
    y: React.PropTypes.number,
    scale: React.PropTypes.number,
    opacity: React.PropTypes.number,
    active: React.PropTypes.bool,
    flake_type: React.PropTypes.number,
  },

  render: function() {
    var eye_rot_angle = Math.PI/2.6;
    var mt_left_eye = mt4_identity.create();
    mt4.translate(mt_left_eye, mt_left_eye, [-kEYE_WIDTH - kEYE_SPACE_BETWEEN/2.0, kEYE_TOP, 0]);
    mt4.rotateZ(mt_left_eye, mt_left_eye, -eye_rot_angle);
    mt4.scale(mt_left_eye, mt_left_eye, [0.5, 1, 1]);

    var mt_right_eye = mt4_identity.create();
    mt4.translate(mt_right_eye, mt_right_eye, [kEYE_SPACE_BETWEEN/2.0, kEYE_TOP, 0]);
    mt4.rotateZ(mt_right_eye, mt_right_eye, eye_rot_angle);
    mt4.scale(mt_right_eye, mt_right_eye, [0.5, 1, 1]);

    return (
      <View style={styles.eyes}>        
        <View style={[styles.eye, {transformMatrix:mt_left_eye}]} />
        <View style={[styles.eye, {transformMatrix:mt_right_eye}]} />
      </View>
    );
  }
});

Eyes = connectStaticAnimationRunnerInsideNavigator(
  Eyes, 
  [],
  {});

Eyes = movable_hoc(Eyes);

var styles = StyleSheet.create({
  eyes: {
    position: 'absolute',
  },
  eye: {
    position: 'absolute',
    width: kEYE_WIDTH,
    height: kEYE_WIDTH,
    backgroundColor: '#FFFFFF',
    borderColor: '#000000',
    borderWidth: 1,
    borderRadius: kEYE_WIDTH * 0.6
  },
});

module.exports = Eyes;
