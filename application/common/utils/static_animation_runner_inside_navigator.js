'use strict';
var _ = require('lodash');

var React = require('react-native');

//var { PureRenderMixin } = React.addons;
var AnimationExperimental = require('AnimationExperimental');

//TODO: add animation keys
var shallowEqualExcept = require('./shallow_equal_except.js');
/**
 * stops static animations if not in current nav view
 */
var connectStaticAnimationRunnerInsideNavigator = function(Component, static_animation, except_keys) {
  var StaticAnimationRunner = React.createClass({

    propTypes: {
      active: React.PropTypes.bool.isRequired,
    },
  
    shouldComponentUpdate(nextProps, nextState) {
      return !shallowEqualExcept(this.props, nextProps, except_keys) ||
             !shallowEqualExcept(this.state, nextState, except_keys);
    },

    componentWillMount () {
      this.animation_tags = null;
      this.view_ref = null;
    },

    componentDidMount() {
      if(this.props.active) {
        this.run_animation(this.view_ref, this.props);
      }
    },

    componentWillReceiveProps(next_props) {
      if(!this.props.active && next_props.active) {
        this.run_animation(this.view_ref, next_props);
      } else if(this.props.active && !next_props.active) {
        this.stop_animation();
      }

      //make position change as animation test
      /*
      //very strange glitches
      if('x' in except_keys) {
        if(next_props.active) {
          if(next_props.x!==this.props.x || next_props.y!==this.props.y) {
            //console.log('here', next_props.x, next_props.y);
            AnimationExperimental.startAnimation({
              node: this.view_ref,
              duration: 300,
              easing: (t) => t,
              property: 'position',
              toValue: [next_props.x, next_props.y]
            });
          }
        }
      }
      */
    },

    run_animation(view_ref, props) {
      this.animation_tags = _(static_animation)
        .map(anim =>  AnimationExperimental.startAnimation(_.extend({}, anim(props), {node: view_ref})))
        .value();
    },

    stop_animation() {
      if(this.animation_tags) {
        _(this.animation_tags)
          .each(anim_tag => AnimationExperimental.stopAnimation(anim_tag))
          .value();        
      }
      this.animation_tag = null;
    },

    get_ref(r) {
      this.view_ref = r;
    },

    render () {
      return <Component {...this.props} ref={this.get_ref} />;
    }
  });
  
  return StaticAnimationRunner;
};

module.exports = connectStaticAnimationRunnerInsideNavigator;
