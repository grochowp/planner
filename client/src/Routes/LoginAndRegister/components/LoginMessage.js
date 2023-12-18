import React, { useState, useEffect } from "react";

export const LoginMessage = () => {
  const messages = [
    "Simplify Your Workflow with our Kanban App",
    "Boost Your Productivity: Try Our Kanban App Today",
    "Transform the Way You Work: Welcome to Kanban Excellence",
    "Enhance Your Efficiency with our User-Friendly Kanban App",
  ];

  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentMessageIndex((prevIndex) =>
        prevIndex === messages.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(intervalId);
  }, [currentMessageIndex, messages.length]);

  return (
    <div className="login-page-message">
      <p>{messages[currentMessageIndex]}</p>
    </div>
  );
};
