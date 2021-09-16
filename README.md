# custom-button README

You can add custom buttons with this plugin

你可以使用该插件实现自定义按钮

## Configuration / 配置

### Hello World

Using this profile, you can display a notification button in the bottom left corner of the screen, and clicking on it will trigger a hello world notification

通过该配置，可以在左下角展示一个通知按钮，点击后会触发一个 hello world 的通知

```json
{
    "custom-button.buttons": [
        {
            "name": "Hello World",
            "position": "statusbar-left",
            "priority": 100,
            "command": "custom-button.helloWorld",
            "icon": "bell-dot"
        }
    ]
}
```

### Back/Forward and Fold/Unfold / 跳转与折叠

This one allows for jumping and collapsing in the status bar

该配置实现了位于状态栏的跳转与折叠按钮

```json
{
    "custom-button.buttons": [
        {
            "name": "backward",
            "position": "statusbar-left",
            "priority": 99999,
            "command": "workbench.action.navigateBack",
            "icon": "chevron-left"
        },
        {
            "name": "forward",
            "position": "statusbar-left",
            "priority": 99999,
            "command": "workbench.action.navigateForward",
            "icon": "chevron-right"
        },
        {
            "name": "fold all",
            "position": "statusbar-right",
            "priority": 99999,
            "command": "editor.foldAll",
            "icon": "fold"
        },
        {
            "name": "unfold all",
            "position": "statusbar-right",
            "priority": 99999,
            "command": "editor.unfoldAll",
            "icon": "unfold"
        }
    ]
}
```

## Reference / 参考

You can find support icon at [Product Icon Reference | Visual Studio Code Extension API](https://code.visualstudio.com/api/references/icons-in-labels#icon-listing)

支持的图标见 [Product Icon Reference | Visual Studio Code Extension API](https://code.visualstudio.com/api/references/icons-in-labels#icon-listing)


## Release Node / 更新日志

- **1.0.0**
  This plugin was born, the beginning of everything 
  插件出世，万物之始