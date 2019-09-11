import {connect} from 'react-redux';
import SideBar from './SideBar';
import {withStyles} from "@material-ui/core/styles";

const styles = theme => ({
	root: {
    flexGrow: 1,
		display: "flex",
	},
	drawer: {
		
	},
	panel: {
		padding: 0,
	},
	list: {
		width: 300,
		overflow: "auto",
	},
	block: {
		width: 300,
	},
	tagSearch: {
		width: 100,
	},
	searchItem: {
		display: "inline-block",
	}
});

const mapStateToProps = state => ({
  projects: state.projectState,
	tags: state.tagState,
	bookmarks: state.bookmarkState,
})


export default connect(
  mapStateToProps
)(withStyles(styles)(SideBar));