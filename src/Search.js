import React, { useState } from "react";
import Images from "./Images";
import axios from "axios";
import SimpleReactLightbox, { SRLWrapper } from "simple-react-lightbox";

export default function Search() {
  const [searchItem, setSearchItem] = useState("");
  const [photo, setPhoto] = useState("");

  const apiKey = "EwE9fimEDg-fitaypKwIX0LVydaTucg-hTneShTMvhM";
  const apiUrl = `https://api.unsplash.com/search/photos?page=1&query=${searchItem}?&client_id=${apiKey}`;

  function showPhotos(searchResponse) {
    setPhoto(searchResponse.data);
  }

  function handleSubmit(event) {
    event.preventDefault();
    axios.get(apiUrl).then(showPhotos);
  }

  function handleImageSearch(input) {
    setSearchItem(input.target.value);
  }

  return (
    <div className="search">
      <div className="pt-5 d-flex justify-content-center">
        <form className="input-group search-form pb-3" onSubmit={handleSubmit}>
          <input
            type="search"
            id="inputSearch"
            className="form-control"
            placeholder="Search"
            onChange={handleImageSearch}
          />
          <button className="btn btn-primary">
            <i className="fas fa-search"></i>
          </button>
        </form>
      </div>
      <SimpleReactLightbox>
        <SRLWrapper>
          <Images input={photo} search={searchItem} />
        </SRLWrapper>
      </SimpleReactLightbox>
    </div>
  );
}
