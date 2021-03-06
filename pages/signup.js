import { useContext, useEffect } from "react";
import School from "../components/School";
import Head from "next/head";
import Populations from "../components/Populations";
import ImgContainer from "../components/ImgContainer";
import ContactDetails from "../components/ContactDetails";
import SchInfo from "../components/SchInfo";
import SignUpForm from "../components/SignUpForm";
import { AuthContext } from "../context/AuthContext";
import { useRouter } from "next/router";

export default function Home() {
  const { signedIn, checkAuthState } = useContext(AuthContext).authValue;
  const router = useRouter();

  useEffect(() => {
    let loginStatus = checkAuthState();
    if (loginStatus === true) {
      router.push("/");
    }
  }, []);

  return (
    !signedIn && (
      <div>
        <Head>
          <title>SchoolCredit</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className="container-fluid">
          <div className="row align-items-stretch">
            <div className="col-md-6 signup-screen order-2 order-md-0 d-flex align-items-center justify-content-center">
              <School />
              <Populations />
              <ContactDetails />
              <SchInfo />
              <SignUpForm />
            </div>
            <div
              className="col-md-6 order-0 order-md-2 position-relative py-5 p-0"
              style={{
                backgroundImage: `url(/bg.png)`,
                backgroundSize: "cover",
                background: "#0000a6",
              }}
            >
              <ImgContainer />
            </div>
          </div>
        </main>
      </div>
    )
  );
}
