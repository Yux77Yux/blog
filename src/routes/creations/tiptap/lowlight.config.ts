import { createLowlight } from 'lowlight'
import javascript from 'highlight.js/lib/languages/javascript'
import typescript from 'highlight.js/lib/languages/typescript'
import rust from 'highlight.js/lib/languages/rust'
import java from 'highlight.js/lib/languages/java'
import csharp from 'highlight.js/lib/languages/csharp'
import cpp from 'highlight.js/lib/languages/cpp'
import go from 'highlight.js/lib/languages/go'
import bash from 'highlight.js/lib/languages/bash'
import json from 'highlight.js/lib/languages/json'
import python from 'highlight.js/lib/languages/python'
import php from 'highlight.js/lib/languages/php'
import sql from 'highlight.js/lib/languages/sql'
import lua from 'highlight.js/lib/languages/lua'
import ruby from 'highlight.js/lib/languages/ruby'
import yaml from 'highlight.js/lib/languages/yaml'
import xml from 'highlight.js/lib/languages/xml'
import swift from 'highlight.js/lib/languages/swift'
import kotlin from 'highlight.js/lib/languages/kotlin'
import r from 'highlight.js/lib/languages/r'
import dart from 'highlight.js/lib/languages/dart'
import shell from 'highlight.js/lib/languages/shell'
import objectiveC from 'highlight.js/lib/languages/objectivec'
import scala from 'highlight.js/lib/languages/scala'
import groovy from 'highlight.js/lib/languages/groovy'
import perl from 'highlight.js/lib/languages/perl'
import powershell from 'highlight.js/lib/languages/powershell'

export const lowlight = createLowlight();
lowlight.register('javascript', javascript)
lowlight.register('typescript', typescript)
lowlight.register('rust', rust)
lowlight.register('java', java)
lowlight.register('csharp', csharp)
lowlight.register('cpp', cpp)
lowlight.register('go', go)
lowlight.register('bash', bash)
lowlight.register('json', json)
lowlight.register('python', python)
lowlight.register('php', php)
lowlight.register('sql', sql)
lowlight.register('lua', lua)
lowlight.register('ruby', ruby)
lowlight.register('yaml', yaml)
lowlight.register('xml', xml)
lowlight.register('swift', swift)
lowlight.register('kotlin', kotlin)
lowlight.register('r', r)
lowlight.register('dart', dart)
lowlight.register('shell', shell)
lowlight.register('objectivec', objectiveC)
lowlight.register('scala', scala)
lowlight.register('groovy', groovy)
lowlight.register('perl', perl)
lowlight.register('powershell', powershell)