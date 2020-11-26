import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import Navbar from "./components/Navbar";

function App() {
  console.log(process.env);

  return (
    <div className="App">
      <Navbar />
      <Signin />

      {/* 
   <Signup />

   //Route
  //forgotpassword
  //....
  */}
    </div>
  );
}

export default App;
