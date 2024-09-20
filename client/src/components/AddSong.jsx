import * as React from 'react';
import {toast} from 'react-toastify';
import { DataGrid } from '@mui/x-data-grid';
import {Box, Button, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField, Grid} from '@mui/material'
import DropZone from './dropzone';

const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'firstName', headerName: 'Song name', width: 130 },
  { field: 'lastName', headerName: 'Artist name', width: 130 },
  {
    field: 'age',
    headerName: 'Duration',
    type: 'number',
    width: 90,
  },
  {
    field: 'fullName',
    headerName: 'Info',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 160,
    valueGetter: (params) =>
      `${params.row.firstName || ''} ${params.row.lastName || ''}`,
  },
];

const rows = [
  { id: 1, lastName: 'Bithiyan', firstName: 'Belliya Kodayaa', age: "3:05" },
  { id: 2, lastName: 'Bithiyan', firstName: 'Alli Mangalavatha', age: "4:02" },
  { id: 3, lastName: 'Bithiyan', firstName: 'Ennavey Enaga', age: "4:05" },
  { id: 4, lastName: 'Bithiyan', firstName: 'Haali Haali', age: "1:06" },
  { id: 5, lastName: 'Bithiyan', firstName: 'OnthuKadanaduMammanennu', age: "l:0l" },
  { id: 6, lastName: 'Bithiyan', firstName: 'manja neeru', age: "5:00" },
  { id: 7, lastName: 'Bithiyan', firstName: 'Oh Nenjey', age: "4:04" },
  { id: 8, lastName: 'Bithiyan', firstName: 'Singarulla Sona', age: "3:06" },
  { id: 9, lastName: 'Bithiyan', firstName: 'Neeyu Ennava', age: "6:05" },
];

export default function DataTable() {
  const [files, setFiles] = React.useState([]);
  const [Data,setData] = React.useState({
    songName:"",
    artistName:"",
    info:""
  });
  const inputHandler = (e) =>{
    const {name,value} = e.target;
    setData({
      ...Data,
      [name] : value
    })
  }
  return (
    <>
    <div class="container m-auto">
      <Grid container spacing={2}>
      <Grid item md={8}>
        <div style={{ height: 600, width: '100%' }}>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            checkboxSelection
          />
        </div>  
      </Grid>
      <Grid item md={4}>
          <h5>Add new song</h5>
          <DropZone selectedFiles={setFiles} buttonText={"Select files"} />
        <br/>
          <TextField 
          fullWidth 
          label="Song Name" 
          variant="outlined" 
          value={Data.songName}
          name="songName"
          onChange={(e)=>inputHandler(e)}
        />
        <br/>
        <br/>
        <TextField 
          fullWidth 
          label="Artist Name" 
          variant="outlined" 
          value={Data.artistName}
          name="artistName"
          onChange={(e)=>inputHandler(e)}
        />
        <br/>
        <br/>
        <TextField 
          fullWidth 
          label="Info" 
          variant="outlined" 
          value={Data.info}
          name="info"
          onChange={(e)=>inputHandler(e)}
        />
        <br/>
        <br/>
          <div className='text-center'>
              <Button variant='contained'>
                Submit
              </Button>
          </div>
      </Grid>
      </Grid>
    </div>
    </>
  );
}