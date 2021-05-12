import React, { useState, useEffect } from "react";
import axios from "axios";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";

export default function Images(props) {
  let [searchItem, setSearchItem] = useState("");
  let [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(false);
  }, [props.input]);

  function handleResponse(response) {
    setSearchItem(props.search);
    setLoaded(true);
  }

  if (loaded) {
    if (props.input.results) {
      return (
        <div className="images">
          <ResponsiveMasonry
            columnsCountBreakPoints={{ 500: 1, 750: 2, 850: 3, 1024: 4 }}
          >
            <Masonry>
              {props.input.results.map(function (photo, index) {
                /* Resizable Photos
              const width = "316";
              const height = "316";
              const imgSrc = `https://source.unsplash.com/${photo.id}/${width}x${height}`;
              */
                const imgSrc = photo.urls;
                return (
                  <div className="photo" key={index}>
                    <a href={imgSrc.full} target="_blank" rel="noreferrer">
                      <img src={imgSrc.full} alt={index} />
                    </a>
                  </div>
                );
              })}
            </Masonry>
          </ResponsiveMasonry>
        </div>
      );
    } else return null;
  } else {
    const apiKey = "EwE9fimEDg-fitaypKwIX0LVydaTucg-hTneShTMvhM";
    const apiUrl = `https://api.unsplash.com/search/photos?page=1&query=${searchItem}?&client_id=${apiKey}`;

    axios.get(apiUrl).then(handleResponse);

    return null;
  }
}
