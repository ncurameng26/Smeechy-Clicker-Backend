# Smeechy Clicker
 This app is run at smeechyclicker.online

 Welcome to smeechy clicker repo, this is a full stack game I made using React and Django. This was the hardest project I've done and a lot of the technology was new to me. I had never used Django, or hosted a website before so there was a large learning curb.

What I learned: I learned so much during this project, I think the biggest one was using props with react components. This makes reusing components so much easier, which definetly helped with reducing reduntant code. I also learned how to use Django, creating and using an API, using a database, REACT file structure, hosting a website and much more.

What I struggled with: The biggest issue that took the longest to resolve was the way that React passes data to components. Due to the nature of the app, and the way the react components worked, this made a solution nearly impossible without external libraries. Because of this, I learned how to use React Redux, which allowed me to pass the data through all components. Another struggle was that dispatch has limitations in Redux which resulted in me having to change the style of the game from a clicking incremental game, to one where its all based on waiting.

Dependencies:
Node
Python

Libraries:
pip install django,
pip install django-rest-framework,
pip install django-cors-headers,
npm i react,
npm i axios,
npm i react-dom,

To use from Git:
Clone Repository Locally

Run Virtual Environment using: . .venv/Scripts/activate

Download dependencies/libraries in Virtual Environment

To Start Backend:
Run Bash Terminal and cd into project file with manage.py

Run command: python manage.py runserver

To Start Frontend:
cd into frontend
npm start

