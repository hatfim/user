import type { ReactElement } from 'react';
import { Router } from 'wouter';

import { Header } from '@ui/organisms/Header';

import Routes from './Routes';

const App = (): ReactElement => {
	return (
		<Router>
			<Header />
			<main className="container">
				<Routes />
			</main>
		</Router>
	);
};

export default App;
