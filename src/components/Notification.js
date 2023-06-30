import { notification } from "antd";

const Notification = (type, message, icon) =>
  notification[type]({
    message,
    duration: 5,
    style: {
      width: 450,
    },
    icon,
  });
export default Notification;
