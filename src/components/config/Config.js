import React from 'react';
import axios from 'axios';
import MaterialTable from 'material-table';

export default class Config extends React.Component{
    constructor(){
        super()
        this.state= {
          //initialize headers for table
            columns: [],
            data: [

            ]
        }
    }
    async componentDidMount(){
        try{
        // retrieve data
        const result = await axios.get("/api/rooms/all");
        console.log(Object.keys(result.data[0]));
        const columns = Object.keys(result.data[0]).map(column => {
          return {
            title: column.slice(0,1).toUpperCase() + column.slice(1).toLowerCase(),
            field: column
          }
        })
        this.setState({data: result.data,columns})
        } catch(error){
            console.log(error)
        }
    }

    //methods go here
    changeHandler = (event) =>{

        //function that handles change ?

    }
    update = (oldData, newData) => {

    }
    add =(data) =>{

    }
    delete = (data) =>{

    }
    render(){

        return(
          <div style={{ maxWidth: "100%" }}>
          <MaterialTable
            title="Edit Rooms"
            columns={this.state.columns}
            data={this.state.data}
            editable={{
              onRowAdd: newData => this.add(newData),
              onRowUpdate: (newData, oldData) => this.update( newData, oldData),
              onRowDelete: oldData => this.delete(oldData),
            }}
          />
          </div>
        )
    }
}