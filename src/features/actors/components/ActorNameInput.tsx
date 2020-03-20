import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CircularProgress from '@material-ui/core/CircularProgress';
import useDebounce from 'shared/hooks/useDebounce';
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
    exampleName: string;
    setActorID: (id: number) => void;
}

function assembleHelptext(exampleName: string) {
  return `ex: "${exampleName}"`;
};

const ActorNameInput: React.FC<IActorNameInput> = ({ id, name, handleChange, label, exampleName, setActorID }) => {
//export default function Asynchronous() {
  const [userInput, setUserInput] = React.useState('');
  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState<Actor[]>([]);
  const loading = open && options.length === 0;

  const debouncedUserInput = useDebounce(userInput, 250);

  const updateUserInput = (event: React.ChangeEvent<{ value: unknown }>) => {
    setUserInput(event.target.value as string);
  }

  React.useEffect(() => {
    if (debouncedUserInput.length >= 3) {
      (async () => {
        //console.log(`fetching search suggestions for ${debouncedUserInput}...`);
        const response = await findActorByName(debouncedUserInput);
        const actors = response.results;
        // populates the dropdown list of actors with names like the search query
        setOptions(Object.keys(actors).map(key => actors[key]) as Actor[]);
      })();
    }
  }, [debouncedUserInput]);


  React.useEffect(() => {
    let active = true;

    if (!loading) {
      return undefined;
    }

    return () => {
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
      onChange={(event: object, value: any, reason: string) => {
        // calls the method that was passed in from Actors.tsx to set Actor ID in Actors.tsx's state
        setActorID(value.id)
      }}
      onClose={() => {
        setUserInput('');
        setOpen(false);
      }}
      getOptionSelected={(option, value) => {
        return option.name === value.name
      }}
      getOptionLabel={option => option.name}
      options={options}
      loading={loading}
      renderInput={params => (
        <TextField
          {...params}
          label={label}
          variant="outlined"
          helperText={assembleHelptext(exampleName)}
          value={userInput}
          onChange={updateUserInput}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <React.Fragment>
                {loading ? <CircularProgress color="inherit" size={20} /> : null}
              </React.Fragment>
            ),
          }}
        />
      )}
    />
  );
}

export default ActorNameInput;
