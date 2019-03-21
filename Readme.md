# Girls' Day 2019 @codecentric MUC
![](assets/Girls-day-2019.png)

## Mini projekt - Dungeon Crawler

### [Play game](https://agnesk.github.io/DungeonCrawler/)

Based on https://codepen.io/anon/pen/vbVzar

Some art taken from [dungeon-tileset made by Buch](https://opengameart.org/content/dungeon-tileset)

### Exercises
This repository is designed to help understand a bit of HTML and Javascript.
You can go through the [Exercises](Exercises.md) to get familiar with the code.

### Local testing

#### Desktop
Open the index.html, e.g. by double-clicking the file or by using your browser.

#### Mobile Device
IntelliJ automatically exposes your application on localhost:63342.

You can change these settings in the Preferences dialog, click Debugger under Build, Execution, Deployment.
Also tick the box "Allow unsigned requests".

Now go to Chrome and [setup your mobile device for USB debugging](https://blog.campvanilla.com/debug-website-on-mobile-device-5c27c8809d39]).
* right-click "Inspect -> ... -> More tools -> Remote devices"
* authorize USB debugging on your device and desktop
* you should now see your device listed as connected
* [specify the devices port you'd like to access](https://developers.google.com/web/tools/chrome-devtools/remote-debugging/local-server), e.g. 5000, and for desktop localhost:63342.
* access localhost:63342/<IntelliJProjectName> on your mobile device