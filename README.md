# Blog

https://9sako6.com

## Development

```bash
# Run server
yarn dev
# Run test
yarn test
```

### Firebase

```bash
# Run emulator
firebase emulators:start --import=./firebase/seed
# Export emulator's data
firebase emulators:export ./firebase/seed
```

### Storybook

```bash
yarn storybook
```

## Deploy

```bash
// Deploy firestore.rules file
firebase deploy --only firestore:rules
```
