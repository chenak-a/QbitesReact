import React from "react";
import { render, cleanup } from "@testing-library/react";
import TextLoop from "./TextLoop";
afterEach(function () {
  cleanup();
});
describe("TextLoop Tests", function () {
  it("should render without errors", function () {
    render(React.createElement(TextLoop, null));
  });
});