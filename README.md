# Christoffel's Kitchen — Final PoE

## Files in this download
```
app/
  _layout.tsx     -> Root layout (Stack navigator + shared state)
  index.tsx       -> Home screen
  add-item.tsx    -> Add menu item screen
  edit-item.tsx   -> Edit an existing menu item
  menu-list.tsx   -> View, search, filter, edit and delete menu items
  stats.tsx       -> Menu statistics screen
components/
  MenuItemForm.tsx -> Shared form used by both Add and Edit screens
context/
  MenuContext.tsx  -> Shared in-memory state (add, update, delete)
```

## How to use these in your project

1. Copy the `app`, `components`, and `context` folders into your Expo
   project root, replacing the Part 2 versions.
2. Make sure the Picker package is installed:
   ```
   npx expo install @react-native-picker/picker
   ```
3. Start the app:
   ```
   npx expo start
   ```

## Change Log - changes since Part 2

### New features added
- **Edit menu items** - a new Edit screen (`edit-item.tsx`) loads the
  selected item, pre-fills the form, and saves changes back into the
  shared state. Updates are reflected immediately in the list.
- **Delete menu items** - each item on the Menu List has a Delete
  button with a confirmation prompt before removal.
- **Search** - a search bar on the Menu List filters items live by
  dish name.
- **Filter by course** - a dropdown filters the list to Starter, Main
  Course, Dessert, or All. Search and filter work together.
- **Clear search/filter** - a "Clear Search & Filter" link appears
  whenever a search or filter is active, resetting the list to show
  all items.
- **Menu statistics screen** - a new Stats screen shows total menu
  items, average price across all items, and a count of items per
  course, in a simple card layout.

### Refactoring since Part 2
- Extracted the Add Item form into a reusable `MenuItemForm`
  component (used by both Add and Edit) instead of duplicating form
  code - reduces repeated code and keeps validation rules in one
  place.
- Menu state logic in `MenuContext` was extended with `updateMenuItem`
  and `deleteMenuItem`, keeping all menu data operations in a single,
  consistent location.
- Added a third home-screen button ("View Statistics") so navigation
  between all features is consistent and discoverable from one place.

## For your video demonstration
Show: adding an item -> editing it -> deleting an item (with the
confirmation prompt) -> searching by name -> filtering by course ->
clearing the filter -> opening the Statistics screen to show the
totals update correctly.
