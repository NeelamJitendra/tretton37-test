import React, {Component} from 'react';
import { withStyles , fade } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import GitHubIcon from './Git.png';
import TwitterIcon from './twitter.png';
import LinkedInIcon from './linkedin.png';
import StackOverFlowIcon from './StackOverFlowIcon.png';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import './App.css'
import SortMenu from './SortMenu';

const styles = theme => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      margin: theme.spacing(2),
      Width: '280px',
      Height: '300px',
      maxWidth: '280px',
      maxHeight: '300px',

    },

    img: {
      width: 200,
      height: 200,
      marginLeft: 4
    },
    text:{
        fontSize:12,
        textAlign: 'center',
        fontWeight: 'bold',
        marginRight: 80
    },
    container:{        
      padding: theme.spacing(),
      maxWidth: '100%',
    },
    IconButton:{
        height:28,
    },
    search: {
      display: 'block',
        position: 'relative',
        maxWidth: '10%',
        float: 'right',
        marginRight:'2%',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
          backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        width: '100%',
        [theme.breakpoints.up('sm')]: {
          marginLeft: theme.spacing(1),
          width: 'auto',
        },
      },
      searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      },
      inputRoot: {
        color: 'inherit',
      },
      inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
          width: '12ch',
          '&:focus': {
            width: '20ch',
          },
        },
      },
  });

       

class EmployeeCards extends Component{
    constructor(props){
      super(props);
      this.state={
        empData:[],
        filtered:''
      };
    
    }
    callAPI(){
      fetch('http://localhost:9000/testAPI')
        .then(res=>res.json())
        .then(res => this.setState({empData:res}))
    }
  
    componentWillMount(){
      this.callAPI();
      }
    handleChange=(e,currentList)=> {
        let newList = [];
        if (e.target.value !== "") {
    
            newList=currentList.filter(obj => {
            let filter = e.target.value.toLowerCase();
            let objName = obj.name.toLowerCase();
            let objCity = obj.office.toLowerCase();
            let objGH = false;
            let objLN = false;
            let objTW = false;
            let objSF = false;
            if(obj.gitHub!==null){
                objGH = obj.gitHub.toLowerCase().includes(filter)
            }
            if(obj.linkedIn!==null){
                objLN = obj.linkedIn.toLowerCase().includes(filter)
            }
            if(obj.twitter!==null){
                objTW = obj.twitter.toLowerCase().includes(filter)
            }
            if(obj.stackOverflow!==null){
                objSF = obj.stackOverflow.toLowerCase().includes(filter)
            }
            return objName.includes(filter) || objCity.includes(filter) || objGH || objLN || objTW || objSF;
            })
        } 
        else{
          newList=[];
        }
        this.setState({
          filtered: newList
        });
    };

    sortEmp=(e,empData)=>{
      if(e===1){
        empData.sort((a, b)=>{
          return a.office.toLowerCase().localeCompare( b.office.toLowerCase())
        })
      }
      else{
        empData.sort((a, b)=>{
          return a.name.toLowerCase().localeCompare( b.name.toLowerCase())
        })
      }
      this.setState({empData});
    }
    
    render(){
        
        const {classes} =this.props;
        const empData = this.state.filtered.length===0? this.state.empData: this.state.filtered;
      return (
        <div className={classes.root}>
          
            <div className={classes.search}>
                <div className={classes.searchIcon}>
                    <SearchIcon />
                </div>
                <InputBase
                    placeholder="Search…"
                    classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                    }}
                    inputProps={{ 'aria-label': 'search' }}
                    onChange={(e)=>this.handleChange(e,empData)}
                />
            </div> <br/><br/>
                <SortMenu sortEmp={(e)=>this.sortEmp(e,empData)}/>
                <Grid container spacing={2} className={classes.container}  justify="center" alignItems="center">
                    {empData.map((emp,idx)=>{
                        return(
                            <Paper className={classes.paper}>
                                <Grid container item xs={8} spacing={3} wrap="nowrap">
                                   <Grid item > <img className={classes.img}src={emp.imagePortraitUrl} alt="No photo"/></Grid>
                                        
                                    <Grid item>
                                        <IconButton disabled={emp.gitHub===null} href={"https://github.com/"+emp.gitHub} target="_blank">
                                            <img className={classes.IconButton} src={GitHubIcon} alt="No photo"/>
                                        </IconButton>
                                        
                                        <IconButton disabled={emp.linkedIn===null} href={"https://www.linkedin.com"+emp.linkedIn} target="_blank">
                                            <img className={classes.IconButton} src={LinkedInIcon} alt="No photo"/>
                                        </IconButton>
                                        
                                        <IconButton disabled={emp.twitter===null} href={"https://twitter.com/"+emp.twitter} target="_blank">
                                            <img className={classes.IconButton} src={TwitterIcon} alt="No photo"/>
                                        </IconButton>

                                        <IconButton disabled={emp.stackOverflow===null} href={"https://stackoverflow.com/users/"+emp.stackOverflow} target="_blank">
                                            <img className={classes.IconButton} src={StackOverFlowIcon} alt="No photo"/>
                                        </IconButton>
                                    </Grid>
                                </Grid>
                                    <Grid className={classes.text}> 
                                        {emp.name}<br/>
                                        Office: {emp.office}
                                    </Grid>
                            </Paper>
                                
                        ) 
                        })}
                </Grid>
        </div>
      );
    }
  }
  export default (withStyles(styles) (EmployeeCards));