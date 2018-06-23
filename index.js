import { AppRegistry } from 'react-native';
import { YellowBox } from 'react-native';
import { StackNavigator, createStackNavigator } from 'react-navigation';
import LoginPage from './LoginPage';
import LiveMaps from './LiveMaps';
import SettingsPage from './SettingsPage';
import feltUncomfortable from './feltUncomfortable' ;
import HomePage from './HomePage';
import ReportPage from './ReportPage';


YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);

const App = createStackNavigator({
    LoginPage: { screen: LoginPage},
    HomePage: { screen: HomePage },
    ReportPage: { screen: ReportPage },
    SettingsPage: { screen: SettingsPage },
    LiveMaps: { screen: LiveMaps },
    feltUncomfortable: {screen: feltUncomfortable}
  }, 
  {initialRouteName: 'LoginPage'}
  );
  

AppRegistry.registerComponent('pestofrontend_5', () => App);



