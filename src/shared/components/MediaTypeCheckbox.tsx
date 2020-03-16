import React from 'react';

// https://dev.to/pretaporter/typescript-simple-react-components-occ

// define the params here 
interface IMediaTypeCheckbox {
  onChange: (value: boolean) => void;
  label: string;
  checked: boolean;
}

// "...shared" means "anything I didn't account for" is in an object called "shared" 
// functional component of the type "IMediaTypeChecbox"
const MediaTypeCheckbox: React.FC<IMediaTypeCheckbox> = ({ children, onChange, label, checked = false }) => {
  return (
    <>   {/* Empty tag so it returns one node */}
      <label>{label}</label>
      <input 
        type='checkbox' onChange={e => onChange(e.target.checked)} checked={checked}/>
    </>
  );
}

export default MediaTypeCheckbox;