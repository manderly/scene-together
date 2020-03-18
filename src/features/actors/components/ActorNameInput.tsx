/* 
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
*/

// *https://www.registers.service.gov.uk/registers/country/use-the-api*

import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CircularProgress from '@material-ui/core/CircularProgress';

import { findActorByName } from 'services/actor';

interface Actor {
  name: string;
  id: number;
}

interface IActorNameInput {
    id: string;
    name: string;
    handleChange: (value: any) => void;
    label: string;
}

const ActorNameInput: React.FC<IActorNameInput> = ({ id, name, handleChange, label }) => {
//export default function Asynchronous() {
  const [userInput, setUserInput] = React.useState('');
  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState<Actor[]>([]);
  const loading = open && options.length === 0;

  const updateUserInput = (event: React.ChangeEvent<{ value: unknown }>) => {
    setUserInput(event.target.value as string);
  };

  React.useEffect(() => {
    let active = true;

    if (!loading) {
      return undefined;
    }

    (async () => {
      console.log(`fetching search suggestions for ${userInput}...`);
      const response = await findActorByName(userInput);

      const actors = response.results;

      if (active) {
        setOptions(Object.keys(actors).map(key => actors[key]) as Actor[]);
      }
    })();

    return () => {
      console.log("setting active to false");
      active = false;
    };
  }, [loading]);

  React.useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);

  return (
    <Autocomplete
      id={id}
      style={{ width: 300 }}
      open={open}
      onOpen={() => {
        if (userInput.length >= 3) {
          setOpen(true);
        }
      }}
      onClose={() => {
        setUserInput('');
        setOpen(false);
      }}
      getOptionSelected={(option, value) => option.name === value.name}
      getOptionLabel={option => option.name}
      options={options}
      loading={loading}
      renderInput={params => (
        <TextField
          {...params}
          label={label}
          variant="outlined"
          helperText='ex: "Tom Hanks"'
          value={userInput}
          onChange={updateUserInput}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <React.Fragment>
                {loading ? <CircularProgress color="inherit" size={20} /> : null}
                {params.InputProps.endAdornment}
              </React.Fragment>
            ),
          }}
        />
      )}
    />
  );
}

export default ActorNameInput;
