import React, { useEffect, useState } from "react";
import "../../styles/network/searchform.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
const SearchForm = ({ data, setData,originalData }) => {
  const [searchTerm, setSearchTerm] = useState("");
  
  const handleChange = (e) => {
    setSearchTerm(e.target.value)
  }; 
  useEffect(() => {
    const results = originalData.filter((item) =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    setData(results);
  }, [searchTerm]);
  return (
    <div className="SearchForm">
      <input
        className="SearchInput"
        type="text"
        value={searchTerm}
        onChange={handleChange}
        placeholder="검색어를 입력하세요"
      />
      <FontAwesomeIcon id="dotbogi" icon={faSearch} />
    </div>
  );
};

export default SearchForm;
