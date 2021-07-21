import React from "react";
import { unmountComponentAtNode } from "react-dom";
import { screen, act, render } from "@testing-library/react";

import Header from "../Header";

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


it("Header Text test", () => {
  act(() => {
    render(<Header />, container);
  });
  
  expect(screen.getByText("FlickrGram")).toBeInTheDocument();

});

