import { Link, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import Nav from "../components/Navbar";
import { Button } from "@nextui-org/react";

export default function Error() {
  const navigate = useNavigate();
  return (
    <>
      <Nav />
      <main className="grid min-h-full place-items-center text-white px-6 py-24 sm:py-32 lg:px-8">
        <div className="text-center">
          <p className="text-6xl font-bold text-fuchsia-500">404</p>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-100 sm:text-5xl">
            Page not found
          </h1>
          <p className="mt-6 text-base leading-7 text-gray-200">
            Sorry, we couldn’t find the page you’re looking for.
          </p>
          {/* <Link to="/"> */}
            <Button variant="light" color="primary" className="mt-8" onClick={()=> navigate('/')}>Go back home</Button>
          {/* </Link> */}
        </div>
      </main>
      <Footer />
    </>
  );
}
