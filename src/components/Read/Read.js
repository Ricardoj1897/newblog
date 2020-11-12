import React, {useState, useHistory, useLocation, useEffect} from 'react';
import dataJson from '../../Data.json'
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import { BrowserRouter, Switch, Route, Link,useParams } from 'react-router-dom';
import './Read.css';
import Button from '@material-ui/core/Button';
import {Modal,TextField} from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import {ValidatorForm,TextValidator} from 'react-material-ui-form-validator'

document.body.style = 'background: darkcyan;';
const useStyles = makeStyles((theme) =>({
  hero:{
    height: "500px",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    position: "relative",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "#fff",
    fontSize: "32px"
  },
  comments:{
    position: "absolute",
    width: 400,
    backgroundColor: "white",
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: "16px 32px 24px",
    top: "20%",
    left: "30%",
    transform: "(-50%, -50%)",
    align:"center"
  },
  textField:{
    width: "100%"
  },
  card: {
    maxWidth: 345,
    align:"right",
    border: "2px solid",
    borderColor: "#009ade",
    backgroundColor:"darkkhaki",
    marginLeft:"10px",
    marginTop:"10px",
  },
  media: {
    height: 50,
    width: 80,
    marginLeft:"20px",
    marginTop:"10px",
  },
})
)

const Read = () => {
  var   {  id } = useParams();
  var myInt = parseInt(id);
  console.log(id)
  const classes = useStyles();
  const result = dataJson.data
  const [data,setData] = useState(result);
  const [comments,setComments]= useState(false);
  const [commentNew,setCommentNew]= useState({
    id:"" ,
    name:"" ,
    text:"" 
  });
  const commentPost = [
    {id:0,name:"",text:""},
  ];

  const [datac,setDatac] = useState(commentPost);
  
  const insertComment = () =>{
    var comsNew = commentNew;
    comsNew.id = myInt;
    if(comsNew.name==="" || comsNew.text===""){
      alert("Please, fill all the fields")
    }else{
    var comnt = datac;
    comnt.push(comsNew);
    setDatac(comnt);
    setComments(!comments);
    console.log(commentPost)
    }
  }

  const abrirCerrarModal = () =>{
    setComments(!comments);
  }

  const handleChange = e =>{
    const {name,value} = e.target
    setCommentNew((prevState=>({
      ...prevState,
      [name]:value
    })));
    console.log(commentNew);
  }

  const bodycmt =(
    <div className={classes.comments}>
      <form className={classes.root} noValidate autoComplete="off">
        <TextField required="true" className={classes.textField} validators={["required"]} id="standard-basic" name="name" placeholder="Name" value={commentNew ? commentNew.name:""} onChange={handleChange} />
        <TextField required="true" className={classes.textField} validators={["required"]} id="standard-basic" name="text" placeholder="Your Comment" value={commentNew ? commentNew.text:""} onChange={handleChange}/>
        <br/><br/>
        <div align="right">
          <Button onClick={()=>insertComment()} color="primary">Enviar</Button>
          <Button onClick={()=>abrirCerrarModal()}>Cancelar</Button>
        </div>
      </form>
    </div>
  )
 
return (
  <React.Fragment>
      <div>

        {data.map(posting=>{
          console.log(myInt)
          console.log(posting.id)
          if(posting.id!==myInt){
          }else{
            return(
              <Box className="box_style">
              <Box>
                <div className="infoSection">
                <img  className="banner" src={posting.url}/>
                <h1 className="header_title">
                {posting.title}
                <h4 className="header_description">
                  {posting.description}
                </h4>
                <p className="header_category">
                  Label: {posting.category}
                </p>
                <div className="modalSection">
                  <button className="modalComment" onClick={()=>abrirCerrarModal()}>Create a new response</button>
                  <Modal
                  open={comments}
                  onClose={abrirCerrarModal}
                  >
                    {bodycmt}
                  </Modal>
                </div>
                </h1>
                </div>
                <React.Fragment>
                  {datac.map(com=>{
                    console.log(myInt)
                    console.log(com.id)
                    if(com.id!==myInt){
                      return(
                        <div>
                        
                        </div>
                      )
                    }else{
                      return(
                        <Card className={classes.card}>
                        <CardActionArea>
                        <CardMedia
                          className={classes.media}
                          image="https://www.kindpng.com/picc/m/78-785827_user-profile-avatar-login-account-male-user-icon.png"
                        />
                          <CardContent className="textCard">
                            <Typography gutterBottom variant="h5" component="h2">
                              {com.name}
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                              {com.text}
                            </Typography>
                          </CardContent>
                        </CardActionArea>
                      </Card>
                      )
                    }
                  })}
                </React.Fragment>
              </Box>
              </Box>
              )
          }
        })}
      </div>
    
  </React.Fragment>
);


}


export default (Read);