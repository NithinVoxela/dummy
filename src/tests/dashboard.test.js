import {render,expect,screen,act,App,mock, currentUser} from "./commonImports.js"

describe("Checking Dashboard page",()=>{
  it("verifying dashboard page after login",async ()=>{ 
    mock.resetHistory()
    window.scrollTo = jest.fn()
    localStorage.setItem("user",JSON.stringify(currentUser));
    await act(async()=>{render(<App/>)})

    expect(mock.history.get.length).toBe(1)
    expect(mock.history.post.length).toBe(1)
    
    expect(screen.getAllByText("Dashboard").length).toBeGreaterThanOrEqual(1)
    expect(screen.getAllByText("Cameras").length).toBeGreaterThanOrEqual(1)
    expect(screen.getAllByText("Fall").length).toBeGreaterThanOrEqual(1)
    expect(screen.getAllByText("No activity").length).toBeGreaterThanOrEqual(1)
    
  },40000)
    
},40000)
