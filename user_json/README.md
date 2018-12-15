# User JSON files

## AIRunner Configuration JSON files
- Stores developer-defined configuration settings
- Do not change the file name

## Model Configuration JSON files
- This directory stores model configuration JSONs, where each file combines selected custom attributes JSON file and group grouping JSON file

## Default Attributes JSON Files
- Stores node's default attributes
- Do not modify the files

## Custom Attributes JSON files
- Stores user-defined custom attributes settings
- Be careful when renaming the files
  - The filename is used in the app
  - Change the first key value accordingly when renaming
- These JSON files are auto generate/update from Netron right panel (right-click on node)

## Graph Grouping JSON files
- Stores user-defined graph sub-grouping settings
- Be careful when renaming the files
  - The filename is used in the app
  - Change the first key value accordingly when renaming
- These JSON files are auto generate/update from Netron `Group Node Mode` (ctrl+G)
- Subgraph naming only supports
  - English alphabet ([A-Z]+[a-z])
  - Arabic numerals ([0-9])
  - Underscores (`_`)
