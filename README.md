# Traffic

You can see the site working at <http://davidfraser.co.uk/traffic/>

There you can select multiple Vehicle types and Count Points. The data from 2000 appears in the first chart. Selecting a displayed Count Point below the first chart reveals a second chart plotting change between 2000 and 2005.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Next steps

Given more time I'd have continued with the following in near-priority order:

* Stop treating count_point_id's like they’re unique (they aren’t because they have multiple directions)

* Add a year select under Add Vehicle, so you could compare vehicles from the same or different years 

* Add a third chart: a pie chart made up of different vehicle types for one year (selected from the chart above).
* Unit tests, Given the limited amount of time I favoured working on the presentation instead of adding unit tests
* A fetch proxy server to get more data including pagination, years, local authorities and regions. 

* Add click events to chart xAxis, instead of additional rows of buttons 

* Style the charts and make mobile/tablet friendly 

* Refactor to a clearer file structure including breaking down the App component properly, using Immutable for highchart configuration and Sass color variables 

* Google Map API, for count point select and quick tool-tip information

* Use this tool to discover a more insightful use of the data and present it accordingly



## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.


