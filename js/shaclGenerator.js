
class VOWL_SHACLG {

    constructor(graphWrapper) {
        this.graphWrapper = graphWrapper
        this.graphContainer = d3.select(graphWrapper).attr("id", "graph");

        this.svg = this.graphContainer.select("g");
        this.addShapeBtn = null
        this.rdformWrapper = document.querySelector("#shaclForm")
        this.rdform = null

        this.generateElements()
        this.initEvents()
    }

    generateElements() {
        var self = this;
        // var elementsArea = this.svg.append("shacl-elements")
        var elementsArea = this.svg.append("g").classed("shaclContainer", true)

        this.addShapeBtn = elementsArea.append("g").classed("addShaclShape hidden", true)

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
            .classed("text", true)
            .append("title").text("Add SHACL Shape")


        // this.rdformContainer = d3.select(this.rdformContainer)
        //     .html('<form action="#" class="form-horizontal rdform" role="form"></form>')
        // this.rdformContainer = this.rdformContainer.select(".rdform").classed("hidden", true)

        this.svg.selectAll(".node")
            .filter(function(node) { return node.type == "class"})
            .each(function (node) {
                // self.focusOnNode(d3.select(this), node);
                self.appendAddShapeBtn(d3.select(this));
                self.appendEditShapeBtn(d3.select(this));
                self.appendShapedBtn(d3.select(this));
            })
    }

    appendAddShapeBtn(element) {
        var addShapeBtn = element.append("g").classed("addShaclShape hidden", true)

        addShapeBtn.append("rect")       // attach a rectangle
                    .attr("x", -28)
                    .attr("y", 11)
                    .attr("height", 20)
                    .attr("width", 56)
                    .attr("rx", 5)
                    .attr("ry", 5)
                    .attr('stroke', 'black')
                    .attr('fill', '#69a3b2')
                    .append("title").text("Add SHACL Shape");

                addShapeBtn.append("text")
                    .attr("x", 0)
                    .attr("y", 25)
                    .attr("text-anchor", "middle")
                    .classed("text", true)
                    .text("+ Shape")
    }

    appendEditShapeBtn(element) {
        var editShapeBtn = element.append("g").classed("editShaclShape hidden", true)

        editShapeBtn.append("rect")       // attach a rectangle
                    .attr("x", -33)
                    .attr("y", 11)
                    .attr("height", 20)
                    .attr("width", 66)
                    .attr("rx", 5)
                    .attr("ry", 5)
                    .attr('stroke', 'black')
                    .attr('fill', '#69a3b2')
                    .append("title").text("Edit SHACL Shape");

                editShapeBtn.append("text")
                    .attr("x", 0)
                    .attr("y", 25)
                    .attr("text-anchor", "middle")
                    .classed("text", true)
                    .text("Edit shape")
    }

    appendShapedBtn(element) {
        var shapedBtn = element.append("g").classed("shapedBtn hidden", true)

        shapedBtn.append("rect")       // attach a rectangle
                    .attr("x", -28)
                    .attr("y", 11)
                    .attr("height", 20)
                    .attr("width", 56)
                    .attr("rx", 5)
                    .attr("ry", 5)
                    .attr('stroke', 'black')
                    .attr('fill', '#69a3b2')
                    .append("title").text("Class has a SHACL Shape");

                shapedBtn.append("text")
                    .attr("x", 0)
                    .attr("y", 25)
                    .attr("text-anchor", "middle")
                    .classed("text", true)
                    .text("Shaped")
    }

    initEvents() {
        var self = this;

        this.svg.selectAll(".node")
            .on("click.shacl", function(node)
            {
                if (node.type == "class") {

                    var nodeProperties = self.svg.selectAll(".label").filter((d) => d.source.uri == node.uri);
                    // console.log('Clicked SHACL node', node, nodeProperties);

                    self.openRdform(d3.select(this), node, nodeProperties);
                }
            })
            .on("mouseenter.shacl", function(node)
            {
                if (node.type == "class") {
                    self.focusOnNode(d3.select(this), node);

                    // var nodeProperties = self.svg.selectAll(".label").filter((d) => d.source == node);
                    // console.log('Hovered SHACL node', node, nodeProperties);
                }
            })
            .on("mouseleave.shacl", function(node)
            {
                if (node.type == "class") {
                    // console.log('Leaved SHACL node', node);
                    // self.addShapeBtn.classed("hidden", true)
                    self.leaveFocusOnNode(d3.select(this), node);
                }
            });
        this.svg.selectAll(".label")
            .on("click.shacl", function(label)
            {
                // console.log('Clicked SHACL label', label);
            })
            .on("mouseover.shacl", function(label)
            {
                // console.log('Hovered SHACL label', label);
            })
            .on("mouseout.shacl", function(label)
            {
                // console.log('Leaved SHACL label', label);
            });
    }

    focusOnNode(element, node) {
        // element.append(function() { return self.addShapeBtn; });
        // self.addShapeBtnSetPosition(node);
        if (!node.shape) {
            element.select(".addShaclShape").classed("hidden", false);
        } else {
            element.select(".shapedBtn").classed("hidden", true);
            element.select(".editShaclShape").classed("hidden", false);
        }
    }

