# User JSON files

## AIRunner Configuration JSON files
- Stores developer-defined configuration settings
- Do not change the file name

## Model Configuration JSON files
- This directory stores model configuration JSONs, where each file combines selected custom attributes JSON file and group grouping JSON file

## Custom Attributes JSON files
- Stores user-defined custom attributes settings
- Do not change the file name as file name matches with input model name
- These JSON files are auto generate/update from Netron right panel (right-click on node)

## Graph Grouping JSON files
- Stores user-defined graph sub-grouping settings
- Do not change the file name as file name matches with input model name
- These JSON files are auto generate/update from Netron `Group Node Mode` (ctrl+G)
- Subgraph naming only supports
  - English alphabet ([A-Z]+[a-z])
  - Arabic numerals ([0-9])
  - Underscores (`_`)
