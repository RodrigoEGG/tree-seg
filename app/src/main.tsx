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

		<Provider store={store}>
			<PersistGate loading={null} persistor={persistor}>
				<RouterProvider router={router} />
			</PersistGate>
		</Provider>
	</StrictMode>,

)
