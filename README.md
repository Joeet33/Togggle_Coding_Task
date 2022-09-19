App Functionality and how to run the app

The application requires users to make a prediction on whether the price of BTC will be higher or lower in 60 seconds.  The initial value of BTC/USD will be locked in as soon as the user clicks either the up or down arrow. After the user makes a prediction there is a 60 second cooldown where the user is unable to make a new prediction. When the 60 seconds timer is complete, the updated value of BTC/USD will be locked in. Both these values are stored and compared. If the user clicks on the green up arrow and the updated value is greater than the initial value, the user will gain a point. If the updated score is lower the user will lose a point. The opposite is true for the red down arrow. The score is stored on an AWS backend server and fetched via an api. The enables the score to stay present upon refresh.

I was able to build and deploy the frontend and backend using AWS amplify by uploading my GitHub. Whenever I pushed a new update from VScode to GitHub, AWS would automatically detect this and begin a new build. Using the amplify api meant I could configure the files needed to create the backend much easier and then update the backend using aws.

The application is hoted here:
