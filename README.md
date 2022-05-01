# EspIOT Backend

This is a backend for a simple ESP32 IoT application I'm developing.
Since I'm using the application for testing purposes, I did not implement password hashing, and not even passwords for authentication. So if you're going to use the application for something, make sure to implement those.

Also, make sure to create a `.env` file on the root of the project with the following contents:
```
DATABASE_URL="file:./db.sqlite"
JWT_SECRET="<secret for your token>"
```
