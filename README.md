[![DeepScan grade](https://deepscan.io/api/teams/2928/projects/4373/branches/35596/badge/grade.svg)](https://deepscan.io/dashboard#view=project&tid=2928&pid=4373&bid=35596)

 Differences from the GiftSeeker:

 1. Changed color design, icons, font in the app like Adapta-Nokto theme.
 2. Increased Timer to max. 1440 minutes (24 hours).
 3. Increased Pages number to check, max. 30 pages now.
 4. The Indiegala service working fixed (26.02.19.) Login in app to IndieGala then click 'Visit open web site' to solve the       captcha, close app browser and then click on 'start' service.
 5. The Indiegala service new option functions added: max. cost, max. level to enter giveaway.
 6. The OpiumPulses service working fixed (26.02.19.).
 7. The OpiumPulses service enter all giveaways (in test mode).
 8. The SteamGifts service bugfix when 
 9. The OpiumPulses service new option functions added: pages to check giveaways.
10. Added retry connect to services in 5 minutes if the app can't connect to the service.
11. Completely portable app (all user data and options storied in app subdirectory 'giveawayjoinerdata'. You can use multiple 
    copies of the app with different accounts and options, just make copies of app with different appname directories 
    like 'giveawayjoiner1', 'giveawayjoiner2', etc. For example).
12. Removed functions 'auto update' and 'startup with os' in the app.
13. New display timer with fixes (now showing in hh:mm:ss format).
14. Translations changes and fixes.
15. Code optimizations and bugfixes for Linux and Mac OS compatibility.
16. Latest Electron 2.x tree at the moment of app build.


  To build latest version from source:

  1. Download and install Node.js
  2. Download GiveawayJoiner sources

  3. Open Terminal program (cmd.exe as administrator on Windows) in sources folder and run this commands:
  >npm install electron@2                                  
  >npm update                                 
  >npm install electron-builder                   
  >electron-builder --dir                              
  
  GiveawayJoiner build will be in sources subfolder 'dist'
  p.s. for Linux: GiveawayJoiner need 'libgconf-2-4' lib to be installed in your distro, for Ubuntu users in terminal enter command:
  >sudo apt-get install gconf2
  
  Recommended 'Noto' fonts family installed
