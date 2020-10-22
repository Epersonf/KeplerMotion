const sleep = (delay) => {  
    return new Promise(resolve => {  
      setTimeout(resolve, delay)  
    });  
}

class Ellipse {
    constructor (a, b, useLeftFocus, ctx, color="white") {
        this.ctx = ctx;
        this.setSize(a, b);
        this.color = color;
    }

    updateFocus() {
        let focus = [0, 0];
        const focusDistance = this.getFocusDistance();
        if (this.a > this.b) {
            focus[0] = (this.useLeftFocus != true) ? focusDistance : -focusDistance;
        } else 
            focus[1] = (this.useLeftFocus != true) ? focusDistance : -focusDistance;
        return focus;
    }

    getFocusDistance() {
        const aSquare = Math.pow(this.a, 2);
        const bSquare = Math.pow(this.b, 2);
        const c = Math.sqrt(Math.abs(aSquare - bSquare));
        return c;
    }

    setSize(a, b, useLeftFocus=true) {
        this.useLeftFocus = useLeftFocus;
        this.a = parseFloat(a);
        this.b = parseFloat(b);
        this.focus = this.updateFocus();
    }

    getArea() {
        return Math.PI * this.a * this.b;
    }

    draw(x, y, areasAmt=12) {
        //calculates area of individual polygon
        const polygonArea = this.getArea() / areasAmt;

        //color set
        ctx.font = "12px Arial";
        ctx.textAlign = "center";
        this.ctx.strokeStyle = this.color;
        this.ctx.fillStyle = this.color;

        //draw ellipse
        this.ctx.beginPath();
        const firstPos = [x + this.a * Math.sin(0), y + this.b * Math.cos(0)];
        this.ctx.moveTo(firstPos[0], firstPos[1]);
        
        //create polygon to discover the area
        const focusPos = [x + this.focus[0], y + this.focus[1]];
        let polygon = new Polygon(focusPos[0], focusPos[1]);
        polygon.addPoint(firstPos[0], firstPos[1]);

        for (let t = 0; t <= 2 * Math.PI; t += .005) {

            //draw circle
            const actualPos = [x + this.a * Math.sin(t), y + this.b * Math.cos(t)];
            this.ctx.lineTo(actualPos[0], actualPos[1]);
            this.ctx.stroke();

            //draw triangles
            polygon.addPoint(actualPos[0], actualPos[1]);
            if (polygon.getArea() >= polygonArea || t == 0) {
                polygon.clearPoints();
                this.ctx.moveTo(focusPos[0], focusPos[1]);
                this.ctx.lineTo(actualPos[0], actualPos[1]);
                this.ctx.stroke();
            }
        }
        
        this.ctx.lineTo(firstPos[0], firstPos[1]);
        this.ctx.stroke();
    }
}