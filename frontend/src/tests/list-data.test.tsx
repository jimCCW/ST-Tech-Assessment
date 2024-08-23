import { act } from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import ListData from "@/components/list-data/list-data";
import { DataContext, TDataContext } from "@/context/data-context";
import { TCsvData } from "@/types/upload";

test("should render the empty table", () => {
  render(<ListData />);
  expect(screen.getByRole("table")).toBeInTheDocument();
  expect(screen.getByText("No results.")).toBeInTheDocument();
});

test("renders the correct headers", () => {
  render(<ListData />);
  expect(screen.getByText("ID")).toBeInTheDocument();
  expect(screen.getByText("Name")).toBeInTheDocument();
  expect(screen.getByText("Email")).toBeInTheDocument();
  expect(screen.getByText("Body")).toBeInTheDocument();
});

// Mock data
const mockPostData: TCsvData[] = [
  {
    postId: "1",
    id: "1",
    name: "id labore ex et quam laborum",
    email: "Eliseo@gardner.biz",
    body: "laudantium enim quasi est quidem magnam voluptate ipsam eos\\ntempora quo necessitatibus\\ndolor quam autem quasi\\nreiciendis et nam sapiente accusantium",
  },
  {
    postId: "1",
    id: "2",
    name: "quo vero reiciendis velit similique earum",
    email: "Jayne_Kuhic@sydney.com",
    body: "est natus enim nihil est dolore omnis voluptatem numquam\\net omnis occaecati quod ullam at\\nvoluptatem error expedita pariatur\\nnihil sint nostrum voluptatem reiciendis et",
  },
  {
    postId: "1",
    id: "3",
    name: "odio adipisci rerum aut animi",
    email: "Nikita@garfield.biz",
  },
];

// Wrapper component to provide context
const renderWithContext = (
  ui: React.ReactElement,
  contextValue: TDataContext
) => {
  return render(
    <DataContext.Provider value={contextValue}>{ui}</DataContext.Provider>
  );
};

describe("Render table after getting data", () => {
  const mockContextValue: TDataContext = {
    postData: mockPostData,
    setPostData: jest.fn(),
  };

  test("renders the correct headers", () => {
    renderWithContext(<ListData />, mockContextValue);
    expect(screen.getByText("ID")).toBeInTheDocument();
    expect(screen.getByText("Name")).toBeInTheDocument();
    expect(screen.getByText("Email")).toBeInTheDocument();
    expect(screen.getByText("Body")).toBeInTheDocument();
  });

  test("renders post data correctly", () => {
    renderWithContext(<ListData />, mockContextValue);

    expect(
      screen.getByText("id labore ex et quam laborum")
    ).toBeInTheDocument();
    expect(screen.getByText("Jayne_Kuhic@sydney.com")).toBeInTheDocument();
  });

  test("handles empty post data", () => {
    const mockContextEmptyData: TDataContext = {
      postData: [],
      setPostData: jest.fn(),
    };

    renderWithContext(<ListData />, mockContextEmptyData);

    expect(screen.getByText("No results.")).toBeInTheDocument();
    expect(
      screen.queryByText("Jayne_Kuhic@sydney.com")
    ).not.toBeInTheDocument();
  });

  test("search list based on search input", async () => {
    jest.useFakeTimers();

    renderWithContext(<ListData />, mockContextValue);

    const searchInput = screen.getByPlaceholderText("Search...");

    await act(async () => {
      // Input Jay into the search box
      fireEvent.change(searchInput, { target: { value: "Jayne_Kuhic" } });

      // Pause for 500ms because the debounce input
      jest.advanceTimersByTime(500);
    });

    await waitFor(() => {
      // Check only 'Jayne_Kuhic@sydney.com' data is display
      expect(screen.getByText("Jayne_Kuhic@sydney.com")).toBeInTheDocument();
      expect(screen.queryByText("Eliseo@gardner.biz")).not.toBeInTheDocument();
    });

    await act(async () => {
      // Clear the search box
      fireEvent.change(searchInput, { target: { value: "" } });

      // Pause for 500ms because the debounce input
      jest.advanceTimersByTime(500);
    });

    await waitFor(() => {
      // Check that all data are displayed again
      expect(screen.getByText("Jayne_Kuhic@sydney.com")).toBeInTheDocument();
      expect(screen.getByText("Eliseo@gardner.biz")).toBeInTheDocument();
    });
  });
});
