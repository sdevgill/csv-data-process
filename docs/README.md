# Instructions

## Overview

### Notes


Completed the main tasks.

Bonus tasks - Two finished, one started - but not enough time to finish.
Finished sorting by medals and ascending/descending order.


The countries flag api was too slow, so I added a npm package to get the flags.
It doesn't work with all flags though, as the country ISO names sometimes differ from the country names in the csv file - so I had to remove the last character from the country name to get the flag to work.
I didn't have the time to fix that, but the implementation is there.
Not enough time to make a dynamic chart with the medals/population data.
So just made a static chart with hard coded data for the top 5 countries.


## Getting Started

To get started with the app, clone the repo and then install the dependencies. You can clone the repo as follows:

```
$ git clone https://github.com/datatruthers/datatruth-Dev-
$ cd datatruth-Dev-
```

Run 'yarn install' to install dependencies in both the server and app directories.

```
$ cd server
$ yarn install
$ yarn start
```

Open a new terminal window.

```
$ cd app
$ yarn install
```

Open the index.html file in the app directory to view the app.
