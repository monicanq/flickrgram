import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import { screen } from "@testing-library/react";

import Header from "./components/Header";

let container = null;

beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

it("Header Component test", () => {
  act(() => {
    render(<Header />, container);
  });
  
  expect(screen.getByText("FlickrGram")).toBeInTheDocument();

});

