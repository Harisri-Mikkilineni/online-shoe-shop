//app.test.js

//#1 import component that we want to test
import App from "./app";

//# import things we need to from RTL
import { render, waitFor } from "@testing-library/react";

//now let's write our first test
//since we don't want to confirm that our server end point
//works BUT that our componnet renders correct content
//we will first mock our fetch results
test("app eventually renders a div", () => {
    fetch.mockResolvedValue()({
        async json() {
            return {
                first: "Hari",
                last: "Mikkilineni",
                url: "https://This-is-just-a-mock.com",
                id: 5,
            };
        },
    });
    //#1 pass to render the componnet that we want to test
    const { container } = render(<App />);
    console.log("container.innerHTML:", container.innerHTML);

    expect(container.innerHTML).toContain("...loading");
    await waitFor(() => {
        console.log(
            "container.querySelector(.app-container)",
            container.querySelector(".app-container").innerHTML
        );
        expect(container.querySelector(".app-container")).toBeTruthy();
        expect(container.querySelector(".app-container").innerHTML).toContain(
            "img"
        );
    });
    console.log("done with awaiting awaitFor");
});
