'use strict';

var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  Navigator,
  TouchableOpacity,
  View,
  Text,
  PixelRatio
} = React;

var FlexTest = require('./application/common/flex_test.js');
var Fish = require('./application/common/fish.js');

var fish_cfg_istarkov = require('./application/istarkov_fish/fish_cfg_istarkov.js');
var create_istarkov_fish_part = require('./application/istarkov_fish/fish_flake_types.js').createPart;

var Dimensions = require('Dimensions');
var kSCREEN_WIDTH = Dimensions.get('window').width;
var kSCREEN_HEIGHT = Dimensions.get('window').height;

var scenes_ = [
  {
    title: 'istarkov',
    component: (route, nav, active) => (
      <Fish 
        options={
          {
            dimensions: {width: kSCREEN_WIDTH, height: kSCREEN_HEIGHT},
            body: { b_sigma: 0.3, b_mu: 0.5, b_r_scale: 30, b_min_r: 0, b_length: 16, b_flakes_count: 12, 
                    b_flake_colors: ['#F0F00F', '#000F0F', '#F0000F', '#F00F0F', '#000AE0']}
          }} 
        create={fish_cfg_istarkov}
        createPart={create_istarkov_fish_part}
        {...route}
        active={active}
        navigator={nav} />),
  },
  {
    title: 'hz',
    component: (route, nav, active) => (
      <Fish 
        options={
          {
            dimensions: {width: kSCREEN_WIDTH, height: kSCREEN_HEIGHT},
            body: { b_sigma: 0.33, b_mu: 0.8, b_r_scale: 30, b_min_r: 0, b_length: 20, b_flakes_count: 10, 
                    b_flake_colors: ['#F00F9F', '#00FFEF', '#FFFF00', '#0000FF', '#F06F9F']}
          }} 
        create={fish_cfg_istarkov}
        createPart={create_istarkov_fish_part}
        {...route}
        active={active}
        navigator={nav} />),
  },

  {
    title: 'Temp',
    component: (route, nav, active) => <FlexTest {...route} active={active} navigator={nav} />,
  }
];

var route_mapper = require('./application/route_mapper.js');

var animation = React.createClass({
  
  renderScene (route, nav) {    
    return scenes_[route.index].component(route, nav, this.state.play_anim && route.index === this.state.current_route); //<FlexTest {...route} navigator={nav} />;
  },

  routeMapper: route_mapper(scenes_),

  getInitialState() {
    return {
      current_route: 0,
      play_anim: false,
    };
  },

  render() {
    return (
      <Navigator 
        style={styles.navigator}
        initialRoute={{ index: this.state.current_route }}
        renderScene={this.renderScene}
        onWillFocus={(r) => this.setState({play_anim: false, current_route: r.index})} //to detect current view inside view (props.navigator.getCurrentRoutes() does not call redraw)
        onDidFocus={(r) => this.setState({play_anim: true})} //
        navigationBar={
          <Navigator.NavigationBar
            routeMapper={this.routeMapper}
            style={styles.navBar} />
        } />
    );
  }
});

var styles = StyleSheet.create({
  navigator: {
    paddingTop: Navigator.NavigationBar.Styles.General.TotalNavHeight
  },

  navBar: {
    backgroundColor: 'white',
    borderBottomWidth: 1 / PixelRatio.get(), //very thin line
    borderBottomColor: '#EEEEEE',
  },
});

AppRegistry.registerComponent('animation', () => animation);
