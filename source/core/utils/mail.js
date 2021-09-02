import CONFIG from '../config/config';
import axios from 'axios'

export const sendMail = (
  { message, to } // email receptor del mensaje (objeto con varios campos)
) => {
  // Enviar Email
  return new Promise((resolve, reject) => {
    try {
      const data = {
        message,
        to
      };

      if (to) {
        axios .post(
          `http://email-service:8081/messages/mailQueue`,

          data,
          {
            headers: {
              ['x-can-i-use']: CONFIG.AMAZON_MAIL_PWD
            }
          }
        )
          .then(data => {
            console.log('Correo enviado correctamente a ', to);

            //return data;
            resolve(data);
          })
          .catch(e => {
            console.log('Error al enviar correo a ', to);

            //return e;
            reject(e);
          });
      }
    } catch (e) {
      console.log('#########', 'NOTIFICATIONS MAILSEND', '##########');
      console.log('Error sending mail: ', e);
      console.log('#########', 'NOTIFI(CATIONS MAILSEND', '##########');
      reject(e);
    }
  });
};
