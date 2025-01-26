
import location1 from '../assets/images/location1.jpg';
import location2 from '../assets/images/location2.jpg';
import location3 from '../assets/images/location3.jpg';

const Hotels = () => {
  return (
    <div className="p-10  font-Playfair ">
      <h1 className="text-3xl md:text-4xl font-semibold text-center tracking-wider mb-6 md:mb-8">
        Know Before You Go
      </h1>
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 my-8 md:my-14">
        <div className="grid justify-center items-center">
          <div className="max-w-lg p-4 md:p-5">
            <span className="bg-green-500 p-1 rounded-full font-bold text-sm md:text-base">
              Reach Your Destination
            </span>
            <div className="text-xl md:text-2xl font-bold my-6 md:my-9 tracking-wider">
              Travelling Opens the Door to Creating Memories
            </div>
            <div className="text-gray-600 text-xs md:text-sm">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Facere atque laborum voluptatum ullam alias illum cupiditate expedita? Eum temporibus delectus magni eaque, voluptatem, cum incidunt minus excepturi obcaecati sint labore!
            </div>
          </div>
        </div>

        <div>
          <div className="flex flex-wrap justify-center gap-4 md:gap-7">
            <img src={location1} className="h-48 md:h-72 rounded-md" alt="Location 1" />
            <img src={location2} className="h-48 md:h-72 rounded-md  md:mt-10" alt="Location 2" />
            <img src={location3} className="h-48 md:h-72 rounded-md  md:mt-20" alt="Location 3" />
          </div>
        </div>

        <div className="grid bg-green-500 col-span-1 md:col-span-2 max-w-full md:max-w-xl mx-4 md:mx-32 rounded-3xl">
          <div className="flex flex-wrap justify-between p-4 md:p-5 font-extrabold gap-4">
            <div className="w-full md:w-auto">
              <div className="flex items-center gap-2">
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-5 h-5 md:w-6 md:h-6"
                  >
                    <path
                      fillRule="evenodd"
                      d="m11.54 22.351.07.04.028.016a.76.76 0 0 0 .723 0l.028-.015.071-.041a16.975 16.975 0 0 0 1.144-.742 19.58 19.58 0 0 0 2.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 0 0-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 0 0 2.682 2.282 16.975 16.975 0 0 0 1.145.742ZM12 13.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
                <div>Location</div>
              </div>
              <div>
                <input
                  type="text"
                  className="rounded-xl bg-green-800 w-full md:w-32 p-1"
                />
              </div>
            </div>

            <div className="w-full md:w-auto">
              <div className="flex items-center gap-2">
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-5 h-5 md:w-6 md:h-6"
                  >
                    <path
                      fillRule="evenodd"
                      d="M15.97 2.47a.75.75 0 0 1 1.06 0l4.5 4.5a.75.75 0 0 1 0 1.06l-4.5 4.5a.75.75 0 1 1-1.06-1.06l3.22-3.22H7.5a.75.75 0 0 1 0-1.5h11.69l-3.22-3.22a.75.75 0 0 1 0-1.06Zm-7.94 9a.75.75 0 0 1 0 1.06l-3.22 3.22H16.5a.75.75 0 0 1 0 1.5H4.81l3.22 3.22a.75.75 0 1 1-1.06 1.06l-4.5-4.5a.75.75 0 0 1 0-1.06l4.5-4.5a.75.75 0 0 1 1.06 0Z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
                <div>Distance</div>
              </div>
              <div>
                <input
                  type="text"
                  className="rounded-xl bg-green-800 w-full md:w-32 p-1"
                />
              </div>
            </div>

            <div className="w-full md:w-auto">
              <div className="flex items-center gap-2">
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-5 h-5 md:w-6 md:h-6"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8.25 6.75a3.75 3.75 0 1 1 7.5 0 3.75 3.75 0 0 1-7.5 0ZM15.75 9.75a3 3 0 1 1 6 0 3 3 0 0 1-6 0ZM2.25 9.75a3 3 0 1 1 6 0 3 3 0 0 1-6 0ZM6.31 15.117A6.745 6.745 0 0 1 12 12a6.745 6.745 0 0 1 6.709 7.498.75.75 0 0 1-.372.568A12.696 12.696 0 0 1 12 21.75c-2.305 0-4.47-.612-6.337-1.684a.75.75 0 0 1-.372-.568 6.787 6.787 0 0 1 1.019-4.38Z"
                      clipRule="evenodd"
                    />
                    <path d="M5.082 14.254a8.287 8.287 0 0 0-1.308 5.135 9.687 9.687 0 0 1-1.764-.44l-.115-.04a.563.563 0 0 1-.373-.487l-.01-.121a3.75 3.75 0 0 1 3.57-4.047ZM20.226 19.389a8.287 8.287 0 0 0-1.308-5.135 3.75 3.75 0 0 1 3.57 4.047l-.01.121a.563.563 0 0 1-.373.486l-.115.04c-.567.2-1.156.349-1.764.441Z" />
                  </svg>
                </span>
                <div>Max People</div>
              </div>
              <div>
                <input
                  type="text"
                  className="rounded-xl bg-green-800 w-full md:w-32 p-1"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hotels;
