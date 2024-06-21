import NavBar from "./NavBar";
import { MemoryRouter } from "react-router-dom";
import { render, screen } from "@testing-library/react";

describe("NavBar", () => {

    const renderNavBar = () => {
        render(<NavBar />, { wrapper: MemoryRouter })
    }
    test("renders both links", () => {
        renderNavBar()
        expect(screen.getByText("Posts List")).toBeInTheDocument()
        expect(screen.getByText("New Post")).toBeInTheDocument()
    })
})