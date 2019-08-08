import React from 'react';
import axios from 'axios';
import MaterialTable from 'material-table';

export default class Config extends React.Component{
  constructor(){
    super()
    this.state= {
      //initialize headers for table
      columns: [],
      data: []
    }
  }
  async componentDidMount(){
    this.fetchData();
  }

  update = async(newData, oldData) => {

  }

  add = async(data) =>{
    try{ 
      await axios.post("/api/rooms/new", data);
    } catch(error){
      console.log(error.response.data);
    }
    this.fetchData();
  }

  delete = async(data) =>{
    try {
      await axios.delete(`/api/rooms/delete/${data.id}`);
    } catch(error) {
      console.log(error.response.data);
    }
    this.fetchData();
  }

  fetchData = async() => {
    try {
      // retrieve data
      const result = await axios.get("/api/rooms/all");
      const columns = Object.keys(result.data[0]).filter(column => column !== "id" && column !== "startDate" && column !== "endDate" ).map(column => {
        return {
          //Capitalize first letter of word in the column title, leave the rest lowercase
          title: column.slice(0,1).toUpperCase() + column.slice(1).toLowerCase(),
          field: column
        }
      })

      this.setState( {data: result.data,columns} );
      
      } catch(error){
        console.log(error)
    }

  }
  render(){
    return(
      <div style={{ maxWidth: "100%"}}>
      <MaterialTable
        title="Edit Rooms"
        columns={this.state.columns}
        data={this.state.data}
        editable={{
          onRowAdd: newData => this.add(newData),
          // onRowUpdate: (newData, oldData) => this.update( newData, oldData),
          onRowDelete: oldData => this.delete(oldData),
        }}
      />
      </div>
    )
  }
}
