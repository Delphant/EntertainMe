import React, { useEffect, useRef, useState } from "react";

const closeMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  //element that is clicked
  const menuRef = useRef<HTMLDivElement>(null);

  const handleOutsideClick = (event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  const handleOnClick = () => {
    if (isOpen) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.body.addEventListener("click", handleOutsideClick);
    return () => {
      document.body.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  return { isOpen, setIsOpen, menuRef, handleOnClick };
};

export default closeMenu;
