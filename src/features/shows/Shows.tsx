import React from 'react';
import Form from 'shared/containers/form/Form';
import Instructions from 'shared/components/Instructions';
import { searchTypes } from 'shared/enums/enums';

const Shows: React.FC = () => {  // functional component 

  return (
		<div>
      <Instructions
        title="Search by show names"
        subtitle="Enter the names of two shows (movies or TV) to find out which actors have appeared in both."
      />

      <Form searchType={searchTypes.byShows}/>
		</div>
	);
}

export default Shows;