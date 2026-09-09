
// Understanding github actions. 

/*
Github/gitlab/bitbucket -- these  are used for version control and CI/CD pipelines.

Version control tools are used to manage changes to source code over time. They allow multiple developers to collaborate on a project, track changes, and revert to previous versions if needed.

Git is a distributed version control system that allows developers to track changes in their codebase. It enables collaboration by allowing multiple developers to work on the same project simultaneously, merging their changes seamlessly.
bitbucket is a web-based version control repository hosting service owned by Atlassian, for source code and development projects that use either Mercurial or Git revision control systems. Bitbucket offers both commercial plans and free accounts. It provides a central place to manage git repositories, collaborate on source code, and guide you through the development flow.
github is a web-based version control repository hosting service owned by Microsoft, for source code and development projects that use Git revision control systems. GitHub offers both commercial plans and free accounts. It provides a central place to manage git repositories, collaborate on source code, and guide you through the development flow.

// Download the git from browser and install in your system. 

make sure you create one account on github. 

::::: Assume there is no branch present in the github repository.
1. Create a new repository on GitHub.
2. Open the terminal and provide git init command to initialize a new git repository in your local system. 
3. git add .
4. git commit -m "first commit"
5. git branch -M main
6. git remote add origin https://github.com/roy95robin/JuneEveningBatch.git
7. git push -u origin main

// Make some changes to the code and push it to the remote repository.
// when git repo is already present then push the changes to new branch. and rasise the PR

1. Clone the repository to your local system using git clone command.
   git clone<repository-url>
2. After clone is completed , you need to download all the depenedecies
    npm install
    npm init playwright
3. Make some changes to the code and push it to the remote repository.
    First create the new branch inside the local system using below command 
        git checkout -b <branch-name>
        git checkout -b TestBranch
4. Check the branch is created or not using below command
    git branch
5. Now make changes to your code and push it to the remote repository using below command
    git status
    git add .
    git commit -m "your commit message"
    git push // here you might see an error for first time. it will provide the suggestion to use url
    git push copied command from above steps
    git push
6. Now go to the github repository and you will see the new branch is created. 
7. Now click on compare and pull request button to raise the PR.




*/