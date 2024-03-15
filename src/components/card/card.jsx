import './card.css';
const Card = (props) => {
    const {course} = props
  return (
    <div className='card'>
        <span className='card__badge'>
            1
        </span>
        <div className="image__container">
            <img src={course.Image} alt="" />
        </div>
        <div className="card__body"></div>
        <h2 className="card__title">{course.title}</h2>
        <h2 className="card__price">{course.price.toLocaleString('en-US',{style:"currency",currency:"USD"})}</h2>
    </div>
  )
}

export default Card