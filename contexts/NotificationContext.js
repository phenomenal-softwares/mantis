import { createContext, useState, useEffect } from "react";

export const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([
    {
      id: "NTF-" + Math.floor(Math.random() * 10000000),
      title: "Welcome to Mantis!",
      message: "You’ve successfully created your Mantis account.",
      date: new Date(Date.now() - 86400000).toISOString(), // yesterday
      type: "info", // info | success | warning | error
      read: true,
    },
    {
      id: "NTF-" + Math.floor(Math.random() * 10000000),
      title: "Promo Alert 🎉",
      message: "Transfer fees waived for all Mantis-to-Mantis transactions this week!",
      date: new Date(Date.now() - 3600000).toISOString(), // 1 hour ago
      type: "promo",
      read: false,
    },
  ]);

  const [hasUnread, setHasUnread] = useState(false);

  // 🔁 Auto-check if there are unread notifications
  useEffect(() => {
    const unread = notifications.some((n) => !n.read);
    setHasUnread(unread);
  }, [notifications]);

  const addNotification = (notification) => {
    setNotifications((prev) => [
      {
        id: "NTF-" + Math.floor(Math.random() * 10000000),
        ...notification,
        date: new Date().toISOString(),
        read: false,
      },
      ...prev,
    ]);
  };

  const markAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, read: true } : item
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((item) => ({ ...item, read: true })));
    setHasUnread(false);
  };

  return (
    <NotificationContext.Provider
      value={{ notifications, addNotification, markAsRead, markAllAsRead, hasUnread }}
    >
      {children}
    </NotificationContext.Provider>
  );
};
