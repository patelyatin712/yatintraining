import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  const username = localStorage.getItem("userName");
  const handleLogOut = () => {
    debugger;
    localStorage.clear();
    navigate("/login");
    toast.success("User Logout");
  };

  return (
    <>
      <card>
        <h1>welcome Home</h1>
        <span> {username}</span>
        <button onClick={handleLogOut}>Logout</button>
      </card>
    </>
  );
}
export default Home;
