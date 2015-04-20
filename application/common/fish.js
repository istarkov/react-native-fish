'use strict';

var React = require('react-native');
var {
  StyleSheet,
  View,
} = React;

var FlakeLayer = require('./flake_layer.js');
var Flake = require('./flake.js');
var TimerMixin = require('react-timer-mixin');

var Fish = React.createClass({  
  mixins: [TimerMixin],

  propTypes: {
    active: React.PropTypes.bool,
    create: React.PropTypes.func,
    options: React.PropTypes.object,
  },

  getInitialState() {
    this.fish_move = this.props.create(this.props.options);
    return {
      fish_data: this.fish_move((new Date()).getTime()),
    };
  },

  anim_tick() {
    this.setState({fish_data: this.fish_move((new Date()).getTime())});

    this.requestAnimationFrame(
      () => this.anim_tick());  
  },

  componentDidMount () {
    this.anim_tick();
  },

  render: function() {
    var FishLayers = this.state.fish_data
      .reverse()
      .map((layer, index) => this.props.createPart(layer.get('type'))(index, layer.get('x'), layer.get('y'), this.props.active, layer));
    
    return (
      <View style={styles.fish_container}>
        <View style={styles.fish}>
          {FishLayers}
        </View>
      </View>
    );
  }
});

var styles = StyleSheet.create({
  fish_container: {
    backgroundColor: '#000000',    
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  fish: {
    flex: 0,
  },
});

module.exports = Fish;
