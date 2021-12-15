import React from "react";

import {
  render,
  cleanup,
  waitForElement,
  fireEvent,
  getByText,
  getAllByTestId,
  getByAltText,
  getByPlaceholderText,
  queryByText
} from "@testing-library/react";

import Application from "components/Application";

import axios from "axios";

afterEach(cleanup);

describe("Application", () => {

  it("defaults to Monday and changes the schedule when a new day is selected", () => {
    const { getByText } = render(<Application />);

    return waitForElement(() => getByText("Monday")).then(() => {
      fireEvent.click(getByText("Tuesday"));
      expect(getByText("Leopold Silvers")).toBeInTheDocument();
    }
    );
  });

  it("loads data, books an interview and reduces the spots remaining for Monday by 1", async () => {
    const { container } = render(<Application />);

    await waitForElement(() => getByText(container, /Archie Cohen/i));

    const appointment = getAllByTestId(container, /appointment/i)[0];

    fireEvent.click(getByAltText(appointment, /Add/i));

    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Lydia Miller-Jones" }
    });

    fireEvent.click(getByAltText(appointment, /Sylvia Palmer/i));

    fireEvent.click(getByText(appointment, /Save/i));

    expect(getByText(appointment, /saving/i)).toBeInTheDocument();

    await waitForElement(() => getByText(appointment, /Lydia Miller-Jones/i));

    const day = getAllByTestId(container, "day").find(day =>
      queryByText(day, "Monday")
    );

    expect(getByText(day, /no spots remaining/i)).toBeInTheDocument();

  });

  it("loads data, cancels an interview and increases the spots remaining for Monday by 1", async () => {
    const { container } = render(<Application />);

    await waitForElement(() => getByText(container, /Archie Cohen/i));

    const appointment = getAllByTestId(container, /appointment/i).find((appointment) => queryByText(appointment, /Archie Cohen/i));

    fireEvent.click(getByAltText(appointment, /delete/i));

    expect(getByText(appointment, /are you sure you would like to delete\?/i)).toBeInTheDocument();

    fireEvent.click(getByText(appointment, /confirm/i));

    expect(getByText(appointment, /deleting/i)).toBeInTheDocument();

    await waitForElement(() => getByAltText(appointment, /add/i));

    const day = getAllByTestId(container, "day").find(day =>
      queryByText(day, "Monday")
    );

    expect(getByText(day, /2 spots remaining/i)).toBeInTheDocument();
  });

  it("loads data, edits an interview and keeps the remaining spots for Monday the same", async () => {
    const { container } = render(<Application />);

    await waitForElement(() => getByText(container, /Archie Cohen/i));

    const appointment = getAllByTestId(container, /appointment/i).find((appointment) => queryByText(appointment, /Archie Cohen/i));

    fireEvent.click(getByAltText(appointment, /edit/i));

    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Lydia Miller-Jones" }
    });

    fireEvent.click(getByAltText(appointment, /Sylvia Palmer/i));

    fireEvent.click(getByText(appointment, /Save/i));

    expect(getByText(appointment, /saving/i)).toBeInTheDocument();

    await waitForElement(() => getByText(appointment, /Lydia Miller-Jones/i));

    const day = getAllByTestId(container, "day").find(day => queryByText(day, "Monday"));

    expect(getByText(day, /1 spot remaining/i)).toBeInTheDocument();
  });

  it("shows the save error when failing to save an appointment", async () => {

    const { container } = render(<Application />);

    await waitForElement(() => getByText(container, /Archie Cohen/i));

    const appointment = getAllByTestId(container, /appointment/i)[0];

    fireEvent.click(getByAltText(appointment, /Add/i));

    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Lydia Miller-Jones" }
    });

    fireEvent.click(getByAltText(appointment, /Sylvia Palmer/i));

    axios.put.mockRejectedValueOnce();
    fireEvent.click(getByText(appointment, /Save/i));

    expect(getByText(appointment, /saving/i)).toBeInTheDocument();

    await waitForElement(() => getByText(appointment, /could not save appointment./i));

    const day = getAllByTestId(container, "day").find(day =>
      queryByText(day, "Monday")
    );

    expect(getByText(day, /1 spot remaining/i)).toBeInTheDocument();

  });





})

