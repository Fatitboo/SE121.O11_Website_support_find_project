var ValidatorRules = {
    requiredText: function(value, messageError) {
        return value ? (value.trim() ? undefined : messageError) : messageError;
    },
    requiredCbb: function(value, messageError) {
        return value ? (value != -1 ? undefined : messageError) : messageError;
    },
};

export function Validate(Element, ErrorMessages){
    const validationErrors = {}
    const name = Element.getAttribute('name');
    const rules = Element.getAttribute('rules');
    var {value} = Element
    value = value || value === "" ? value : Element.getAttribute('value')
    var ruleInfos = rules.split('|');

    for(var rule of ruleInfos){
        var ruleFunc = ValidatorRules[rule];
        if(ruleFunc){
            ruleFunc = ruleFunc(value, ErrorMessages[name])
            if(ruleFunc) validationErrors[name] = ErrorMessages[name]
        }
    }
    return validationErrors
}

export function FormErrors(formElement, ErrorMessages){
        var inputs = formElement.querySelectorAll('[name][rules]');
        const validationErrors = {}
        
        for(var input of inputs){
            const name = input.getAttribute('name');
            const rules = input.getAttribute('rules');
            var {value} = input
            value = value || value === "" ? value : input.getAttribute('value')
            var ruleInfos = rules.split('|');

            for(var rule of ruleInfos){
                var ruleFunc = ValidatorRules[rule];
                if(ruleFunc){
                    ruleFunc = ruleFunc(value, ErrorMessages[name])
                    ruleFunc ? validationErrors[name] = ErrorMessages[name] : delete validationErrors[name]
                }
            }
        }

        return validationErrors
}