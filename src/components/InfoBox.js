import React, { useState, useEffect } from 'react';

export default function InfoBox({ message, type }) {
  const animationDuration = 500
  const messageDuration = 4000

  const [show, setShow] = useState(false);

  useEffect(() => {
    // Set show to true when message is not empty
    if (message) {
      setShow(true);

      // Automatically hide the message after 2 seconds
      const timeout = setTimeout(() => {
        setShow(false);
      }, messageDuration);

      // Clear the timeout when the component unmounts or message changes
      return () => clearTimeout(timeout);
    }
  }, [message]);

  let bgColor
  let textColor
  if (type === "info") {
    bgColor = "bg-butterscotch"
    textColor = "text-darkbrown"
  } else if (type === "error") {
    bgColor = "bg-scarlet"
    textColor = "text-white"
  } else if (type === "success") {
    bgColor = "bg-green-500"
    textColor = "text-white"
  }

  return <div className={`${show ? "opacity-100" : "opacity-0"} transition duration-500 h-20 ${bgColor} ${textColor} text-lg w-full justify-self-end flex justify-center items-center fixed bottom-0 p-2`}
    style={show ? { animation: 'fadeInUp', animationDuration: `${animationDuration}ms` } : {}}
  >
    {message}
  </div>
}
