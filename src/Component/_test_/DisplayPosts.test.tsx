import React from 'react'
import { render, screen } from '@testing-library/react';
import DisplayPosts from '../DisplayPosts';


const mockedUsedNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useLocation: () => ({
        push: jest.fn()
    })
}));

test("display post should render correctly", () => {
    render(<DisplayPosts />)
});
test("post should be present in the document", () => {
    render(<DisplayPosts />)
    const element = screen.getByTestId(/post/i)
    expect(element).toBeInTheDocument()
});