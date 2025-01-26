

const Contact = () => {
  return (
    <div className="p-10 bg-gray-50">
      <h1 className="text-4xl font-semibold text-center text-blue-800 mb-8">
        Contact Us
      </h1>
      <p className="text-center text-lg text-gray-700 mb-10">
        We'd love to hear from you! Please reach out for any inquiries.
      </p>

      <form className="max-w-xl mx-auto bg-white p-6 rounded-lg shadow-lg">
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700">Name:</label>
          <input type="text" id="name" name="name" placeholder="Enter your name" className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md" required />
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700">Email:</label>
          <input type="email" id="email" name="email" placeholder="Enter your email" className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md" required />
        </div>

        <div className="mb-4">
          <label htmlFor="message" className="block text-gray-700">Message:</label>
          <textarea id="message" name="message" placeholder="Your message" className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md" required></textarea>
        </div>

        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-300">Send Message</button>
      </form>
    </div>
  );
};

export default Contact;
