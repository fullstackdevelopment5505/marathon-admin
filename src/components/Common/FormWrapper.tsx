import React, { useState } from 'react'
import {
  Card,
  CardContent,
  CardHeader,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@material-ui/core'
import { Button } from './Button'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  header: {
    paddingLeft: '0em',
    marginRight: '2em',
  },
  button: {
    marginTop: '1.5em',
    marginRight: '1.5em',
    width: '10em',
  },
  deleteButton: {
    marginTop: '1.5em',
    marginRight: '1.5em',
    width: '10em',
    color: theme.palette.error.main,
    borderColor: theme.palette.error.main,
    '&:hover': {
      color: theme.palette.background.paper,
      backgroundColor: theme.palette.error.main,
      borderColor: theme.palette.error.main,
    },
  },
}))

export function FormWrapper({
  title = '',
  subTitle = '',
  saveDisabled = false,
  deleteDisabled = false,
  hideDelete = true,
  saveButtonName = '',
  deleteConfirmation = '',
  onSubmit = (e) => {},
  onDelete = () => {},
  onCancel = () => {},
  children,
}) {
  const classes = useStyles()

  const [openDelete, setOpenDelete] = useState(false)

  const handleOpenDelete = () => {
    setOpenDelete(true)
  }

  const handleCloseDelete = () => {
    setOpenDelete(false)
  }

  return (
    <>
      <Card style={{ padding: '1em' }}>
        <CardHeader
          className={classes.header}
          title={title}
          style={{ width: '100%' }}
          component={Typography}
          variant="h4"
          disableTypography
          action={[
            <Button onClick={onCancel} secondary key="cancelButton">
              Cancel
            </Button>,
            !hideDelete && (
              <Button
                onClick={handleOpenDelete}
                disabled={deleteDisabled}
                secondary
                key="deleteButton"
              >
                Delete
              </Button>
            ),
            <Button onClick={onSubmit} disabled={saveDisabled} key="saveButton">
              {saveButtonName}
            </Button>,
          ]}
        />
        <CardContent style={{ padding: '2em' }}>
          <Typography variant="h6" children={subTitle} />
          {children}
        </CardContent>
      </Card>

      <Dialog
        open={openDelete}
        onClose={handleCloseDelete}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{'Delete'}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {deleteConfirmation}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={onDelete} color="primary">
            Yes
          </Button>
          <Button onClick={handleCloseDelete} color="primary" autoFocus>
            No
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
