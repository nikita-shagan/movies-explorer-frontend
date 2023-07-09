import './MoviesSection.css'

function MoviesSection({ children }) {
  return (
    <section className='movies-section'>
      {children}
    </section>
  );
}

export default MoviesSection;
