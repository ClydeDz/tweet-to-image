import React from "react";
import { render, screen } from "@testing-library/react";
import AppHeader from "./AppHeader";

test("should render correctly", () => {
    render(<AppHeader />);
    expect(screen.getByText("Tweet to Image")).toBeInTheDocument();
});
