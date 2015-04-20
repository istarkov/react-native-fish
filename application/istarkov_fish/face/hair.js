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

var HairPart = require('./hair_part.js');


var Hair = React.createClass({
  propTypes: {
    x: React.PropTypes.number,
    y: React.PropTypes.number,
    scale: React.PropTypes.number,
    opacity: React.PropTypes.number,
    active: React.PropTypes.bool,
    flake_type: React.PropTypes.number,
  },

  render: function() {
    return (
      <View style={styles.eyes}>        
        <HairPart x={0} y={this.props.dy} {...this.props} />
        {/*<HairPart x={10} y={kEYE_TOP} rotation={Math.PI/6} />*/}
      </View>
    );
  }
});

Hair = connectStaticAnimationRunnerInsideNavigator(
  Hair, 
  [],
  {});

Hair = movable_hoc(Hair);

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

module.exports = Hair;
