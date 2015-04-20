'use strict';

var kUSE_STATIC_ANIM = false; //deprecated

var _ = require('lodash');

var React = require('react-native');
var {
  StyleSheet,
  View,
} = React;

var { PureRenderMixin } = React.addons;

var shallowEqual = require('shallowEqual');

var Flake = require('./flake.js');

var AnimationExperimental = require('AnimationExperimental');

var connectStaticAnimationRunnerInsideNavigator = require('./utils/static_animation_runner_inside_navigator.js');
var movable_hoc = require('./utils/movable_hoc.js');

var FlakeLayer = React.createClass({
  propTypes: {
    x: React.PropTypes.number,
    y: React.PropTypes.number,
    radius: React.PropTypes.number,
    opacity: React.PropTypes.number,
    active: React.PropTypes.bool,
  },

  render: function() {
    var flake_count = this.props.child_count;
    var radius = this.props.radius;

    var Flakes = _(_.range(0, flake_count))
      .map(index => {
        var angle = 2 * Math.PI * index / flake_count;
        var x = radius * Math.cos(angle);
        var y = radius * Math.sin(angle);
        return this.props.flakeCreate(index, x, y, this.props.active, this.props.data);
      })
      .value();

    return (
      <View style={styles.flake_layer}>
        {Flakes}
      </View>
    );
  }
});


FlakeLayer = connectStaticAnimationRunnerInsideNavigator(
  FlakeLayer, 
  [props => ({
    duration: 100000,
    easing: (t) => t,
    property: 'rotation',
    toValue: 100 * props.rotation_speed,
  })],
  kUSE_STATIC_ANIM ? {x: true, y: true} : {});


FlakeLayer = movable_hoc(FlakeLayer);


var styles = StyleSheet.create({  
  flake_layer_holder: {
    position: 'absolute',
    left: 0,
    top: 0,
  },

  flake_layer: {
    position: 'absolute',
    left: 0,
    top: 0,
  },
});

module.exports = FlakeLayer;
