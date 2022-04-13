import React from 'react'
import { render,screen } from '@testing-library/react';
import { useNavigate } from 'react-router-dom';
import PostLists from '../PostLists';

const mockedUsedNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useNavigate: () =>mockedUsedNavigate
}));

beforeEach(() => {
    const mockIntersectionObserver = jest.fn();
    mockIntersectionObserver.mockReturnValue({
        observe: () => null,
        unobserve: () => null,
        disconnect: () => null
    });
    window.IntersectionObserver = mockIntersectionObserver
});

test("should render correctly", () => {
    render(<PostLists />)
});
test("table present in document", () => {
    render(<PostLists />)
    const element = screen.getByTestId(/table/i)
    expect(element).toBeInTheDocument()
});

test("author present in document", () => {
    render(<PostLists />)
    const element = screen.getByTestId(/author/i)
    expect(element).toBeInTheDocument()
});

test("title present in document", () => {
    render(<PostLists />)
    const element = screen.getByTestId(/title/i)
    expect(element).toBeInTheDocument()
});

test("url present in document", () => {
    render(<PostLists />)
    const element = screen.getByTestId(/url/i)
    expect(element).toBeInTheDocument()
});

test("cdate present in document", () => {
    render(<PostLists />)
    const element = screen.getByTestId(/cdate/i)
    expect(element).toBeInTheDocument()
});