    leaveFocusOnNode(element, node) {
        // element.append(function() { return self.addShapeBtn; });
        // self.addShapeBtnSetPosition(node);
        element.select(".addShaclShape").classed("hidden", true);
        element.select(".editShaclShape").classed("hidden", true);
        if (node.shape) {
            element.select(".shapedBtn").classed("hidden", false);
        }
    }

    initRdform() {
        this.rdform = d3.select(this.rdformWrapper)
            .html('<form action="#" class="form-horizontal rdform" role="form"></form>')
        this.rdform = this.rdform.select(".rdform").classed("hidden", true)
    }

    openRdform(element, node, properties) {
        var self = this;

        var shape = this.createRdformShape(node, properties);
        var data = null;

        if (node.shape) {
            data = node.shape
        }

        this.initRdform();
        $('.rdform').RDForm({
            template: shape.shape,
            rootShape: 'http://example.org/PersonShape',
            templateExtension: shape.shapeExtension,
            data: data,
            verbose: false, // do not show output
            debug: true,

            submit: function(result) {
                self.addShapeToNode(result, element, node)
                self.closeRdform(element, node);
            },

            abort: function() {
                self.closeRdform(element, node);
            }
        });
        this.rdform.classed("hidden", false);
    }

    closeRdform(element, node) {
        d3.select(this.rdformWrapper).html("");
        this.rdform.classed("hidden", true);

        element.select("*").classed("focused", false);
    }

    createRdformShape(node, properties) {

        var nodeShape = {
            "@id": "NodeShape",
            "@type": "sh:NodeShape",
            "sh:name": `${node.name}`,
            "sh:targetClass" : {"@id": "sh:NodeShape"},
            "sh:property" : [
                {
                    "sh:path" : { "@id": "sh:targetClass" },
                    "sh:name" : "Target class (URI)",
                    "sh:nodeKind" : {"@id": "sh:IRI"},
                    "sh:minCount" : 1
                },
                {
                    "sh:path" : {"@id": "sh:name"},
                    "sh:datatype" : { "@id": "xsd:string" },
                    "sh:name" : "Shape name",
                }
            ]
        };

        var propertyShapes = []
        var propertyShapeDefaultProperties = [
            {
                "sh:path" : { "@id": "sh:path" },
                "sh:name" : "Path (URI)",
                "sh:nodeKind" : {"@id": "sh:IRI"},
                "sh:minCount" : 1
            },
            {
                "sh:path" : { "@id": "sh:name" },
                "sh:datatype" : { "@id": "xsd:string" },
                "sh:name" : "Property name"
            },
            {
                "sh:path" : { "@id": "sh:minCount" },
                "sh:datatype" : { "@id": "xsd:integer" },
                "sh:name" : "Min count",
                "sh:minCount" : 0,
            },
            {
                "sh:path" : { "@id": "sh:maxCount" },
                "sh:datatype" : { "@id": "xsd:integer" },
                "sh:name" : "Max count",
                "sh:minCount" : 0,
            },
        ]

        var nodeExtension = {
            "@id": "NodeShape",
            "rdform:resource": "NodeShape-{sh:name}",
            "sh:targetClass": {
                "rdform:value": node.uri,
                "rdform:readonly": true
            },
            "sh:name": {
                "rdform:value": `${node.name} shape`,
            }
        }
        var propertyExtension = []

        properties.each((property) => {
            // if (property.propertyTo != "datatype") {
            //     return;
            // }
            // console.log('Property', property);
            var id = property.valueTo + "PropertyShape"
            propertyShapes.push({
                "@id": id,
                "@type": "sh:PropertyShape",
                "sh:targetClass" : {"@id": "sh:PropertyShape"},
                "sh:name": property.valueTo,
                "sh:property" : propertyShapeDefaultProperties
            })
            nodeShape["sh:property"].push({
                "sh:path" : {"@id": "sh:property"},
                "sh:node" : {"@id": id},
                "sh:minCount" : 0
            });

            nodeExtension[id] = {
                "rdform:value": property.uriTo,
                "rdform:arguments": '{ "parentName": "{sh:name}" }'
            }
            propertyExtension.push(
                {
                    "@id": id,
                    "rdform:resource": "NodeShape-{parentName}-{sh:name}",
                    "sh:path": {
                        "rdform:value": property.uriTo,
                        "rdform:readonly": true
                    },
                    "sh:name": {
                        "rdform:value": property.valueTo,
                    },
                }
            );
        })

        var shape = {
            "@context": {
                "@base": "http://example.org/",
                "@vocab": "http://example.org/"
            },
            "@graph": [
                nodeShape,
                ...propertyShapes
            ]
        };

        var shapeExtension = {
            "@context": {
                "@base": "http://example.org/",
                "@vocab": "http://example.org/"
            },
            "@graph": [
                nodeExtension,
                ...propertyExtension
            ]
        };

        // console.log('Shape: ', shape);
        // console.log('Shape Extension: ', shapeExtension);

        return {shape, shapeExtension};
    }

    addShapeToNode(shape, element, node) {
        // console.log("Add Shape to node", shape, node);
        element.select(".shapedBtn").classed("hidden", false);
        node.shape = shape;
    }

    addShapeBtnSetPosition(node) {
        var x, y = 0;
        x = node.x - node.radius;
        y = node.y - node.radius ;
        this.addShapeBtn
            .attr("transform", "translate(" + x + "," + y + ")")
            .classed("hidden", false)
    }


}