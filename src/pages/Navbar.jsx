function Navbar() {
  debugger;
  return (
    <div className=" bg-cover bg-center p-4  text-lg  italic ">
      <div className="flex  justify-between items-center font-bold  text-white">
        <h1 className=" hover:text-amber-300 cursor-pointer">Pragnakalp</h1>
        <div>
          <ul className="flex gap-10 pr-10 text-white font-bold cursor-pointer">
            <li className=" hover:text-amber-300 transition-colors">Home</li>
            <li className=" hover:text-amber-300 ">product</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
