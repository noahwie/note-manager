import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import LoginForm from "../login-form";

describe("LoginForm", () => {
  it("renders login title", () => {
    render(<LoginForm onLogin={() => {}} />);
    expect(screen.getByText("Login")).toBeInTheDocument();
  });

  it("shows validation errors when submitting empty form", async () => {
    const onLogin = vi.fn();

    render(<LoginForm onLogin={onLogin} />);

    fireEvent.click(screen.getByText("Einloggen"));

    expect(
      await screen.findByText("Benutzername oder Email ist erforderlich")
    ).toBeInTheDocument();

    expect(
      await screen.findByText("Passwort ist erforderlich")
    ).toBeInTheDocument();

    expect(onLogin).not.toHaveBeenCalled();
  });

  it("shows error when password is too short", async () => {
    render(<LoginForm onLogin={() => {}} />);

    fireEvent.change(
      screen.getByPlaceholderText("username oder email@example.com"),
      { target: { value: "user" } }
    );

    fireEvent.change(
      screen.getByPlaceholderText("Mindestens 6 Zeichen"),
      { target: { value: "123" } }
    );

    fireEvent.click(screen.getByText("Einloggen"));

    expect(
      await screen.findByText("Passwort muss mindestens 6 Zeichen haben")
    ).toBeInTheDocument();
  });

  it("calls onLogin with correct data", async () => {
    const onLogin = vi.fn().mockResolvedValue();

    render(<LoginForm onLogin={onLogin} />);

    fireEvent.change(
      screen.getByPlaceholderText("username oder email@example.com"),
      { target: { value: "testuser" } }
    );

    fireEvent.change(
      screen.getByPlaceholderText("Mindestens 6 Zeichen"),
      { target: { value: "123456" } }
    );

    fireEvent.click(screen.getByText("Einloggen"));

    await waitFor(() => {
      expect(onLogin).toHaveBeenCalledTimes(1);
      expect(onLogin).toHaveBeenCalledWith({
        usernameOrEmail: "testuser",
        password: "123456",
      });
    });
  });

  it("disables inputs and button while loading", async () => {
    let resolvePromise;
    const onLogin = vi.fn(
      () =>
        new Promise((resolve) => {
          resolvePromise = resolve;
        })
    );

    render(<LoginForm onLogin={onLogin} />);

    fireEvent.change(
      screen.getByPlaceholderText("username oder email@example.com"),
      { target: { value: "testuser" } }
    );

    fireEvent.change(
      screen.getByPlaceholderText("Mindestens 6 Zeichen"),
      { target: { value: "123456" } }
    );

    fireEvent.click(screen.getByText("Einloggen"));

    expect(screen.getByText("Lädt...")).toBeDisabled();

    resolvePromise();
  });
});
