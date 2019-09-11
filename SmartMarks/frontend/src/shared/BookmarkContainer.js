import {connect} from 'react-redux';
import Bookmarks from './Bookmarks';
import {withStyles} from "@material-ui/core/styles";

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
  cardGrid: {
    padding: `${theme.spacing.unit * 8}px 0`,
  },
})

const mapStateToProps = state => ({
  bookmarks: state.bookmarkState
})

export default connect(
  mapStateToProps,
)(withStyles(styles)(Bookmarks));