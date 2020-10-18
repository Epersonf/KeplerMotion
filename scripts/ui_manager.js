const canvas = document.getElementById("canvas");
const a_input = new Input_Value_Default(document.getElementById("a"));
const b_input = new Input_Value_Default(document.getElementById("b"));
const areas_amt_input = new Input_Value_Default(document.getElementById("areas-amt"));
const use_left = new Input_Value_CheckBox(document.getElementById("use-left"));
const ctx = canvas.getContext('2d');
const ellipse = new Ellipse(100, 200, true, ctx, "#fafafa");

a_input.onChange(updateSize);
b_input.onChange(updateSize);
areas_amt_input.onChange(updateSize);
use_left.onChange(updateSize);

function updateSize() {
    clearCanvas();
    ellipse.setSize(a_input.getFloat(), b_input.getFloat(), use_left.getBool());
    ellipse.draw(canvas.width/2, canvas.height/2, areas_amt_input.getInt());
}

function clearCanvas() {
    ctx.fillStyle = "#333333";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

updateSize();