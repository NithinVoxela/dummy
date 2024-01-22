import {render,expect,screen,fireEvent,waitFor,act,App,mock} from "./commonImports.js"

describe("Login Form test", ()=>{
    var username,passwordInput;
    it("Username and Password buttons rendered", async()=>{
        window.scrollTo = jest.fn()
        await act(async ()=>{
            render(<App />)
        })
        username= screen.getByRole("textbox", { name: "Username" })
        passwordInput = screen.getByLabelText('Password');
        expect(username.value).toBe("");
        expect(passwordInput.value).toBe("");
    })

    it("login",async ()=>{
        window.scrollTo = jest.fn()
        act(()=>{
            render(<App />)
        })
        username= screen.getByRole("textbox", { name: "Username" })
        passwordInput = screen.getByLabelText('Password');
        act(()=>{
            fireEvent.change(username,{target:{value:"test_user"}})
            fireEvent.change(passwordInput,{target:{value:"password"}})
        })
        const updatedUsername=screen.getByRole("textbox", { name: "Username" });
        const updatedPassword=screen.getByLabelText('Password');

        expect(updatedUsername.value).toBe("test_user")
        expect(updatedPassword.value).toBe("password")
        const submitButton=screen.getByText("Login")

        act(()=>{
             fireEvent.click(submitButton)
        })
        await waitFor(()=>{
        })
        expect(mock.history.post.length).toBe(2) 
        expect(screen.getAllByText('Dashboard').length).toBe(1);

    },40000)
},90000) 

