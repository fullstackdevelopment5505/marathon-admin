import React, { useState } from 'react'
import { navigate, RouteComponentProps } from '@reach/router'
import { useFormState } from 'react-use-form-state-extended'
import Grid from '@material-ui/core/Grid'
import InputLabel from '@material-ui/core/InputLabel';
import TextField from '@material-ui/core/TextField'
import ReactJson from 'react-json-view'
import { sortByName, sortBySlug } from '../../../../utils';
import { FormWrapper } from '../../../Common/FormWrapper';
import { FormControlCustom } from '../../../Common/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { SearchableSelect } from '@dccs/react-searchable-select-mui';
import { ASSET_TYPE_PATH } from './index';
import { useMarathon } from '~/contexts';
import useAssetType from '~/hooks/useAssetType';

export const Form = ({ guid, assetType, errors = {} }:any) => {
  if (!assetType) {
    return null
  }

  const { assetTypeData, assetViews, groups, units, tagTypes, eventTypes, dataSources, loading, api: { getAssetTypeApi } } = useMarathon();
  const { create, update } = useAssetType();
  console.log("kdsjfskf", eventTypes);

  const [formState, { text }] = useFormState(assetType)
  const [isButtonClicked, setButtonClicked] = useState(false)
  const [isJsonChanged, setIsJsonChanged] = useState(false)
  const [parentId, setParentId] = useState(assetType.parentId || null)
  const [eventTypeId, setEventTypeId] = useState(assetType.eventTypeId)
  const [assetViewId, setAssetViewId] = useState(assetType.assetViewId)
  const [dataSourceId, setDataSourceId] = useState(assetType.dataSourceId)
  const [notificationGroupId, setNotificationGroupId] = useState(assetType.notificationGroupId)
  const [unitId, setUnitId] = useState(assetType.unitId)
  

  const filterUnits = () => {
    if (units) {
      const tagType = tagTypes.find((t) => t.id == assetType.id)
      const fUnits =
        tagType && tagType.unit
          ? units.filter((u) => u.baseUnitId == tagType.unit.baseUnitId)
          : []
      return fUnits
    }
    return []
  }

  const fieldOptions = {
    margin: 'normal',
    fullWidth: true,
  }

  const handleParentChange = (event:any) => {
    formState.values['parentId'] = event.target.value
    setParentId(event.target.value)
    setIsJsonChanged(true)
  }

  const handleChange = (event:any) => {    
    if(event.target.name === 'assetViewId'){
      setAssetViewId(event.target.value);
    }else if(event.target.name === 'eventTypeId'){
      setEventTypeId(event.target.value);
    }else if(event.target.name === 'dataSourceId'){
      setDataSourceId(event.target.value);
    }else if(event.target.name === 'notificationGroupId'){
      setNotificationGroupId(event.target.value);
    }else if(event.target.name === 'unitId'){
      setUnitId(event.target.value);
    }
    formState.values[event.target.name] = event.target.value;
    setIsJsonChanged(true);
  }

  const onJsonChange = (e:any, fieldName) => {
    if (e.updated_src) {
      formState.values[fieldName] = e.updated_src
      setIsJsonChanged(true)
    }
    return true
  }

  const onSubmit =  async (e:any) => {
    const {
      values,
      values: {
        name,
        slug,
        plural,
        dataSourceId,
        notificationGroupId,
        eventTypeId,
        assetViewId,
        parentId,
        styles,
        colors,
        unitId,
      },
    } = formState

    const postType = {
      name: name,
      slug: slug,
      plural: plural,
      dataSourceId: dataSourceId,
      eventTypeId: eventTypeId,
      unitId: unitId,
      parentId: parentId,
      assetViewId: assetViewId,
      notificationGroupId: notificationGroupId,
    }

    if (!parentId || parentId == '') {
      postType.parentId = null
    }

    if (!eventTypeId || eventTypeId == '') {
      postType.eventTypeId = null
    }

    if (!unitId || unitId == '') {
      postType.unitId = null
    }

    if (!assetViewId || assetViewId === '' || assetViewId === 'None') {
      postType.assetViewId = null
    }

    if (!notificationGroupId || notificationGroupId === '' || notificationGroupId === 'None') {
      postType.notificationGroupId = null
    }

    //force update of these fields
    delete assetType.parentId
    delete assetType.unitId
    delete assetType.assetViewId
    delete assetType.notificationGroupId
    delete assetType.eventTypeId

    if(guid){
      await update( guid, postType );
    }else{
      await create( postType );
    }

    navigate(ASSET_TYPE_PATH);
    e.preventDefault();
  }

  const onCancel = () => navigate(ASSET_TYPE_PATH);

  return (
    <FormWrapper
      title={guid ? 'Edit' : 'Create'}
      subTitle="Asset Type"
      saveDisabled={!formState.hasChanges && !isJsonChanged}
      saveButtonName={guid ? 'Save' : 'Create'}
      onSubmit={onSubmit}
      onCancel={onCancel}
    >
      <Grid container spacing={6}>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Name"
            required
            {...fieldOptions}
            {...text('name')}
            error={!!errors.name}
            helperText={!!errors.name && errors.name}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Slug"
            required
            {...fieldOptions}
            {...text('slug')}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Plural"
            required
            {...fieldOptions}
            {...text('plural')}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControlCustom>
            {
              assetTypeData ?
              <SearchableSelect
                label="Parent"
                value={parentId}
                onChange={handleParentChange}
                disabled={loading.anything || isButtonClicked}
                options={assetTypeData}
                keyPropFn={()=>{}}
                valuePropFn={(assetType)=>{return assetType.slug}}
              />:<></>
            }            
          </FormControlCustom>
        </Grid>
        
        <Grid item xs={12} sm={6}>
          <FormControlCustom >
            <InputLabel id="demo-simple-select-label">Datasource</InputLabel>
            <Select
              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              name='dataSourceId'
              onChange={handleChange}
              value={dataSourceId}
            >
              <MenuItem >{''}</MenuItem>
              {
                dataSources && dataSources.map( (row,index) => <MenuItem key={index} value={row.id}>{row.name}</MenuItem>)
              }
              
            </Select>
          </FormControlCustom>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControlCustom>
            <InputLabel id="demo-simple-select-label">Event Type</InputLabel>
            <Select
              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              name='eventTypeId'
              onChange={handleChange}
              value={eventTypeId}
            >
              <MenuItem >{'None'}</MenuItem>
              {
                eventTypes ? eventTypes.map( (row,index) => <MenuItem key={index} value={row.id}>{row.name}</MenuItem>):<></>
              }
              
            </Select>
          </FormControlCustom>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControlCustom>
            <InputLabel id="demo-simple-select-label">Display Unit</InputLabel>
            <Select
              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              name='unitId'
              onChange={handleChange}
              value={unitId}
            >
              <MenuItem >{'None'}</MenuItem>
              {
                units && filterUnits().sort(sortByName).map( (row,index) => <MenuItem key={index} value={row.id}>{row.name}</MenuItem>)
              }
              
            </Select>
          </FormControlCustom>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControlCustom >
            <InputLabel id="demo-simple-select-label">Asset View</InputLabel>
            <Select
              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              name='assetViewId'
              value={assetViewId}
              onChange={handleChange}
            >
              <MenuItem >{'None'}</MenuItem>
              {
                assetViews && assetViews.map( (row,index) => <MenuItem key={index} value={row.id}>{row.name}</MenuItem>)
              }
              
            </Select>
          </FormControlCustom>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControlCustom>
            <InputLabel id="demo-simple-select-label">Notification Group</InputLabel>
            <Select
              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              name='notificationGroupId'
              value={notificationGroupId}
              onChange={handleChange}
            >
              <MenuItem >{'None'}</MenuItem>
              {
                groups && groups.map( (row,index) => <MenuItem key={index} value={row.id}>{row.name}</MenuItem>)
              }
              
            </Select>
          </FormControlCustom>
        </Grid>
        <Grid item xs={12} sm={6}>
          <ReactJson
            name="Styles"
            src={assetType.styles || []}
            onEdit={(e) => onJsonChange(e, 'styles')}
            onAdd={(e) => onJsonChange(e, 'styles')}
            onDelete={(e) => onJsonChange(e, 'styles')}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <ReactJson
            name="Colors"
            src={assetType.colors || []}
            onEdit={(e) => onJsonChange(e, 'colors')}
            onAdd={(e) => onJsonChange(e, 'colors')}
            onDelete={(e) => onJsonChange(e, 'colors')}
          />
        </Grid>
      </Grid>
    </FormWrapper>
  )
}
