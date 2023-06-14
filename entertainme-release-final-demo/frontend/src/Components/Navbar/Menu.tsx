//React Imports
import { useState } from "react";

//Style Imports
import styles from "../Navbar/Navbar.module.css";
import hamStyles from "../Navbar/hamburger.module.css";

//Package Imports
import { useNavigate } from "react-router-dom";
import { useSignOut } from "react-auth-kit";
import { useQueryClient } from "@tanstack/react-query";

//Icon Imports
import { FaRandom, FaTv } from "react-icons/fa";
import { AiFillHome } from "react-icons/Ai";
import { BiLogOut } from "react-icons/bi";
import { RxMagnifyingGlass } from "react-icons/Rx";

//Hook Imports
import useMenuQuery from "../../Hooks/useMenuQuery";
import useRandomTitle from "../../Hooks/useRandomTitle";
import closeMenu from "../../Hooks/closeMenu";

const Menu = () => {
  //logout
  const signOut = useSignOut();

  //user icon size
  const iconSize = "3vh";

  //clears query client on logout
  const queryClient = useQueryClient();
  const handleClearQueries = () => {
    queryClient.clear();
  };

  //search functionality
  const [searchValue, setSearchValue] = useState("");

  //searching submit
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    navigate("/search/" + searchValue);
    handleOnClick();
  };

  //click magnifying glass icon to handle search
  const handleMagnifyingGlassClick = () => {
    navigate("/search/" + searchValue);
    handleOnClick();
  };

  //searching on enter
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  //state if menu is open or closed
  const { isOpen, setIsOpen, menuRef, handleOnClick } = closeMenu();

  //Gets profile information (name)
  const { data, error } = useMenuQuery();

  //navigation
  const navigate = useNavigate();

  //random title
  const handleRandomButtonClick = useRandomTitle();

  return (
    <>
      <div className={styles.navbar} ref={menuRef}>
        <div
          className={styles.clicker}
          onClick={() => {
            navigate("/main");
            handleOnClick();
          }}
        >
          EntertainMe<a className={styles.orange}>!</a>
        </div>
        <form className={styles.formStyle} onSubmit={handleSubmit}>
          <input
            className={styles.fieldBox}
            onFocus={handleOnClick}
            placeholder="Search..."
            value={searchValue}
            name="Search"
            onChange={handleInputChange}
          ></input>
          <a className={styles.mag} onClick={handleMagnifyingGlassClick}>
            <RxMagnifyingGlass size={".9em"} />
          </a>
        </form>
        <label className={hamStyles.hamburgerMenu}>
          <input
            type="checkbox"
            checked={isOpen}
            name="menu"
            onChange={() => setIsOpen(!isOpen)}
          ></input>
        </label>
        <aside className={hamStyles.sidebar}>
          <div className={hamStyles.content}>
            <div className={hamStyles.items}>
              <div className={hamStyles.icon}></div>
              <div className={hamStyles.items1}>
                {data?.first_name != undefined ? data.first_name : "First"}{" "}
                {data?.last_name != undefined ? data.last_name : "Last"}
              </div>
            </div>

            <a className={hamStyles.line}></a>

            <div
              className={hamStyles.items2}
              onClick={() => {
                navigate("/main");
                handleOnClick();
              }}
            >
              <AiFillHome color="white" size={iconSize}></AiFillHome>
              Home
            </div>

            <a className={hamStyles.line}></a>

            <div
              className={hamStyles.items2}
              onClick={() => {
                navigate("/watchlist");
                handleOnClick();
              }}
            >
              <FaTv color="white" size={iconSize}></FaTv>Watchlist
            </div>

            <a className={hamStyles.line}></a>

            <div
              className={hamStyles.items2}
              onClick={() => {
                handleOnClick();
                handleRandomButtonClick();
              }}
            >
              <FaRandom color="white" size={iconSize}></FaRandom>Random
            </div>

            <a className={hamStyles.line}></a>

            <div
              className={hamStyles.items2}
              onClick={() => {
                navigate("/");
                signOut();
                handleOnClick();
                handleClearQueries;
                //window.location.reload();
              }}
            >
              <BiLogOut color="white" size={iconSize}></BiLogOut>
              Logout
            </div>
          </div>
        </aside>
      </div>
    </>
  );
};

export default Menu;
