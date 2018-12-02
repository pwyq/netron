# User Manual

| Info | Info |
|:---:|:---:|
| Created by | Yanqing Wu <yanqing.wu@nxp.com> |
| Updated by | Yanqing Wu <yanqing.wu@nxp.com> |
| Last Updated | Dec 3rd, 2018 |

__This file introduces the new features which added for AIRunner on Netron.__

If you experience bugs using Netron, please report to Yanqing <yanqing.wu@nxp.com>.

## Load Configuration
- Allows users to load own configuration files
	- Please ensure file name ended with `{your_filename}_config.json`
	- In the config JSON, please ensure the first key value matches with `{your_filename}`
- The file will auto create upon `Export`/`Save` on `Group Nodes Mode`
	- The file combines `{}_custom_attributes.json` and `{}_subgraph_grouping.json`, which can be modified separately
- For developers: there are script's methods to merge/split user's configuration JSON in `{Netron root}/src/json-manipulate.json`

## Export Text File
![alt text][text_export]

#### Features
- Allows user to exports the configuration of input model to text file (`.txt` or `.json`) to local machine
- Able to support more models if corresponding Python executable is available (user need __NOT__ Python installed)
- Supported models:
	- `.pb`

#### To Use
- `File` -> `Export Text File` (or `Ctrl/Cmd + Shift + J`)

## Custom Attributes
![alt text][custom_attr]

#### Features
- Allows user to set custom attributes of specific nodes, and _automatically_ saves custom setting to local `.json` file
- _deprecated_ ~Netron will import custom settings if corresponding custom-attribute-setting `.json` file is available~
	- `{Netron root}/user_json/custom_json/{model_name}_custom_attributes.json`
- Allows developers/users to modify available attributes in the configuration file:
	- `{Netron root}/user_json/config_json/airunner_custom_attributes.json`
- Allows developers/users to modify the forbidden combinations of custom attribute in the configuration file:
	- `{Netron root}/user_json/config_json/airunner_check_list.json`
- Supported models:
	- ALL models

#### To Use
- Use mouse to right-click on your target node

## Group Nodes Mode
![alt text][group_node_mode]

#### Features
- Allows user to group nodes (i.e. layers) into subgraphs, and exports/saves the group setting to local `.json` file
- _deprecated_ ~Netron will import group settings if corresponding nodes-grouping `.json` file is available~
	- `{Netron root}/user_json/graph_grouping_json/{model_name}_subgraph_grouping.json`
- Allows user to edit group settings on Netron
	- Add/Delete/Rename sub-graphs
	- Add/Delete a node (layer) in a sub-graph
	- Add nodes in a sub-graph (after user specifies the start-node and end-node)
- Supported models:
	- `.pb`, `.caffemodel`, `.h5`, `.onnx`
	- May supports other models but not guaranteed

#### To Use
- __Open__: `Edit` -> `Group Nodes Mode` (or `Ctrl/Cmd + G`)
- __Add a new group__: click `New Subgraph`
- __Delete a group__: click on the `X` on the right side
- __Rename a group__: click on the `N` on the right side
	- Subgraph naming only supports
		- English alphabet ([A-Z]+[a-z])
		- Arabic numerals ([0-9])
		- Underscores (`_`)
- __Add a node to a group__: 
	- click on target group to select it
	- click on any nodes to add it to the group
	- click targeted group again to de-select it
- __Delete a node in a group__:
	- click on the target node on the leftside panel (this action cannot be undone)
- __Add a series of ndoes to a group__
	- click on target group to select it
	- click `Start Node`
	- choose your start-node on the graph
	- click `End Node`
	- choose your end-node on the graph
	- click `Traverse` to automatically add nodes which are between start-node and end-node
		- If undesired node(s) is added, can delete it by click on the node name on the leftside panel
- __Save group settings__:
	- click `Export` (for first time grouping) or `Save` (to overwrite old settings)
- __Color groups__:
	- After you saved your group settings, press `F5`

[text_export]: media/user_manual/text_export.png "Export Text File"
[custom_attr]: media/user_manual/node_right_click.PNG "Edit Node Custom Attributes (Right-click Node)"
[group_node_mode]: media/user_manual/subgraph_2.PNG "Group Node Mode"