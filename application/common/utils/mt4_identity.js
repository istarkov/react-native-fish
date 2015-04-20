'use strict';

//gl-matrix library uses Float32Array for matrix create, i need Array
module.exports.create = function() {
  return [
    1, 0, 0, 0, 
    0, 1, 0, 0,
    0, 0, 1, 0,
    0, 0, 0, 1
  ];
};
