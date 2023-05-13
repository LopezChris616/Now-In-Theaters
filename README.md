## Now In Theaters

Now In Theaters is an application that allows you to view what movies are currently in theaters, as well as, view what movies will be released in the coming weeks. It allows you to be redirected to Fandango to purchase tickets if you so choose. It also allows you to search for any movie you would like and it will return the results of your search to the page.

### Demo
![](https://github.com/LopezChris616/Now-In-Theaters/blob/main/Now-In-Theaters.gif)

### Installation

There are a couple steps you must complete in order to get this application to work locally on your machine.

1. Clone this repository and change directory to the project folder.
2. You must obtain an API key to access data from The Movie Database API. You can obtain one by signing up for an account [here](https://developers.themoviedb.org/3/getting-started/introduction).
2. Inside of the "js" directory, create a file called "key.js", and copy and paste the following code into that file, replacing "API KEY GOES HERE" with the API key you obtained in the previous step:
```
const key = "API KEY GOES HERE";

export { key };
```
3. Due to the CORS policy of the API, only specific protocol schemes allow access to the API. As such, simply opening up the page in your browser directly from the directory will not work. You will need a way to open up the app using one of the supported protocol schemes of the API. One way is to use the VS Code extension, [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer). Simply install the extension, and with the project folder opened up in VS Code, click the "Go Live" button found in the status bar in the bottom right of the editor (If you're not sure what to do or can't find the button, you can find instructions in the install page of Live Server).
4. Now the app should run as intended!

### Contributing

Pull requests are welcome. For major changes, please open an issue first
to discuss what you would like to change.

### Credit

The Movie Database API: https://developers.themoviedb.org/3/getting-started/introduction

"No Poster Available" poster taken from [Times Cineplex](https://timescineplex.com) from [this link](https://timescineplex.com/times/img/no-poster.png).