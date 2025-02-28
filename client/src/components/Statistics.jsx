import React from "react";

function Statistics() {
  return (
    <div>
      <section className="py-10 sm:py-16 lg:py-24 select-none">
        <div className="max-w-5xl px-4 mx-auto sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 mt-10 text-center lg:mt-10 sm:gap-x-8 md:grid-cols-3">
            <div>
              <h3 className="font-bold text-7xl">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-600 to-blue-600 select-none">
                {"  "}300+{"  "}
                </span>
              </h3>
              <p className="mt-4 text-xl font-medium text-white select-none">
                Users
              </p>
              <p className="text-base mt-0.5 text-gray-500 select-none">
                Trust our platform
              </p>
            </div>

            <div>
              <h3 className="font-bold text-7xl">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-600 to-blue-600 select-none">
                  {"  "}438{"  "}
                </span>
              </h3>
              <p className="mt-4 text-xl font-medium text-white select-none">
                Events Listed
              </p>
              <p className="text-base mt-0.5 text-gray-500 select-none">In last 2 months</p>
            </div>

            <div>
              <h3 className="font-bold text-7xl">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-600 to-blue-600 select-none">
                {" "}5K+{" "}
                </span>
              </h3>
              <p className="mt-4 text-xl font-medium text-white select-none">Impressions</p>
              <p className="text-base mt-0.5 text-gray-500 select-none">
                On the platform
              </p>
            </div>
          </div>
        </div>
      </section>
      
      
    </div>
  );
}

export default Statistics;
