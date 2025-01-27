
import testimonial1 from '../assets/images/testimonial1.jpg';
import testimonial2 from '../assets/images/testimonial2.jpg';
import testimonial3 from '../assets/images/testimonial3.jpg';

const Testimonial = () => {
  return (
    <div className="p-10 grid place-content-center">
      <h1 className="text-4xl font-semibold text-center font-Playfair tracking-wider mb-6 ">
        What Our Clients Say
      </h1>

      <div className="mx-2 md:mx-10 ">
        <span className="bg-green-500 text-white px-3 py-1 rounded-full font-bold">
          Fan Love
        </span>
        <div className="text-lg md:text-xl mt-3 font-Playfair tracking-wide">
          What our Clients Say about us
        </div>
      </div>

      {/* Testimonial Cards */}
      <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 px-6 md:px-10 lg:px-20 max-w-7xl">
        {/* Card 1 */}
        <div className="rounded-lg shadow-lg overflow-hidden ">
          <img
            className="w-full h-60 object-cover"
            src={testimonial1}
            alt="Client John Doe"
          />
          <div className="p-5 ">
            <h5 className="mb-2 text-xl md:text-2xl font-bold tracking-tight  ">
              John Doe
            </h5>
            <p className="">
              Here are the biggest enterprise technology acquisitions of 2021 so
              far, in reverse chronological order.
            </p>
          </div>
        </div>

        {/* Card 2 */}
        <div className="rounded-lg shadow-lg overflow-hidden ">
          <img
            className="w-full h-60 object-cover"
            src={testimonial2}
            alt="Client Franklin Dash"
          />
          <div className="p-5">
            <h5 className="mb-2 text-xl md:text-2xl font-bold tracking-tight ">
              Franklin Dash
            </h5>
            <p className="">
              Here are the biggest enterprise technology acquisitions of 2021 so
              far, in reverse chronological order.
            </p>
          </div>
        </div>

        {/* Card 3 */}
        <div className="rounded-lg shadow-lg overflow-hidden ">
          <img
            className="w-full h-60 object-cover"
            src={testimonial3}
            alt="Client Michal Smith"
          />
          <div className="p-5">
            <h5 className="mb-2 text-xl md:text-2xl font-bold tracking-tight ">
              Michal Smith
            </h5>
            <p className="">
              Here are the biggest enterprise technology acquisitions of 2021 so
              far, in reverse chronological order.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonial;
