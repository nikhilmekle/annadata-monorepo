import React from "react";
import "./ExploreMenu.css";
import { menu_list } from "../../assets/assets";
const ExploreMenu = ({ category, setCategory }) => {
  //destructuring the props which is passed from parent component i.e Home component
  return (
    <div className="explore-menu" id="explore-menu">
      {/* <h1>{category}</h1> */}
      <h1>What's on Your Plate Today?</h1>
      <p className="explore-menu-text">
        From comfort classics to bold new bites, our curated menu has something
        for every foodie.
      </p>
      <div className="explore-menu-list">
        {menu_list.map((item, index) => {
          return (
            // When a menu item is clicked, update the 'category' state.
            // If the clicked item's name is already selected (same as current category),
            // then reset the category to "All".
            // Otherwise, set the category to the clicked item's menu_name.
            <div
              onClick={() =>
                setCategory((prev) =>
                  prev === item.menu_name ? "All" : item.menu_name
                )
              }
              key={index}
              className="explore-menu-list-item"
            >
              <img
                className={category === item.menu_name ? "active" : ""}
                src={item.menu_image}
                alt=""
              />
              <p>{item.menu_name}</p>
            </div>
          );
        })}
      </div>
      <hr />
    </div>
  );
};

export default ExploreMenu;
