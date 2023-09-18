function Loader() {
  return (
    <>
      {[...Array(8)].map((_, index) => (
        <div key={index} className="max-w-sm card card-loader">
          <div className='load-image gradient-bg'></div>
          <div className='load-title gradient-bg'></div>
          <div className='load-text gradient-bg'></div>
          <div className='load-text gradient-bg'></div>
        </div>
      ))}
    </>
  );
}

export default Loader;
