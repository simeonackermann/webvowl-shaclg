
function initShaclGenerator(svg) {

    console.log('init my shacl generator', svg);

    svg.selectAll(".node")
        .on("click.foo", function(d)
        {
            console.log('Clicked SHACL node foo', d);
        });

        svg.selectAll(".node")
        .on("click.bar", function(d)
        {
            console.log('Clicked SHACL node bar ', d);
        });
}

function shaclg_hoverNode(node) {
    console.log('hovered node', node);

}

class VOWL_SHACLG {

    constructor(svg) {
        this.svg = svg
        this.addShapeBtn = null;

        console.log('init VOWL_SHACLG...')

        this.generateElements()
        this.initEvents()


    }

    generateElements() {
        console.log('generate elemtns...')

        // var elementsArea = this.svg.append("shacl-elements")
        var elementsArea = this.svg.append("g").classed("shaclContainer", true);

        this.addShapeBtn = elementsArea.append("g").classed("addShaclShape", true);

        this.addShapeBtn.append("rect")       // attach a rectangle
            .attr("x", 0)
            .attr("y", 0)
            .attr("height", 20)
            .attr("width", 55)
            .attr("rx", 5)
            .attr("ry", 5)
            .attr('stroke', 'black')
            .attr('fill', '#69a3b2')
            .append("title").text("Add SHACL Shape");

        this.addShapeBtn.append("text")
            .attr("x", 5)
            .attr("y", 14)
            .text("+ Shape")
            .append("title").text("Add SHACL Shape")

    }

    initEvents() {
        var self = this;
        this.svg.selectAll(".node")
            .on("click.shacl", function(node)
            {
                if (node.type == "class")
                    console.log('Clicked SHACL node', node, node.x, node.y);
            })
            .on("mouseover.shacl", function(node)
            {
                if (node.type == "class") {
                    console.log('Hovered SHACL node', node);
                    self.setAddShapeElementPosition(node);

                    var nodeProperties = self.svg.selectAll(".label").filter((d) => d.source == node);
                    console.log("Node properties:", nodeProperties);
                }
            })
            // .on("mouseenter.shacl", function(node)
            // {
            //     console.log('Enterd SHACL node', node);
            // })
            .on("mouseout.shacl", function(node)
            {
                if (node.type == "class")
                    console.log('Leaved SHACL node', node);
            });
        this.svg.selectAll(".label")
            .on("click.shacl", function(label)
            {
                console.log('Clicked SHACL label', label);
            })
            .on("mouseover.shacl", function(label)
            {
                // self.setAddShapeElementPosition(label);
                console.log('Hovered SHACL label', label);
            })
            .on("mouseout.shacl", function(label)
            {
                console.log('Leaved SHACL label', label);
            });
    }

    setAddShapeElementPosition(node) {
        var x, y = 0;
        x = node.x - node.radius;
        y = node.y - node.radius ;
        var delX, delY = 0;
        // if ( node.renderType() === "round" ) {
            // var scale = 0.5 * Math.sqrt(2.0);
            // var oX = scale * node.actualRadius();
            // var oY = scale * node.actualRadius();
            // delX = node.x - oX;
            // delY = node.y + oY;
            this.addShapeBtn.attr("transform", "translate(" + x + "," + y + ")");
        // }
    }

    generateEditElements() {
        // addDataPropertyGroupElement = editContainer.append('g')
        // .classed("hidden-in-export", true)
        // .classed("hidden", true)
        // .classed("addDataPropertyElement", true)
        // .attr("transform", "translate(" + 0 + "," + 0 + ")");


        // addDataPropertyGroupElement.append("circle")
        // // .classed("deleteElement", true)
        // .attr("r", 12)
        // .attr("cx", 0)
        // .attr("cy", 0)
        // .append("title").text("Add Datatype Property");

        // addDataPropertyGroupElement.append("line")
        // // .classed("deleteElementIcon ",true)
        // .attr("x1", -8)
        // .attr("y1", 0)
        // .attr("x2", 8)
        // .attr("y2", 0)
        // .append("title").text("Add Datatype Property");

        // addDataPropertyGroupElement.append("line")
        // // .classed("deleteElementIcon",true)
        // .attr("x1", 0)
        // .attr("y1", -8)
        // .attr("x2", 0)
        // .attr("y2", 8)
        // .append("title").text("Add Datatype Property");

        // if ( graph.options().useAccuracyHelper() ) {
        // addDataPropertyGroupElement.append("circle")
        //     .attr("r", 15)
        //     .attr("cx", -7)
        //     .attr("cy", 7)
        //     .classed("superHiddenElement", true)
        //     .classed("superOpacityElement", !graph.options().showDraggerObject());
        // }
    }

    hoverNode(node) {
        console.log('hovered Node', node);

    }

}