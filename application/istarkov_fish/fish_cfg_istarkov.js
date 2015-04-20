'use strict';

var immutable = require('immutable');
var {partTypes} = require('./fish_flake_types.js');

//probability density of normal distribution have a nice hat form
//mu - mean, sigma - deviation
var nd = function (x, mu, sigma) {
  return Math.exp(-(x - mu) * (x - mu) / (2 * sigma * sigma)) / sigma / Math.sqrt(2 * Math.PI);
};


var create = function (options) {
  var is_sub_flake_ = false;
  var koef_debug_ = 1;

  //var b_flake_colors = ['#F00F9F', '#00FFEF', '#FFFF00', '#0000FF', '#F06F9F'];
  //b_flake_colors = ['#F0F00F', '#00FF00', '#0000FF', '#00FF00', '#00FF00'];
  //b_flake_colors = ['#F0F00F', '#000F0F', '#F0000F', '#F00F0F', '#000AE0'];
  
  var flake_opacity = 0.6;

  var {b_sigma, b_mu, b_r_scale, b_min_r, b_length, b_flakes_count, b_flake_colors} = options.body;

  var fish_data_layer_ = immutable.Map({
      x: 0,
      y: 0,
      rotation_speed: -4,
      radius: 10,
      child_count: 3,
      child_type: partTypes.kFLAKE,
      child: immutable.Map({
        rotation_speed: - 1.5,
        opacity: 0.6,
        scale: 1.1,
      })
    });

  
  var fish_face_ = immutable.fromJS([
    {
      x: 0,
      y: 0,
      type: partTypes.kFACE_NOSE,
      delta: 10,
      color: b_flake_colors[0],
    },

    {
      x: 0,
      y: 0,
      type: partTypes.kFACE_PUPIL,
      delta: 30,
    },
    {
      x: 0,
      y: 0,
      dy: -7,
      type: partTypes.kFACE_HAIR,
      scale: 0.6,
      rotation: Math.PI/5,
      //colors: ['yellow', 'blue', 'yellow'],
      colors: [b_flake_colors[0], b_flake_colors[2], b_flake_colors[0]],
      delta: 6,
    },
    
    {
      x: 0,
      y: 0,
      type: partTypes.kFACE_EYES,
      delta: 6,
    },
    {
      x: 0,
      y: 0,
      type: partTypes.kFACE_MOUTH,
      delta: 8,
      color: b_flake_colors[1],
    },
    {
      x: 0,
      y: 0,
      dy: -10,
      type: partTypes.kFACE_HAIR,
      scale: 0.8,
      rotation: Math.PI/3,
      delta: 4,
      //colors: ['orange', '#00FF00', 'orange'],
      colors: [b_flake_colors[4], b_flake_colors[0], b_flake_colors[4]],
    },    
  ]);  

  var fish_body_ = immutable.Range(0, b_length)
    .map(index => immutable.fromJS({
      x: 0,
      y: 0,
      type: partTypes.kFLAKE_LAYER,
      delta: index===0 ? 30 : 80, //delay from prev (for example for face layers this delays is short)
      rotation_speed: koef_debug_ * 2,
      radius: b_min_r + b_r_scale * nd(index / Math.max(1, b_length - 1), b_mu, b_sigma),
      child_count: b_flakes_count,
      child_type: is_sub_flake_ ? partTypes.kFLAKE_LAYER : partTypes.kFLAKE,
      child: is_sub_flake_ ? fish_data_layer_ : {
        flake_type: 0,
        rotation_speed: koef_debug_ * -1.5,
        opacity: flake_opacity,
        scale: 0.6 +  0.4*nd(index / Math.max(1, b_length - 1), b_mu, b_sigma),
        colors: b_flake_colors,
      }
    }))
    .toList();

  var fish_ = fish_face_.concat(fish_body_);


  return function (time) { //move fn
    
    tmp_fps(time);
    var time_acc = 0;
    return fish_.map((x, index) => {
      time_acc += x.get('delta');
      return x
        .set('x', koef_debug_ * ((options.dimensions.width - 100) / 2) * Math.sin((time - time_acc) / 800))
        .set('y', koef_debug_ * ((options.dimensions.height - 200) / 2) * Math.sin((time - time_acc) / 1500));
    })
  };
};

module.exports = create;


//------------------------------------------------------------------------------------------------------------------
//TODO: remove
var tmp_fps = (function() {
  var initial_ = null;
  var count_ = 0;    
  return function(time) {
    ++count_;
    if(initial_ === null && count_ > 100) { //skip initial steps
      initial_ = time;
      count_ = 0;
    }    
    if(count_ % 300 === 0) {
      console.log('FPS', time - initial_, count_ / ((time - initial_) / 1000));
    }    
  };
})();
