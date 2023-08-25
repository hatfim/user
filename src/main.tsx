import './index.css';

import { ThemeProvider } from '@ui/providers/ThemeProvider'; // You should update the path
import { Provider } from 'jotai';
import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';

const rootElement = document.querySelector('#root') as Element;

if (!rootElement.innerHTML) {
	const root = ReactDOM.createRoot(rootElement);
	root.render(
		<React.StrictMode>
			<Provider>
				<ThemeProvider defaultTheme="light">
					<App />
				</ThemeProvider>
			</Provider>
		</React.StrictMode>
	);
}
