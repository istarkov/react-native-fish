'use strict';

var React = require('react-native');
var {
  StyleSheet,
  View,
} = React;

var kPUPIL_TOP = -11;
var kPUPIL_WIDTH = 8;
var kPUPIL_SPACE_BETWEEN = 15 ;////15;

var mt4_identity = require('../../common/utils/mt4_identity.js');
var mt4 = require('gl-matrix').mat4;

var connectStaticAnimationRunnerInsideNavigator = require('../../common/utils/static_animation_runner_inside_navigator.js');
var movable_hoc = require('../../common/utils/movable_hoc.js');

var Pupil = React.createClass({
  propTypes: {
    x: React.PropTypes.number,
    y: React.PropTypes.number,
    scale: React.PropTypes.number,
    opacity: React.PropTypes.number,
    active: React.PropTypes.bool,
    flake_type: React.PropTypes.number,
  },

  render: function() {
    var rot_angle = Math.PI;

    var mt_left_pupil = mt4_identity.create();
    mt4.translate(mt_left_pupil, mt_left_pupil, [-kPUPIL_WIDTH - kPUPIL_SPACE_BETWEEN/2.0, kPUPIL_TOP, 0]);
    mt4.rotateZ(mt_left_pupil, mt_left_pupil, -rot_angle);
    mt4.scale(mt_left_pupil, mt_left_pupil, [0.5, 1, 1]);

    var mt_right_pupil = mt4_identity.create();
    mt4.translate(mt_right_pupil, mt_right_pupil, [kPUPIL_SPACE_BETWEEN/2.0, kPUPIL_TOP, 0]);
    mt4.rotateZ(mt_right_pupil, mt_right_pupil, rot_angle);
    mt4.scale(mt_right_pupil, mt_right_pupil, [0.5, 1, 1]);

    return (
      <View style={styles.eyes}>        
        <View style={[styles.pupil, {transformMatrix:mt_left_pupil}]} />
        <View style={[styles.pupil, {transformMatrix:mt_right_pupil}]} />
      </View>
    );
  }
});

Pupil = connectStaticAnimationRunnerInsideNavigator(
  Pupil, 
  [],
  {});

Pupil = movable_hoc(Pupil);

var styles = StyleSheet.create({
  eyes: {
    position: 'absolute',
  },
  pupil: {
    position: 'absolute',
    width: kPUPIL_WIDTH,
    height: kPUPIL_WIDTH,
    backgroundColor: '#000000',
    //borderColor: '#000000',
    //borderWidth: 1,
    borderRadius: kPUPIL_WIDTH * 0.6
  },
});

module.exports = Pupil;
