import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { PersistGate } from 'redux-persist/integration/react'
import { RouterProvider } from 'react-router-dom'
import { persistStore } from 'redux-persist';
import store from './redux';
import { Provider } from 'react-redux';;
import './index.css'
import router from './router'

const persistor = persistStore(store);

createRoot(document.getElementById('root')!).render(

	<StrictMode>

		<PersistGate persistor={persistor}>

			<Provider store={store}>

				<RouterProvider router={router} />

			</Provider>

		</PersistGate>


	</StrictMode>,

)
