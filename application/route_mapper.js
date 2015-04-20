'use strict';

var React = require('react-native');
var {
  StyleSheet,
  TouchableOpacity,
  View,
  Text
} = React;

var tmp_ = 0;

module.exports = function (scenes_) {
  return {
    LeftButton (route, navigator, index, navState) {
      if (index === 0) {
        return null;
      }

      var previousRoute = scenes_[index - 1];
      return (
        <TouchableOpacity
          onPress={() => navigator.pop()}>
          <View style={styles.navBarLeftButton}>
            <Text style={[styles.navBarText, styles.navBarButtonText]}>
              {previousRoute.title}
            </Text>
          </View>
        </TouchableOpacity>
      );
    },

    RightButton (route, navigator, index, navState) {
      if (index >= scenes_.length - 1) {
        return null;
      }
      
      var nextRoute = scenes_[index + 1];
      
      return (
        <TouchableOpacity
          onPress={() => navigator.push({
            index: index + 1,
          })}>
          <View style={styles.navBarRightButton}>
            <Text style={[styles.navBarText, styles.navBarButtonText]}>
              {nextRoute.title}
            </Text>
          </View>
        </TouchableOpacity>
      );
    },

    Title (route, navigator, index, navState) {
      var title = scenes_[index].title;
      return (
        <Text style={[styles.navBarText, styles.navBarTitleText]}>
          {title}
        </Text>
      );
    },
  };
};


var styles = StyleSheet.create({
  navBarText: {
    fontSize: 16,
    marginVertical: 10,
  },
  navBarTitleText: {
    color: '#FF00FF',
    fontWeight: '500',
    marginVertical: 9,
  },
  navBarLeftButton: {
    paddingLeft: 10,
  },
  navBarRightButton: {
    paddingRight: 10,
  },
  navBarButtonText: {
    color: '#FF0000',
  },

});

