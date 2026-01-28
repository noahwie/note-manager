import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Login from "../../pages/Login";

const mockLogin = vi.fn();
const mockNavigate = vi.fn();

vi.mock("../../contexts/AuthContext", () => ({
  useAuth: () => ({
    login: mockLogin,
  }),
}));

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

const renderLogin = () =>
  render(
    <BrowserRouter>
      <Login />
    </BrowserRouter>
  );

describe("Login page", () => {
  beforeEach(() => {
    mockLogin.mockReset();
    mockNavigate.mockReset();
  });

  it("logs in successfully and navigates to home", async () => {
    mockLogin.mockResolvedValue();

    renderLogin();

    fireEvent.change(
      screen.getByPlaceholderText("username oder email@example.com"),
      { target: { value: "admin" } }
    );

    fireEvent.change(
      screen.getByPlaceholderText("Mindestens 6 Zeichen"),
      { target: { value: "123456" } }
    );

    fireEvent.click(screen.getByText("Einloggen"));

    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith("admin", "123456");
      expect(mockNavigate).toHaveBeenCalledWith("/");
    });
  });

  it("shows error message on failed login", async () => {
    mockLogin.mockRejectedValue(new Error("Login fehlgeschlagen"));

    renderLogin();

    fireEvent.change(
      screen.getByPlaceholderText("username oder email@example.com"),
      { target: { value: "admin" } }
    );

    fireEvent.change(
      screen.getByPlaceholderText("Mindestens 6 Zeichen"),
      { target: { value: "wrongpass" } }
    );

    fireEvent.click(screen.getByText("Einloggen"));

    expect(
      await screen.findByText("Login fehlgeschlagen")
    ).toBeInTheDocument();

    expect(mockNavigate).not.toHaveBeenCalled();
  });
});
