import { screen, render } from "@testing-library/react";
import { describe } from "vitest";
import Footer from "../components/Footer.jsx";


describe("componente footer", () => {

    it("Redes sociales presentes", () => {
        const { queryAllByTitle } = render(<Footer />);
        const iconosRedesSociales = queryAllByTitle('icon');
        expect(iconosRedesSociales.length).toBe(4);
    })

    it("Copyright presente", () => {
        render(<Footer/>);
        const parrafo = screen.getByText('©2023 Digital Booking');
        expect(parrafo).toBeInTheDocument();
    })

})