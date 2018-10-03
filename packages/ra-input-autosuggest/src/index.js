import React from 'react';
import PropTypes from 'prop-types';
import compose from 'recompose/compose';
import Select from 'react-select';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import NoSsr from '@material-ui/core/NoSsr';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';

import { addField, translate } from 'ra-core';

const styles = theme => ({
  root: {
    flexGrow: 1,
    height: 250,
  },
  input: {
    display: 'flex',
    padding: 0,
  },
  valueContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    flex: 1,
    alignItems: 'center',
  },
  noOptionsMessage: {
    padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`,
  },
  singleValue: {
    fontSize: 16,
  },
  placeholder: {
    position: 'absolute',
    left: 2,
    fontSize: 16,
  },
  paper: {
    position: 'absolute',
    zIndex: 1,
    marginTop: theme.spacing.unit,
    left: 0,
    right: 0,
  },
  divider: {
    height: theme.spacing.unit * 2,
  },
});

function NoOptionsMessage(props) {
  return (
    <Typography
      color="textSecondary"
      className={props.selectProps.classes.noOptionsMessage}
      {...props.innerProps}
    >
      {props.children}
    </Typography>
  )
}

function inputComponent({ inputRef, ...props }) {
  return <div ref={inputRef} {...props} />;
}

function Control(props) {
  return (
    <TextField
      fullWidth
      margin="normal"
      InputProps={{
        inputComponent,
        inputProps: {
          className: props.selectProps.classes.input,
          inputRef: props.innerRef,
          children: props.children,
          ...props.innerProps,
        },
      }}
      {...props.selectProps.textFieldProps}
    />
  );
}

function Option(props) {
  return (
    <MenuItem
      buttonRef={props.innerRef}
      selected={props.isFocused}
      component="div"
      style={{
        fontWeight: props.isSelected ? 500 : 400,
      }}
      {...props.innerProps}
    >
      {props.children}
    </MenuItem>
  );
}

function Placeholder(props) {
  return (
    <Typography
      color="textSecondary"
      className={props.selectProps.classes.placeholder}
      {...props.innerProps}
    >
      {props.children}
    </Typography>
  );
}

function SingleValue(props) {
  return (
    <Typography className={props.selectProps.classes.singleValue} {...props.innerProps}>
      {props.children}
    </Typography>
  );
}

function ValueContainer(props) {
  return <div className={props.selectProps.classes.valueContainer}>{props.children}</div>;
}

function Menu(props) {
  return (
    <Paper square className={props.selectProps.classes.paper} {...props.innerProps}>
      {props.children}
    </Paper>
  );
}

const components = {
  Control,
  Menu,
  NoOptionsMessage,
  Option,
  Placeholder,
  SingleValue,
  ValueContainer,
};

class AutoSuggestInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: '',
      selectedOption: null       
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.getSuggestions = this.getSuggestions.bind(this);
    this.getSelectedItem = this.getSelectedItem.bind(this);
    this.getSuggestionText = this.getSuggestionText.bind(this);
  }

  componentWillMount() {
    const selectedItem = this.getSelectedItem();

    if (selectedItem) {
      this.setState({
        inputValue: selectedItem.name,
        selectedOption: this.getSuggestionText(selectedItem)
      })
    }
  }

  getSelectedItem() {
    const { input, choices } = this.props;

    return (input && input.value) ?
      choices.find(c => c.id === input.value) : 
      null;
  }

  handleChange(selectedOption) {
    const { input } = this.props
    this.setState({ selectedOption }, () => input && input.onChange && input.onChange(selectedOption['value']));
  };

  handleInputChange(inputValue) {
    const { setFilter } = this.props;
    if (setFilter) {
      setFilter(inputValue);
    } 
    this.setState({ inputValue });
  }

  getSuggestionText(suggestion) {
    const { optionText, optionValue } = this.props;

    return { value: suggestion[optionValue], label: suggestion[optionText] }
  }

  getSuggestions(suggestions) {
    return suggestions.map(this.getSuggestionText)
  }

  render() {
    const { classes, choices, input, label } = this.props;

    return (
      <div className={classes.root}>
        <NoSsr>
          <Select
            classes={classes}
            name={input.name}
            components={components}
            options={this.getSuggestions(choices)}
            value={this.state.selectedOption}
            onInputChange={this.handleInputChange}
            onChange={this.handleChange}
            placeholder=""
            textFieldProps={{
              label,
              InputLabelProps: {
                shrink: true,
              },
            }}
          />          
        </NoSsr>
      </div>
    );
  }
}

AutoSuggestInput.propTypes = {
  allowEmpty: PropTypes.bool,
  classes: PropTypes.object.isRequired,
  choices: PropTypes.arrayOf(PropTypes.object),
  InputProps: PropTypes.object,
  input: PropTypes.object,
  isRequired: PropTypes.bool,
  label: PropTypes.string,
  meta: PropTypes.object,
  options: PropTypes.object,
  optionText: PropTypes.oneOfType([PropTypes.string, PropTypes.func])
    .isRequired,
  optionValue: PropTypes.string.isRequired,
  resource: PropTypes.string,
  setFilter: PropTypes.func,
  source: PropTypes.string,
};

AutoSuggestInput.defaultProps = {
  choices: [],
  options: {},
  optionText: 'name',
  optionValue: 'id',
}

export default compose(
  addField,
  translate,
  withStyles(styles)
)(AutoSuggestInput);