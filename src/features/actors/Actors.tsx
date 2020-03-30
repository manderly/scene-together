import React from 'react';
import Form from 'shared/containers/form/Form';
import Instructions from 'shared/components/Instructions';
import { searchTypes } from 'shared/enums/enums';

const Actors: React.FC = () => {  // functional component 

	return (
		<div id="actors">
			<Instructions
				title="Search by actor names"
				subtitle="Enter the names of two actors to find out what films they've worked on together."
			/>

			<Form searchType={searchTypes.byActors}/>
		</div>
	);
}

export default Actors;