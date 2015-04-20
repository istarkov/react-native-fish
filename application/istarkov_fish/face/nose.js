'use strict';

var React = require('react-native');
var {
  StyleSheet,
  View,
} = React;

var kNOSE_TOP = -5;
var kNOSE_WIDTH = 15;
var kEYE_SPACE_BETWEEN = 0;

var mt4_identity = require('../../common/utils/mt4_identity.js');
var mt4 = require('gl-matrix').mat4;

var connectStaticAnimationRunnerInsideNavigator = require('../../common/utils/static_animation_runner_inside_navigator.js');
var movable_hoc = require('../../common/utils/movable_hoc.js');

var Nose = React.createClass({
  propTypes: {
    x: React.PropTypes.number,
    y: React.PropTypes.number,
    scale: React.PropTypes.number,
    opacity: React.PropTypes.number,
    active: React.PropTypes.bool,
    flake_type: React.PropTypes.number,
    color: React.PropTypes.string,
  },

  render: function() {
    var mt_nose = mt4_identity.create();
    mt4.translate(mt_nose, mt_nose, [-kNOSE_WIDTH/2, kNOSE_TOP, 0]);
    mt4.scale(mt_nose, mt_nose, [1, 0.5, 1]);

    return (
      <View style={styles.nose_holder}>        
        <View style={[styles.nose, {transformMatrix:mt_nose, backgroundColor: this.props.color}]} />        
      </View>
    );
  }
});

Nose = connectStaticAnimationRunnerInsideNavigator(
  Nose, 
  [],
  {});

Nose = movable_hoc(Nose);

var styles = StyleSheet.create({
  nose_holder: {
    position: 'absolute',
  },
  nose: {
    position: 'absolute',
    width: kNOSE_WIDTH,
    height: kNOSE_WIDTH,
    backgroundColor: '#FF0000',
    borderWidth: 1,
    borderColor: '#000000',
    borderRadius: kNOSE_WIDTH * 0.4
  },
});

module.exports = Nose;
