### Documentation

Service that generates a CHAMPIAN certificate.

---

## Folder Structure

    - assets
      - fonts
        - *.ttf
      - templates
        - *.png
      - *.png

    - src
      - canvas.d.ts
      - config.ts
      - genCert.ts
      - helper.ts
      - index.ts
      - interfaces.ts
      - router.ts
      - utils.ts
      - logger.ts

---

### File Wise Description

1. **config.ts** - Contains key value pair information about external services such as URL, connection strings etc that this service may communicate with.

   - apiKey - Key used to authenticate requests made to this service.

2. **canvas.d.ts** - Declares the canvas module.

3. **genCert.ts** - Contains functions which are responsible for creating the certificates.

   - handleGeneration - Checking for any missing parameters.
   - renderCertificate - Function which creates the certificate based upon the input parameters by the user.
   - getBaseFile - Function to choose the base image file for the certificate.

4. **helper.ts**

   - prettyPrintCertDate - Returns the date in the "DD.MM.YYYY" Format.
   - nonEmptyString - Check if the input is an empty string or it is null or anything other than a string.
   - prettyPrintValidDate - Returns the date in the valid "Do MMMM YYYY" Format.

5. **utils.ts** - Contains function to check for missing parameters.

   - missingParameter - Checks if there are many missing parameters in the request by the user.

6. **interfaces.ts** - Creating an interface for the certificate fields.

---

## API Endpoints

1. /cert

### /cert

- POST

  - Function
    - genCrt.handleGeneration
  - Request Body Parameters

    ```
        {
                "name":<string>,
                "jobTitle": <string>,
                "certHeader" : <string>,
                "certBody" :<string>,
                "certBody1" : <string>,
                "certBody2" : <string>,
                "certDates" : <date>
        }
    ```

  - Response Codes
    - Success (200)
    - Bad Request (400)
    - Internal Server Error (500)
  - **Success (200) Sample Response**

    ```
        *CERTIFICATE IN PNG FORMAT*
    ```

  - **Bad Request(400) Sample Response**

    ```
        {
        msg: `Missing parameter '${parameter}'`
        }
    ```

---

## Building

- Compile typescript into an output folder (dist/)

  ```
      tsc
  ```

- Copy assets into the output folder (dist/)

  ```
    rm -rf dist/assets && cp -r assets dist/
  ```

- Run the following command from dist/ folder

  ```
    node .
  ```

### Run the project using project manager such as PM2
