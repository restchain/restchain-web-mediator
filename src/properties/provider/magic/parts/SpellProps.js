import entryFactory from 'bpmn-js-properties-panel/lib/factory/EntryFactory';

import {is} from 'bpmn-js/lib/util/ModelUtil';

export default function (group, element) {

    // Only return an entry, if the currently selected
    // element is a start event.

    //console.log(" BPMN Props ",element)
    if (is(element, 'bpmn:StartEvent')) {
        group.entries.push(entryFactory.textField({
            id: 'spell',
            description: 'Apply a black magic spell',
            label: 'Spell',
            modelProperty: 'spell'
        }));
    }
}