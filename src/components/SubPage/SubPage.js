import React, {Component} from 'react';
import {connect} from 'react-redux';
import moment from 'moment';
import IconButton from '@material-ui/core/IconButton';
import CheckOutlined from '@material-ui/icons/DoneOutline';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
// for confirmation dialog
import Button from '@material-ui/core/Button';
import CheckCircle from '@material-ui/icons/CheckCircle';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';


import './SubPage.css';

const CustomTableCell = withStyles(theme => ({
  head: {
    backgroundColor: 'lightgrey',
    color: 'black',
  },
  body: {
    fontsize: 14,
  },
}))(TableCell)

const styles = theme => ({
  root: {
    width: '99%',
    marginTop: theme.spacing(3),
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
  row: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default,
    },
  },
  shiftTableContainer: {
    width: '70%',
    margin: 'auto',
  }, 
  iconContainer: {
    textAlign: 'center',
  },
  success: {
    color: theme.palette.primary.light,
    fontSize: '3rem',
  },
  title: {
    color: theme.palette.primary.light,
  },
});

class SubPage extends Component {

  state = {
    open: false,
  }

  componentDidMount () {
    this.props.dispatch({type: 'FETCH_SUB_SHIFTS'});
  };

  handleClick = ( event, shiftId ) => {
    // console.log( 'Got a click on shift with id', shiftId );
    this.props.dispatch( { type: 'TAKE_SUB_SHIFT', payload: shiftId } );
    this.setState({
      open: true,
    })
  };

  handleClose = () => {
    this.setState({
      open: false,
    })
  }

  render() {
    const { classes } = this.props
    return (
      <>
          <h2 id="title">Sub Opportunities</h2>
          <Paper className={classes.shiftTableContainer} id="sub-table-container">
              <Table className={classes.table}>
                <TableHead>
                  <TableRow>
                    <CustomTableCell id="what-when">
                      What and When
                    </CustomTableCell>
                    <CustomTableCell id="signup">
                      Sign Up
                    </CustomTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                {this.props.state.shift.subShifts.map( (shift) => 
                  <TableRow key={shift.id}>
                    <CustomTableCell id="what-when-cell">
                    {shift.title}: {moment(shift.date).format('dddd, MMMM Do, YYYY')} at {shift.start_of_lesson}
                    </CustomTableCell>
                    <CustomTableCell className="signup-button-cell">
                      <IconButton onClick={ (event) => this.handleClick( event, shift.id ) }>
                        <CheckOutlined className="signup-button"/>
                      </IconButton>
                    </CustomTableCell>
                  </TableRow>
                 )}
                </TableBody>
          </Table>
        </Paper>
        <Dialog
          open={this.state.open}
        >
          <DialogTitle className={classes.title}>Shift Added to Schedule</DialogTitle>
          <DialogContent className={classes.iconContainer}>
              <CheckCircle className={classes.success} />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Close
            </Button>
          </DialogActions>
         </Dialog>
      </>
    )
  }
}


const mapStateToProps = state => ({
    state
  });

export default connect(mapStateToProps)(withStyles(styles)(SubPage));
