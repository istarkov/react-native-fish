'use strict';

var React = require('react-native');
var {
  StyleSheet,
  View,
} = React;

var kHAIR_WIDTH = 25;
var kHAIR_HEIGHT = 35;

var mt4_identity = require('../../common/utils/mt4_identity.js');
var mt4 = require('gl-matrix').mat4;

var connectStaticAnimationRunnerInsideNavigator = require('../../common/utils/static_animation_runner_inside_navigator.js');
var movable_hoc = require('../../common/utils/movable_hoc.js');

var get_transform = function(angle) {
  var mt_res = mt4_identity.create();
  mt4.translate(mt_res, mt_res, [-kHAIR_WIDTH/2, -kHAIR_HEIGHT/2, 0]);
  mt4.rotateZ(mt_res, mt_res, angle);
  mt4.scale(mt_res, mt_res, [0.3, 1, 1]);
  mt4.translate(mt_res, mt_res, [0, -kHAIR_HEIGHT/2, 0]);
  return mt_res;
};

var HairPart = React.createClass({
  propTypes: {
    x: React.PropTypes.number,
    y: React.PropTypes.number,
    scale: React.PropTypes.number,
    opacity: React.PropTypes.number,
    active: React.PropTypes.bool,
    flake_type: React.PropTypes.number,
  },

  render: function() {
    var eye_rot_angle = this.props.rotation;

    var mt_left = get_transform(-eye_rot_angle);
    var mt_right = get_transform(eye_rot_angle);
    var mt_center = get_transform(0);

    var scale = this.props.scale;
    var mt_size = mt4_identity.create();
    mt4.scale(mt_size, mt_size, [scale, scale, 1]);

    var clr_left = this.props.colors.get(0);
    var clr_center = this.props.colors.get(1);
    var clr_right = this.props.colors.get(2);
    return (
      <View style={[styles.hair_parts, {transformMatrix: mt_size}]}>
        <View style={[styles.h_part, {transformMatrix: mt_left, backgroundColor: clr_left}]} />
        <View style={[styles.h_part, {transformMatrix: mt_right, backgroundColor: clr_right}]} />
        <View style={[styles.h_part, {transformMatrix: mt_center, backgroundColor: clr_center}]} />
      </View>
    );
  }
});

HairPart = connectStaticAnimationRunnerInsideNavigator(
  HairPart, 
  [],
  {});

HairPart = movable_hoc(HairPart);

var styles = StyleSheet.create({
  hair_parts: {
    position: 'absolute',
  },
  h_part: {
    left: 0,
    top: 0,
    position: 'absolute',
    width: kHAIR_WIDTH,
    height: kHAIR_HEIGHT,
    backgroundColor: '#FFFFFF',
    //borderColor: '#000000',
    //borderWidth: 1,
    borderRadius: kHAIR_WIDTH * 0.8
  },
});

module.exports = HairPart;
