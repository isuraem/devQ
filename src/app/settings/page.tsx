"use client";

import { useEffect, useState } from "react";
import Loading from "./loading";

export default function Settings() {
  const [switches, setSwitches] = useState({
    switch1: true,
    switch2: true,
    switch3: true,
    switch4: true,
    switch5: true,
  });

  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(null);

  useEffect(() => {
    // Simulate data fetching
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  const handleToggle = (switchId: string | number) => {
    setSwitches((prevState) => ({
      ...prevState,
      [switchId]: !prevState[switchId as keyof typeof prevState],
    }));
  };

  return (
    <div className="ml-9 mr-9">
      <h1 className="text-3xl font-sans mt-9 font-semibold">Settings</h1>
      <h1 className="mt-9 mb-9 text-xl font-semibold">Notifications</h1>

      <div className="form-check form-switch">
        <label className="form-check-label" htmlFor="flexSwitchCheckDefault">
          News and Updates
          <p className="text-sm text-gray-500">Get the latest news and updates.</p>
        </label>
        <input
          className="form-check-input"
          type="checkbox"
          role="switch"
          id="flexSwitchCheckDefault"
          checked={switches.switch1}
          onChange={() => handleToggle("switch1")}
        />

      </div>

      <div className="form-check form-switch">
        <label className="form-check-label" htmlFor="flexSwitchCheckChecked">
          Questions
          <p className="text-sm text-gray-500">Receive notifications for new questions.</p>
        </label>
        <input
          className="form-check-input"
          type="checkbox"
          role="switch"
          id="flexSwitchCheckChecked"
          checked={switches.switch2}
          onChange={() => handleToggle("switch2")}
        />

      </div>

      <div className="form-check form-switch">
        <label className="form-check-label" htmlFor="flexSwitchCheckDisabled">
          Replies
          <p className="text-sm text-gray-500">Get notified when someone replies.</p>
        </label>
        <input
          className="form-check-input"
          type="checkbox"
          role="switch"
          id="flexSwitchCheckDisabled"
          checked={switches.switch3}
          onChange={() => handleToggle("switch3")} 
        />

      </div>

      <div className="form-check form-switch">
        <label
          className="form-check-label"
          htmlFor="flexSwitchCheckCheckedDisabled"
        >
          Members
          <p className="text-sm text-gray-500">Notifications about new members.</p>
        </label>
        <input
          className="form-check-input"
          type="checkbox"
          role="switch"
          id="flexSwitchCheckCheckedDisabled"
          checked={switches.switch4}
          onChange={() => handleToggle("switch4")}
        />

      </div>

      <div className="form-check form-switch">
        <label className="form-check-label" htmlFor="flexSwitchCheckDesktopPush">
          Desktop Push Notifications
          <p className="text-sm text-gray-500">
          Enable desktop push notifications for updates.
        </p>
        </label>

        <input
          className="form-check-input"
          type="checkbox"
          role="switch"
          id="flexSwitchCheckDesktopPush"
          checked={switches.switch5}
          onChange={() => handleToggle("switch5")}
        />

      </div>

      <style jsx>{`
        .form-check {
          display: flex;
          align-items: center;
          margin-bottom: 2rem;
          justify-content: space-between;
        }
        .form-check-input {
          width: 42px;
          height: 22px;
          background-color: #c7d2fe; /* indigo-200 */
          border-radius: 50px;
          position: relative;
          appearance: none;
          outline: none;
          cursor: pointer;
          transition: background-color 0.3s;
        }
        .form-check-input:checked {
          background-color: #6366f1; /* indigo-400 */
        }
        .form-check-input:checked::before {
          left: 20px;
        }
        .form-check-input::before {
          content: "";
          position: absolute;
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background-color: #fff;
          top: 2px;
          left: 2px;
          transition: left 0.3s;
        }
        .form-check-label {
          margin-left: 0.5rem;
          user-select: none;
          flex: 1;
        }
        .subheading {
          margin-left: 0.5rem;
          color: #6b7280; /* gray-500 */
          font-size: 0.875rem;
        }
      `}</style>
    </div>
  );
}
