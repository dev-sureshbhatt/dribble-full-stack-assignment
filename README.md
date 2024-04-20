# Backend Workflow Overview
This backend workflow ensures proper validation, authentication, and data handling during the signup process, enhancing security and user experience.


## General Response Format of all endpoints

For every request to the backend, the endpoint responds with a JSON data structure containing. 
```
{
    "success": false, //Boolean indicating the success status of the request (true for successful requests, false for unsuccessful ones)
    "message": "You are unauthorized, please try again", // Custom message that the client can use to display alert or error messages to the user.
    "responseData": null //Contains the specific data related to the request, such as user details, survey responses, etc. (null for unsuccessful requests).
}
```
The backend consistently sends responses in the specified format. When a request is successfully processed, the 'success' value will be true, enabling further client-side logic implementation.


## Process/Approach 

### Endpoint 1: Initial User Registration 
This endpoint handles the initial user registration process by accepting basic user information like name, email, username, and password.

- **ENDPOINT**: POST /api/users/
- **REQUIRE/EXPECT**: {name, username, email, password }

#### How the request is processed:
- **VALIDATION**: Request body is first validated using the Joi npm package.
- **SAVING USER**: If the user is not already registered, a new document is created for the user in MongoDB
- **JWT TOKEN ISSUE**: Upon successful registration, the backend signs and issues a JWT token, which is sent back in cookies for authorization in subsequent signup flow routes.      

### Endpoint 2: Upload Image and Update Location
This endpoint authorizes the user by validating JWT token from cookies and handles the upload of a user's profile image and location information.
- **ENDPOINT**: PUT /api/users/uploadImage
- **REQUIRE/EXPECT**: 1. Cookie that includes JWT token for authorization and {profileImage (image file), location} 
#### How the request is processed:
-  **AUTHORIZATION**: The endpoint first validates the cookies to check if a JWT token is present. If the token is present, the backend checks if it is valid or not. If the token is invalid, an unauthorized status is returned.
- **Image upload and location update :** Upon successful token validation, the server processes the profile image sent by the client along with location data and updates the user document in the database. The image is handled by using the multer npm dependency
- **Response:** The server responds with success: true if the document is updated successfully.

### Endpoint 3: Signup Flow 3 Endpoint (Survey Form)
This endpoint handles the submission of a survey form, specifically asking "What brings you here?".
- **ENDPOINT**: PUT /api/users/details
- **REQUIRE/EXPECT**: 1. Cookie that includes JWT token for authorization and {userSurveyDetails (survey information object)} 
#### How the request is processed:
-  **TOKEN AUTHORIZATION**: Similar to Flow 2, the endpoint expects a valid JWT token in the cookie for authorization.
- **Survey Form Handling:** Upon successful authorization, the server saves the survey form responses for the user in the database.
- **Post-Signup Actions:** After successful completion of signup flows, the server utilizes the sendVerifyEmail utility to send a verification email to the user's email address.


# Backend Utilities Overview (Utils Folder)
The utils folder in this backend project includes several utility modules to facilitate common tasks. These utilities are cruical in enhancing security, managing user data, and validating incoming requests within the backend system.

1. userValidationSchema.js
- **Description**: Contains validation schemas for validating incoming request bodies before processing them further in the server or database.
- **Purpose**: Ensures that incoming data meets specified criteria or constraints before being used in backend operations.

2. hashAndStore.js
- **Function**: hashAndStore(userDetails)
- **Description**: Accepts user details, hashes the password securely, and stores the data into the database.
- **Parameters**:
    - userDetails: Object containing user information (e.g., username, password).
- **Returns**: Promise that resolves when the data is successfully stored.

3. signJWT.js
- **Function**: signJWT(newCreatedUser)
- **Description**: Used for signing a JSON Web Token (JWT) after a new user is created in the database.
- **Parameters**:
    - newCreatedUser: Object representing the newly created user.
- **Returns**: Asynchronous promise that resolves with the signed JWT token.

4. verifyJWT.js
- **Function**: verifyJWT(token)
- **Description**: Verifies the authenticity and validity of a JWT token fetched from cookies or headers.
- **Parameters**:
    - token: JWT token to be verified.
- **Returns**: Promise that resolves if the token is valid; otherwise, it rejects with an error.


5. sendVerifyEmail.js
- **Function**: sendVerifyEmail(emailToTarget)
- **Description**: Sends a verification email to the specified email address using the resend.com service, typically used after completing the signup flow.
- **Parameters**:
    - emailToTarget: Email address of the user to whom the verification email will be sent.
- **Returns**: Promise indicating the status of the email sending process.






