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
      <card className="flex item-center justify-center m-10 bg-amber-100 mr-7 h-100">
        <div className="flex flex-col flex items-center justify-center">
          <h4 className="text-lg cursor-pointer transition font-bold text-15xl italic">
            Welcome To Pragnakalp,
          </h4>
          <h4 className="flex items-center justify-center text-lg cursor-pointer transition font-bold text-9xl">
            Elevate
            <span>
              your Business with Groundbreaking GenAI Solutions: Turning Vision
              into Innovation
            </span>
          </h4>
          <p className="italic">
            Let our expert GenAI team elevate your creativity with the latest
            text, image, audio, and video generation GenAI models.
          </p>
        </div>
      </card>
    </>
  );
}
export default Home;
