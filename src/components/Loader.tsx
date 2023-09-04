function Loader() {
  return (
    <>
      {[...Array(8)].map((_, index) => (
        <div key={index} className="max-w-sm card card-loader">
          <div className='load-image'></div>
          <div className='load-title'></div>
          <div className='load-text'></div>
          <div className='load-text'></div>
        </div>
      ))}
    </>
  );
}

export default Loader;
