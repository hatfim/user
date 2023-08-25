import type { Address, Company, UserData } from './UserTypes';

export class User implements UserData {
	public id: number;

	public name: string;

	public avatar: string;

	public username: string;

	public email: string;

	public address: Address;

	public phone: string;

	public website: string;

	public company: Company;

	public love: boolean;

	public constructor(data: UserData) {
		this.id = data.id;
		this.name = data.name;
		this.username = data.username;
		this.email = data.email;
		this.address = {
			street: data.address?.street,
			suite: data.address?.suite,
			city: data.address?.city,
			zipcode: data.address?.zipcode,
			geo: {
				lat: data.address?.geo.lat,
				lng: data.address?.geo.lng,
			},
		};
		this.phone = data.phone;
		this.website = data.website;
		this.company = {
			name: data.company?.name,
			catchPhrase: data.company?.catchPhrase,
			bs: data.company?.bs,
		};
		this.avatar = User.generateAvatarUrl(data.username);
		this.love = data.love || false;
	}

	static generateAvatarUrl(username: string): string {
		return `https://api.dicebear.com/6.x/lorelei/svg?seed=${username}`;
	}
}
