import React from 'react';
import { unmountComponentAtNode } from "react-dom";
import { screen, act, render, fireEvent } from "@testing-library/react";
import App from "../../App";

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


it('should asign the value entered in the search box the input', async() => {
    await act(async() => {
        await render(<App />, container);
    });
    const inputElement = screen.getByPlaceholderText('Search...');
    fireEvent.change(inputElement, { target: { value: 'random' } });
    expect(inputElement.value).toBe('random');
});