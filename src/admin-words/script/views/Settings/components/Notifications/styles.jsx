export default theme => ({
  root: {},
  form: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  group: {
    flexGrow: 1,
    padding: theme.spacing(1) * 2
  },
  groupLabel: {
    paddingLeft: theme.spacing(1) * 2
  },
  field: {
    marginBottom: theme.spacing(1) * 2,
    marginTop: theme.spacing(1) * 2,
    display: 'flex',
    alignItems: 'center'
  },
  textField: {
    width: '320px',
    maxWidth: '100%',
    marginRight: theme.spacing(1) * 3
  },
  portletFooter: {
    paddingLeft: theme.spacing(1) * 3,
    paddingRight: theme.spacing(1) * 3,
    paddingTop: theme.spacing(1) * 2,
    paddingBottom: theme.spacing(1) * 2
  }
});
