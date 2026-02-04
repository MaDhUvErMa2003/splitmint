import Navbar from "../components/NavBar";

const AppLayout = ({ children }) => {
  return (
    <>
      <Navbar />
      <div className="pt-4">{children}</div>
    </>
  );
};

export default AppLayout;
