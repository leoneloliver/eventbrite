function Footer() {
  return (
    <>
    <footer className="bg-blue-950 py-7 text-white mt-8">
      <div className="container mx-auto flex flex-wrap justify-around">
        <div className="w-full md:w-1/4 p-4">
          <h3 className="text-xl font-semibold mb-3">About Us</h3>
          <ul>
            <li>
              <a href="#">Our Mission</a>
            </li>
            <li>
              <a href="#">History</a>
            </li>
            <li>
              <a href="#">Team</a>
            </li>
          </ul>
        </div>
        <div className="w-full md:w-1/4 p-4">
          <h3 className="text-xl font-semibold mb-3">Career</h3>
          <ul>
            <li>
              <a href="#">Job Openings</a>
            </li>
            <li>
              <a href="#">Internships</a>
            </li>
            <li>
              <a href="#">Culture</a>
            </li>
          </ul>
        </div>
        <div className="w-full md:w-1/4 p-4">
          <h3 className="text-xl font-semibold mb-3">Events</h3>
          <ul>
            <li>
              <a href="#">Upcoming Events</a>
            </li>
            <li>
              <a href="#">Past Events</a>
            </li>
            <li>
              <a href="#">Event Registration</a>
            </li>
          </ul>
        </div>
      </div>
      
    </footer>
    <div className="bg-blue-1000">
      <div className="container mx-auto text-white p-4">
        <p className="text-sm pl-12">© 2023 Eventbrite</p>
      </div>
    </div>
    </>
  );
}

export default Footer;
