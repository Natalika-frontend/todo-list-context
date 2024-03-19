import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { TodosProvider } from './AppContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<React.StrictMode>
		<TodosProvider>
			<App />
		</TodosProvider>
	</React.StrictMode>,
);

document.documentElement.lang = 'ru';
