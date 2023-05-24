import { screen, render } from "@testing-library/react";
import { BrowserRouter, useLocation } from "react-router-dom";
import { describe } from "vitest"
import Navbar from "../components/Navbar";
import ContextProvider from "../components/utils/global.context";

describe("Componente Navbar", () => {

    it("Logo presente", () => {
        render(
        <BrowserRouter>
            <ContextProvider>
                <Navbar/>
            </ContextProvider>
        </BrowserRouter>
        );
        const logo = screen.getByAltText("logo Db");
        expect(logo).toBeInTheDocument();
    })

    it("Eslogan presente", () => {
        render(
            <BrowserRouter>
                <ContextProvider>
                    <Navbar/>
                </ContextProvider>
            </BrowserRouter>
            );
        const eslogan = screen.getByText("Sentite como en tu hogar");
        expect(eslogan).toBeInTheDocument();
    })

})