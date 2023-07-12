import "./FullScreenMask.css";

function FullScreenMask({ children }) {
  return (
    <div className='full-screen-mask'>
      {children}
    </div>
  )
}

export default FullScreenMask;
