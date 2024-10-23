import { IoNotifications } from "react-icons/io5";
import Modal from "./Modal";
import { useEffect, useState } from "react";
import { useDeleteNotificationsMutation, useMyNotificationsQuery } from "../redux/api/notificationAPI";
import { onlyResponseToast } from "../utils/features";
import toast from "react-hot-toast";
import { Notification } from "../types/api-types";
import { Link } from "react-router-dom";

interface NotificationProps {
  userId: string;
  adminNotification: Notification;
  isAdmin: boolean;
}

const Notifications = ({ userId, adminNotification, isAdmin }: NotificationProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const { data, isError } = useMyNotificationsQuery(userId);
  const [deleteNotification] = useDeleteNotificationsMutation()
  useEffect(() => {
    if (isAdmin && adminNotification) {
      setNotifications((prev) => [...prev, adminNotification]);
    }
  }, [adminNotification, isAdmin]);

  useEffect(() => {
    if (data && Array.isArray(data.notifications)) {
      setNotifications((prev) => [...prev, ...data.notifications]);
    }
  }, [data]);

  if (isError) toast.error("Cannot Fetch the Notifications");

  const toggleModal = () => setIsOpen(!isOpen);

  const deleteHandler = async (notificationId: string) => {
    const res = await deleteNotification(notificationId);
    const remove = notifications.filter(i => i._id !== notificationId)
    setNotifications(remove);
    onlyResponseToast(res);
  };

  return (
    <div className="relative mr-2 mt-2">
      <button onClick={toggleModal} className="hover:text-gray-800 text-gray-800 relative">
        <IoNotifications size="1.3rem" />
        {notifications.length > 0 && (
          <span className="absolute -top-1 bg-blue-500 text-gray-100 rounded-full h-3 w-3 text-xs"></span>
        )}
      </button>
      <Modal isOpen={isOpen} onClose={toggleModal}>
        <div className="absolute p-2 animate-modal top-12 right-4 bg-white shadow-lg rounded-lg flex flex-col ">
          {notifications.length > 0 ? (
            notifications.map((notification) => (
              <Link to={isAdmin ? `admin/transaction/${notification.orderId}`:`order/${notification.orderId}`} key={notification._id} className="border-b mb-2">
                <p className="text-gray-800 text-sm">
                  {isAdmin ? notification.adminMessage : notification.message}
                </p>
                <p className="text-gray-800 text-sm">OrderId: {notification.orderId}</p>
                <p className="text-gray-800 text-sm">UserId: {notification.userId}</p>
                <p className="text-gray-800 text-sm">Status: {notification.status}</p>
                <span className="text-gray-800 text-2xl cursor-pointer" onClick={() => deleteHandler(notification._id)}>
                  &times;
                </span>
              </Link>
            ))
          ) : (
            <p className="text-gray-800 text-sm">No notifications</p>
          )}
        </div>
      </Modal>
    </div>
  );
};

export default Notifications;
