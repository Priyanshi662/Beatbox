import React from 'react';
import {ChakraProvider} from '@chakra-ui/react';
import store from './redux/store.jsx';
import {PersistGate } from 'redux-persist/integration/react';
import {persistStore} from 'redux-persist';
import { Provider } from 'react-redux'
import {RouterProvider} from 'react-router-dom';
// import { router} from './router/index.js';

function App() {
  return (
    <>
        <Provider store={store}>
          <PersistGate persistor={persistStore(store)}>
            <ChakraProvider 
              theme={theme}
              toastOptions={{
                  defaultOptions:{
                    position:"top",
                    isClosable:true,
                    variant:"subtle",
                    containerStyle:{fontSize: 14}
                  }
                }}
            >
            <RouterProvider router={router}/>
            </ChakraProvider>
          </PersistGate>
        </Provider>
    </>
  )
}

export default App