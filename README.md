# Freeboard

This is a port of Freeboard (http://www.42.co.nz/freeboard) which can access CA Cruising Rreports and  uses the Signal K communication protocols and utilise Signal K server features.
It should be used in conjunction woth the ca-reports Node Server plugin. 


## Features:

#### Chart Display:

    - OpenStreetMap, OpenSeaMap, and WORLD chart outline (online only)
    - Charts hosted on Signal K server via `/resources/charts` path

#### Resources:  Routes and Waypoints
    - List / Select resources hosted on Signal K server via `/resources/routes`, `/resources/waypoints` paths
    - Set an active Route
    - Select destination point along and Active Route
    - Select Waypoint as course destination
    - Edit Route / Waypoint properties (Name, Description)
    - Draw Route
    - Add Waypoint at: Cursor or Vessel position
    - Delete Waypoint(s) / Route(s) 
    - Import Routes and Waypoints from GPX files
    - View and Add CA CRs

**Note:** Server requests to update data values *e.g. the creation, updating or deletion of resources* requires is can be done via either PUT requests *(default / recommended)* or web socket UPDATES.

This can be selected by the **Use PUT Requests** checkbox in **Settings**.

    
#### Map Display:

    - North-up or Vessel-up 
    - Moving Map or Moving Vessel
    - Vessel Heading / Bearing lines
    - Wind true direction / apparent angle lines
    - Measure distance

#### Alarms:

    Displays both visual and audio alarm indication as specified by the received *Notification* message.

    - Anchor Watch: set radius and raise / drop anchor
    - Depth Notifications.

#### Integration: 

Freeboard allows you to select installed *Applications* to use for the following:

- **Instrument panel**: *(default: `@SignalK/InstrumentPanel`)*

Selected application will be displayed in the Instrument panel drawer.


## System Requirements:

For all Freeboard features to be fully functional, it requires that the Signal K server in use be able to provide the necessary services for the following paths:

1. `reources/routes` and `resources/waypoints` - Serve resources as well as accept and persist resource data submitted to these paths.

2. `resources/charts` - Serve chart resources.

3. `navigation/anchor`, `notifications/navigation/anchor` - Serve and accept `position`, `maxRadius` values as well as calculate `currentRadius` and serve notifications.

4. `notifications/environment/depth` - Serve notifications for `belowKeel`, `belowSurface` `belowTransducer`.

5. `navigation/courseGreatCircle/activeRoute` - Serve and accept `href` & `startTime` values to allow a route to be set as active. It is expected that the server will initiate any subsequent calculations and related value updates.

6. `navigation/courseGreatCircle/nextPoint` - Serve and accept `position` values to allow a waypoint to be set as a destination. It is expected that the server will initiate any subsequent calculations and related value updates.

7. **Playback History** - Implement the Signal K Playback api (`/signalk/v1/playback`)

This function may be provided natively by the server or through the use of *plugins*.

For example the following plugins installed on the *Signal K node server* will enable full functionality:
- @signalk/charts-plugin *(Charts provider)*
- GPXLoad (v1.1.1 or later) *(Routes & Waypoints provider)*
- signalk-anchoralarm-plugin *(anchor alarm settings & notifications)*
- signalk-simple-notifications *(depth alarm notifications)*
- ca-reports *(Cruising Association cruising reports)*

### Integrated Apps on Server
![Server Instruments](https://user-images.githubusercontent.com/38519157/46716813-00d27080-ccad-11e8-98a3-ab4b4f47df11.png)

### Vessel up
![Vessel Up](https://user-images.githubusercontent.com/38519157/46716759-cf59a500-ccac-11e8-9ac5-68a7f3429f4a.png)

### North up
![North Up](https://user-images.githubusercontent.com/38519157/46716737-bc46d500-ccac-11e8-9d31-87cfffb1ad3b.PNG)



## Development:

This is an Angular project generated with [Angular CLI](https://github.com/angular/angular-cli).
It is recommended that the Angular CLI be installed globally `npm i -g @angular/cli@latest` prior to following the steps below.

1. Clone this repository.

2. Run `npm i` to install Angular CLI and project dependencies. *Note: this will also build the project placing the deployable application files in the `public` folder.*

3. Run `npm start` or `ng serve` to start a development web server and then navigate to `http://localhost:4200/` to load the application. The application will automatically reload once you save changes to any of the source files.

### Note:

The Freeboard application will look to connect to a Signal K server at the *ip address:port* contained in the url of your browser. 

During development, if a Signal K server is not running on your development device, you are able to specify the Signal K server you wish to connect to as follows:

**In Development Mode** where application is served using:
- `npm start`
- `ng serve` 
- Files generated by `ng build`

the `DEV_SERVER { host, port, ssl }` object in the `src/app.info.ts` file determines where the application looks to find the Signal K server in devleopment mode.

If `DEV_SERVER { host, port, ssl }` values are:

- **Defined:** The application will look to connect to a Signal K server at the defined `host & port` values and using a secure protocol if `ssl=true`. 

- **NOT Defined:** The served application will look to connect to a Signal K server at the *ip address:port* contained in the url of yuor browser *(e.g. `localhost:4200`)*. 

**Production Mode** is where the application is served using:
- `ng serve --prod`
- Files generated by `ng build --prod`

The served application will look to connect to a Signal K server at the *ip address:port* of the url hosting the application. 

## Build:

#### Angular Build

To build the Freeboard application use the `ng build --prod` command.

Built application files are placed in the `/public` folder.

#### NPM package

To build the NPM package use `npm pack` command which will:
1. Build the application using `ng build --prod`. 
2. Create the NPM package `*.tgz` file.


Built `*.tgz` file is placed in the `/` root folder.

