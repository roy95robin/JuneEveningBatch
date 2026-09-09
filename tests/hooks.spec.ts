// hooks in playwright: 

/*
 A special method which perform setup and tear down(closing process) process. 

 Different types of hooks present inside playwright: 

1. test.beforeAll() -- it will get executed before any one the testcase/file start execution. 
    ex: db connection, initiate reports, logs

2. test.beforeEach() -- it will run before every testcase 
    ex: any preconditions

3. test.afterEach() -- it will run after every testcase 
    ex: logout, validation

4. test.afterAll() --  it will run after every testcase is executed. 
    ex: report generation, DB connection closing, log file, 

    #2 test.beforeEach() will be used very frequently. 

 Execution flow of the hooks: 
 1 2 3 4 steps 


*/

import {test} from '@playwright/test'

test.afterAll(async() =>{
    console.log('after all');
})
test.beforeEach(async() =>{
    console.log('before each');
})
test.beforeAll(async() =>{
    console.log('before all');
})
test.afterEach(async() =>{
    console.log('after each');
})

test('testcase 1', async()=>{
    console.log('testcase 1');
})
test('testcase 2', async()=>{
    console.log('testcase 2');
})
test('testcase 3', async()=>{
    console.log('testcase 3');
})
