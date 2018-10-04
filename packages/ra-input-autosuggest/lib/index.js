'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _compose = require('recompose/compose');

var _compose2 = _interopRequireDefault(_compose);

var _reactSelect = require('react-select');

var _reactSelect2 = _interopRequireDefault(_reactSelect);

var _styles = require('@material-ui/core/styles');

var _Typography = require('@material-ui/core/Typography');

var _Typography2 = _interopRequireDefault(_Typography);

var _NoSsr = require('@material-ui/core/NoSsr');

var _NoSsr2 = _interopRequireDefault(_NoSsr);

var _TextField = require('@material-ui/core/TextField');

var _TextField2 = _interopRequireDefault(_TextField);

var _Paper = require('@material-ui/core/Paper');

var _Paper2 = _interopRequireDefault(_Paper);

var _MenuItem = require('@material-ui/core/MenuItem');

var _MenuItem2 = _interopRequireDefault(_MenuItem);

var _raCore = require('ra-core');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var styles = function styles(theme) {
  return {
    root: {
      flexGrow: 1,
      height: 250
    },
    input: {
      display: 'flex',
      padding: 0
    },
    valueContainer: {
      display: 'flex',
      flexWrap: 'wrap',
      flex: 1,
      alignItems: 'center'
    },
    noOptionsMessage: {
      padding: theme.spacing.unit + 'px ' + theme.spacing.unit * 2 + 'px'
    },
    singleValue: {
      fontSize: 16
    },
    placeholder: {
      position: 'absolute',
      left: 2,
      fontSize: 16
    },
    paper: {
      position: 'absolute',
      zIndex: 1,
      marginTop: theme.spacing.unit,
      left: 0,
      right: 0
    },
    divider: {
      height: theme.spacing.unit * 2
    }
  };
};

function NoOptionsMessage(props) {
  return _react2.default.createElement(
    _Typography2.default,
    _extends({
      color: 'textSecondary',
      className: props.selectProps.classes.noOptionsMessage
    }, props.innerProps),
    props.children
  );
}

function inputComponent(_ref) {
  var inputRef = _ref.inputRef,
      props = _objectWithoutProperties(_ref, ['inputRef']);

  return _react2.default.createElement('div', _extends({ ref: inputRef }, props));
}

function Control(props) {
  return _react2.default.createElement(_TextField2.default, _extends({
    fullWidth: true,
    margin: 'normal',
    InputProps: {
      inputComponent: inputComponent,
      inputProps: _extends({
        className: props.selectProps.classes.input,
        inputRef: props.innerRef,
        children: props.children
      }, props.innerProps)
    }
  }, props.selectProps.textFieldProps));
}

function Option(props) {
  return _react2.default.createElement(
    _MenuItem2.default,
    _extends({
      buttonRef: props.innerRef,
      selected: props.isFocused,
      component: 'div',
      style: {
        fontWeight: props.isSelected ? 500 : 400
      }
    }, props.innerProps),
    props.children
  );
}

function Placeholder(props) {
  return _react2.default.createElement(
    _Typography2.default,
    _extends({
      color: 'textSecondary',
      className: props.selectProps.classes.placeholder
    }, props.innerProps),
    props.children
  );
}

function SingleValue(props) {
  return _react2.default.createElement(
    _Typography2.default,
    _extends({ className: props.selectProps.classes.singleValue }, props.innerProps),
    props.children
  );
}

function ValueContainer(props) {
  return _react2.default.createElement(
    'div',
    { className: props.selectProps.classes.valueContainer },
    props.children
  );
}

function Menu(props) {
  return _react2.default.createElement(
    _Paper2.default,
    _extends({ square: true, className: props.selectProps.classes.paper }, props.innerProps),
    props.children
  );
}

var components = {
  Control: Control,
  Menu: Menu,
  NoOptionsMessage: NoOptionsMessage,
  Option: Option,
  Placeholder: Placeholder,
  SingleValue: SingleValue,
  ValueContainer: ValueContainer
};

