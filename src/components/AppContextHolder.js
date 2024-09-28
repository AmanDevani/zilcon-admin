import { App } from 'antd';

let messageContext;
let modalContext;
let notificationContext;

export default () => {
  const { message, modal, notification } = App?.useApp();
  messageContext = message;
  modalContext = modal;
  notificationContext = notification;
  return null;
};

export { messageContext, modalContext, notificationContext };
