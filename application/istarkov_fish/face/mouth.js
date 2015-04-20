'use strict';

var React = require('react-native');
var {
  StyleSheet,
  View,
} = React;

var kMOUTH_TOP = 6;
var kMOUTH_WIDTH = 24;
var kMOUTH_HEIGHT = 8;


var mt4_identity = require('../../common/utils/mt4_identity.js');
var mt4 = require('gl-matrix').mat4;

var connectStaticAnimationRunnerInsideNavigator = require('../../common/utils/static_animation_runner_inside_navigator.js');
var movable_hoc = require('../../common/utils/movable_hoc.js');

var Mouth = React.createClass({
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
    var mt_mouth = mt4_identity.create();
    mt4.translate(mt_mouth, mt_mouth, [-kMOUTH_WIDTH/2, kMOUTH_TOP, 0]);
    //mt4.scale(mt_mouth, mt_mouth, [1, 1, 1]);

    return (
      <View style={styles.nose_holder}>        
        <View style={[styles.mouth, {transformMatrix:mt_mouth, borderColor: this.props.color}]} />
      </View>
    );
  }
});

Mouth = connectStaticAnimationRunnerInsideNavigator(
  Mouth, 
  [],
  {});

Mouth = movable_hoc(Mouth);

var styles = StyleSheet.create({
  nose_holder: {
    position: 'absolute',
  },
  mouth: {
    position: 'absolute',
    width: kMOUTH_WIDTH,
    height: kMOUTH_HEIGHT,
    backgroundColor: '#0000FF',
    borderWidth: 3,
    borderColor: '#FF0000',
    borderRadius: 8 //kMOUTH_WIDTH * 0.4
  },
});

module.exports = Mouth;
