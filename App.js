// import React, {createContext, useEffect, useReducer} from 'react';
// import Catalog from './src/Catalog';
// import {NavigationContainer} from '@react-navigation/native';
// import {createNativeStackNavigator} from '@react-navigation/native-stack';
// import SplashScreen from './src/SplashScreen';
// import ServerIp from './src/ServerIp';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import {Provider} from 'react-redux';
// import {PersistGate} from 'redux-persist/integration/react';
// import {persistor, store} from './src/feacture/store';

// export const AuthContext = createContext();
// const App = () => {
//   const Stack = createNativeStackNavigator();

//   const [state, dispatch] = useReducer(
//     (prevState, action) => {
//       switch (action.type) {
//         case 'RESTORE_TOKEN':
//           return {
//             ...prevState,
//             userToken: action.token,
//             isLoading: false,
//           };
//         case 'SIGN_IN':
//           return {
//             ...prevState,
//             isSignout: false,
//             userToken: action.token,
//           };
//         case 'SIGN_OUT':
//           return {
//             ...prevState,
//             isSignout: true,
//             userToken: null,
//           };
//         default:
//           return prevState;
//       }
//     },
//     {
//       isLoading: true,
//       isSignout: false,
//       userToken: null,
//     },
//   );

//   useEffect(() => {
//     const bootstrapAsync = async () => {
//       let userToken;
//       try {
//         userToken = await AsyncStorage.getItem('serverIP');
//       } catch (e) {
//         console.error('Failed to load user token from storage');
//       }
//       dispatch({type: 'RESTORE_TOKEN', token: userToken});
//     };

//     bootstrapAsync();
//   }, []);

//   const authContext = React.useMemo(
//     () => ({
//       signIn: async serverIP => {
//         await AsyncStorage.setItem('serverIP', serverIP);
//         dispatch({type: 'SIGN_IN', token: serverIP});
//       },
//       signOut: async () => {
//         await AsyncStorage.removeItem('serverIP');
//         dispatch({type: 'SIGN_OUT'});
//       },
//     }),
//     [],
//   );

//   if (state.isLoading) {
//     return <SplashScreen />;
//   }

//   return (
//     <Provider store={store}>
//       <PersistGate persistor={persistor}>
//         <NavigationContainer>
//           <AuthContext.Provider value={authContext}>
//             <Stack.Navigator>
//               {state.userToken == null ? (
//                 <>
//                   <Stack.Screen
//                     name="SplashScreen"
//                     component={SplashScreen}
//                     options={{headerShown: false}}
//                   />
//                   <Stack.Screen
//                     name="ServerIp"
//                     component={ServerIp}
//                     options={{headerShown: false}}
//                   />
//                 </>
//               ) : (
//                 <Stack.Screen
//                   name="Catalog"
//                   component={Catalog}
//                   options={{headerShown: false}}
//                 />
//               )}
//             </Stack.Navigator>
//           </AuthContext.Provider>
//         </NavigationContainer>
//       </PersistGate>
//     </Provider>
//   );
// };

// export default App;

import React, {createContext, useEffect, useReducer} from 'react';
import Catalog from './src/Catalog';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SplashScreen from './src/SplashScreen';
import ServerIp from './src/ServerIp';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {persistor, store} from './src/feacture/store';

export const AuthContext = createContext();

const App = () => {
  const Stack = createNativeStackNavigator();

  const [state, dispatch] = useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'RESTORE_TOKEN':
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
          };
        case 'SIGN_IN':
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token,
          };
        case 'SIGN_OUT':
          return {
            ...prevState,
            isSignout: true,
            userToken: null,
          };
        default:
          return prevState;
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null,
    },
  );

  useEffect(() => {
    const bootstrapAsync = async () => {
      let userToken;
      try {
        userToken = await AsyncStorage.getItem('serverIP');
      } catch (e) {
        console.error('Failed to load user token from storage');
      }
      dispatch({type: 'RESTORE_TOKEN', token: userToken});
    };

    bootstrapAsync();
  }, []);

  const authContext = React.useMemo(
    () => ({
      signIn: async serverIP => {
        await AsyncStorage.setItem('serverIP', serverIP);
        dispatch({type: 'SIGN_IN', token: serverIP});
      },
      signOut: async () => {
        await AsyncStorage.removeItem('serverIP');
        dispatch({type: 'SIGN_OUT'});
      },
    }),
    [],
  );

  // if (state.isLoading) {
  //   return <SplashScreen />;
  // }

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <NavigationContainer>
          <AuthContext.Provider value={authContext}>
            <Stack.Navigator>
              {state.userToken == null ? (
                <>
                  <Stack.Screen
                    name="SplashScreen"
                    component={SplashScreen}
                    options={{headerShown: false}}
                  />
                  <Stack.Screen
                    name="ServerIp"
                    component={ServerIp}
                    options={{headerShown: false}}
                  />
                </>
              ) : (
                <Stack.Screen
                  name="Catalog"
                  component={Catalog}
                  options={{headerShown: false}}
                />
              )}
            </Stack.Navigator>
          </AuthContext.Provider>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
};

export default App;
