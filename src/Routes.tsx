
import { EditMember } from '@ui/pages/EditMember';
import { Home } from '@ui/pages/Home';
import { Members } from '@ui/pages/Members';
import { Route, Switch } from 'wouter';

const Routes = () => {
	return (
		<Switch>
			<Route path="/" component={Home} />
			<Route path="/members" component={Members} />
			<Route path="/members/edit/:id" component={EditMember} />
		</Switch>
	);
};

export default Routes;
