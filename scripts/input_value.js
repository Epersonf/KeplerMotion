class Input_Value {
    constructor (elem) {
        this.elem = elem;
    }

    getInt() {
        return parseInt(this.value);
    }

    getFloat() {
        return parseInt(this.value);
    }

    getBool() {
        return new Boolean(this.value);
    }

    onChange(action) {
        this.elem.addEventListener("change", action);
    }
}

class Input_Value_Default extends Input_Value {
    constructor(elem) {
        super(elem);
        this.value = elem.value;
        this.elem.addEventListener("change", () => {
            this.value = this.elem.value;
        });
    }

    setValue(value) {
        this.value = value;
        this.elem.value = value;
    }
}

class Input_Value_CheckBox extends Input_Value {
    constructor(elem) {
        super(elem);
        this.value = elem.checked;
        this.elem.addEventListener("change", () => {
            this.value = this.elem.checked;
        });
    }

    setValue(value) {
        this.value = value;
        this.elem.checked = value;
    }
}