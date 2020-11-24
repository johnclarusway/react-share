import Signup from "./pages/Signup";
import Navbar from "./components/Navbar";

function App() {
  console.log(process.env);

  return (
    <div className="App">
      <Navbar />
      <Signup />
      {/* 
  
  //Route
  //Signin
  //Signup
  //forgotpassword
  //....
  */}
    </div>
  );
}

export default App;
