import React from 'react';
import { TextField } from '@material-ui/core';

// define the params here 
interface IActorNameInput {
    id: string;
    name: string;
    handleChange: (value: any) => void;
    label: string;
}

const ActorNameInput: React.FC<IActorNameInput> = ({ id, name, handleChange, label }) => {
    return (
        <TextField 
            id={id}
            variant="outlined"
            fullWidth
            label={label}
            color="secondary" 
            helperText='ex: "Tom Hanks"'
            value={name}
            onChange={handleChange}
        />
    );
}

export default ActorNameInput;