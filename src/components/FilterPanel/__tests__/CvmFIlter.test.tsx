import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "jotai";
import { CvmFilter } from "../CvmFilter";

describe("CvmFilter Component", () => {
  it("deve renderizar um campo de texto com o label correto", () => {
    render(
      <Provider>
        <CvmFilter isLoading={false} />
      </Provider>
    );

    const inputElement = screen.getByLabelText(/filtrar por código cvm/i);

    expect(inputElement).toBeInTheDocument();
  });

  it("deve atualizar o valor do átomo quando o usuário digita", async () => {
    const user = userEvent.setup();
    render(
      <Provider>
        <CvmFilter isLoading={false} />
      </Provider>
    );

    const textToType = "54321";
    const input = screen.getByLabelText(/filtrar por código cvm/i);

    expect(input).toHaveValue("");

    await user.type(input, textToType);

    expect(input).toHaveValue(textToType);
  });
});
