import React from 'react';

type EditMembersProps = {
	params: {
		id: string;
	};
	// ... other props if any
};

export const EditMember: React.FC<EditMembersProps> = ({ params }) => {
	const memberId = params.id;

	// ... rest of your component

	return <div>{memberId}</div>; // just as an example
};
