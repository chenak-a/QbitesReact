"use strict";

var _react = _interopRequireDefault(require("react"));

var _react2 = require("@testing-library/react");

var _TextLoop = _interopRequireDefault(require("./TextLoop"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

afterEach(function () {
  (0, _react2.cleanup)();
});
describe("TextLoop Tests", function () {
  it("should render without errors", function () {
    (0, _react2.render)(_react["default"].createElement(_TextLoop["default"], null));
  });
});