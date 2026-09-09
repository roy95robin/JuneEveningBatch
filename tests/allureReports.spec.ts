
// Understanding reports in playwright
/*
There are few in built report supported by playwright: 
1. HTML 
2. Line
3. List
4. Dot
blob and junit


Allure Reports: - Advance report 

:: Installation of an allure report in Vs code :::
1. npm install --save-de allure-commandline
2. npm install --save-dev allure-playwright
3. Add allure report inside the config file. 
     reporter: [['html'], ["allure-playwright"]],

     *** Allure report folder will get automatically created when we execute code for the first time. ****

     Execute the file atleast for one time. 
     post execution allure-result folder will be generated
     Open the allure report using below commands
     npx allure serve allure-results

     now run the below command inside the terminal 
     npx allure generate allure-results --clean-o allure-report
     above line will generate allure report folder 
     copy the history folder from above generate folder and paste it inside the allure-results

     Run the testcase again and let the execution completes
     
*/