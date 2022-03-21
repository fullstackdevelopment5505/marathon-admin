import React, { useState, useEffect } from 'react'
import MaterialTable , { Column, Icons } from '@material-table/core';
import { navigate, RouteComponentProps} from '@reach/router'
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import { createTheme } from '@material-ui/core/styles';
import { StyledPage } from '../../../Common/StyledPage'
import { tableOption } from '../../../../utils/options'
import { ASSET_TYPE_PATH } from './index'
import { AssetType } from '~/classes/AssetType';
import useAssetType from '~/hooks/useAssetType';

export const Table = (props: RouteComponentProps) => {
  const {loading, getAssetTypes, remove} = useAssetType();
  
  const [tableData, setTableData] = useState([]);
  const [path, setPath] = useState(JSON.parse(localStorage.getItem("path") || "[]"));

  useEffect(() => {
    const getAssetType = async () => {
      const assetTypes = await getAssetTypes();        
      setTableData(assetTypes);
    }
    getAssetType();
  }, []);

  const theme = createTheme({
    palette: {
      primary: {
        main: '#f77e23',
      },
      secondary: {
        main: '#f77e23',
      },
    },
  });

  // const handleRemove = (assetType) => {
  //   console.log( assetType );
  //   // message.warning(`Removed ${assetType.name}`)
  // }

  // const hasChildren = (assetType) => {
  //   const children = assetTypes.filter((a) => a.parentId === assetType.id)
  //   return children.length === 0
  // }

  const columns: Array<Column<AssetType>> = [
    {
      title: 'Name',
      field: 'name',
      defaultSort: 'asc',
      editable: 'never',

    },
    {
      title: 'Slug',
      field: 'slug',
      editable: 'never',

    },
    {
      title: 'Plural',
      field: 'plural',
      editable: 'never',

    },
    {
      title: 'Data Source',
      field: 'dataSourceName',
      editable: 'never',

    },
    {
      title: 'Event Type',
      field: 'eventTypeName',
      editable: 'never',

    },
    {
      title: 'Asset View',
      field: 'assetViewName',
      editable: 'never',

    },
    {
      title: 'Unit',
      field: 'unitName',
      hidden: false,
      editable: 'never',

    },
    {
      title: 'Notification Group',
      field: 'notificationGroupName',
      editable: 'never',

    },
  ];
  return (
    <StyledPage style={{ overflow: 'scroll' }}>
      <MuiThemeProvider theme={theme}>
        <MaterialTable
          data={tableData}
          isLoading={loading}
          // loadingType="linear"
          localization={{
            body: {
              emptyDataSourceMessage: 'No Asset Types to display',
            },
            pagination: {
              labelRowsSelect: 'Asset Types',
            },
          }}
          onTreeExpandChange={(e)=> {
            if(path.filter(row => row.id === e.id).length > 0){
              localStorage.setItem("path", JSON.stringify(path.filter(row=> row.id != e.id)));
            }else{              
              localStorage.setItem("path", JSON.stringify([...path, e]));
            }            
          }}
          title="Asset Types"
          // paging
          // selectColumns
          parentChildData={(row, rows) => rows.find(a => a.id === row.parentId)}
          columns={columns}
          actions={[
            {
              icon: 'add',
              tooltip: 'Create Asset Type',
              isFreeAction: true,
              onClick: () => navigate(`${ASSET_TYPE_PATH}/create`),
            },
            {
              icon: 'edit',
              tooltip: 'Edit Asset Type',
              onClick: (event, { id }) => {
                // localStorage.setItem("path", JSON.stringify(path));
                navigate(`${ASSET_TYPE_PATH}/edit/${id}`);
              },
            },
          ]}
          // search
          // messages
          // isDeletable={(assetType) => hasChildren(assetType)}
          // onRemove={(assetType) => handleRemove(assetType)}

          editable={{
            onRowDelete: (oldData) => {
              return new Promise((resolve, reject) => {
                setTimeout( async () => {
                  const dataDelete = [...tableData];
                  const target = dataDelete.find((el) => el.id === oldData.tableData.id);
                  const index = dataDelete.indexOf(target);
                  await remove(oldData.tableData.id);
                  dataDelete.splice(index, 1);
                  setTableData([...dataDelete]);
                  resolve(0);
                }, 1000);
              });
            },
          }}
          
          options={{
            pageSize: 10,
            grouping: false,
            pageSizeOptions: [10, 20],
            rowStyle: (rowData) => {
              const path = rowData.tableData.path
              return {
                backgroundColor: path.length % 2 === 0 ? '#eee' : '#fff',
                borderLeft: `${(path.length - 1) * 5}em solid #ccc`,
              }
            },
            actionsColumnIndex: -1,
            columnsButton: true,
            // defaultExpanded: true
            
          }}
          style={tableOption}
        />
      </MuiThemeProvider>      
    </StyledPage>
  )
}
