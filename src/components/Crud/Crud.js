import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import {Modal,TextField} from '@material-ui/core';
import {Link, Redirect } from 'react-router-dom';
import dataJson from '../../Data.json'
import './Crud.css';
import CreateIcon from '@material-ui/icons/Create';
import IconButton from '@material-ui/core/IconButton';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { useForm } from "react-hook-form";

document.body.style = 'background: darkcyan;';
const useStyles = makeStyles((theme) => ({
  hero:{
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://imagenescityexpress.scdn6.secure.raxcdn.com/sites/default/files/2017-12/santiago-nuevo-leon.jpg')`,
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
  blogsContainer:{
    paddingTop: theme.spacing(3),
    backgroundColor: "darkcyan",
  },
  blogTitle:{
    fontSize: "24px",
    paddingBottom: theme.spacing(3),
    alignItems:"left",
    justifyContent: "left",
  },
  card: {
    maxWidth: 345,
    marginBottom:"10px"
  },
  media: {
    height: 140,
  },
  modal:{
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
  }
}));

function Crud() {
  const classes = useStyles();
  const [modal,setModal]= useState(false);
  const [modalEdit,setModalEdit]= useState(false);
  const [modalDelete,setModalDelete]= useState(false);
  const [filterPost,setFilterPost]= useState("All");

  const [postSelected,setPostSelected]= useState({
    id:"" ,
    title:"" ,
    category:"" ,
    url:""
  });

  const [postView,setPostView]= useState({
    id:"" ,
    title:"" ,
    category:"" ,
    url:""
  });

  const selectPost = (elemento,caso) =>{
    if (caso==="Editar"){
      setPostSelected(elemento)
      setModalEdit(true)
    }

    if (caso==="Eliminar"){
      setPostSelected(elemento)
      setModalDelete(true)
    }  
    
  }

  const handleChange = e =>{
    const {name,value} = e.target
    setPostSelected((prevState=>({
      ...prevState,
      [name]:value
    })));
    console.log(postSelected);
  }

  const edit = () =>{
    var dataNew = data;
    dataNew.map(postNew=>{
      if(postNew.id===postSelected.id){
        if(postSelected.title!=="" && postSelected.description!=="" && postSelected.category!=="" && postSelected.url!==""){
        postNew.title=postSelected.title;
        postNew.description=postSelected.description;
        postNew.category=postSelected.category;
        postNew.url=postSelected.url;
        setData(dataNew);
        setModalEdit(false);
        }else{
          alert("faltan datos en el formulario")
        }
      }}
    )
  }

  const deletePost = () =>{
    setData(data.filter(postDeleted=>postDeleted.id!==postSelected.id));
    setModalDelete(false);
  }

  const insertPost = () =>{
    console.log(postSelected)
    if(postSelected===null){
      alert("Por favor, llena todos los campos")
    }else{
    if(postSelected.title==="" || postSelected.category==="" || postSelected.description==="" || postSelected.url===""){
      alert("Por favor, llena todos los campos")
    }else{
    console.log(postSelected)
    var insertNew = postSelected;
    insertNew.id = data[data.length-1].id+1;
    var newPost = data;
    newPost.push(insertNew);
    setData(newPost);
    setModal(!modal)
    console.log(data)
  }}}

  const travelPost = () =>{
    setFilterPost("Travel");
  }

  const lifestylePost = () =>{
    setFilterPost("Lifestyle");
  }

  const businessPost = () =>{
    setFilterPost("Business");
  }

  const foodPost = () =>{
    setFilterPost("Food");
  }

  const workPost = () =>{
    setFilterPost("Work");
  }

  const allPost = () =>{
    setFilterPost("All");
  }

  const result = dataJson.data
  console.log(result)


  const [data,setData] = useState(result);


  const abrirCerrarModal = () =>{
    setModal(!modal);
    setPostSelected(null);
  }
  
  const abrirCerrarEdit = () =>{
    setModalEdit(!modalEdit)
  }

  const abrirCerrarDelete = () =>{
    setModalDelete(!modalDelete)
  }

  const body =(
    <div className={classes.modal}>
      <form className={classes.root} noValidate autoComplete="off">
        <TextField className={classes.textField} id="standard-basic" name="title" placeholder="Title" value={postSelected ? postSelected.title:""} onChange={handleChange}/>
        <TextField className={classes.textField} id="standard-basic" name="description" placeholder="Description" value={postSelected ? postSelected.description:""} onChange={handleChange}/>
        <Select className={classes.textField} id="standard-basic" name="category" placeholder="Category" value={postSelected ? postSelected.category:""} onChange={handleChange}>
          <InputLabel>Category:</InputLabel>
          <MenuItem value={"Travel"}>Travel</MenuItem>
          <MenuItem value={"Lifestyle"}>Lifestyle</MenuItem>
          <MenuItem value={"Business"}>Business</MenuItem>
          <MenuItem value={"Food"}>Food</MenuItem>
          <MenuItem value={"Work"}>Work</MenuItem>
        </Select>
        <TextField className={classes.textField} id="standard-basic" name="url" placeholder="URL of the image" value={postSelected ? postSelected.url:""} onChange={handleChange} />
        <br/><br/>
        <div align="right">
          <Button color="primary" onClick={()=>insertPost()}>Enviar</Button>
          <Button onClick={()=>abrirCerrarModal()}>Cancelar</Button>
        </div>
      </form>
    </div>
  )

  const bodyEdit =(
    <div className={classes.modal}>
      <form className={classes.root} noValidate autoComplete="off">
        <TextField className={classes.textField} id="standard-basic" name="title" label="Title" onChange={handleChange} value={postSelected && postSelected.title}/>
        <TextField className={classes.textField} id="standard-basic" name="description" label="Description" onChange={handleChange} value={postSelected && postSelected.description}/>
        <Select className={classes.textField} id="standard-basic" name="category" placeholder="Category" value={postSelected ? postSelected.category:""} onChange={handleChange}>
          <InputLabel>Category:</InputLabel>
          <MenuItem value={"Travel"}>Travel</MenuItem>
          <MenuItem value={"Lifestyle"}>Lifestyle</MenuItem>
          <MenuItem value={"Business"}>Business</MenuItem>
          <MenuItem value={"Food"}>Food</MenuItem>
          <MenuItem value={"Work"}>Work</MenuItem>
        </Select>
        <TextField className={classes.textField} id="standard-basic" name="url" label="URL of the image" onChange={handleChange} value={postSelected && postSelected.url}/>
        <br/><br/>
        <div align="right">
          <Button color="primary" onClick={()=>edit()}>Actualizar</Button>
          <Button onClick={()=>abrirCerrarEdit()}>Cancelar</Button>
        </div>
      </form>
    </div>
  )

  const bodyDelete =(
    <div className={classes.modal}>
      <form className={classes.root} noValidate autoComplete="off">
        <p>¿Do you want to delete {postSelected && postSelected.title}?</p>
        <br/><br/>
        <div align="right">
          <Button color="primary" onClick={()=>deletePost()} >Si</Button>
          <Button onClick={()=>setModalDelete(false)}>No</Button>
        </div>
      </form>
    </div>
  )

  return (
    <React.Fragment>
    <div> 
      <IconButton aria-label="create" onClick={()=>abrirCerrarModal()}>
        Create Post
        <CreateIcon />
      </IconButton>
      <Modal
      open={modal}
      onClose={abrirCerrarModal}
      >
        {body}
      </Modal>

      <Box className={classes.hero}>
        <Box>
          Discovering The World
        </Box>
      </Box>
      <Container maxWidth="lg" className={classes.blogsContainer}>
        <Typography variant="h4" className={classes.blogTitle}>
          Articles
        </Typography>
        <div className="filter">
          Filter:
          <button onClick={()=>allPost()}>All</button>
          <button onClick={()=>travelPost()}>Travel</button>
          <button onClick={()=>lifestylePost()}>Lifestyle</button>
          <button onClick={()=>businessPost()}>Business</button>
          <button onClick={()=>foodPost()}>Food</button>
          <button onClick={()=>workPost()}>Work</button>
        </div>
        <Grid container spacing={3}>
          {data.map(elemento=>{
          if(filterPost==="All"){
            return(
          <Grid itm xs={12} sm={6} md={4}>
            <Card className={classes.card}>
              <CardActionArea>
                <CardMedia
                  className={classes.media}
                  image={elemento.url}
                  
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    {elemento.title}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" component="p">
                    {elemento.description}
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions>
                <Link  to={`${elemento.id}`}>
                <Button size="small" color="primary">
                  Learn More
                </Button>
                </Link>
                <Button size="small" color="primary" onClick={()=>selectPost(elemento,"Editar")}>
                  Edit
                </Button>
                <Modal
                open={modalEdit}
                onClose={abrirCerrarEdit}
                >
                  {bodyEdit}
                </Modal>
                <Button size="small" color="primary" onClick={()=>selectPost(elemento,"Eliminar")}>
                  Delete
                </Button>
                <Modal
                open={modalDelete}
                onClose={abrirCerrarDelete}
                >
                  {bodyDelete}
                </Modal>
              </CardActions>
            </Card>
          </Grid>
          )}else if(filterPost==="Travel"){
            if(elemento.category===filterPost){
              return(
                <Grid itm xs={12} sm={6} md={4}>
                  <Card className={classes.card}>
                    <CardActionArea>
                      <CardMedia
                        className={classes.media}
                        image={elemento.url}
                        
                      />
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                          {elemento.title}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                          {elemento.description}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                    <CardActions>
                      <Link  to={`${elemento.id}`}>
                      <Button size="small" color="primary">
                        Learn More
                      </Button>
                      </Link>
                      <Button size="small" color="primary" onClick={()=>selectPost(elemento,"Editar")}>
                        Edit
                      </Button>
                      <Modal
                      open={modalEdit}
                      onClose={abrirCerrarEdit}
                      >
                        {bodyEdit}
                      </Modal>
                      <Button size="small" color="primary" onClick={()=>selectPost(elemento,"Eliminar")}>
                        Delete
                      </Button>
                      <Modal
                      open={modalDelete}
                      onClose={abrirCerrarDelete}
                      >
                        {bodyDelete}
                      </Modal>
                    </CardActions>
                  </Card>
                </Grid>
                )}
          }else if(filterPost==="Lifestyle"){
            if(elemento.category===filterPost){
              return(
                <Grid itm xs={12} sm={6} md={4}>
                  <Card className={classes.card}>
                    <CardActionArea>
                      <CardMedia
                        className={classes.media}
                        image={elemento.url}
                        
                      />
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                          {elemento.title}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                          {elemento.description}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                    <CardActions>
                      <Link  to={`${elemento.id}`}>
                      <Button size="small" color="primary">
                        Learn More
                      </Button>
                      </Link>
                      <Button size="small" color="primary" onClick={()=>selectPost(elemento,"Editar")}>
                        Edit
                      </Button>
                      <Modal
                      open={modalEdit}
                      onClose={abrirCerrarEdit}
                      >
                        {bodyEdit}
                      </Modal>
                      <Button size="small" color="primary" onClick={()=>selectPost(elemento,"Eliminar")}>
                        Delete
                      </Button>
                      <Modal
                      open={modalDelete}
                      onClose={abrirCerrarDelete}
                      >
                        {bodyDelete}
                      </Modal>
                    </CardActions>
                  </Card>
                </Grid>
                )}
          }else if(filterPost==="Business"){
            if(elemento.category===filterPost){
              return(
                <Grid itm xs={12} sm={6} md={4}>
                  <Card className={classes.card}>
                    <CardActionArea>
                      <CardMedia
                        className={classes.media}
                        image={elemento.url}
                        
                      />
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                          {elemento.title}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                          {elemento.description}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                    <CardActions>
                      <Link  to={`${elemento.id}`}>
                      <Button size="small" color="primary">
                        Learn More
                      </Button>
                      </Link>
                      <Button size="small" color="primary" onClick={()=>selectPost(elemento,"Editar")}>
                        Edit
                      </Button>
                      <Modal
                      open={modalEdit}
                      onClose={abrirCerrarEdit}
                      >
                        {bodyEdit}
                      </Modal>
                      <Button size="small" color="primary" onClick={()=>selectPost(elemento,"Eliminar")}>
                        Delete
                      </Button>
                      <Modal
                      open={modalDelete}
                      onClose={abrirCerrarDelete}
                      >
                        {bodyDelete}
                      </Modal>
                    </CardActions>
                  </Card>
                </Grid>
                )}
          }else if(filterPost==="Food"){
            if(elemento.category===filterPost){
              return(
                <Grid itm xs={12} sm={6} md={4}>
                  <Card className={classes.card}>
                    <CardActionArea>
                      <CardMedia
                        className={classes.media}
                        image={elemento.url}
                        
                      />
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                          {elemento.title}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                          {elemento.description}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                    <CardActions>
                      <Link  to={`${elemento.id}`}>
                      <Button size="small" color="primary">
                        Learn More
                      </Button>
                      </Link>
                      <Button size="small" color="primary" onClick={()=>selectPost(elemento,"Editar")}>
                        Edit
                      </Button>
                      <Modal
                      open={modalEdit}
                      onClose={abrirCerrarEdit}
                      >
                        {bodyEdit}
                      </Modal>
                      <Button size="small" color="primary" onClick={()=>selectPost(elemento,"Eliminar")}>
                        Delete
                      </Button>
                      <Modal
                      open={modalDelete}
                      onClose={abrirCerrarDelete}
                      >
                        {bodyDelete}
                      </Modal>
                    </CardActions>
                  </Card>
                </Grid>
                )}
          }else if(filterPost==="Work"){
            if(elemento.category===filterPost){
              return(
                <Grid itm xs={12} sm={6} md={4}>
                  <Card className={classes.card}>
                    <CardActionArea>
                      <CardMedia
                        className={classes.media}
                        image={elemento.url}
                        
                      />
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                          {elemento.title}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                          {elemento.description}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                    <CardActions>
                      <Link  to={`${elemento.id}`}>
                      <Button size="small" color="primary">
                        Learn More
                      </Button>
                      </Link>
                      <Button size="small" color="primary" onClick={()=>selectPost(elemento,"Editar")}>
                        Edit
                      </Button>
                      <Modal
                      open={modalEdit}
                      onClose={abrirCerrarEdit}
                      >
                        {bodyEdit}
                      </Modal>
                      <Button size="small" color="primary" onClick={()=>selectPost(elemento,"Eliminar")}>
                        Delete
                      </Button>
                      <Modal
                      open={modalDelete}
                      onClose={abrirCerrarDelete}
                      >
                        {bodyDelete}
                      </Modal>
                    </CardActions>
                  </Card>
                </Grid>
                )}
          }
            })}
        </Grid>
      </Container>
    </div>
    </React.Fragment>
  );
}

export default Crud;
