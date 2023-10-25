var ValidatorRules = {
    requiredText: function(value, messageError) {
        return value ? (value.trim() ? undefined : messageError) : messageError;
    },
    requiredCbb: function(value, messageError) {
        return value ? (value != -1 ? undefined : messageError) : messageError;
    },
    requiredCb: function(values, messageError){
        return values ? (values.split(',').length != 0 ? undefined : messageError) : messageError
    },
    number: function(value){
        return value ? (isNumeric(value) ? undefined : "Vui lòng nhập chữ số") : "Vui lòng nhập chữ số"
    },
    positiveNumber: function(value){
        return value ? (value > 0 ? undefined : "Vui lòng nhập chữ số") : "Vui lòng nhập chữ số"
    },
    maxHourWeek: function(value){
        return value ? (value <= 168 ? undefined : "Số giờ vượt quá số giờ trong tuần") : "Số giờ vượt quá số giờ trong tuần"
    }
};
function isNumeric(str) {
    if (typeof str != "string") return false // we only process strings!  
    return !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
           !isNaN(parseFloat(str)) // ...and ensure strings of whitespace fail
}

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
            console.log(ruleFunc , "a"); 
            if(ruleFunc) {
                validationErrors[name] = ruleFunc
                return validationErrors
            }
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