import { notification } from "antd";

export function openNotification(msg: string, desc?: string) {
  notification.open({
    message: msg,
    description: desc,
    duration: 3,
  });
}
