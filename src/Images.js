import React, { useState, useEffect } from "react";
import axios from "axios";

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
      console.log(props);
      return (
        <div className="images">
          <div className="row">
            {props.input.results.map(function (photo, index) {
              const width = "316";
              const height = "316";
              const imgSrc = `https://source.unsplash.com/${photo.id}/${width}x${height}`;
              return (
                <span className="col photo" key={index}>
                  <img src={imgSrc} alt={index} />
                </span>
              );
            })}
          </div>
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
