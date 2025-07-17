import { useState, useEffect } from "react";

// const [countDown, isCompleted] = useCountdownTimer(startTime, onComplete);

const useCountdownTimer = (startTime, onComplete) => {
  const [timeLeft, setTimeLeft] = useState(startTime);
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    if (timeLeft <= 0) {
      if (!isCompleted) {
        setIsCompleted(true); // Mark the timer as completed
        onComplete && onComplete(); // Trigger the completion callback
      }
      return; // Stop the timer if time is up
    }
    setIsCompleted(false); // Reset completed state if time is still left

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    // Cleanup interval on unmount
    return () => clearInterval(timer);
  }, [timeLeft, onComplete, isCompleted]);

  // Return formatted time as double digits and completion status

  const formattedTime = String(timeLeft).padStart(2, "0");

  const hookData = [formattedTime, setTimeLeft, isCompleted];
  hookData.state = formattedTime;
  hookData.open = isCompleted;
  return hookData;
};

export default useCountdownTimer;