var AutoSuggestInput = function (_React$Component) {
  _inherits(AutoSuggestInput, _React$Component);

  function AutoSuggestInput(props) {
    _classCallCheck(this, AutoSuggestInput);

    var _this = _possibleConstructorReturn(this, (AutoSuggestInput.__proto__ || Object.getPrototypeOf(AutoSuggestInput)).call(this, props));

    _this.state = {
      inputValue: '',
      selectedOption: null
    };
    _this.handleChange = _this.handleChange.bind(_this);
    _this.handleInputChange = _this.handleInputChange.bind(_this);
    _this.getSuggestions = _this.getSuggestions.bind(_this);
    _this.getSelectedItem = _this.getSelectedItem.bind(_this);
    _this.getSuggestionText = _this.getSuggestionText.bind(_this);
    return _this;
  }

  _createClass(AutoSuggestInput, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      var selectedItem = this.getSelectedItem();

      if (selectedItem) {
        this.setState({
          inputValue: selectedItem.name,
          selectedOption: this.getSuggestionText(selectedItem)
        });
      }
    }
  }, {
    key: 'getSelectedItem',
    value: function getSelectedItem() {
      var _props = this.props,
          input = _props.input,
          choices = _props.choices;


      return input && input.value ? choices.find(function (c) {
        return c.id === input.value;
      }) : null;
    }
  }, {
    key: 'handleChange',
    value: function handleChange(selectedOption) {
      var input = this.props.input;

      this.setState({ selectedOption: selectedOption }, function () {
        return input && input.onChange && input.onChange(selectedOption['value']);
      });
    }
  }, {
    key: 'handleInputChange',
    value: function handleInputChange(inputValue) {
      var setFilter = this.props.setFilter;

      if (setFilter) {
        setFilter(inputValue);
      }
      this.setState({ inputValue: inputValue });
    }
  }, {
    key: 'getSuggestionText',
    value: function getSuggestionText(suggestion) {
      var _props2 = this.props,
          optionText = _props2.optionText,
          optionValue = _props2.optionValue;


      return { value: suggestion[optionValue], label: suggestion[optionText] };
    }
  }, {
    key: 'getSuggestions',
    value: function getSuggestions(suggestions) {
      return suggestions.map(this.getSuggestionText);
    }
  }, {
    key: 'render',
    value: function render() {
      var _props3 = this.props,
          classes = _props3.classes,
          choices = _props3.choices,
          input = _props3.input,
          label = _props3.label;


      return _react2.default.createElement(
        'div',
        { className: classes.root },
        _react2.default.createElement(
          _NoSsr2.default,
          null,
          _react2.default.createElement(_reactSelect2.default, {
            classes: classes,
            name: input.name,
            components: components,
            options: this.getSuggestions(choices),
            value: this.state.selectedOption,
            onInputChange: this.handleInputChange,
            onChange: this.handleChange,
            placeholder: '',
            textFieldProps: {
              label: label,
              InputLabelProps: {
                shrink: true
              }
            }
          })
        )
      );
    }
  }]);

  return AutoSuggestInput;
}(_react2.default.Component);

AutoSuggestInput.propTypes = {
  allowEmpty: _propTypes2.default.bool,
  classes: _propTypes2.default.object.isRequired,
  choices: _propTypes2.default.arrayOf(_propTypes2.default.object),
  InputProps: _propTypes2.default.object,
  input: _propTypes2.default.object,
  isRequired: _propTypes2.default.bool,
  label: _propTypes2.default.string,
  meta: _propTypes2.default.object,
  options: _propTypes2.default.object,
  optionText: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.func]).isRequired,
  optionValue: _propTypes2.default.string.isRequired,
  resource: _propTypes2.default.string,
  setFilter: _propTypes2.default.func,
  source: _propTypes2.default.string
};

AutoSuggestInput.defaultProps = {
  choices: [],
  options: {},
  optionText: 'name',
  optionValue: 'id'
};

exports.default = (0, _compose2.default)(_raCore.addField, _raCore.translate, (0, _styles.withStyles)(styles))(AutoSuggestInput);
module.exports = exports.default;