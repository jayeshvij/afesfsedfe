@echo off
echo Starting QuickCommerce Backend...

REM Set JAVA_HOME
set JAVA_HOME=C:\Program Files (x86)\Java\jre-1.8

REM Try to compile and run with Maven if available
where mvn >nul 2>&1
if %errorlevel% equ 0 (
    echo Using Maven...
    mvn clean compile spring-boot:run
) else (
    echo Maven not found. Please install Maven or use an IDE to run the application.
    echo.
    echo You can also try running the application from your IDE:
    echo 1. Open the project in IntelliJ IDEA or Eclipse
    echo 2. Run QuickcommerceBackendApplication.java
    echo.
    pause
)

pause
