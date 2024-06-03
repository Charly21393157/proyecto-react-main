import { Box, Grid, Paper, Typography } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Tabla() {
  const [row2, setRows2] = useState([]);
  const [Show, setShow] = useState(false)

  //Cuando el componente esta siendo montado
  useEffect(() => {
    //Funcion para obtener datos de la API
    FetchData();
  }, []);

  useEffect(() => {
    if(Show == true)
    alert("Update del Componente");
  }, [Show])

  const columns: GridColDef[] = [
    //Field sirve para el nombre de la propiedad del dato a obtener
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "name",
      headerName: "Tipo",
      width: 150,
    },
    {
      field: "Name",
      headerName: "Episodio",
      width: 150,
      editable: true,
    },
    {
      field: "Name2",
      headerName: "Episodio2",
      width: 150,
      editable: true,
    },
  ];

  const FetchData = async () => {
    try {
      const response = await axios.get(
        "https://rickandmortyapi.com/api/character"
      );
      const data = response.data.results;
      console.log(data);
      setRows2(data);
    } catch (error) {
      console.error("Error", error);
    }
  };

  return (
    <Box>
      <Paper>
        <Grid item xs={12} md={12} lg={12}>
          <Typography>
            <strong>Movimientos</strong>
          </Typography>
          <button onClick={() => setShow (true)}>Boton</button>
        </Grid>
        <Grid item xs={12} md={12} lg={12}>
          <DataGrid
            rows={row2}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 5,
                },
              },
            }}
            pageSizeOptions={[5]}
          />
        </Grid>
      </Paper>
    </Box>
  );
}