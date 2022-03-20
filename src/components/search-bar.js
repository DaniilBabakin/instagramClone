import { useState } from "react"
import { Link } from "react-router-dom";

export default function SearchBar ({users,avatars}) {
  const [filteredData, setFilteredData] = useState([]);
  const [wordEntered, setWordEntered] = useState("");

  const handleFilter = (event) => {
    const searchWord = event.target.value;
    setWordEntered(searchWord);
    const newFilter = users.filter((value) => {
      return value.username.toLowerCase().includes(searchWord.toLowerCase());
    });

    if (searchWord === "") {
      setFilteredData([]);
    } else {
      setFilteredData(newFilter);
    }
  };
  const clearInput = () => {
    setFilteredData([]);
    setWordEntered("");
  };
  return(
    <div className="flex items-center flex-col bg-gray-light rounded-md px-3 py-0.5">
      <div className="relative flex flex-row justify-center items-center">
        <input type="text" placeholder="Search..." className=" bg-gray-light p-1 rounded-md outline-none" onChange={handleFilter} value={wordEntered}/>
        <div className="">
            {wordEntered.length === 0 ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" onClick={clearInput}>
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            )}
          </div>
      </div>

      {filteredData.length != 0 && (
        <div className="absolute top-16 w-72 border border-gray-light drop-shadow-lg">
          {filteredData.map((user, key) => {
            return (
              <div className="w-full bg-white  items-center">
                <Link to={`/p/${user.username}`} className="flex justify-start items-center flex-row p-3">
                  <img
                    className="rounded-full h-8 w-8 object-cover flex mr-3"
                    src={avatars.filter( profile => profile.userId == user.userId).map(item=>item.imageSrc)}
                    alt="avatars"
                    onError={({ currentTarget }) => {
                      currentTarget.onerror = null; // prevents looping
                      currentTarget.src="/images/default.png";
                    }}  
                  />
                  <div className="flex flex-col">
                  <p className="font-bold text-sm">{user.username} </p>
                  <p className="text-sm">{user.fullName} </p>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      )}
    </div>
  )
}