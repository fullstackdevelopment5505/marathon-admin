import React from 'react'
import FormControl from '@material-ui/core/FormControl'
import { makeStyles } from '@material-ui/core/styles'
import { CustomSelect } from './StyledSelect'

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    width: '100%',
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}))

export const CustomeSelect = (options) => {
  const classes = useStyles();

  const {
    id,
    selectSource,
    dataSources,
    disabled,
    label,
    originalSource,
    ...other
  } = options

  return (
    <FormControl className={classes.formControl}>
      <CustomSelect
        label={label}
        disabled={disabled}
        options={dataSources}
        {...selectSource}
      />
    </FormControl>
  )
}
