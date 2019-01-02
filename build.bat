@echo off
echo "Copy KuiBu/src/app to KuiBuApp/src/app"
xcopy ..\KuiBu\src\app .\src\app /E /C /I /Y
xcopy ..\KuiBu\src\assets .\src\assets /E /C /I /Y

echo "**************************************************"
echo 		Build the angular gui...
echo "**************************************************"
call ng build --prod

echo "**************************************************"
echo    Clean the old source
echo "**************************************************"
rd /s/q www
md www

echo "**************************************************"
echo  Copy the new build to www ...
echo "**************************************************"
xcopy .\dist\KuiBu .\www /E /C /I /Y

echo "**************************************************"
echo  Build the Android App
echo "**************************************************"
call cordova build android