// https://material-ui.com/components/tables/
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {POPOVER_BODY} from './constants.jsx';
import PopoverButton from './popover_button.jsx'
function createData(name, type, meaning) {
  return { name, type, meaning};
}

const rows = [
  createData(<PopoverButton tone='Anger' type='emotion'/>, 
            'Emotional', 
            POPOVER_BODY['anger']),
  createData(<PopoverButton tone='Fear' type='emotion'/>, 
            'Emotional', 
            POPOVER_BODY['fear']),
  createData(<PopoverButton tone='Joy' type='joy'/>, 
            'Emotional', 
            POPOVER_BODY['joy']),
  createData(<PopoverButton tone='Sadness' type='emotion'/>, 
            'Emotional', 
            POPOVER_BODY['sadness']),
  createData(<PopoverButton tone='Analytical' type='language'/>, 
            'Language', 
            POPOVER_BODY['analytical']),
  createData(<PopoverButton tone='Confident' type='language'/>, 
            'Language', 
            POPOVER_BODY['confident']),
  createData(<PopoverButton tone='Tentative' type='language'/>, 
            'Language', 
            POPOVER_BODY['tentative']),
];

export default function SimpleTable() {
  const window_width = window.innerWidth;
  if (window_width > 560) {
    let useStyles = makeStyles(theme => ({
      root: {
        maxWidth: window_width - 200,
        marginTop: theme.spacing(3),
        overflowY: 'scroll'
      },
      table: {
        maxWidth: window_width - 200,
      },
    }));
    const classes = useStyles();
    return (
      <Paper className={classes.root}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>Tone Name</TableCell>
              <TableCell align="left">Type</TableCell>
              <TableCell align="left">Meaning&nbsp;</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map(row => (
              <TableRow key={row.meaning}>
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="left">{row.type}</TableCell>
                <TableCell align="left">{row.meaning}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    );
  } else {
    let useStyles = makeStyles(theme => ({
      root: {
        maxWidth: window_width - 10,
        marginTop: theme.spacing(3),
        overflowY: 'scroll'
      },
      table: {
        maxWidth: window_width - 10,
      },
    }));
    const classes = useStyles();
    return (
      <Paper className={classes.root}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>Tone Name</TableCell>
              <TableCell align="left">Meaning&nbsp;</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map(row => (
              <TableRow key={row.meaning}>
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="left">{row.meaning}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    );
  }
}