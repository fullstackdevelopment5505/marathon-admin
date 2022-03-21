import React from 'react'
import { Card, CardContent, CardHeader, Typography } from '@material-ui/core'
import { ValidatorForm } from 'react-material-ui-form-validator'
import { Button } from './Button'

export function ValidatorFormWrapper({
  title = '',
  saveButtonName = '',
  saveDisabled = false,
  onSubmit = () => {},
  onCancel = () => {},
  header = null,
  children,
}) {
  return (
    <ValidatorForm onSubmit={onSubmit}>
      <Card style={{ padding: '1em' }}>
        <CardHeader
          title={title}
          style={{ width: '100%' }}
          component={Typography}
          variant="h4"
          disableTypography
          action={[
            <Button onClick={onCancel} secondary key="cancelButton">
              Cancel
            </Button>,
            <Button type="submit" disabled={saveDisabled} key="saveButton">
              {saveButtonName}
            </Button>,
          ]}
        />
        <CardContent>{header}</CardContent>
      </Card>
      <Card>
        <CardContent>{children}</CardContent>
      </Card>
    </ValidatorForm>
  )
}
