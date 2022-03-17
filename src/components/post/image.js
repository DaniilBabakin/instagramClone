import PropTypes from 'prop-types'

export default function Image({src,caption}){
  return(
  <div >
    <img src={src} alt={caption} className="object-cover w-full" style={{height: "600px"}}/> 
  </div>
  )
}
Image.propTypes = {
  src: PropTypes.string.isRequired,
  caption: PropTypes.string.isRequired
}