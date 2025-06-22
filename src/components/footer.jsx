function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-slate-900 text-gray-200 px-6 py-10 mt-16">
      {/* <--About--> */}
      <div className="flex flex-col items-center justify-center">
        <p className="border-1 w-full border-gray-500 mt-4 mb-4"></p>

        <h1>About us</h1>
        <span className=" w-2/3 ">
          Welcome to ShopSphere, your one-stop destination for quality products
          and seamless shopping. We are committed to providing a user-friendly
          experience, secure payments, and reliable delivery. Built with modern
          technologies, our platform ensures fast performance and an intuitive
          interface to make your shopping hassle-free. Whether you're browsing
          for fashion, electronics, or{" "}
          <p className="lg:ml-60 ">
            lifestyle essentials, we strive to bring the best to your
            fingertips.
          </p>
        </span>
        <p className="border-1 w-full border-gray-500 mt-4 mb-4"></p>
      </div>
      <div className="flex flex-col items-center justify-evenly">
        <div className="flex justify-center my-5">
          <div className="flex border rounded-md p-4 items-center">
            <div>
              <img
                src="https://cdn-icons-png.flaticon.com/512/888/888857.png"
                alt="playstore"
                className="w-7 md:w-8"
              />
            </div>
            <div className="flex flex-col ml-2 text-left ">
              <h1 className="text-xs">Download on </h1>
              <h2 className="text-md">Google Play Store</h2>
            </div>
          </div>
          <div className="flex items-center border w-auto rounded-lg px-4 py-2  mx-2">
            <img
              alt="applestore"
              src="https://cdn-icons-png.flaticon.com/512/888/888841.png"
              className="w-7 md:w-8"
            />
            <div className="text-left ml-3">
              <p className="text-xs text-gray-200">Download on </p>
              <p className="text-sm md:text-base"> Apple Store </p>
            </div>
          </div>
        </div>
      </div>
      {/* <--Copyright description--> */}
      <div className="flex items-center justify-center gap-2">
        &copy;Aaditya Kumar Lall , {`${currentYear}`}
        <div className="flex items-center gap-2 ">
          <a href="https://github.com/adiop1608">
          <span className="flex items-center justify-center underline underline-offset-8 gap-2 cursor-pointer">
            <img
              src="../src/assets/githubLogo1.svg"
              alt=""
              className="w-7  bg-white rounded-full "
              />
            GitHub
          </span>
              </a>
          
          <p>{" | "}</p>
          <a href="https://www.linkedin.com/in/aaditya-kumar-lall-221700243/">
          <span className="flex items-center justify-center underline underline-offset-8 gap-2">
            <img src="../src/assets/linkedInLogo.svg" alt="" className="w-7" />
            LinkedIn
          </span>
          </a>
          <p>{" | "}</p>
          <a   href="https://mail.google.com/mail/?view=cm&fs=1&to=aditya0916a@gmail.com"
  target="_blank"
  rel="noopener noreferrer">
          <span className="flex items-center justify-center underline underline-offset-8 gap-2">  
            <img src="../src/assets/gmail_logo.svg" alt="" className="w-9" />
            aditya0916a@gmail.com
          </span>
          </a>
        </div>
      </div>
    </footer>
  );
}
export default Footer;
