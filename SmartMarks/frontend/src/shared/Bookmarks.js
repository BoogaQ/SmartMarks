import React from 'react';
import PropTypes from "prop-types";
import {withStyles} from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Bookmark from "../bookmarks/bookmark";
import classNames from 'classnames';
import {SORT} from '../constants';
import store from '../store';

const styles = (theme) => ({
  container: {
    padding: theme.spacing.unit * 3,
    marginLeft: 300,
    overflow: "auto",
    height: "93.9vh",
  },
  layout: {
    width: "auto",
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unut,
    [theme.breakpoints.up(1600)]: {
      width: 1000,
      marginLeft: "auto",
      marginRight: "auto",
    },
  },
  sortButton: {
    float: "right",
  },
  cardGrid: {
    padding: `${theme.spacing.unit * 8}px 0`,
  },
})

const Bookmarks = ({bookmarks, classes, dispatch}) => {
  // React hooks, decided to use the new technology for the newest components. 
  const [sort, setSort] = React.useState('');
  const handleChange = event => {
    setSort(event.target.value);
  };
  return (
    <Paper className={classes.container}>    
      <div className={classNames(classes.layout, classes.cardGrid)}>
      <select 
        className={classes.sortButton}
        onChange={handleChange}>
        <option>Sort by...</option>
        <option value="LATEST">Sort by latest</option>
        <option value="OLDEST">Sort by oldest</option>
      </select>
      <button onClick={() => dispatch({type: SORT, sortType: sort })} className={classes.sortButton}>Sort</button>
        <Grid container spacing={15}>
          {(bookmarks || []).map(bookmark => (
            <Grid item sm={6} md={4} lg={4} key={bookmark.id}>
              <Bookmark 
                key={bookmark.name}
                tags={bookmark.tags} 
                url={bookmark.url} 
                title={bookmark.name}/>
            </Grid>
          ))}
        </Grid>
      </div>
    </Paper>
  )
}

Bookmarks.propTypes = {
  classes: PropTypes.object.isRequired,
  bookmarks: PropTypes.array.isRequired,
}

export default withStyles(styles)(Bookmarks);