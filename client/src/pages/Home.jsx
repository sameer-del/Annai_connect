import React from "react";

const Home = () => {
  return (
    <section className=" bg-[#f8f8f8]  ">
      <div className="flex justify-center items-center flex-col  h-[100vh]">
        <div>
          <img src="/annai-logo.png" alt="" className="w-[200px]" />
        </div>

        {/*  another div */}
        <div className="test w-full  flex flex-col  justify-center items-center  ">
          <h1 className="text-[60px] uppercase font-serif">
            Bca Department gallery
          </h1>
          <p className="text-[18px]  p-10 capitalize text-center">
            hey hi guys im creating this account for our memories if you want to
            add yours details contact me memories <br /> also fade we have to
            store in online to feel the memories{" "}
          </p>
        </div>

        <button className="button w-[150px]   bg-black h-[35px] rounded-2xl mt-10 text-white uppercase">
          <a href="/login">click me</a>
        </button>
      </div>
    </section>
  );
};

export default Home;
