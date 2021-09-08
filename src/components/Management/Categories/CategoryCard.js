import React from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {Link} from "react-router-dom";

export const CategoryCard = ({category_id}) => { //add category_payload here ...
  return (

    <Link to={`/manage/categories/${category_id}`} style={{textDecoraton: "none"}}> 
      <Card style={{maxWidth:"150px"}}>
        <CardActionArea>
          <CardMedia
            component="img"
            alt="Category 1"
            height="140"
            image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRk2sWWbbrGDHHZaBQLFqwas4h9CN88q05Tzw&usqp=CAU"
            title="Category 1"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              Category 1
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
            
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size="small" color="primary">
            Edit
          </Button>
          <Button size="small" color="primary">
            Delete
          </Button>
        </CardActions>
      </Card>
  </Link>
  );
}