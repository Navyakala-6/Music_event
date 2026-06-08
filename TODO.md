## TODO (login hamburger + dropdown + firebase + landing logo)

- [ ] Update `src/components/Topbar.js`:
  - [ ] If user exists: dropdown stays My Account + Logout
  - [ ] If no user: dropdown shows Login + Sign Up
  - [ ] Navigates to landing page with query param `?auth=login|signup`
- [ ] Update `src/components/LandingPage.js`:
  - [ ] Read query param `auth`
  - [ ] Auto-open modal and set `isSignup` accordingly
- [ ] Update `src/components/LandingPage.css`:
  - [ ] Increase center logo size on desktop
- [ ] Run app + manual verification

