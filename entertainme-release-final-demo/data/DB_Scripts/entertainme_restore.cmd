ECHO off

REM Pass the backup name in at runtime
set file_name=%1

REM restore the database file
"C:\Program Files\PostgreSQL\15\bin\psql" -q -U postgres -d EntertainMe <  %~dp0\..\DB_Backups\%file_name%
