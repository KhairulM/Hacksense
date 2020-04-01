import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { 
  Card,
  CardContent,
} from '@material-ui/core';
import Carousel from 'react-material-ui-carousel';

const useStyles = makeStyles(theme => ({
  title: {
    fontWeight: 'bold !important',
    marginBottom: '20px',
  },
  bold: {
    fontWeight: 'bold !important'
  },
  center: {
    margin: 'auto',
    textAlign: 'center',
  },
  cardContainer: {
    paddingTop: '20px',
    paddingBottom: '20px',
  },
  mb20: {
    marginBottom: '20px !important',  
  },
  mb10: {
    marginBottom: '10px',
  },
  updateProfile: {
    fontSize: '10px'
  },
  projectPhoto: {
    height: '100%',
    width: 'auto'
  },
  carouselImage: {
    borderRadius: '10px',
    height: '250px',
    margin: 'auto',
    display: 'block',
  },
  backIcon: {
    marginRight: '10px',
    width: '50px'
  }
}));

const ProjectDetailCard = ({children, ...props}) => {
  const styles = useStyles();
  const { carouselItems } = props;


  return (
    <Card variant="outlined" className={styles.mb20}>
      <CardContent>
        <Carousel>
          {carouselItems.map((item, index) => {
            return (
              <img key={`carousel-${index}`} className={styles.carouselImage} alt="carousel-item" {...item} />
            )
          })}
        </Carousel>
        <hr />
        {children}
      </CardContent>
    </Card>
  )
};

export default ProjectDetailCard;