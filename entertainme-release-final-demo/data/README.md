# EntertainMe Database 
* Pre-req:
* Postgresql 15.0

# Backup database
* Open CMD
* CD to the DB_Scripts folder
* Run the following command:
'''
entertainme_backup.cmd
'''

# Restore a backup
* Open CMD
* CD to the DB_Scripts folder
* Run the following command:
'''
entertainme_restore.cmd {file name that you want to restore from DB_Backups folder}
'''

# Creating DB Objects without doing a backup
* Navigate to the data -> DB_Scripts -> functionality folder
* Open the file of the object (view, function, procedure, etc) and paste into the SQL editor.
* Execute the script.
* Repeat as needed to create or update the objects.