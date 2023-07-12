import "./Preloader.css"


function Preloader({ size = 52 }) {
  return (
    <div className='preloader' style={{width: size, height: size}}/>
  )
}

export default Preloader;
