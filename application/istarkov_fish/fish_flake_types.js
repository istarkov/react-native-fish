'use strict';

var React = require('react-native');
var FlakeLayer = require('../common/flake_layer.js');
var Flake = require('../common/flake.js');

var Eyes = require('./face/eyes.js');
var Pupil = require('./face/pupil.js');
var Nose = require('./face/nose.js');
var Mouth = require('./face/mouth.js');
var Hair = require('./face/hair.js');

var keyOf = require('keyOf');

var partTypes = {
  kFLAKE: keyOf({kFLAKE: null}),
  kFLAKE_LAYER: keyOf({kFLAKE_LAYER: null}),

  kFACE_NOSE: keyOf({kFACE_NOSE: null}),
  kFACE_PUPIL: keyOf({kFACE_PUPIL: null}),
  kFACE_EYES: keyOf({kFACE_EYES: null}),
  kFACE_MOUTH: keyOf({kFACE_MOUTH: null}),
  kFACE_HAIR: keyOf({kFACE_HAIR: null}),
  kFACE_HAIR_BACK: keyOf({kFACE_HAIR_BACK: null}),
};

function createFlake(key, x, y, active, data) {
  return (
    <Flake 
      key={key}
      active={active}
      x={x}
      y={y}
      colors={data.get('colors')}
      flake_type={data.get('flake_type')}
      rotation_speed={data.get('rotation_speed')}
      scale={data.get('scale')}
      opacity={data.get('opacity')} />);
}

function createFlakeLayer(key, x, y, active, data) {
  return (
    <FlakeLayer 
      key={key}
      active={active}
      x={x}
      y={y}
      radius={data.get('radius')}
      rotation_speed={data.get('rotation_speed')}
      child_count={data.get('child_count')}
      flakeCreate={createPart(data.get('child_type'))}
      data={data.get('child')} />);
}

var createPart = function(part_type) {
    switch(part_type) {
      case partTypes.kFLAKE: 
        return createFlake;
      case partTypes.kFLAKE_LAYER: 
        return createFlakeLayer;

      case partTypes.kFACE_NOSE:
        return (key, x, y, active, data) => <Nose active={active} key={key} color={data.get('color')} x={x} y={y} />;

      case partTypes.kFACE_PUPIL:
        return (key, x, y, active, data) => <Pupil active={active} key={key} x={x} y={y} />;
      
      case partTypes.kFACE_EYES:
        return (key, x, y, active, data) => <Eyes active={active} key={key} x={x} y={y} />;

      case partTypes.kFACE_MOUTH:
        return (key, x, y, active, data) => <Mouth active={active} key={key} color={data.get('color')} x={x} y={y} />;
      
      case partTypes.kFACE_HAIR:
        return (key, x, y, active, data) => <Hair active={active} key={key} dy={data.get('dy')} colors={data.get('colors')} scale={data.get('scale')} rotation={data.get('rotation')} x={x} y={y} />;

      default:
        return createFlakeLayer;
    }
};

module.exports.partTypes = partTypes;
module.exports.createPart = createPart;
