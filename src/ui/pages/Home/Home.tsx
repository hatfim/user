import { UserFollow } from '@carbon/icons-react';

import { Button } from '@ui/atoms/Button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@ui/molecules/Tabs';
import { UserList } from '@ui/organisms/UserList/UserList';

export const Home = () => {
	return (
		<section className="py-12">
			<div className="flex items-center justify-between space-y-2">
				<h2 className="text-3xl font-bold tracking-tight">Users</h2>
				<div className="flex items-center space-x-2">
					<Button className="inline-flex items-center justify-between text-xs">
						<UserFollow className="mr-2 h-4 w-4" />
						Add New User
					</Button>
				</div>
			</div>
			<Tabs defaultValue="overview" className="mt-4">
				<TabsList>
					<TabsTrigger value="overview">Overview</TabsTrigger>
					<TabsTrigger value="analytics" disabled>
						Analytics
					</TabsTrigger>
					<TabsTrigger value="reports" disabled>
						Reports
					</TabsTrigger>
					<TabsTrigger value="notifications" disabled>
						Notifications
					</TabsTrigger>
				</TabsList>
				<TabsContent value="overview" className="mt-4">
					<UserList />
				</TabsContent>
			</Tabs>
		</section>
	);
};
