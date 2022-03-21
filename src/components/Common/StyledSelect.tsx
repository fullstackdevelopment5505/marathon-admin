import React from 'react'
import Select from '@material-ui/core/Select';
import { SearchableSelect as SelectSearchable} from '@dccs/react-searchable-select-mui'

export const CustomSelect = (props) => {
  const {
    label,
    required
  } = props;

  const labelRequired = required ? `${label} *` : label;
  return (
      <Select
        {...props}
        label={labelRequired}
      />
  )
}

export const SearchableSelect = (props) => {
  const {
    label,
    required
  } = props;

  const labelRequired = required ? `${label} *` : label;
  return (
      <SelectSearchable
        {...props}
        label={labelRequired}
      />
  )
}


