import { mockCorretoras } from "@/__mocks__/api";
import { allItemsAtom } from "@/store/atoms";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "jotai";
import { UfFilter } from "../UfFilter";
describe("UfFilter Component (Multiple Select)", () => {
  const user = userEvent.setup();

  it.only("deve abrir o menu ao clicar e permitir a seleção de múltiplas UFs", async () => {
    render(
      <Provider initialValues={[[allItemsAtom, mockCorretoras]]}>
        <UfFilter isLoading={false} />
      </Provider>
    );

    const combobox = screen.getByRole("combobox", { name: /filtrar por uf/i });
    expect(combobox).toBeInTheDocument();

    await user.click(combobox);

    const spOption = await screen.findByRole("listbox");
    await user.click(spOption);

    screen.debug();
    const rjOption = await screen.findByRole("option", { name: "RJ" });
    const ufsValueDiv = screen.getByTestId("ufs-value");

    expect(spOption).toBeInTheDocument();
    expect(rjOption).toBeInTheDocument();
    expect(ufsValueDiv).toHaveTextContent("[]");

    await user.click(spOption);

    expect(ufsValueDiv).toHaveTextContent('["SP"]');

    await user.click(rjOption);

    expect(ufsValueDiv).toHaveTextContent(JSON.stringify(["SP", "RJ"]));
  });
});
