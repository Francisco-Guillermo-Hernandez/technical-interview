export const renderHtml = (otpCode: string) => {

  return `
  <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html
  dir="ltr"
  lang="en">
  <head>
    
    <meta content="text/html; charset=UTF-8" http-equiv="Content-Type" />
    <meta name="x-apple-disable-message-reformatting" />
  </head>
  <body
   
    style="background-color:#ffffff">
    <table
      border="0"
      width="100%"
      cellpadding="0"
      cellspacing="0"
      role="presentation"
      align="center">
      <tbody>
        <tr>
          <td
            style="background-color:#ffffff;font-family:HelveticaNeue,Helvetica,Arial,sans-serif">
            <table
              align="center"
              width="100%"
              border="0"
              cellpadding="0"
              cellspacing="0"
              role="presentation"
              style="max-width:360px;background-color:#ffffff;border:1px solid #eee;border-radius:5px;box-shadow:0 5px 10px rgba(20,50,70,.2);margin-top:20px;margin:0 auto;padding:68px 0 130px">
              <tbody>
                <tr style="width:100%">
                  <td>
                 
                      <svg  style="display:block;outline:none;border:none;text-decoration:none;margin:0 auto" xmlns="http://www.w3.org/2000/svg" width="144" height="35" fill="none"><path fill="#FF6139" fill-rule="evenodd" d="m33.687 22.543 7.574-11.271-2.692-4.013H19.433l-2.666 3.97-2.19-3.255 2.658-3.961H36.38L33.687 0H14.543L6.97 11.272l6.262 9.32-1.525 2.079a2.16 2.16 0 0 1-2.828.588l-5.12-2.829L0 26.914l1.55 1.056c.767-.98 1.935-1.95 3.076-2.624a3.12 3.12 0 0 1 3.11-.043 4.504 4.504 0 0 0 5.87-1.244l1.107-1.507h18.982zm82.965-14.722a2.8 2.8 0 0 0-.46 1.03h.008c-.094.401-.136.819-.136 1.279v.963h4.055v3.399h-4.055v12.422h-4.337V14.492h-4.362l2.352-3.4h2.01V9.875c0-1.005.137-1.866.409-2.598.273-.733.639-1.338 1.099-1.832q.688-.739 1.568-1.184a7.2 7.2 0 0 1 1.84-.64 9.7 9.7 0 0 1 1.9-.195c.622 0 1.099.034 1.423.102q.484.102.647.179v3.425a5 5 0 0 0-.63-.145 5 5 0 0 0-.963-.085c-.579 0-1.073.077-1.457.238-.392.162-.69.392-.911.682M144 3.97h-4.337v22.935H144zm-81.27 9.866c.742-1.832 2.565-3.042 5.019-3.042 3.774 0 6.313 2.778 6.313 8.205s-2.54 8.204-6.313 8.204c-2.454 0-4.277-1.244-5.018-3.041h-.239l-.179 2.743h-4.157V3.97h4.336v9.866zm-.204 5.93c0 2.01 1.15 3.927 3.57 3.927 2.13 0 3.544-1.474 3.544-4.694s-1.423-4.695-3.544-4.695c-2.42 0-3.57 1.917-3.57 3.928zm13.29-.767c0-4.9 2.923-8.205 7.941-8.205 4.72 0 7.906 3.297 7.906 8.205s-2.922 8.179-7.906 8.179c-4.754 0-7.94-3.28-7.94-8.18m4.371 0c0 3.124 1.387 4.658 3.54 4.66 2.128-.002 3.54-1.536 3.54-4.66 0-3.127-1.354-4.66-3.51-4.66s-3.57 1.533-3.57 4.66m27.792-7.907h-4.925l-3.135 4.754h-.17l-3.161-4.754h-5.163l5.401 7.702-5.938 8.12h4.873l3.834-5.376h.18l3.663 5.375h5.103l-5.811-8.238zm20.915 12.567c2.181 0 3.451-1.738 3.451-3.834h.008v-8.733h4.337v15.813h-4.158l-.179-2.897h-.204c-.767 2.07-2.684 3.161-4.959 3.161-3.663 0-5.64-2.18-5.64-6.228v-9.857h4.337v8.707c0 2.513.826 3.868 3.007 3.868M29.64 27.612v.622l-.008-.008c0 1.158.63 2.223 1.652 2.76 1.125.588 2.454 1.048 3.604 1.21l-.128 1.866H27.29v-6.45c0-.886-.341-1.746-.946-2.394l-1.355-1.457h3.187a5.83 5.83 0 0 1 1.465 3.851" clip-rule="evenodd"></path></svg>
                    <p
              
                      style="font-size:11px;line-height:16px;color:#0a85ea;font-weight:700;font-family:HelveticaNeue,Helvetica,Arial,sans-serif;height:16px;letter-spacing:0;margin:16px 8px 8px 8px;text-transform:uppercase;text-align:center;margin-top:16px;margin-right:8px;margin-bottom:8px;margin-left:8px">
                      Verifica tu identidad
                    </p>
                    <h1
                
                      style="color:#000;display:inline-block;font-family:HelveticaNeue-Medium,Helvetica,Arial,sans-serif;font-size:20px;font-weight:500;line-height:24px;margin-bottom:0;margin-top:0;text-align:center">
                      Ingresa el siguiente código para activar tú cuenta.
                    </h1>
                    <table
                      align="center"
                      width="100%"
                      border="0"
                      cellpadding="0"
                      cellspacing="0"
                      role="presentation"
              
                      style="background:rgba(0,0,0,.05);border-radius:4px;margin:16px auto 14px;vertical-align:middle;width:280px">
                      <tbody>
                        <tr>
                          <td>
                            <p
                              style="font-size:32px;line-height:40px;color:#000;font-family:HelveticaNeue-Bold;font-weight:700;letter-spacing:6px;padding-bottom:8px;padding-top:8px;margin:0 auto;display:block;text-align:center;margin-top:0;margin-right:auto;margin-bottom:0;margin-left:auto">
                              ${otpCode}
                            </p>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <p
              
                      style="font-size:15px;line-height:23px;color:#444;font-family:HelveticaNeue,Helvetica,Arial,sans-serif;letter-spacing:0;padding:0 40px;margin:0;text-align:center;margin-top:0;margin-bottom:0;margin-left:0;margin-right:0">
                      No esperabas este email?
                    </p>
                    <p
              
                      style="font-size:15px;line-height:23px;color:#444;font-family:HelveticaNeue,Helvetica,Arial,sans-serif;letter-spacing:0;padding:0 40px;margin:0;text-align:center;margin-top:0;margin-bottom:0;margin-left:0;margin-right:0">
                      Contacta a 
                      <a
                        href="mailto:hola@boxful.com"
                        style="color:#444;text-decoration-line:none;text-decoration:underline"
                        target="_blank"
                        >hola@boxful.com</a>
                      Si no has solicitado este codigo
                    </p>
                  </td>
                </tr>
              </tbody>
            </table>
           
          </td>
        </tr>
      </tbody>
    </table>
  </body>
</html>

  `
} 