@echo off
echo 🚀 Cleaning Expo project...

:: Remove node_modules
if exist node_modules (
  echo Deleting node_modules...
  rmdir /s /q node_modules
)

:: Remove package-lock.json (npm) or yarn.lock (yarn)
if exist package-lock.json (
  echo Deleting package-lock.json...
  del /f /q package-lock.json
)
if exist yarn.lock (
  echo Deleting yarn.lock...
  del /f /q yarn.lock
)

:: Remove Expo & cache folders
if exist .expo (
  echo Deleting .expo...
  rmdir /s /q .expo
)
if exist .expo-shared (
  echo Deleting .expo-shared...
  rmdir /s /q .expo-shared
)
if exist .parcel-cache (
  echo Deleting .parcel-cache...
  rmdir /s /q .parcel-cache
)

echo ✅ Clean complete!
echo Now run: npm install
