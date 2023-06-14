ECHO off

set DATE=%date:~10,4%%date:~7,2%%date:~4,2%


REM Backup the database
"C:\Program Files\PostgreSQL\15\bin\pg_dump" --clean -h localhost -U postgres -f "%~dp0\..\DB_Backups\EntertainMe_BAK%DATE%.dump" EntertainMe
