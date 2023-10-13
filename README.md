<h3>Back-End</h3>

- Node.js
- Express
- PostgreSQL

<h2>API endpoints</h2>

Here are some examples of request and response payloads for the endpoints:

1. **GET** ```/games```

- Request: nothing to provide

- Response:
```json
[
  {
    "id": "cd196746-4bec-4199-8198-881eabe61233",
    "name": "Memory Card",
    "background_image": "https://raw.githubusercontent.com/alex-dishen/alex-dishen/main/img/memory-card.png",
    "description_raw": "Welcome to the 'Mystery Shack Memory Quest' a delightful memory game set in the Gravity Falls universe. Test your memory and observation skills as you uncover matching pairs of cards. Flip over cards, find matches, and avoid clicking on the same card twice. Enjoy Gravity Falls-themed artwork and catchy background music, immersing yourself in the mystery of the town.",
    "released": "2022-12-10",
    "parent_platforms": ["PC", "iOS"],
    "genres": ["Puzzle"],
    "publishers": ["Oleksandr Didyshen"],
    "developers": ["Oleksandr Didyshen"],
    "website": "https://alex-dishen.github.io/memory-card/",
  }
  {
    "id": "cd196746-4bec-4199-8198-881efbe61233",
    ...
  }
  ...
]
```

2. **POST** ```/games```

- Request:

```json
{
{
    "name": "Aliens: Dark Descent",
    "background_image": "https://i.ytimg.com/vi/eWgYo55oOQk/maxresdefault.jpg",
    "description_raw": "In Aliens: Dark Descent, command a squad of hardened Colonial Marines to stop a terrifying Xenomorph outbreak on Moon Lethe. Lead your soldiers in real-time combat against iconic Xenomorphs, rogue operatives from the insatiable Weyland-Yutani Corporation, and a host of horrifying creatures new to the Alien franchise. You are the commander. They are your weapon. Infiltrate large open levels and annihilate enemies with your squad, dispatching orders strategically and intuitively at the touch of a button. Tread carefully, as your foes will adapt their tactics to your actions while hunting you down because death is permanent. Forge unique paths for survival, uncovering shortcuts, creating safe zones, and setting up motion trackers in a persistent world where your actions impact levels forever. Customize your squad with a selection of different classes. Level up and specialize your soldiers with unique abilities and an arsenal of weapons, armor, and perks, for high stakes missions in treacherous territory. Develop your base to research new tech and improve your squad even further. Manage your resources wisely and take calculated risks to outsmart the deadliest creature mankind has ever faced. Can you and your squad stop the outbreak before it’s too late? • Face off in a gripping original Alien story against iconic Xenomorph creatures ranging from Facehuggers to Praetorians, Alien Queens and many more, including rogue human commandos and a brand-new threat unique to this Alien storyline • Lead strategically and change squad tactics from mission to mission, carefully managing your soldiers’ health, resources, and sanity, to avoid permanent team losses and mental breakdowns • Forge unique paths for survival in a persistent world, uncovering shortcuts, creating safe zones and setting up motion trackers to stay one step ahead of these creatures • Assemble and level up squads composed of 5 starting Marines classes, with dozens of specializations, unique abilities and weapons.",
    "released": "2022-02-15",
    "platforms": ["PC", "PlayStation 5", "Xbox Series S/X", "PlayStation", 4, "Xbox", "One"],
    "genres": ["Action", "Strategy"],
    "publishers": ["Focus Entertainment"],
    "developers": ["Tindalos Interactive"],
    "website": "https://www.focus-entmt.com/games/aliens-dark-descent"
}
}
```

- Response:
```json
[{
    "name": "Aliens: Dark Descent",
    "background_image": "https://i.ytimg.com/vi/eWgYo55oOQk/maxresdefault.jpg",
    "description_raw": "In Aliens: Dark Descent, command a squad of hardened Colonial Marines to stop a terrifying Xenomorph outbreak on Moon Lethe. Lead your soldiers in real-time combat against iconic Xenomorphs, rogue operatives from the insatiable Weyland-Yutani Corporation, and a host of horrifying creatures new to the Alien franchise. You are the commander. They are your weapon. Infiltrate large open levels and annihilate enemies with your squad, dispatching orders strategically and intuitively at the touch of a button. Tread carefully, as your foes will adapt their tactics to your actions while hunting you down because death is permanent. Forge unique paths for survival, uncovering shortcuts, creating safe zones, and setting up motion trackers in a persistent world where your actions impact levels forever. Customize your squad with a selection of different classes. Level up and specialize your soldiers with unique abilities and an arsenal of weapons, armor, and perks, for high stakes missions in treacherous territory. Develop your base to research new tech and improve your squad even further. Manage your resources wisely and take calculated risks to outsmart the deadliest creature mankind has ever faced. Can you and your squad stop the outbreak before it’s too late? • Face off in a gripping original Alien story against iconic Xenomorph creatures ranging from Facehuggers to Praetorians, Alien Queens and many more, including rogue human commandos and a brand-new threat unique to this Alien storyline • Lead strategically and change squad tactics from mission to mission, carefully managing your soldiers’ health, resources, and sanity, to avoid permanent team losses and mental breakdowns • Forge unique paths for survival in a persistent world, uncovering shortcuts, creating safe zones and setting up motion trackers to stay one step ahead of these creatures • Assemble and level up squads composed of 5 starting Marines classes, with dozens of specializations, unique abilities and weapons.",
    "released": "2022-02-15",
    "platforms": ["PC", "PlayStation 5", "Xbox Series S/X", "PlayStation", 4, "Xbox", "One"],
    "genres": ["Action", "Strategy"],
    "publishers": ["Focus Entertainment"],
    "developers": ["Tindalos Interactive"],
    "website": "https://www.focus-entmt.com/games/aliens-dark-descent"
}]
```

3. **DELETE** ```/games/:id```

- Request:

```json
{
  "id": "cd196746-4bec-4199-8198-881eabe61233",
}
```

- Response: nothing to provide