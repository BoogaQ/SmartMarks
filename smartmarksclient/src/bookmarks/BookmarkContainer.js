import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Bookmark from "./bookmark";
import {ajax} from "../utils/API";
import {API_URL} from "../constants/constants";

const styles = theme => ({
  layout: {
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
  },
  card: {
    margin: theme.spacing.unit,
    height: 200,
    display: 'flex',
    flexDirection: 'column',
  },

  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing.unit * 6,
  },
});

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

class BookmarkContainer extends React.Component {
  constructor() {
    super();
    this.state = {
      lastDeleted: "",
      data: [],
    }
    this.handleDeleteBookmark = this.handleDeleteBookmark.bind(this);
  }
  loadBookmarks() {
    ajax.get(API_URL + "users/user/bookmarks").then(response => {
      console.log(response.data);
      this.setState({data: response.data});
    }).catch(error => {
      console.log(error);
    })
  }
  handleDeleteBookmark = (url) => {
    this.loadBookmarks();
  }
  componentDidMount() {
    this.loadBookmarks();
  }
  render() {
    const { classes } = this.props;
    const bookmarks = this.state.data;
    return (   
      <React.Fragment>
        <CssBaseline />
        <main>
          <div className={classNames(classes.layout, classes.cardGrid)}>
            <Grid container>
              {bookmarks.map(bookmark => (
                <Grid item sm={6} md={4} lg={3}>
                  <Bookmark containerRemove={this.handleDeleteBookmark} url={bookmark.url} title={bookmark.name}/>
                </Grid>
              ))}
            </Grid>
          </div>
        </main>
      </React.Fragment>
    );
  }
}

BookmarkContainer.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(BookmarkContainer);