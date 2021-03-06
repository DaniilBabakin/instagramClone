import PropTypes from "prop-types"
import {Link} from 'react-router-dom'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'



export default function User ({ username, fullName,imageSrc }) {
   return !username || !fullName ? (
    <Skeleton height={61} />
  ) : (
    <Link to={`/p/${username}`} className="grid grid-cols-4 gap-4 mb-6 items-center">
      <div className="flex flex-wrap items-center justify-between col-span-1">
        <img
          className="rounded-full w-16 h-16 object-cover flex"
          style={{minWidth: "40px"}}
          src={imageSrc}
          alt=""    
          onError={({ currentTarget }) => {
          currentTarget.onerror = null; // prevents looping
          currentTarget.src="/images/default.png";
          }}   
        />
      </div>
      <div className="col-span-3">
        <p className="font-bold text-sm">{username}</p>
        <p className="text-sm">{fullName}</p>
      </div>
    </Link>
  );
}

User.propTypes = {
  username: PropTypes.string.isRequired,
  fullName: PropTypes.string.isRequired
}

User.whyDidYouRender=true;