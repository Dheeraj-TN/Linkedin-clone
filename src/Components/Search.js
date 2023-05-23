import React, { useEffect, useState } from "react";
import Header from "./Header";
import { db } from "../firebase";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import SearchDisplay from "./SearchDisplay";
function Search() {
  const [searchResults, setSearchResults] = useState([]);
  const searchItem = sessionStorage.getItem("searchItem");
  const postRef = collection(db, "Post");
  useEffect(() => {
    const q = query(postRef);
    onSnapshot(q, (snapshot) => {
      const items = [];
      snapshot.forEach((doc) => {
        items.push(doc.data());
      });
      setSearchResults(items);
    });
  });
  console.log("Searchresults : " + searchResults);
  console.log("searched : " + searchItem);
  return (
    <div className="searchRes">
      <Header />

      <div className="results" style={{ marginTop: "70px" }}>
        <h2 style={{ fontWeight: 400 }}>
          Here are the results for your search
        </h2>
        {searchResults &&
          searchResults.map((item) => {
            if (item.desc.toLowerCase().includes(searchItem))
              return (
                <SearchDisplay
                  userPic={item.profilePicture}
                  userName={item.name}
                  email={item.desc}
                />
              );
            return "";
          })}
      </div>
    </div>
  );
}

export default Search;
