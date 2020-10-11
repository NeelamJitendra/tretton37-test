import React from 'react';
import './App.css';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    root: {
        margin: theme.spacing(),
        minWidth: 100,
        float:'right',
        marginRight:'2%',
    },
})

class SortMenu extends React.Component{
    constructor(props){
      super(props);
      this.state={
        sortValue:1
      };
    
    }
    handleChange = (event) => {
        this.setState({sortValue:event.target.value},()=>this.props.sortEmp(event.target.value));
      };
    
  render(){
    const {classes} =this.props;
    const sortValue = this.state.sortValue;
    return (
            <form autoComplete="off">
                <FormControl variant="outlined" size="small" className={classes.root}>
                    <InputLabel htmlFor="Sort"> Sort </InputLabel>
                    <Select
                        onChange={(e)=>this.handleChange(e)}
                        value={sortValue}
                        input={<OutlinedInput labelWidth={100}
                            name= "Sort"
                            id= "Sort"/>}>
                        
                        <MenuItem value={1}>Sort by Office </MenuItem>
                        <MenuItem value={2}>Sort by Name</MenuItem>
                    </Select>
                </FormControl>
            </form>
    );
  }
}
export default (withStyles(styles) (SortMenu));