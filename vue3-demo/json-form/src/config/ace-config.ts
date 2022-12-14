import ace from "ace-builds"

import modeJsonUrl from "ace-builds/src-noconflict/mode-json?url"
ace.config.setModuleUrl("ace/mode/json", modeJsonUrl)
import workerJsonUrl from "ace-builds/src-noconflict/worker-json?url"
ace.config.setModuleUrl("ace/mode/json_worker", workerJsonUrl)

import themeChromeUrl from "ace-builds/src-noconflict/theme-chrome?url"
ace.config.setModuleUrl("ace/theme/chrome", themeChromeUrl)

import modeHtmlUrl from "ace-builds/src-noconflict/mode-html?url"
ace.config.setModuleUrl("ace/mode/html", modeHtmlUrl)
import workerHtmlUrl from "ace-builds/src-noconflict/worker-html?url"
ace.config.setModuleUrl("ace/mode/html_worker", workerHtmlUrl)