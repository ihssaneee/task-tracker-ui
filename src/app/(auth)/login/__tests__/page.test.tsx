import {render, screen,waitFor} from "@testing-library/react";
import LoginPage from "../page";
import userEvent from "@testing-library/user-event";
import {describe, it, expect, vi,beforeEach} from "vitest";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import * as authApi from "@/lib/api/authApi";

const mockPush = vi.fn();
vi.mock('next/navigation',()=>({
    useRouter: () => ({push: mockPush})
}))

function renderWithProviders(ui: React.ReactElement) {
    const queryClient = new QueryClient({
         defaultOptions: {
            queries: {
                retry: false,
            },
            mutations: {
                retry: false,
            },
        },
        
       
}
)
    return render(<QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>);
}

    describe("LoginPage component",() => {
        beforeEach(()=>{
            vi.clearAllMocks();
        });


        it("renders email and password inputs and the sign in button",() => {
            renderWithProviders(<LoginPage/>);
            expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
            expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
            expect(screen.getByRole("button",{name:/sign in/i})).toBeInTheDocument();
        });

        it("allows user to type input fields", async() => {
            const user=userEvent.setup();
            renderWithProviders(<LoginPage/>);
            const emailInput=screen.getByLabelText(/email/i) as HTMLInputElement;
            const passwordInput=screen.getByLabelText(/password/i) as HTMLInputElement;

            await user.type(emailInput,"8Hn3o@example.com");
            await user.type(passwordInput,"password");

            expect(emailInput.value).toBe("8Hn3o@example.com");
            expect(passwordInput.value).toBe("password");

        })

        it ("calls loginUser api and redirects to /tasks on successful login ", async()=>{
            const user=userEvent.setup();
            const spyLogin= vi.spyOn(authApi,"login").mockResolvedValueOnce({
                token: "fake-jwt-token",
                user:{id:1,name:"John Doe",email:"8Hn3o@example.com"},
                expires_at: new Date().toISOString()
            });

            renderWithProviders(<LoginPage/>);

            const emailInput=screen.getByLabelText(/email/i) as HTMLInputElement;
            const passwordInput=screen.getByLabelText(/password/i) as HTMLInputElement;
            const signInButton=screen.getByRole("button",{name:/sign in/i});

            await user.type(emailInput,"8Hn3o@example.com");
            await user.type(passwordInput,"password");
            await user.click(signInButton);

            expect(spyLogin).toHaveBeenCalledTimes(1);
            expect(spyLogin).toHaveBeenCalledWith({
                email:"8Hn3o@example.com",
                password:"password"
            },
            expect.anything()
            );

            await waitFor(()=>{
                expect(mockPush).toHaveBeenCalledWith("/tasks");
            })

        })


    })
    


